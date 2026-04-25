# Tests de Habilidades e Intereses — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar dos tests vocacionales interactivos (intereses y habilidades) con gráfico de radar y comparación de carreras al sitio estático del CTP Pococí.

**Architecture:** Tres páginas HTML nuevas (`tests/index.html`, `tests/intereses.html`, `tests/habilidades.html`) comparten un motor JavaScript (`js/tests-engine.js`) y datos puros (`js/tests-data.js`). Las funciones puras del motor se verifican con un test-runner HTML en el navegador. Chart.js se sirve localmente desde `js/vendor/chart.min.js`. Todo client-side, sin build step, sin npm.

**Tech Stack:** HTML5 semántico, CSS3 (custom properties del sitio), JavaScript ES6+ vanilla, Chart.js 4.4 (local)

**Spec:** `docs/superpowers/specs/2026-04-24-tests-habilidades-intereses-design.md`

---

## Mapa de archivos

| Archivo | Acción | Responsabilidad |
|---------|--------|----------------|
| `js/vendor/chart.min.js` | Crear | Chart.js 4.4 descargado localmente |
| `js/tests-data.js` | Crear | Datos puros: AREAS, PREGUNTAS_INTERESES, PREGUNTAS_HABILIDADES, CARRERAS |
| `js/tests-engine.js` | Crear | Motor del quiz, cálculos, localStorage, hash URL, radar, descarga PNG |
| `tests/test-runner.html` | Crear | Test runner HTML para verificar funciones puras del motor |
| `css/styles.css` | Modificar | Estilos para quiz, radar, chips, modal de área, sección combinada |
| `tests/index.html` | Crear | Landing: tarjetas, mini-radares, sección combinada |
| `tests/intereses.html` | Crear | Test de intereses: quiz + resultados inline |
| `tests/habilidades.html` | Crear | Test de habilidades: quiz + resultados inline |
| `index.html` | Modificar | Agregar sección CTA y enlace en header |
| `carreras/*.html` (12) | Modificar | Agregar enlace "Habilidades e Intereses" en el header |

---

## Task 1: Descargar Chart.js y crear estructura de directorios

**Files:**
- Create: `js/vendor/chart.min.js`
- Create: directorio `tests/`

- [ ] **Step 1: Crear directorios**

```bash
mkdir -p js/vendor tests
```

- [ ] **Step 2: Descargar Chart.js 4.4 minificado**

```bash
curl -L -o js/vendor/chart.min.js "https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js"
```

Verificar: `ls -lh js/vendor/chart.min.js` — debe mostrar un archivo de ~200KB.

- [ ] **Step 3: Verificar que Chart.js funciona localmente**

Crear archivo de prueba dentro del proyecto (necesita correr bajo el mismo servidor para que los paths relativos resuelvan):

```bash
cat > test-chart-verify.html << 'EOF'
<!DOCTYPE html><html><body>
<canvas id="c" width="300" height="300"></canvas>
<script src="js/vendor/chart.min.js"></script>
<script>
  try {
    new Chart(document.getElementById('c').getContext('2d'), {
      type: 'radar',
      data: { labels: ['A','B','C','D','E'], datasets: [{ data: [1,2,3,4,5], backgroundColor:'rgba(26,35,126,0.3)', borderColor:'#1a237e' }] },
      options: { scales: { r: { min:0, max:5 } } }
    });
    document.body.insertAdjacentHTML('beforeend','<p style="color:green;font-size:20px">✅ Chart.js OK</p>');
  } catch(e) {
    document.body.insertAdjacentHTML('beforeend','<p style="color:red">❌ Error: '+e+'</p>');
  }
</script></body></html>
EOF
python3 -m http.server 8000
```

Abrir `http://localhost:8000/test-chart-verify.html`. Debe mostrar "✅ Chart.js OK" y un radar.

```bash
rm test-chart-verify.html
```

- [ ] **Step 4: Commit**

```bash
git add js/vendor/chart.min.js
git commit -m "feat: agregar Chart.js 4.4 localmente en js/vendor/"
```

---

## Task 2: Generar tests-data.js con agente

**Files:**
- Create: `js/tests-data.js`

Este task genera los 76 ítems del quiz y los 12 perfiles de carrera leyendo los `.md` de las carreras.

- [ ] **Step 1: Despachar agente de generación de contenido**

Despachar un agente general con este prompt (proporcionar la raíz del proyecto como working directory):

