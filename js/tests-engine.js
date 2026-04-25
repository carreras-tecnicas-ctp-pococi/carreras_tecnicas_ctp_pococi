// ─── Instancias de Chart.js (una por canvas) ───────────────────────
const _charts = new Map();

// ─── Estado del quiz ───────────────────────────────────────────────
let _estado = {
  preguntas: [],
  respuestas: {},
  indice: 0,
  tipo: null,
};

// ─── Funciones puras ───────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function calcularResultado(respuestas, tipo) {
  const factor = tipo === 'habilidades' ? (5 / 4) : 1;
  const sumas = {}, conteos = {};
  AREAS.forEach(a => { sumas[a.id] = 0; conteos[a.id] = 0; });

  const preguntas = tipo === 'intereses' ? PREGUNTAS_INTERESES : PREGUNTAS_HABILIDADES;
  Object.entries(respuestas).forEach(([id, valor]) => {
    const p = preguntas.find(q => q.id === id);
    if (p) { sumas[p.area] += valor; conteos[p.area]++; }
  });

  const scores = {};
  AREAS.forEach(a => {
    const raw = conteos[a.id] > 0 ? (sumas[a.id] / conteos[a.id]) * factor : 0;
    scores[a.id] = Math.round(Math.min(raw, 5) * 10) / 10;
  });
  return scores;
}

function generarHashURL(scores) {
  const vals = AREAS.map(a => (scores[a.id] || 0).toFixed(1));
  return '#r=' + vals.join('-');
}

function leerHashURL() {
  const hash = window.location.hash;
  if (!hash.startsWith('#r=')) return null;
  const partes = hash.slice(3).split('-');
  if (partes.length !== AREAS.length) return null;
  const scores = {};
  for (let i = 0; i < AREAS.length; i++) {
    const v = parseFloat(partes[i]);
    if (isNaN(v) || v < 0 || v > 5) return null;
    scores[AREAS[i].id] = v;
  }
  return scores;
}

function guardarResultado(tipo, scores) {
  try {
    const clave = tipo === 'intereses' ? 'ctp_intereses_resultado' : 'ctp_habilidades_resultado';
    localStorage.setItem(clave, JSON.stringify({
      scores,
      fecha: new Date().toISOString().slice(0, 10),
    }));
  } catch (_) {}
}

function cargarResultado(tipo) {
  try {
    const clave = tipo === 'intereses' ? 'ctp_intereses_resultado' : 'ctp_habilidades_resultado';
    const raw = localStorage.getItem(clave);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || data.scores === null || typeof data.scores !== 'object' || !data.fecha) return null;
    return data;
  } catch (_) {
    return null;
  }
}

function calcularCompatibilidad(scoresUsuario, perfilCarrera) {
  const maxDist = Math.sqrt(AREAS.length * 25);
  const dist = Math.sqrt(
    AREAS.reduce((sum, a) => {
      const d = (scoresUsuario[a.id] || 0) - (perfilCarrera[a.id] || 0);
      return sum + d * d;
    }, 0)
  );
  return Math.max(0, Math.round((1 - dist / maxDist) * 100));
}

function calcularCompatibilidadCombinada(scoresI, scoresH, perfil) {
  const maxDist = Math.sqrt(AREAS.length * 25);
  const dI = Math.sqrt(AREAS.reduce((s, a) => { const d = (scoresI[a.id]||0)-(perfil[a.id]||0); return s+d*d; }, 0));
  const dH = Math.sqrt(AREAS.reduce((s, a) => { const d = (scoresH[a.id]||0)-(perfil[a.id]||0); return s+d*d; }, 0));
  return Math.max(0, Math.round((1 - (dI + dH) / 2 / maxDist) * 100));
}

// ─── Radar ─────────────────────────────────────────────────────────

function mostrarRadar(canvasId, scoresUsuario, scoresCarrera = null, labelUsuario = 'Tu perfil', labelCarrera = 'Carrera') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  if (_charts.has(canvasId)) {
    _charts.get(canvasId).destroy();
    _charts.delete(canvasId);
  }

  const datasets = [{
    label: labelUsuario,
    data: AREAS.map(a => scoresUsuario[a.id] || 0),
    backgroundColor: 'rgba(26,35,126,0.25)',
    borderColor: '#1a237e',
    borderWidth: 2,
    pointBackgroundColor: '#1a237e',
    pointRadius: 3,
  }];

  if (scoresCarrera) {
    datasets.push({
      label: labelCarrera,
      data: AREAS.map(a => scoresCarrera[a.id] || 0),
      backgroundColor: 'rgba(212,160,23,0.25)',
      borderColor: '#d4a017',
      borderWidth: 2,
      pointBackgroundColor: '#d4a017',
      pointRadius: 3,
    });
  }

  const chart = new Chart(canvas.getContext('2d'), {
    type: 'radar',
    data: { labels: AREAS.map(a => a.nombre), datasets },
    options: {
      scales: {
        r: {
          min: 0, max: 5,
          ticks: { stepSize: 1, display: false },
          grid: { color: 'rgba(0,0,0,0.1)' },
          angleLines: { color: 'rgba(0,0,0,0.1)' },
          pointLabels: { font: { size: 11 }, color: '#333' },
        }
      },
      plugins: { legend: { display: false } },
      responsive: true,
      maintainAspectRatio: true,
    },
  });

  _charts.set(canvasId, chart);
}

function descargarRadar(canvasId, tipo) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  canvas.toBlob(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resultado-${tipo}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
}

// ─── UI del Quiz ───────────────────────────────────────────────────

