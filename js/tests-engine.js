// ─── Instancias de Chart.js (una por canvas) ───────────────────────
const _charts = new Map();

// ─── Estado del quiz ───────────────────────────────────────────────
let _estado = {
  preguntas: [],
  respuestas: {},
  indice: 0,
  tipo: null,
  nombre: null,
  subscores: null,
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
  const sumasSub = {}, conteosSub = {};

  AREAS.forEach(a => { sumas[a.id] = 0; conteos[a.id] = 0; });
  SUBAREAS.forEach(s => { sumasSub[s.id] = 0; conteosSub[s.id] = 0; });

  const preguntas = tipo === 'intereses' ? PREGUNTAS_INTERESES : PREGUNTAS_HABILIDADES;
  Object.entries(respuestas).forEach(([id, valor]) => {
    const p = preguntas.find(q => q.id === id);
    if (p) {
      sumas[p.area] += valor;
      conteos[p.area]++;
      if (p.subarea) {
        sumasSub[p.subarea] += valor;
        conteosSub[p.subarea]++;
      }
    }
  });

  const scores = {};
  AREAS.forEach(a => {
    const raw = conteos[a.id] > 0 ? (sumas[a.id] / conteos[a.id]) * factor : 0;
    scores[a.id] = Math.round(Math.min(raw, 5) * 10) / 10;
  });

  const subscores = {};
  SUBAREAS.forEach(s => {
    const raw = conteosSub[s.id] > 0 ? (sumasSub[s.id] / conteosSub[s.id]) * factor : 0;
    subscores[s.id] = Math.round(Math.min(raw, 5) * 10) / 10;
  });

  return { scores, subscores };
}