```
Leé los siguientes archivos de descripción de carreras del CTP Pococí y generá el archivo js/tests-data.js.

Archivos a leer:
- documentacion/carreras/agroecologia/descripcion.md
- documentacion/carreras/alimentos-bebidas/descripcion.md
- documentacion/carreras/banca-finanzas/descripcion.md
- documentacion/carreras/configuracion-soporte/descripcion.md
- documentacion/carreras/contabilidad-finanzas/descripcion.md
- documentacion/carreras/diseno-publicitario/descripcion.md
- documentacion/carreras/gerencia-produccion-cocina/descripcion.md
- documentacion/carreras/mecanica-general/descripcion.md
- documentacion/carreras/procesos-productivos-inspeccion/descripcion.md
- documentacion/carreras/produccion-agricola-pecuaria/descripcion.md
- documentacion/carreras/salud-ocupacional/descripcion.md
- documentacion/carreras/secretariado-ejecutivo/descripcion.md

Genera js/tests-data.js con exactamente esta estructura (variables globales, no módulos):

const AREAS = [
  { id: "agro-naturaleza",  nombre: "Agro / Naturaleza",         descripcion: "..." },
  { id: "agroindustria",    nombre: "Agroindustria / Calidad",    descripcion: "..." },
  { id: "gastronomia",      nombre: "Gastronomía / Servicios",    descripcion: "..." },
  { id: "finanzas",         nombre: "Finanzas",                   descripcion: "..." },
  { id: "administracion",   nombre: "Administración / Oficina",   descripcion: "..." },
  { id: "tecnologia",       nombre: "Tecnología / Informática",   descripcion: "..." },
  { id: "diseno",           nombre: "Diseño / Comunicación",      descripcion: "..." },
  { id: "salud-seguridad",  nombre: "Salud / Seguridad",          descripcion: "..." },
  { id: "mecanica",         nombre: "Mecánica / Técnico",         descripcion: "..." },
];

PREGUNTAS_INTERESES: 40 ítems.
Distribución: 5 ítems para agro-naturaleza, gastronomia, finanzas, tecnologia; 4 ítems para el resto.
Formato: { id: "i01", area: "agro-naturaleza", texto: "..." }
Reglas:
- Actividades concretas en tuteo informal (vos): "Sembrar y cuidar plantas...", "Preparar un platillo..."
- Sin mencionar nombres de carreras ni áreas
- Variadas: no repetir el mismo tipo de actividad

PREGUNTAS_HABILIDADES: 36 ítems, exactamente 4 por área.
Formato: { id: "h01", area: "agro-naturaleza", texto: "..." }
Reglas:
- Afirmaciones en primera persona: "Puedo identificar...", "Sé cómo..."
- Habilidades situacionales y observables, no rasgos abstractos
- Basadas en las secciones "Habilidades Requeridas" de los .md de las carreras de esa área

CARRERAS: 12 carreras.
Formato:
{
  id: "agroecologia",
  nombre: "Agroecología",
  emoji: "🌿",
  perfil: { "agro-naturaleza": 5, "agroindustria": 2, "gastronomia": 0, "finanzas": 1, "administracion": 1, "tecnologia": 2, "diseno": 0, "salud-seguridad": 2, "mecanica": 1 },
  descripcion_match: "2-3 oraciones explicando por qué la carrera se relaciona con sus áreas de mayor puntaje."
}
Escala de perfil: 0=no relevante, 5=central para la carrera. Basarse en "Habilidades Requeridas" de cada .md.
IDs de carreras: agroecologia, alimentos-bebidas, banca-finanzas, configuracion-soporte, contabilidad-finanzas, diseno-publicitario, gerencia-produccion-cocina, mecanica-general, procesos-productivos-inspeccion, produccion-agricola-pecuaria, salud-ocupacional, secretariado-ejecutivo.
Emojis: 🌿 🍽️ 🏦 💻 📊 🎨 👨‍🍳 🔧 🏭 🌾 🦺 📋

Escribí el archivo js/tests-data.js directamente.
```

- [ ] **Step 2: Validar el contenido generado**

```bash
node -e "
const fs = require('fs');
eval(fs.readFileSync('js/tests-data.js', 'utf8'));

const errores = [];
if (AREAS.length !== 9) errores.push('AREAS: esperado 9, encontrado ' + AREAS.length);
if (PREGUNTAS_INTERESES.length !== 40) errores.push('PREGUNTAS_INTERESES: esperado 40, encontrado ' + PREGUNTAS_INTERESES.length);
if (PREGUNTAS_HABILIDADES.length !== 36) errores.push('PREGUNTAS_HABILIDADES: esperado 36, encontrado ' + PREGUNTAS_HABILIDADES.length);
if (CARRERAS.length !== 12) errores.push('CARRERAS: esperado 12, encontrado ' + CARRERAS.length);

const areaIds = new Set(AREAS.map(a => a.id));
const idsInvalidosI = [...new Set(PREGUNTAS_INTERESES.map(p => p.area))].filter(id => !areaIds.has(id));
const idsInvalidosH = [...new Set(PREGUNTAS_HABILIDADES.map(p => p.area))].filter(id => !areaIds.has(id));
if (idsInvalidosI.length) errores.push('IDs de área inválidos en intereses: ' + idsInvalidosI);
if (idsInvalidosH.length) errores.push('IDs de área inválidos en habilidades: ' + idsInvalidosH);

AREAS.forEach(a => {
  const cI = PREGUNTAS_INTERESES.filter(p => p.area === a.id).length;
  const cH = PREGUNTAS_HABILIDADES.filter(p => p.area === a.id).length;
  if (cH !== 4) errores.push('Habilidades ' + a.id + ': esperado 4, encontrado ' + cH);
  if (cI < 4 || cI > 5) errores.push('Intereses ' + a.id + ': esperado 4-5, encontrado ' + cI);
});

CARRERAS.forEach(c => {
  const missingAreas = AREAS.filter(a => !(a.id in c.perfil));
  if (missingAreas.length) errores.push('Carrera ' + c.id + ' le faltan áreas: ' + missingAreas.map(a=>a.id));
});

if (errores.length === 0) {
  console.log('✅ tests-data.js válido');
} else {
  errores.forEach(e => console.error('❌', e));
  process.exit(1);
}
"
```

Si hay errores, corregir el archivo antes de continuar.

- [ ] **Step 3: Commit**

```bash
git add js/tests-data.js
git commit -m "feat: agregar datos del quiz (76 preguntas, 9 áreas, 12 perfiles de carreras)"
```

---

## Task 3: Funciones puras del motor + test runner

**Files:**
- Create: `js/tests-engine.js`
- Create: `tests/test-runner.html`

- [ ] **Step 1: Crear test-runner.html con tests que inicialmente fallan**