function iniciarTest(preguntas, tipo) {
  _estado = { preguntas: shuffle(preguntas), respuestas: {}, indice: 0, tipo };

  const hashScores = leerHashURL();
  if (hashScores) {
    _mostrarResultados(hashScores);
    return;
  }
  _mostrarPantalla('pantalla-inicio');
}

function comenzarTest() {
  _estado.indice = 0;
  _mostrarPantalla('pantalla-pregunta');
  _renderPregunta();
}

function irAtras() {
  if (_estado.indice > 0) {
    _estado.indice--;
    _renderPregunta();
  }
}

function _mostrarPantalla(id) {
  ['pantalla-inicio', 'pantalla-pregunta', 'pantalla-resultados'].forEach(p => {
    const el = document.getElementById(p);
    if (el) el.hidden = (el.id !== id);
  });
}

function _renderPregunta() {
  const { preguntas, respuestas, indice, tipo } = _estado;
  const pregunta = preguntas[indice];
  const total = preguntas.length;

  const barEl = document.getElementById('progreso-barra');
  const textoEl = document.getElementById('progreso-texto');
  if (barEl) barEl.style.width = Math.round((indice / total) * 100) + '%';
  if (textoEl) textoEl.textContent = `Pregunta ${indice + 1} de ${total}`;

  const textoQ = document.getElementById('pregunta-texto');
  if (textoQ) textoQ.textContent = pregunta.texto;

  const escala = document.getElementById('escala-botones');
  if (!escala) return;
  escala.innerHTML = '';

  const opciones = tipo === 'intereses'
    ? [
        { valor: 1, emoji: '😤', texto: 'Lo detesto' },
        { valor: 2, emoji: '🙁', texto: 'No me gusta' },
        { valor: 3, emoji: '😐', texto: 'Me da igual' },
        { valor: 4, emoji: '🙂', texto: 'Me gusta' },
        { valor: 5, emoji: '😍', texto: 'Me encanta' },
      ]
    : [
        { valor: 1, texto: 'No lo sé hacer' },
        { valor: 2, texto: 'Me cuesta hacerlo' },
        { valor: 3, texto: 'Lo hago bien' },
        { valor: 4, texto: 'Lo hago muy bien' },
      ];

  const respuestaActual = respuestas[pregunta.id];
  opciones.forEach(op => {
    const btn = document.createElement('button');
    btn.className = 'escala-btn' + (respuestaActual === op.valor ? ' escala-btn--activo' : '');
    btn.innerHTML = (op.emoji ? `<span class="escala-emoji">${op.emoji}</span>` : '') +
                    `<span class="escala-texto">${op.texto}</span>`;
    btn.onclick = () => _responder(pregunta.id, op.valor);
    escala.appendChild(btn);
  });

  const btnAtras = document.getElementById('btn-atras');
  if (btnAtras) btnAtras.disabled = (indice === 0);
}

function _responder(idPregunta, valor) {
  _estado.respuestas[idPregunta] = valor;
  _estado.indice++;

  if (_estado.indice >= _estado.preguntas.length) {
    const scores = calcularResultado(_estado.respuestas, _estado.tipo);
    guardarResultado(_estado.tipo, scores);
    _mostrarResultados(scores);
  } else {
    _renderPregunta();
  }
}

function _mostrarResultados(scores) {
  _mostrarPantalla('pantalla-resultados');
  window.scrollTo(0, 0);
  mostrarRadar('radar-canvas', scores);
  _renderChipsArea();
  _renderChipsCarrera(scores);
  history.replaceState(null, '', generarHashURL(scores));
}

function _renderChipsArea() {
  const cont = document.getElementById('chips-area');
  if (!cont) return;
  cont.innerHTML = '';
  AREAS.forEach(area => {
    const btn = document.createElement('button');
    btn.className = 'chip chip--area';
    btn.textContent = area.nombre;
    btn.onclick = () => _mostrarModalArea(area);
    cont.appendChild(btn);
  });
}

function _renderChipsCarrera(scores) {
  const cont = document.getElementById('chips-carrera');
  if (!cont) return;
  cont.innerHTML = '';
  let carreraActivaId = null;

  CARRERAS.forEach(carrera => {
    const btn = document.createElement('button');
    btn.className = 'chip chip--carrera';
    btn.innerHTML = `${carrera.emoji} ${carrera.nombre}`;
    btn.onclick = () => {
      if (carreraActivaId === carrera.id) {
        carreraActivaId = null;
        btn.classList.remove('chip--activo');
        mostrarRadar('radar-canvas', scores);
        const desc = document.getElementById('descripcion-match');
        if (desc) desc.hidden = true;
      } else {
        carreraActivaId = carrera.id;
        cont.querySelectorAll('.chip--carrera').forEach(b => b.classList.remove('chip--activo'));
        btn.classList.add('chip--activo');
        mostrarRadar('radar-canvas', scores, carrera.perfil);
        const desc = document.getElementById('descripcion-match');
        if (desc) { desc.textContent = carrera.descripcion_match; desc.hidden = false; }
      }
    };
    cont.appendChild(btn);
  });
}

function _mostrarModalArea(area) {
  let modal = document.getElementById('modal-area');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modal-area';
    modal.className = 'modal-area';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML =
      '<div class="modal-area__contenido">' +
        '<button class="modal-area__cerrar" onclick="cerrarModalArea()" aria-label="Cerrar">✕</button>' +
        '<h3 id="modal-area-nombre"></h3>' +
        '<p id="modal-area-desc"></p>' +
      '</div>';
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) cerrarModalArea(); });
  }
  document.getElementById('modal-area-nombre').textContent = area.nombre;
  document.getElementById('modal-area-desc').textContent = area.descripcion;
  modal.hidden = false;
}

function cerrarModalArea() {
  const modal = document.getElementById('modal-area');
  if (modal) modal.hidden = true;
}