function _b64enc(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function _b64dec(b64) {
  return decodeURIComponent(escape(atob(b64)));
}

function generarHashURL(scores, nombre) {
  const vals = AREAS.map(a => (scores[a.id] || 0).toFixed(1)).join('-');
  return '#r=' + _b64enc((nombre || '') + '|' + vals);
}

function leerHashURL() {
  const hash = window.location.hash;
  if (!hash.startsWith('#r=')) return null;
  try {
    const raw = _b64dec(hash.slice(3));
    const sep = raw.indexOf('|');
    if (sep === -1) return null;
    const nombre = raw.slice(0, sep) || null;
    const partes = raw.slice(sep + 1).split('-');
    if (partes.length !== AREAS.length) return null;
    const scores = {};
    for (let i = 0; i < AREAS.length; i++) {
      const v = parseFloat(partes[i]);
      if (isNaN(v) || v < 0 || v > 5) return null;
      scores[AREAS[i].id] = v;
    }
    return { scores, nombre };
  } catch (_) {
    return null;
  }
}

function guardarResultado(tipo, scores, subscores, nombre) {
  try {
    const clave = tipo === 'intereses' ? 'ctp_intereses_resultado' : 'ctp_habilidades_resultado';
    localStorage.setItem(clave, JSON.stringify({
      scores,
      subscores: subscores || {},
      nombre: nombre || null,
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
    if (!data.subscores || typeof data.subscores !== 'object') data.subscores = {};
    return data;
  } catch (_) {
    return null;
  }
}

function calcularCompatibilidad(scoresUsuario, subscoresUsuario, carrera) {
  const perfil = carrera.perfil || carrera;
  const perfilSubareas = carrera.perfilSubareas || null;

  let sumMatch = 0, sumMax = 0;
  AREAS.forEach(a => {
    const req = perfil[a.id] || 0;
    if (req === 0) return;

    const subareasDeEstaArea = SUBAREAS.filter(s => s.padre === a.id);
    const usarSubareas = perfilSubareas && subscoresUsuario &&
      Object.keys(subscoresUsuario).length > 0 &&
      subareasDeEstaArea.some(s => s.id in perfilSubareas);

    if (usarSubareas) {
      subareasDeEstaArea.forEach(s => {
        const reqSub = perfilSubareas[s.id] || 0;
        if (reqSub > 0) {
          sumMatch += Math.min(subscoresUsuario[s.id] || 0, reqSub);
          sumMax += reqSub;
        }
      });
    } else {
      sumMatch += Math.min(scoresUsuario[a.id] || 0, req);
      sumMax += req;
    }
  });
  return sumMax === 0 ? 0 : Math.round((sumMatch / sumMax) * 100);
}

function calcularCompatibilidadCombinada(scoresI, scoresH, subscoresI, subscoresH, carrera) {
  return Math.round(
    (calcularCompatibilidad(scoresI, subscoresI, carrera) +
     calcularCompatibilidad(scoresH, subscoresH, carrera)) / 2
  );
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

  const labels = AREAS.map(a => a.nombre.includes(' / ') ? a.nombre.split(' / ') : a.nombre);

  const chart = new Chart(canvas.getContext('2d'), {
    type: 'radar',
    data: { labels, datasets },
    options: {
      layout: { padding: 16 },
      scales: {
        r: {
          min: 0, max: 5,
          ticks: { stepSize: 1, display: false },
          grid: { color: 'rgba(0,0,0,0.1)' },
          angleLines: { color: 'rgba(0,0,0,0.1)' },
          pointLabels: { font: { size: 11 }, color: '#333', padding: 8 },
        }
      },
      plugins: { legend: { display: false } },
      responsive: true,
      maintainAspectRatio: true,
      onClick: (evt, _elements, chart) => {
        const cx = (chart.chartArea.left + chart.chartArea.right) / 2;
        const cy = (chart.chartArea.top + chart.chartArea.bottom) / 2;
        const dx = evt.x - cx;
        const dy = evt.y - cy;
        let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        if (angle < 0) angle += 360;
        const idx = Math.round(angle / (360 / AREAS.length)) % AREAS.length;
        _mostrarModalArea(AREAS[idx]);
      },
    },
  });

  canvas.style.cursor = 'pointer';

  _charts.set(canvasId, chart);
}

function descargarRadar(radarCanvasId, tipo) {
  const radarCanvas = document.getElementById(radarCanvasId);
  const barCanvas   = document.getElementById('ranking-canvas');
  if (!radarCanvas) return;

  const W      = 560;
  const pad    = 20;
  const dpr    = 2;

  const headerH = _estado.nombre ? 76 : 56;
  const chartW  = W - pad * 2;
  const radarH  = chartW;
  const barH    = barCanvas ? Math.round(chartW * barCanvas.height / barCanvas.width) : 0;
  const legendH = 20;
  const sp      = 12;
  const totalH  = headerH + sp + legendH + sp / 2 + radarH
                + (barH > 0 ? sp + 22 + sp / 2 + barH : 0)
                + sp + 20;

  const off = document.createElement('canvas');
  off.width  = W * dpr;
  off.height = totalH * dpr;
  const ctx = off.getContext('2d');
  ctx.scale(dpr, dpr);

  // ── fondo ──
  ctx.fillStyle = '#f5f5f5';
  ctx.fillRect(0, 0, W, totalH);

  // ── encabezado ──
  ctx.fillStyle = '#1a237e';
  ctx.fillRect(0, 0, W, headerH);
  ctx.fillStyle = '#d4a017';
  ctx.fillRect(0, headerH - 3, W, 3);

  ctx.textBaseline = 'top';
  ctx.textAlign    = 'left';
  ctx.fillStyle    = '#ffffff';
  ctx.font         = 'bold 15px system-ui,sans-serif';
  ctx.fillText('CTP Pococí', pad, 13);
  ctx.font = '12px system-ui,sans-serif';
  ctx.fillText(tipo === 'intereses' ? 'Test de Intereses' : 'Test de Habilidades', pad, 33);
  if (_estado.nombre) {
    ctx.font      = 'bold 13px system-ui,sans-serif';
    ctx.fillStyle = '#d4a017';
    ctx.fillText(_estado.nombre, pad, 53);
  }

  let y = headerH + sp;

  // ── leyenda ──
  const dotR = 5;
  ctx.textBaseline = 'middle';
  ctx.font = '11px system-ui,sans-serif';

  ctx.fillStyle = '#1a237e';
  ctx.beginPath(); ctx.arc(pad + dotR, y + dotR, dotR, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#333';
  ctx.fillText('Tu perfil', pad + dotR * 2 + 6, y + dotR);

  const leyendaEl     = document.getElementById('leyenda-carrera');
  const leyendaTexto  = document.getElementById('leyenda-carrera-texto');
  if (leyendaEl && !leyendaEl.hidden && leyendaTexto) {
    const lx = pad + dotR * 2 + 6 + ctx.measureText('Tu perfil').width + 20;
    ctx.fillStyle = '#d4a017';
    ctx.beginPath(); ctx.arc(lx + dotR, y + dotR, dotR, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#333';
    ctx.fillText(leyendaTexto.textContent, lx + dotR * 2 + 6, y + dotR);
  }
  y += legendH + sp / 2;

  // ── radar ──
  ctx.drawImage(radarCanvas, pad, y, chartW, radarH);
  y += radarH;

  // ── gráfico de barras ──
  if (barCanvas && barH > 0) {
    y += sp;
    ctx.fillStyle    = '#555';
    ctx.textBaseline = 'top';
    ctx.font         = '11px system-ui,sans-serif';
    ctx.fillText('Compatibilidad con cada carrera técnica', pad, y);
    y += 22;
    ctx.drawImage(barCanvas, pad, y, chartW, barH);
    y += barH;
  }

  // ── pie ──
  y += sp;
  ctx.fillStyle    = '#aaa';
  ctx.font         = '10px system-ui,sans-serif';
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('CTP Pococí — Tests Vocacionales', W / 2, y);

  const nombre   = (_estado.nombre || '').toLowerCase().replace(/\s+/g, '-');
  const filename = `resultado-${tipo}${nombre ? '-' + nombre : ''}.png`;

  off.toBlob(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  });
}

// ─── UI del Quiz ───────────────────────────────────────────────────

function iniciarTest(preguntas, tipo) {
  _estado = { preguntas: shuffle(preguntas), respuestas: {}, indice: 0, tipo, nombre: null, subscores: null };

  const hashData = leerHashURL();
  if (hashData) {
    _estado.nombre = hashData.nombre;
    _mostrarResultados(hashData.scores, null);
    return;
  }
  _mostrarPantalla('pantalla-inicio');
}

function comenzarTest() {
  _mostrarPantalla('pantalla-nombre');
  const input = document.getElementById('input-nombre');
  if (input) { input.value = ''; input.focus(); }
}

function confirmarNombre() {
  const input = document.getElementById('input-nombre');
  const nombre = input ? input.value.trim() : '';
  if (!nombre) return;
  _estado.nombre = nombre;
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
  ['pantalla-inicio', 'pantalla-nombre', 'pantalla-pregunta', 'pantalla-resultados'].forEach(p => {
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
    const { scores, subscores } = calcularResultado(_estado.respuestas, _estado.tipo);
    guardarResultado(_estado.tipo, scores, subscores, _estado.nombre);
    _mostrarResultados(scores, subscores);
  } else {
    _renderPregunta();
  }
}

function _mostrarResultados(scores, subscores) {
  _estado.subscores = subscores || null;
  _mostrarPantalla('pantalla-resultados');
  window.scrollTo(0, 0);

  const titulo = document.getElementById('resultados-titulo');
  if (titulo) {
    if (_estado.nombre) {
      titulo.textContent = _estado.tipo === 'intereses'
        ? `${_estado.nombre}, estas son tus áreas de interés`
        : `${_estado.nombre}, estas son tus habilidades`;
    } else {
      titulo.textContent = 'Tus resultados';
    }
  }

  mostrarRadar('radar-canvas', scores);
  _mostrarBarrasCarreras('ranking-canvas', scores, subscores);
  history.replaceState(null, '', generarHashURL(scores, _estado.nombre));
}

function _mostrarBarrasCarreras(canvasId, scores, subscores) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  if (_charts.has(canvasId)) {
    _charts.get(canvasId).destroy();
    _charts.delete(canvasId);
  }

  const subDisponibles = subscores && Object.keys(subscores).length > 0;

  const ranking = CARRERAS.map(c => ({
    carrera: c,
    label: _abreviarNombre(c),
    pct: calcularCompatibilidad(scores, subscores, c),
  })).sort((a, b) => b.pct - a.pct);

  const colorBase = 'rgba(26,35,126,0.6)';
  const colorActivo = '#d4a017';
  let selectedIdx = null;

  const barLabelsPlugin = {
    id: 'barLabels',
    afterDraw(chart) {
      const ctx = chart.ctx;
      const dataset = chart.data.datasets[0];
      const meta = chart.getDatasetMeta(0);
      meta.data.forEach((bar, idx) => {
        const text = dataset.data[idx] + '%';
        const barLen = bar.x - bar.base;
        ctx.save();
        ctx.font = 'bold 10px sans-serif';
        ctx.textBaseline = 'middle';
        const tw = ctx.measureText(text).width;
        if (barLen > tw + 12) {
          ctx.fillStyle = 'white';
          ctx.textAlign = 'right';
          ctx.fillText(text, bar.x - 5, bar.y);
        } else {
          ctx.fillStyle = '#555';
          ctx.textAlign = 'left';
          ctx.fillText(text, bar.x + 4, bar.y);
        }
        ctx.restore();
      });
    },
  };

  const chart = new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels: ranking.map(r => r.label),
      datasets: [{
        data: ranking.map(r => r.pct),
        backgroundColor: ranking.map(() => colorBase),
        borderRadius: 4,
      }],
    },
    plugins: [barLabelsPlugin],
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      onClick: (_evt, elements) => {
        if (!elements.length) return;
        const idx = elements[0].index;
        const carrera = ranking[idx].carrera;
        const pct = ranking[idx].pct;
        const colors = ranking.map(() => colorBase);
        const leyenda = document.getElementById('leyenda-carrera');
        const leyendaTexto = document.getElementById('leyenda-carrera-texto');
        const desc = document.getElementById('descripcion-match');
        const subEl = document.getElementById('sub-scores');
        if (selectedIdx === idx) {
          selectedIdx = null;
          mostrarRadar('radar-canvas', scores);
          if (leyenda) leyenda.hidden = true;
          if (desc) desc.hidden = true;
          if (subEl) subEl.hidden = true;
        } else {
          selectedIdx = idx;
          colors[idx] = colorActivo;
          mostrarRadar('radar-canvas', scores, carrera.perfil, 'Tu perfil', carrera.nombre);
          if (leyenda) leyenda.hidden = false;
          if (leyendaTexto) leyendaTexto.textContent = `${carrera.nombre} · ${pct}%`;
          if (desc) { desc.textContent = carrera.descripcion_match; desc.hidden = false; }
          if (subEl) {
            if (subDisponibles && carrera.perfilSubareas) {
              const partes = SUBAREAS
                .filter(s => s.id in carrera.perfilSubareas)
                .map(s => `${s.nombre}: ${(subscores[s.id] || 0).toFixed(1)}`);
              subEl.textContent = 'Sub-áreas → ' + partes.join(' | ');
              subEl.hidden = false;
            } else {
              subEl.hidden = true;
            }
          }
        }
        chart.data.datasets[0].backgroundColor = colors;
        chart.update();
      },
      scales: {
        x: {
          min: 0, max: 100,
          ticks: { callback: v => v + '%', font: { size: 11 } },
          grid: { color: 'rgba(0,0,0,0.08)' },
        },
        y: { ticks: { font: { size: 10 } } },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: ctx => ranking[ctx[0].dataIndex].carrera.nombre,
            label: ctx => ` ${ctx.raw}% de compatibilidad`,
          },
        },
      },
    },
  });

  canvas.style.cursor = 'pointer';
  _charts.set(canvasId, chart);
}