`tests/test-runner.html`:
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Test Runner — tests-engine.js</title>
  <style>
    body { font-family: monospace; padding: 16px; background: #f9f9f9; }
    .pass { color: green; margin: 2px 0; }
    .fail { color: red; font-weight: bold; margin: 2px 0; }
    h2 { margin-top: 20px; font-size: 1rem; border-bottom: 1px solid #ddd; padding-bottom: 4px; }
    #resumen { margin-top: 24px; font-size: 1.2rem; font-weight: bold; }
  </style>
</head>
<body>
<h1>Test Runner — tests-engine.js</h1>
<script src="../js/tests-data.js"></script>
<script src="../js/tests-engine.js"></script>
<script>
let pasados = 0, fallados = 0;
function assert(cond, msg) {
  const p = document.createElement('p');
  p.className = cond ? 'pass' : 'fail';
  p.textContent = (cond ? '✅ ' : '❌ ') + msg;
  document.body.appendChild(p);
  cond ? pasados++ : fallados++;
}

// ── shuffle() ──────────────────────────────────────────────────────
document.body.insertAdjacentHTML('beforeend', '<h2>shuffle()</h2>');
const arr = [1,2,3,4,5,6,7,8,9,10];
const s1 = shuffle([...arr]);
assert(s1.length === arr.length, 'mantiene la longitud');
assert([...s1].sort((a,b)=>a-b).join(',') === arr.join(','), 'preserva todos los elementos');
let diferente = false;
for (let i = 0; i < 5; i++) { if (JSON.stringify(shuffle([...arr])) !== JSON.stringify(arr)) { diferente = true; break; } }
assert(diferente, 'produce un orden diferente al original (en al menos 1 de 5 intentos)');

// ── calcularResultado() — intereses ────────────────────────────────
document.body.insertAdjacentHTML('beforeend', '<h2>calcularResultado() — intereses (Likert 1-5)</h2>');
const respI = {};
PREGUNTAS_INTERESES.forEach(p => { respI[p.id] = p.area === 'tecnologia' ? 5 : 1; });
const resI = calcularResultado(respI, 'intereses');
assert(typeof resI === 'object', 'retorna un objeto');
assert(AREAS.every(a => typeof resI[a.id] === 'number'), 'tiene un score numérico por cada área');
assert(resI['tecnologia'] === 5, 'área con todos 5 → score 5');
assert(resI['mecanica'] === 1, 'área con todos 1 → score 1');
assert(Object.values(resI).every(v => v >= 0 && v <= 5), 'todos los scores en rango 0-5');

// ── calcularResultado() — habilidades (escala 1-4 normaliza a 0-5) ─
document.body.insertAdjacentHTML('beforeend', '<h2>calcularResultado() — habilidades (escala 1-4 → 0-5)</h2>');
const respH = {};
PREGUNTAS_HABILIDADES.forEach(p => { respH[p.id] = p.area === 'mecanica' ? 4 : 1; });
const resH = calcularResultado(respH, 'habilidades');
assert(resH['mecanica'] === 5, 'valor máximo (4) normaliza a 5.0');
assert(Math.abs(resH['finanzas'] - 1.25) < 0.05, 'valor mínimo (1) normaliza a 1.25');
assert(Object.values(resH).every(v => v >= 0 && v <= 5), 'todos en rango 0-5 tras normalización');

// ── generarHashURL() / leerHashURL() ──────────────────────────────
document.body.insertAdjacentHTML('beforeend', '<h2>generarHashURL() / leerHashURL()</h2>');
const scoresTest = {};
AREAS.forEach((a, i) => { scoresTest[a.id] = parseFloat((i * 0.5).toFixed(1)); });
const hash = generarHashURL(scoresTest);
assert(hash.startsWith('#r='), 'hash empieza con #r=');
assert(hash.split('-').length === AREAS.length, 'hash tiene exactamente 9 valores');

const hashOriginal = window.location.hash;
window.location.hash = hash;
const leido = leerHashURL();
window.location.hash = hashOriginal;
assert(leido !== null, 'hash válido retorna objeto (no null)');
assert(leido && AREAS.every(a => typeof leido[a.id] === 'number'), 'objeto tiene score por cada área');
assert(leido && Math.abs(leido['finanzas'] - scoresTest['finanzas']) < 0.05, 'valor de finanzas se preserva');

window.location.hash = '#r=invalido-abc';
assert(leerHashURL() === null, 'hash con texto inválido retorna null');
window.location.hash = '#r=1.0-2.0';
assert(leerHashURL() === null, 'hash con menos de 9 valores retorna null');
window.location.hash = hashOriginal;

// ── guardarResultado() / cargarResultado() ─────────────────────────
document.body.insertAdjacentHTML('beforeend', '<h2>guardarResultado() / cargarResultado()</h2>');
guardarResultado('intereses', scoresTest);
const cargado = cargarResultado('intereses');
assert(cargado !== null, 'carga resultado recién guardado');
assert(cargado && typeof cargado.scores === 'object', 'tiene propiedad scores');
assert(cargado && typeof cargado.fecha === 'string' && cargado.fecha.length === 10, 'tiene fecha con formato YYYY-MM-DD');
assert(cargado && AREAS.every(a => cargado.scores[a.id] === scoresTest[a.id]), 'scores coinciden exactamente');
localStorage.removeItem('ctp_intereses_resultado');

localStorage.setItem('ctp_intereses_resultado', 'NO_ES_JSON{{{');
assert(cargarResultado('intereses') === null, 'JSON corrupto retorna null sin crash');
localStorage.removeItem('ctp_intereses_resultado');

assert(cargarResultado('intereses') === null, 'clave ausente retorna null sin crash');

// ── calcularCompatibilidad() ──────────────────────────────────────
document.body.insertAdjacentHTML('beforeend', '<h2>calcularCompatibilidad()</h2>');
const perfecto = {}, opuesto = {};
AREAS.forEach(a => { perfecto[a.id] = 5; opuesto[a.id] = 0; });
assert(calcularCompatibilidad(perfecto, perfecto) === 100, 'perfil idéntico → 100%');
const compOpuesto = calcularCompatibilidad(perfecto, opuesto);
assert(compOpuesto >= 0 && compOpuesto < 30, 'perfiles opuestos → baja compatibilidad');
assert(calcularCompatibilidad(opuesto, opuesto) === 100, 'ambos en cero → 100% (idénticos)');

// ── Resumen ───────────────────────────────────────────────────────
const color = fallados === 0 ? 'green' : 'red';
document.body.insertAdjacentHTML('beforeend',
  `<p id="resumen" style="color:${color}">Resultado: ${pasados} ✅ pasados, ${fallados} ❌ fallados</p>`
);
</script>
</body>
</html>
```

- [ ] **Step 2: Abrir test-runner y verificar que todos fallan (funciones no existen aún)**

```bash
python3 -m http.server 8000
# Abrir: http://localhost:8000/tests/test-runner.html
```

Deben aparecer ❌ en todos los tests. Eso confirma que el test runner funciona correctamente antes de implementar.

- [ ] **Step 3: Crear js/tests-engine.js con las funciones puras**

`js/tests-engine.js`:
```javascript
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
    if (!data || typeof data.scores !== 'object' || !data.fecha) return null;
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
```

- [ ] **Step 4: Recargar test-runner y verificar que todos los tests pasan**

```bash
# http://localhost:8000/tests/test-runner.html
```

Todos los ítems deben mostrar ✅ y el resumen mostrar "0 fallados". Si alguno falla, corregir la función antes de continuar.

- [ ] **Step 5: Commit**

```bash
git add js/tests-engine.js tests/test-runner.html
git commit -m "feat: implementar funciones puras del motor (shuffle, calcular, hash, localStorage, radar)"
```

---

## Task 4: UI del quiz — iniciarTest, renderPregunta, mostrarResultados

**Files:**
- Modify: `js/tests-engine.js`

- [ ] **Step 1: Agregar funciones de UI al final de js/tests-engine.js**

```javascript
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
```

- [ ] **Step 2: Verificar el test-runner sigue en verde**

```bash
# http://localhost:8000/tests/test-runner.html
```

Los tests de funciones puras deben seguir pasando (sin regresiones).

- [ ] **Step 3: Commit**

```bash
git add js/tests-engine.js
git commit -m "feat: agregar UI del quiz al motor (iniciarTest, renderPregunta, mostrarResultados, modal)"
```

---

## Task 5: Estilos CSS para los tests

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Agregar los estilos al final de css/styles.css**

```css
/* ── BOTONES GENERALES ──────────────────────────────────────────── */
.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
}

.btn-primary {
  background: var(--blue);
  color: white;
}

.btn-primary:hover {
  background: #283593;
}

/* ── TESTS — ESTRUCTURA DE PÁGINA ──────────────────────────────── */
.test-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
}

.test-inicio {
  text-align: center;
  padding: 32px 16px;
}

.test-inicio h1 {
  color: var(--blue);
  font-size: 1.4rem;
  margin-bottom: 12px;
}

.test-inicio p {
  color: #555;
  margin-bottom: 14px;
  line-height: 1.6;
}

/* ── BARRA DE PROGRESO ──────────────────────────────────────────── */
.progreso {
  margin-bottom: 20px;
}

.progreso-barra-cont {
  background: #e0e0e0;
  border-radius: 4px;
  height: 6px;
  margin-bottom: 6px;
  overflow: hidden;
}

.progreso-barra {
  background: var(--blue);
  height: 100%;
  width: 0%;
  transition: width 0.3s ease;
  border-radius: 4px;
}

.progreso-texto {
  font-size: 12px;
  color: #888;
  text-align: right;
  display: block;
}

/* ── PREGUNTA ───────────────────────────────────────────────────── */
.pregunta-texto {
  font-size: 1.1rem;
  font-weight: 600;
  color: #222;
  line-height: 1.5;
  margin-bottom: 24px;
  min-height: 60px;
}

/* ── ESCALA DE BOTONES ──────────────────────────────────────────── */
.escala-botones {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.escala-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  min-height: 48px;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  text-align: left;
  transition: border-color 0.15s, background 0.15s;
  width: 100%;
}

.escala-btn:hover, .escala-btn:focus {
  border-color: var(--blue);
  background: #f0f4ff;
  outline: none;
}

.escala-btn--activo {
  border-color: var(--blue);
  background: #e8ecff;
  font-weight: 600;
}

.escala-emoji {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.escala-texto {
  flex: 1;
}

/* ── BOTÓN ATRÁS ────────────────────────────────────────────────── */
.btn-atras {
  background: none;
  border: none;
  color: var(--blue);
  font-size: 0.9rem;
  cursor: pointer;
  padding: 8px 0;
}

.btn-atras:disabled {
  color: #bbb;
  cursor: not-allowed;
}

/* ── RESULTADOS ─────────────────────────────────────────────────── */
.resultados-titulo {
  color: var(--blue);
  font-size: 1.3rem;
  margin-bottom: 8px;
}

.radar-cont {
  position: relative;
  max-width: 380px;
  margin: 0 auto 24px;
}

.radar-leyenda {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 12px;
  font-size: 13px;
}

.radar-leyenda span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.leyenda-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
}