function _abreviarNombre(carrera) {
  const maxLen = 26;
  const nombre = carrera.nombre.length > maxLen
    ? carrera.nombre.slice(0, maxLen - 1) + '…'
    : carrera.nombre;
  return carrera.emoji + ' ' + nombre;
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
        '<div id="modal-area-subscores" hidden></div>' +
      '</div>';
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) cerrarModalArea(); });
  }
  document.getElementById('modal-area-nombre').textContent = area.nombre;
  document.getElementById('modal-area-desc').textContent = area.descripcion;

  const subEl = document.getElementById('modal-area-subscores');
  const subareasDeEstaArea = SUBAREAS.filter(s => s.padre === area.id);
  const subscores = _estado.subscores;

  if (subEl) {
    if (subareasDeEstaArea.length > 0 && subscores && Object.keys(subscores).length > 0) {
      subEl.innerHTML = '<p class="modal-area__sub-titulo">Tu puntaje detallado</p>' +
        subareasDeEstaArea.map(s => {
          const score = subscores[s.id] || 0;
          const pct = Math.round((score / 5) * 100);
          return '<div class="modal-area__sub-item">' +
            `<span class="modal-area__sub-nombre">${s.nombre}</span>` +
            '<div class="modal-area__sub-barra-cont">' +
              `<div class="modal-area__sub-barra" style="width:${pct}%"></div>` +
            '</div>' +
            `<span class="modal-area__sub-score">${score.toFixed(1)}</span>` +
          '</div>';
        }).join('');
      subEl.hidden = false;
    } else {
      subEl.hidden = true;
    }
  }

  modal.hidden = false;
}

function cerrarModalArea() {
  const modal = document.getElementById('modal-area');
  if (modal) modal.hidden = true;
}