.leyenda-dot--usuario { background: #1a237e; }
.leyenda-dot--carrera { background: #d4a017; }

/* ── CHIPS ──────────────────────────────────────────────────────── */
.chips-cont {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.chip {
  padding: 6px 12px;
  border-radius: 20px;
  border: 1.5px solid #ddd;
  background: white;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.15s, border-color 0.15s;
  text-decoration: none;
  color: inherit;
  display: inline-block;
}

.chip--area {
  border-color: var(--blue);
  color: var(--blue);
}

.chip--area:hover {
  background: #e8ecff;
}

.chip--carrera:hover {
  border-color: var(--yellow);
  background: #fff9e6;
}

.chip--activo {
  background: var(--yellow);
  border-color: var(--yellow);
  color: #222;
  font-weight: 600;
}

/* ── DESCRIPCIÓN DE MATCH ───────────────────────────────────────── */
.descripcion-match {
  background: #fffbf0;
  border-left: 3px solid var(--yellow);
  padding: 12px 14px;
  border-radius: 0 8px 8px 0;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #444;
}

/* ── BOTONES DE ACCIÓN (resultados) ─────────────────────────────── */
.acciones {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.btn-accion {
  flex: 1;
  min-width: 120px;
  padding: 12px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
}

.btn-accion--primario {
  background: var(--blue);
  color: white;
}

.btn-accion--secundario {
  background: white;
  color: var(--blue);
  border: 2px solid var(--blue);
}

/* ── MODAL DE ÁREA ──────────────────────────────────────────────── */
.modal-area {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: flex-end;
  z-index: 200;
}

.modal-area[hidden] {
  display: none;
}

.modal-area__contenido {
  background: white;
  width: 100%;
  padding: 24px 20px 40px;
  border-radius: 16px 16px 0 0;
  position: relative;
}

.modal-area__cerrar {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #888;
  padding: 4px 8px;
}

.modal-area__contenido h3 {
  color: var(--blue);
  margin-bottom: 8px;
  font-size: 1.1rem;
  padding-right: 32px;
}

.modal-area__contenido p {
  color: #555;
  line-height: 1.6;
}

/* ── LANDING tests/index.html ───────────────────────────────────── */
.tests-hero {
  background: var(--blue);
  border-bottom: 3px solid var(--yellow);
  color: white;
  padding: 32px 16px 24px;
  text-align: center;
}

.tests-hero h1 {
  font-size: 1.5rem;
  margin-bottom: 8px;
}

.tests-hero p {
  opacity: 0.85;
  font-size: 0.95rem;
}

.tests-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 16px;
  max-width: 640px;
  margin: 0 auto;
}

.test-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: var(--shadow);
  border-top: 4px solid var(--blue);
}

.test-card h2 {
  color: var(--blue);
  font-size: 1.15rem;
  margin-bottom: 8px;
}

.test-card p {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 12px;
  line-height: 1.5;
}

.test-fecha {
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 8px;
}

.test-card-btns {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
}

/* ── SECCIÓN COMBINADA ──────────────────────────────────────────── */
.combinado-section {
  background: white;
  border-radius: 12px;
  padding: 24px 20px;
  box-shadow: var(--shadow);
  max-width: 640px;
  margin: 0 16px 24px;
  border-top: 4px solid var(--yellow);
}

.combinado-section h2 {
  color: var(--blue);
  font-size: 1.2rem;
  margin-bottom: 16px;
  text-align: center;
}

/* ── RANKING DE CARRERAS ────────────────────────────────────────── */
.ranking {
  list-style: none;
  margin-top: 20px;
}

.ranking-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.ranking-nombre {
  min-width: 150px;
  font-size: 0.9rem;
}

.ranking-barra-cont {
  flex: 1;
  background: #eee;
  border-radius: 4px;
  height: 10px;
  overflow: hidden;
}

.ranking-barra {
  background: var(--yellow);
  height: 100%;
  border-radius: 4px;
  transition: width 0.6s ease;
}

.ranking-pct {
  font-size: 0.85rem;
  color: #555;
  min-width: 36px;
  text-align: right;
}

/* ── CTA EN HOMEPAGE ────────────────────────────────────────────── */
.cta-tests {
  background: var(--blue);
  color: white;
  padding: 28px 16px;
  text-align: center;
}

.cta-tests h2 {
  font-size: 1.2rem;
  margin-bottom: 8px;
}

.cta-tests p {
  opacity: 0.85;
  font-size: 0.9rem;
  margin-bottom: 16px;
}

.cta-tests a {
  display: inline-block;
  background: var(--yellow);
  color: #222;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 700;
  text-decoration: none;
  font-size: 0.95rem;
}

/* ── ENLACE HEADER ──────────────────────────────────────────────── */
.nav-link-tests {
  color: var(--yellow);
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
}

.nav-link-tests:hover {
  color: white;
}

@media (min-width: 500px) {
  .tests-cards {
    flex-direction: row;
    align-items: flex-start;
  }
  .test-card {
    flex: 1;
  }
  .combinado-section {
    margin: 0 auto 24px;
  }
}
```

- [ ] **Step 2: Verificar en el navegador que el sitio existente no se rompe**

Abrir `http://localhost:8000/index.html` y `http://localhost:8000/carreras/agroecologia.html`. Ambas páginas deben verse igual que antes (los estilos nuevos usan clases que aún no están en el HTML existente).

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "feat: agregar estilos para tests, radar, chips, modal y landing"
```

---

## Task 6: tests/intereses.html

**Files:**
- Create: `tests/intereses.html`

- [ ] **Step 1: Crear la página**

`tests/intereses.html`:
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Test de Intereses — Identificá tus intereses y descubrí qué carreras técnicas del CTP Pococí se alinean con vos.">
  <title>Test de Intereses — CTP Pococí</title>
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>

  <header class="site-header">
    <div class="logo-area">
      <img src="../logo.jpeg" alt="Logo CTP Pococí" width="36" height="36">
      <div class="site-name">
        CTP Pococí
        <span>Ciencia · Virtud · Trabajo</span>
      </div>
    </div>
    <nav style="display:flex;gap:12px;align-items:center">
      <a href="index.html" class="nav-link-tests">← Tests</a>
      <a href="../index.html" class="back-link">Inicio</a>
    </nav>
  </header>

  <main class="test-page">

    <section id="pantalla-inicio" class="test-inicio">
      <h1>🎯 Test de Intereses</h1>
      <p>Vas a ver 40 actividades. Indicá qué tanto te gustaría hacerlas.</p>
      <p>No hay respuestas correctas ni incorrectas — solo contá lo que realmente sentís.</p>
      <p><em>Tiempo estimado: ~8 minutos.</em></p>
      <button class="btn btn-primary" onclick="comenzarTest()">Comenzar →</button>
    </section>

    <section id="pantalla-pregunta" hidden>
      <div class="progreso">
        <div class="progreso-barra-cont">
          <div class="progreso-barra" id="progreso-barra"></div>
        </div>
        <span class="progreso-texto" id="progreso-texto">Pregunta 1 de 40</span>
      </div>
      <p class="pregunta-texto" id="pregunta-texto"></p>
      <div class="escala-botones" id="escala-botones"></div>
      <button class="btn-atras" id="btn-atras" onclick="irAtras()">← Atrás</button>
    </section>

    <section id="pantalla-resultados" hidden>
      <h2 class="resultados-titulo">Tus resultados</h2>
      <p style="color:#666;font-size:.9rem;margin-bottom:16px">
        Este radar muestra qué áreas te interesan más. Seleccioná una carrera para ver cómo se compara con tu perfil.
      </p>

      <div class="radar-leyenda">
        <span><span class="leyenda-dot leyenda-dot--usuario"></span>Tu perfil</span>
        <span><span class="leyenda-dot leyenda-dot--carrera"></span>Carrera seleccionada</span>
      </div>

      <div class="radar-cont">
        <canvas id="radar-canvas" aria-label="Gráfico de radar de resultados"></canvas>
      </div>

      <p style="font-size:.8rem;color:#888;margin-bottom:6px">Tocá un área para ver su descripción:</p>
      <div class="chips-cont" id="chips-area"></div>

      <p style="font-size:.8rem;color:#888;margin-bottom:6px;margin-top:16px">Comparar con una carrera:</p>
      <div class="chips-cont" id="chips-carrera"></div>

      <p class="descripcion-match" id="descripcion-match" hidden></p>

      <div class="acciones">
        <button class="btn-accion btn-accion--primario" onclick="descargarRadar('radar-canvas','intereses')">⬇ Descargar imagen</button>
        <button class="btn-accion btn-accion--secundario" onclick="_compartir()">🔗 Compartir resultado</button>
        <button class="btn-accion btn-accion--secundario" onclick="location.href=location.pathname">↺ Repetir test</button>
      </div>
    </section>

  </main>

  <script src="../js/vendor/chart.min.js"></script>
  <script src="../js/tests-data.js"></script>
  <script src="../js/tests-engine.js"></script>
  <script>
    function _compartir() {
      const url = location.origin + location.pathname + location.hash;
      if (navigator.share) {
        navigator.share({ title: 'Mis resultados del Test de Intereses — CTP Pococí', url });
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => alert('Enlace copiado al portapapeles ✓'));
      }
    }
    document.addEventListener('DOMContentLoaded', () => iniciarTest(PREGUNTAS_INTERESES, 'intereses'));
  </script>

</body>
</html>
```

- [ ] **Step 2: Verificar el flujo completo en el navegador**

```bash
# http://localhost:8000/tests/intereses.html
```

Verificar en orden:
1. Pantalla de inicio visible con título "Test de Intereses" ✓
2. Clic "Comenzar" → aparece pregunta 1 de 40 con 5 botones con emoji ✓
3. Seleccionar respuesta → avance automático a la siguiente pregunta ✓
4. Clic "Atrás" → vuelve con la respuesta anterior marcada ✓
5. El botón "Atrás" en la pregunta 1 aparece deshabilitado ✓
6. Responder todas las preguntas → aparece pantalla de resultados con radar ✓
7. Tocar chip de área → modal con descripción aparece y se puede cerrar tocando fuera o el ✕ ✓
8. Tocar chip de carrera → perfil amarillo superpuesto en radar + texto de match ✓
9. Tocar la misma carrera → perfil amarillo desaparece ✓
10. Clic "Descargar imagen" → descarga PNG ✓
11. Clic "Compartir resultado" → URL copiada con hash ✓
12. Pegar la URL en nueva pestaña → muestra resultados directamente sin quiz ✓

- [ ] **Step 3: Commit**

```bash
git add tests/intereses.html
git commit -m "feat: agregar página del test de intereses"
```

---

## Task 7: tests/habilidades.html

**Files:**
- Create: `tests/habilidades.html`

- [ ] **Step 1: Crear la página**

`tests/habilidades.html` es idéntica a `tests/intereses.html` con estos cambios:

| Elemento | Valor en habilidades.html |
|---------|--------------------------|
| `<title>` | `Test de Habilidades — CTP Pococí` |
| `<meta description>` | `Test de Habilidades — Evaluá tus habilidades y descubrí qué carreras técnicas del CTP Pococí las requieren.` |
| `<h1>` | `💪 Test de Habilidades` |
| Instrucción línea 1 | `Vas a ver 36 habilidades. Indicá qué tan bien las manejás.` |
| Instrucción línea 2 | `Sé honesto/a — esto es para ayudarte a conocerte mejor.` |
| Tiempo estimado | `~9 minutos` |
| Progreso inicial | `Pregunta 1 de 36` (se actualiza dinámicamente) |
| `onclick` en DOMContentLoaded | `iniciarTest(PREGUNTAS_HABILIDADES, 'habilidades')` |
| `descargarRadar` | `descargarRadar('radar-canvas','habilidades')` |
| Título en `_compartir` | `Mis resultados del Test de Habilidades — CTP Pococí` |

Todo lo demás (estructura HTML, IDs, scripts) es idéntico.

- [ ] **Step 2: Verificar en el navegador**

```bash
# http://localhost:8000/tests/habilidades.html
```

Mismo checklist que intereses.html, con estas diferencias:
- La escala tiene 4 botones sin emoji ("No lo sé hacer" → "Lo hago muy bien") ✓
- El test tiene 36 preguntas ✓

- [ ] **Step 3: Commit**

```bash
git add tests/habilidades.html
git commit -m "feat: agregar página del test de habilidades"
```

---

## Task 8: tests/index.html (landing)

**Files:**
- Create: `tests/index.html`

- [ ] **Step 1: Crear la landing**

`tests/index.html`:
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Descubrí tus habilidades e intereses y encontrá la carrera técnica del CTP Pococí que va con vos.">
  <title>Habilidades e Intereses — CTP Pococí</title>
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>

  <header class="site-header">
    <div class="logo-area">
      <img src="../logo.jpeg" alt="Logo CTP Pococí" width="36" height="36">
      <div class="site-name">
        CTP Pococí
        <span>Ciencia · Virtud · Trabajo</span>
      </div>
    </div>
    <a href="../index.html" class="back-link">← Inicio</a>
  </header>

  <div class="tests-hero">
    <h1>Habilidades e Intereses</h1>
    <p>Dos tests para ayudarte a encontrar la carrera técnica que va con vos.</p>
  </div>

  <div class="tests-cards">

    <div class="test-card">
      <h2>🎯 Test de Intereses</h2>
      <p>Identificá qué actividades te gustan y descubrí qué carreras se alinean con tus intereses.</p>
      <p><em>~8 minutos · 40 preguntas</em></p>
      <div id="mini-intereses"></div>
      <div class="test-card-btns" id="btns-intereses"></div>
    </div>

    <div class="test-card">
      <h2>💪 Test de Habilidades</h2>
      <p>Evaluá tus habilidades y compará tu perfil con lo que cada carrera técnica requiere.</p>
      <p><em>~9 minutos · 36 preguntas</em></p>
      <div id="mini-habilidades"></div>
      <div class="test-card-btns" id="btns-habilidades"></div>
    </div>

  </div>

  <div class="combinado-section" id="combinado-section" hidden>
    <h2>Tu perfil vocacional completo</h2>
    <div class="radar-leyenda">
      <span><span class="leyenda-dot leyenda-dot--usuario"></span>Intereses</span>
      <span><span class="leyenda-dot leyenda-dot--carrera"></span>Habilidades</span>
    </div>
    <div class="radar-cont" style="max-width:340px">
      <canvas id="radar-combinado" aria-label="Gráfico de radar combinado de intereses y habilidades"></canvas>
    </div>
    <h3 style="margin-top:20px;font-size:1rem;color:#444">Top 3 carreras más compatibles</h3>
    <ul class="ranking" id="ranking-carreras"></ul>
    <a href="intereses.html" id="btn-explorar" class="btn btn-primary" style="display:inline-block;margin-top:16px">
      Explorar todas las carreras →
    </a>
  </div>

  <script src="../js/vendor/chart.min.js"></script>
  <script src="../js/tests-data.js"></script>
  <script src="../js/tests-engine.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const resI = cargarResultado('intereses');
      const resH = cargarResultado('habilidades');

      // Tarjeta de intereses
      const btnsI = document.getElementById('btns-intereses');
      if (resI) {
        document.getElementById('mini-intereses').innerHTML =
          `<p class="test-fecha">Realizado el ${resI.fecha}</p>` +
          `<canvas id="mini-radar-intereses" width="200" height="200" style="display:block;margin:0 auto 12px"></canvas>`;
        mostrarRadar('mini-radar-intereses', resI.scores);
        btnsI.innerHTML =
          `<a href="intereses.html${generarHashURL(resI.scores)}" class="chip chip--area">Ver resultado</a>` +
          `<a href="intereses.html" class="chip">Repetir</a>`;
      } else {
        btnsI.innerHTML = `<a href="intereses.html" class="btn btn-primary">Comenzar →</a>`;
      }

      // Tarjeta de habilidades
      const btnsH = document.getElementById('btns-habilidades');
      if (resH) {
        document.getElementById('mini-habilidades').innerHTML =
          `<p class="test-fecha">Realizado el ${resH.fecha}</p>` +
          `<canvas id="mini-radar-habilidades" width="200" height="200" style="display:block;margin:0 auto 12px"></canvas>`;
        mostrarRadar('mini-radar-habilidades', resH.scores);
        btnsH.innerHTML =
          `<a href="habilidades.html${generarHashURL(resH.scores)}" class="chip chip--area">Ver resultado</a>` +
          `<a href="habilidades.html" class="chip">Repetir</a>`;
      } else {
        btnsH.innerHTML = `<a href="habilidades.html" class="btn btn-primary">Comenzar →</a>`;
      }

      // Sección combinada
      if (resI && resH) {
        const seccion = document.getElementById('combinado-section');
        seccion.hidden = false;

        mostrarRadar('radar-combinado', resI.scores, resH.scores, 'Intereses', 'Habilidades');

        const ranking = CARRERAS
          .map(c => ({ carrera: c, compat: calcularCompatibilidadCombinada(resI.scores, resH.scores, c.perfil) }))
          .sort((a, b) => b.compat - a.compat)
          .slice(0, 3);

        const ul = document.getElementById('ranking-carreras');
        ranking.forEach(({ carrera, compat }) => {
          const li = document.createElement('li');
          li.className = 'ranking-item';
          li.innerHTML =
            `<span class="ranking-nombre">${carrera.emoji} ${carrera.nombre}</span>` +
            `<div class="ranking-barra-cont"><div class="ranking-barra" style="width:${compat}%"></div></div>` +
            `<span class="ranking-pct">${compat}%</span>`;
          ul.appendChild(li);
        });

        document.getElementById('btn-explorar').href = `intereses.html${generarHashURL(resI.scores)}`;
      }
    });
  </script>

</body>
</html>
```

- [ ] **Step 2: Verificar en el navegador**

```bash
# http://localhost:8000/tests/index.html
```

Escenarios a verificar:
1. Sin resultados: dos tarjetas con botón "Comenzar →" en cada una ✓
2. Solo test de intereses hecho: tarjeta de intereses muestra mini-radar y fecha; tarjeta de habilidades sigue con "Comenzar →"; no aparece sección combinada ✓
3. Ambos tests hechos: ambas tarjetas muestran mini-radar; aparece sección combinada con radar doble y ranking top 3 ✓

- [ ] **Step 3: Commit**

```bash
git add tests/index.html
git commit -m "feat: agregar landing de tests con mini-radares y sección combinada"
```

---

## Task 9: Integración en el sitio

**Files:**
- Modify: `index.html`
- Modify: `carreras/agroecologia.html`, `carreras/alimentos-bebidas.html`, `carreras/banca-finanzas.html`, `carreras/configuracion-soporte.html`, `carreras/contabilidad-finanzas.html`, `carreras/diseno-publicitario.html`, `carreras/gerencia-produccion-cocina.html`, `carreras/mecanica-general.html`, `carreras/procesos-productivos-inspeccion.html`, `carreras/produccion-agricola-pecuaria.html`, `carreras/salud-ocupacional.html`, `carreras/secretariado-ejecutivo.html`

- [ ] **Step 1: Agregar nav en header de index.html**

Primero leer el header actual de `index.html` para ver su estructura exacta antes de editar. Luego agregar el enlace de navegación dentro del `<header class="site-header">`, después del cierre del `</div>` del `logo-area`:

```html
  <nav>
    <a href="tests/index.html" class="nav-link-tests">Habilidades e Intereses</a>
  </nav>
```

Si el header ya tiene un `<nav>` u otros elementos de navegación, agregar el enlace dentro del `<nav>` existente en lugar de crear uno nuevo.

- [ ] **Step 2: Agregar sección CTA en index.html**

Buscar en `index.html` el inicio de `<section class="careers-section">` e insertar antes de él:
```html
    <section class="cta-tests">
      <h2>¿No sabés qué carrera elegir?</h2>
      <p>Hacé los tests de habilidades e intereses para descubrir qué carreras van con vos.</p>
      <a href="tests/index.html">Ver Habilidades e Intereses →</a>
    </section>
```

- [ ] **Step 3: Actualizar header de las 12 páginas de carreras**

En cada archivo `carreras/*.html`, buscar el header actual:
```html
    <a href="../index.html" class="back-link">← Inicio</a>
```

Reemplazar por:
```html
    <nav style="display:flex;gap:12px;align-items:center">
      <a href="../tests/index.html" class="nav-link-tests">Habilidades e Intereses</a>
      <a href="../index.html" class="back-link">← Inicio</a>
    </nav>
```

Hacer esto en los 12 archivos: `agroecologia.html`, `alimentos-bebidas.html`, `banca-finanzas.html`, `configuracion-soporte.html`, `contabilidad-finanzas.html`, `diseno-publicitario.html`, `gerencia-produccion-cocina.html`, `mecanica-general.html`, `procesos-productivos-inspeccion.html`, `produccion-agricola-pecuaria.html`, `salud-ocupacional.html`, `secretariado-ejecutivo.html`.

- [ ] **Step 4: Verificar en el navegador**

```bash
# http://localhost:8000/index.html
```
- Header tiene enlace "Habilidades e Intereses" que lleva a `tests/index.html` ✓
- Sección CTA visible entre el hero y el listado de carreras ✓
- Clic en cualquier carrera → el header de esa página tiene el enlace "Habilidades e Intereses" ✓

- [ ] **Step 5: Commit**

```bash
git add index.html carreras/
git commit -m "feat: integrar enlace Habilidades e Intereses en header y sección CTA en homepage"
```

---

## Task 10: Verificación final end-to-end

- [ ] **Step 1: Test-runner pasa al 100%**

```bash
# http://localhost:8000/tests/test-runner.html
```
Todos los tests deben mostrar ✅. Si alguno falla, corregir antes de continuar.

- [ ] **Step 2: Flujo completo — Test de Intereses**

1. `index.html` → clic "Habilidades e Intereses" en el header → llega a `tests/index.html`
2. Clic "Comenzar →" en Test de Intereses → `tests/intereses.html` con pantalla de inicio
3. Clic "Comenzar" → pregunta 1/40 con 5 botones con emoji
4. Responder algunas preguntas → usar "Atrás" para corregir → la respuesta anterior aparece marcada
5. Completar todas las preguntas → pantalla de resultados con radar de 9 ejes
6. Tocar chip de área → modal con descripción, se cierra con ✕ y tocando fuera
7. Tocar chip de carrera → perfil amarillo superpuesto + texto de match debajo
8. Tocar la misma carrera → capa amarilla desaparece
9. Tocar otra carrera → se activa la nueva, se desactiva la anterior
10. Clic "Descargar imagen" → descarga `resultado-intereses.png`
11. Clic "Compartir resultado" → alerta de copiado o Web Share
12. Pegar la URL con hash en nueva pestaña → muestra resultados directamente

- [ ] **Step 3: Flujo completo — Test de Habilidades**

Mismo flujo con `tests/habilidades.html`. La escala tiene 4 botones sin emoji.

- [ ] **Step 4: Sección combinada en la landing**

Con ambos tests completados, abrir `tests/index.html`:
- Ambas tarjetas muestran mini-radar + fecha ✓
- Sección "Tu perfil vocacional completo" visible ✓
- Radar doble con dos capas (azul=intereses, amarillo=habilidades) ✓
- Ranking de las 3 carreras más compatibles con barras y porcentajes ✓

- [ ] **Step 5: Verificar degradación sin localStorage**

En DevTools → Application → Storage → Local Storage → botón "Clear all". Recargar `tests/index.html`.
- No debe haber errores en consola ✓
- Las tarjetas muestran "Comenzar →" sin crash ✓

- [ ] **Step 6: Verificar en mobile (DevTools responsive)**

Activar modo responsive en Chrome DevTools con ancho 390px (iPhone). Verificar:
- Los botones de la escala tienen altura ≥ 48px y son fáciles de tocar ✓
- El radar se ve completo sin desbordamiento ✓
- Los chips de área y carrera son tapeables ✓
- El modal de área aparece desde el borde inferior de la pantalla ✓

- [ ] **Step 7: Commit final**

```bash
git add .
git commit -m "feat: completar implementación de tests de habilidades e intereses

- Tests de intereses (40 ítems, Likert 5 puntos) y habilidades (36 ítems, escala 4 puntos)
- Gráfico de radar de 9 áreas con comparación de perfiles de carreras
- Persistencia en localStorage, compartir por URL hash, descarga de PNG
- Landing con mini-radares, sección combinada y ranking de compatibilidad
- Integración en header y homepage"
```
