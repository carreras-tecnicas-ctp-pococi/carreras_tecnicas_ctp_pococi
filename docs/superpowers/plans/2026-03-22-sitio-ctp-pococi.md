# Sitio Web CTP Pococí — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir un sitio web estático con una página principal que lista las 8 carreras técnicas del CTP Pococí y una página individual por carrera con URL compartible.

**Architecture:** HTML/CSS/JS puro sin dependencias externas. Un CSS compartido (`css/styles.css`), un JS mínimo (`js/main.js`) para el botón compartir, una página principal (`index.html`) y 8 páginas de carrera (`carreras/*.html`).

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox), JavaScript vanilla (Web Share API), sin frameworks ni herramientas de build.

---

## Mapa de archivos

| Archivo | Responsabilidad |
|---|---|
| `css/styles.css` | Todos los estilos compartidos: variables, header, footer, hero, cards, grilla |
| `js/main.js` | Función `compartir()` con Web Share API y fallback a clipboard |
| `index.html` | Página principal: hero + lista de 8 carreras |
| `carreras/agroecologia.html` | Página individual: Agroecología |
| `carreras/agroindustria.html` | Página individual: Agroindustria |
| `carreras/contabilidad-finanzas.html` | Página individual: Contabilidad y Finanzas |
| `carreras/diseno-publicitario.html` | Página individual: Diseño Publicitario |
| `carreras/informatica-redes.html` | Página individual: Informática en Redes |
| `carreras/produccion-agricola-pecuaria.html` | Página individual: Producción Agrícola Pecuaria |
| `carreras/salud-ocupacional.html` | Página individual: Salud Ocupacional |
| `carreras/secretariado-ejecutivo.html` | Página individual: Secretariado Ejecutivo |

---

## Task 1: CSS compartido

**Files:**
- Create: `css/styles.css`

- [ ] **Step 1: Crear el archivo CSS con todos los estilos**

```css
/* css/styles.css */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --blue: #1a237e;
  --yellow: #d4a017;
  --red: #c0392b;
  --bg: #f5f5f5;
  --white: #ffffff;
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.12);
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--bg);
  color: #333;
  line-height: 1.5;
  min-height: 100vh;
}

/* ── HEADER ── */
.site-header {
  background: var(--blue);
  border-bottom: 3px solid var(--yellow);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-area img {
  width: 36px;
  height: 36px;
  object-fit: contain;
  border-radius: 50%;
  background: white;
  padding: 2px;
  flex-shrink: 0;
}

.site-name {
  color: white;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.3;
}

.site-name span {
  display: block;
  color: var(--yellow);
  font-size: 10px;
  font-weight: 400;
}

.back-link {
  color: var(--yellow);
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
}

.back-link:hover {
  color: white;
}

/* ── FOOTER ── */
.site-footer {
  background: var(--blue);
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  padding: 24px 16px;
  font-size: 12px;
  line-height: 2;
  margin-top: 16px;
}

.site-footer strong {
  color: var(--yellow);
  font-size: 14px;
}

/* ── HERO PRINCIPAL (index) ── */
.hero-home {
  background: var(--blue);
  padding: 32px 16px 28px;
  color: white;
}

.hero-tag {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--yellow);
  font-weight: 600;
  margin-bottom: 10px;
}

.hero-home h1 {
  font-size: 24px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 12px;
}

.hero-home p {
  font-size: 14px;
  opacity: 0.85;
  line-height: 1.6;
}

/* ── LISTA DE CARRERAS (index) ── */
.careers-section {
  padding: 20px 16px;
}

.section-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #888;
  font-weight: 600;
  margin-bottom: 14px;
}

.career-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.career-item a {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--white);
  border-radius: 12px;
  padding: 14px;
  box-shadow: var(--shadow);
  text-decoration: none;
  color: inherit;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.career-item a:hover,
.career-item a:focus {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
  outline: none;
}

.career-emoji {
  font-size: 28px;
  width: 44px;
  text-align: center;
  flex-shrink: 0;
}

.career-text {
  flex: 1;
}

.career-text h2 {
  font-size: 14px;
  font-weight: 700;
  color: var(--blue);
  margin-bottom: 3px;
}

.career-text p {
  font-size: 12px;
  color: #777;
}

.career-arrow {
  background: var(--yellow);
  color: white;
  border-radius: 20px;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
  white-space: nowrap;
}

/* ── HERO CARRERA ── */
.hero-career {
  background: linear-gradient(160deg, var(--blue) 0%, var(--red) 100%);
  padding: 36px 16px 32px;
  color: white;
  text-align: center;
}

.career-big-icon {
  font-size: 56px;
  display: block;
  margin-bottom: 16px;
}

.hero-career h1 {
  font-size: 22px;
  font-weight: 800;
  line-height: 1.25;
  margin-bottom: 12px;
}

.hero-career p {
  font-size: 13px;
  opacity: 0.9;
  line-height: 1.7;
  max-width: 340px;
  margin: 0 auto;
}

/* ── GRILLA DE SECCIONES (carrera) ── */
.sections-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 16px;
}

.section-card {
  background: var(--white);
  border-radius: 12px;
  padding: 16px 12px;
  box-shadow: var(--shadow);
}

.sec-icon {
  font-size: 22px;
  display: block;
  margin-bottom: 8px;
}

.section-card h3 {
  font-size: 11px;
  font-weight: 700;
  color: var(--blue);
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-card ul {
  list-style: none;
}

.section-card li {
  font-size: 11px;
  color: #555;
  padding: 4px 0;
  line-height: 1.4;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  gap: 4px;
}

.section-card li:last-child {
  border-bottom: none;
}

.section-card li::before {
  content: "·";
  color: var(--yellow);
  font-weight: 700;
  flex-shrink: 0;
}

/* ── BOTÓN COMPARTIR ── */
.share-section {
  padding: 0 16px 28px;
}

.share-btn {
  width: 100%;
  background: var(--yellow);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 16px rgba(212, 160, 23, 0.35);
  transition: opacity 0.2s;
}

.share-btn:disabled {
  opacity: 0.7;
  cursor: default;
}

.share-msg {
  text-align: center;
  font-size: 13px;
  color: var(--blue);
  font-weight: 600;
  margin-top: 10px;
  min-height: 20px;
}
```

- [ ] **Step 2: Verificar que el archivo se creó correctamente**

```bash
grep -c "var(--blue)" css/styles.css
# Esperado: número mayor a 0

grep "grid-template-columns: 1fr 1fr" css/styles.css
# Esperado: línea encontrada (grilla 2 columnas)
```

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "feat: agregar CSS compartido del sitio CTP Pococí"
```

---

## Task 2: JavaScript — botón compartir

**Files:**
- Create: `js/main.js`

- [ ] **Step 1: Crear js/main.js**

```js
// js/main.js
function compartir() {
  var btn = document.getElementById('share-btn');
  var msg = document.getElementById('share-msg');

  if (navigator.share) {
    navigator.share({
      title: document.title,
      text: 'Mirá esta carrera técnica del CTP Pococí',
      url: window.location.href,
    }).catch(function () {
      // El usuario canceló — no hacer nada
    });
  } else {
    navigator.clipboard.writeText(window.location.href).then(function () {
      msg.textContent = '¡Enlace copiado!';
      btn.disabled = true;
      setTimeout(function () {
        msg.textContent = '';
        btn.disabled = false;
      }, 2000);
    }).catch(function () {
      msg.textContent = 'Copiá este enlace: ' + window.location.href;
    });
  }
}
```

- [ ] **Step 2: Verificar**

```bash
grep "navigator.share" js/main.js
# Esperado: línea encontrada

grep "navigator.clipboard" js/main.js
# Esperado: línea encontrada (fallback)
```

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: agregar funcionalidad de compartir carrera"
```

---

## Task 3: Página principal (index.html)

**Files:**
- Create: `index.html`

- [ ] **Step 1: Crear index.html**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Conocé las 8 carreras técnicas del CTP Pococí, Limón, Costa Rica. Formación técnica de calidad para tu futuro.">
  <title>CTP Pococí — Carreras Técnicas</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <header class="site-header">
    <div class="logo-area">
      <img src="logo.jpeg" alt="Logo CTP Pococí" width="36" height="36">
      <div class="site-name">
        CTP Pococí
        <span>Ciencia · Virtud · Trabajo</span>
      </div>
    </div>
  </header>

  <main>
    <section class="hero-home">
      <p class="hero-tag">Carreras Técnicas</p>
      <h1>Descubrí tu futuro en el CTP Pococí</h1>
      <p>Formación técnica de calidad en Pococí, Limón. Elegí la carrera que va con vos.</p>
    </section>

    <section class="careers-section">
      <p class="section-label">8 carreras disponibles</p>
      <ul class="career-list">

        <li class="career-item">
          <a href="carreras/agroecologia.html">
            <span class="career-emoji">🌿</span>
            <div class="career-text">
              <h2>Agroecología</h2>
              <p>Agricultura sostenible y conservación ambiental</p>
            </div>
            <span class="career-arrow">Ver →</span>
          </a>
        </li>

        <li class="career-item">
          <a href="carreras/agroindustria.html">
            <span class="career-emoji">🏭</span>
            <div class="career-text">
              <h2>Agroindustria</h2>
              <p>Procesos productivos e industria alimentaria</p>
            </div>
            <span class="career-arrow">Ver →</span>
          </a>
        </li>

        <li class="career-item">
          <a href="carreras/contabilidad-finanzas.html">
            <span class="career-emoji">💰</span>
            <div class="career-text">
              <h2>Contabilidad y Finanzas</h2>
              <p>Administración, finanzas y gestión empresarial</p>
            </div>
            <span class="career-arrow">Ver →</span>
          </a>
        </li>

        <li class="career-item">
          <a href="carreras/diseno-publicitario.html">
            <span class="career-emoji">🎨</span>
            <div class="career-text">
              <h2>Diseño Publicitario</h2>
              <p>Comunicación visual y diseño gráfico profesional</p>
            </div>
            <span class="career-arrow">Ver →</span>
          </a>
        </li>

        <li class="career-item">
          <a href="carreras/informatica-redes.html">
            <span class="career-emoji">💻</span>
            <div class="career-text">
              <h2>Informática en Redes</h2>
              <p>Redes, soporte técnico e infraestructura TI</p>
            </div>
            <span class="career-arrow">Ver →</span>
          </a>
        </li>

        <li class="career-item">
          <a href="carreras/produccion-agricola-pecuaria.html">
            <span class="career-emoji">🌾</span>
            <div class="career-text">
              <h2>Producción Agrícola Pecuaria</h2>
              <p>Agricultura de precisión y producción animal</p>
            </div>
            <span class="career-arrow">Ver →</span>
          </a>
        </li>

        <li class="career-item">
          <a href="carreras/salud-ocupacional.html">
            <span class="career-emoji">🦺</span>
            <div class="career-text">
              <h2>Salud Ocupacional</h2>
              <p>Seguridad y bienestar en el entorno laboral</p>
            </div>
            <span class="career-arrow">Ver →</span>
          </a>
        </li>

        <li class="career-item">
          <a href="carreras/secretariado-ejecutivo.html">
            <span class="career-emoji">📋</span>
            <div class="career-text">
              <h2>Secretariado Ejecutivo</h2>
              <p>Gestión administrativa y atención al cliente</p>
            </div>
            <span class="career-arrow">Ver →</span>
          </a>
        </li>

      </ul>
    </section>
  </main>

  <footer class="site-footer">
    <strong>CTP Pococí</strong><br>
    Limón, Costa Rica · Desde 1969<br>
    Ciencia · Virtud · Trabajo
  </footer>

</body>
</html>
```

- [ ] **Step 2: Verificar 8 enlaces en la lista**

```bash
grep -c 'class="career-item"' index.html
# Esperado: 8
```

- [ ] **Step 3: Abrir en el navegador y verificar visualmente**

```bash
open index.html
# Verificar: logo visible, 8 carreras en lista, botones "Ver →" en amarillo
```

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: agregar página principal con lista de 8 carreras"
```

---

## Task 4: Página Agroecología

**Files:**
- Create: `carreras/agroecologia.html`

- [ ] **Step 1: Crear el directorio y la página**

```bash
mkdir -p carreras
```

```html
<!-- carreras/agroecologia.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Agroecología en el CTP Pococí: producción sostenible, conservación de recursos naturales y gestión ambiental.">
  <title>Agroecología — CTP Pococí</title>
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>

  <header class="site-header">
    <a href="../index.html" class="back-link">← Volver</a>
    <div class="site-name" style="text-align:right;">
      CTP Pococí
      <span>Carreras Técnicas</span>
    </div>
  </header>

  <main>
    <section class="hero-career">
      <span class="career-big-icon">🌿</span>
      <h1>Agroecología</h1>
      <p>Carrera técnica enfocada en la producción sostenible, conservación de los recursos naturales y gestión ambiental.</p>
    </section>

    <div class="sections-grid">

      <div class="section-card">
        <span class="sec-icon">✅</span>
        <h3>Habilidades requeridas</h3>
        <ul>
          <li>Gusto por plantas, animales y campo</li>
          <li>Trabajo en equipo</li>
          <li>Interés en conservación natural</li>
          <li>Producción amigable con el ambiente</li>
          <li>Actitud hacia la sostenibilidad</li>
        </ul>
      </div>

      <div class="section-card">
        <span class="sec-icon">💼</span>
        <h3>Salida laboral</h3>
        <ul>
          <li>Reservas biológicas</li>
          <li>Fincas agrícolas</li>
          <li>Parques nacionales</li>
          <li>Teleféricos y aventura</li>
          <li>Viveros</li>
          <li>Guías naturalistas</li>
          <li>Proyectos agroecoturísticos</li>
        </ul>
      </div>

      <div class="section-card">
        <span class="sec-icon">📚</span>
        <h3>Plan de estudio</h3>
        <ul>
          <li>Principios de Agroecología</li>
          <li>Gestión Ambiental</li>
          <li>Sistemas de Producción Sostenible</li>
          <li>Agricultura de Precisión</li>
          <li>Manejo de suelos y cuencas</li>
          <li>Biotecnología</li>
          <li>Formulación de proyectos</li>
        </ul>
      </div>

      <div class="section-card">
        <span class="sec-icon">⚠️</span>
        <h3>Retos</h3>
        <ul>
          <li>Cambio climático</li>
          <li>Tecnologías de precisión</li>
          <li>Gestión de zonas tropicales</li>
          <li>Inocuidad y mercadeo</li>
          <li>Productividad vs conservación</li>
        </ul>
      </div>

    </div>

    <div class="share-section">
      <button class="share-btn" id="share-btn" onclick="compartir()">
        📤 Compartir esta carrera
      </button>
      <p class="share-msg" id="share-msg"></p>
    </div>
  </main>

  <footer class="site-footer">
    <strong>CTP Pococí</strong><br>
    Limón, Costa Rica · Desde 1969<br>
    Ciencia · Virtud · Trabajo
  </footer>

  <script src="../js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verificar estructura**

```bash
grep -c "<li>" carreras/agroecologia.html
# Esperado: 24 o más (contenido en las 4 cards)

grep 'href="../index.html"' carreras/agroecologia.html
# Esperado: línea encontrada
```

- [ ] **Step 3: Verificar en navegador**

```bash
open carreras/agroecologia.html
# Verificar: hero con emoji y degradado, 4 tarjetas en 2x2, botón compartir amarillo
```

- [ ] **Step 4: Commit**

```bash
git add carreras/agroecologia.html
git commit -m "feat: agregar página de Agroecología"
```

---

## Task 5: Página Agroindustria

**Files:**
- Create: `carreras/agroindustria.html`

- [ ] **Step 1: Crear la página**

```html
<!-- carreras/agroindustria.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Agroindustria en el CTP Pococí: procesos productivos, control de calidad e innovación en la industria alimentaria.">
  <title>Agroindustria — CTP Pococí</title>
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>

  <header class="site-header">
    <a href="../index.html" class="back-link">← Volver</a>
    <div class="site-name" style="text-align:right;">
      CTP Pococí
      <span>Carreras Técnicas</span>
    </div>
  </header>

  <main>
    <section class="hero-career">
      <span class="career-big-icon">🏭</span>
      <h1>Agroindustria</h1>
      <p>Carrera técnica de alta demanda enfocada en procesos productivos, inspección y control de calidad en la industria alimentaria.</p>
    </section>

    <div class="sections-grid">

      <div class="section-card">
        <span class="sec-icon">✅</span>
        <h3>Habilidades requeridas</h3>
        <ul>
          <li>Interés en ciencias de alimentos</li>
          <li>Trabajo en entornos industriales</li>
          <li>Atención al detalle</li>
          <li>Trabajo en laboratorio</li>
          <li>Interés en innovación alimentaria</li>
          <li>Cumplimiento de normas de higiene</li>
        </ul>
      </div>

      <div class="section-card">
        <span class="sec-icon">💼</span>
        <h3>Salida laboral</h3>
        <ul>
          <li>Grandes multinacionales alimentarias</li>
          <li>PYMEs innovadoras</li>
          <li>Plantas de procesamiento de lácteos</li>
          <li>Plantas de cárnicos</li>
          <li>Procesamiento de frutas y verduras</li>
          <li>Industrias de bebidas</li>
        </ul>
      </div>

      <div class="section-card">
        <span class="sec-icon">📚</span>
        <h3>Plan de estudio</h3>
        <ul>
          <li>Principios de Industria Alimentaria</li>
          <li>Microbiología Básica</li>
          <li>Control de Calidad e Inspección</li>
          <li>Procesos tecnológicos</li>
          <li>Gestión Ambiental</li>
          <li>Gestión Avanzada de Procesos</li>
          <li>Pasantía Empresarial</li>
        </ul>
      </div>

      <div class="section-card">
        <span class="sec-icon">⚠️</span>
        <h3>Retos</h3>
        <ul>
          <li>Normativas de inocuidad alimentaria</li>
          <li>IoT y Big Data alimentario</li>
          <li>Automatización industrial</li>
          <li>Gestión ambiental</li>
          <li>Mercados globales de calidad</li>
        </ul>
      </div>

    </div>

    <div class="share-section">
      <button class="share-btn" id="share-btn" onclick="compartir()">
        📤 Compartir esta carrera
      </button>
      <p class="share-msg" id="share-msg"></p>
    </div>
  </main>

  <footer class="site-footer">
    <strong>CTP Pococí</strong><br>
    Limón, Costa Rica · Desde 1969<br>
    Ciencia · Virtud · Trabajo
  </footer>

  <script src="../js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verificar y abrir en navegador**

```bash
grep 'href="../index.html"' carreras/agroindustria.html
open carreras/agroindustria.html
```

- [ ] **Step 3: Commit**

```bash
git add carreras/agroindustria.html
git commit -m "feat: agregar página de Agroindustria"
```

---

## Task 6: Página Contabilidad y Finanzas

**Files:**
- Create: `carreras/contabilidad-finanzas.html`

- [ ] **Step 1: Crear la página**

```html
<!-- carreras/contabilidad-finanzas.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Contabilidad y Finanzas en el CTP Pococí: formación en contabilidad, finanzas y administración empresarial.">
  <title>Contabilidad y Finanzas — CTP Pococí</title>
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>

  <header class="site-header">
    <a href="../index.html" class="back-link">← Volver</a>
    <div class="site-name" style="text-align:right;">
      CTP Pococí
      <span>Carreras Técnicas</span>
    </div>
  </header>

  <main>
    <section class="hero-career">
      <span class="career-big-icon">💰</span>
      <h1>Contabilidad y Finanzas</h1>
      <p>Especialidad con alta demanda laboral que brinda formación en contabilidad, finanzas y administración empresarial.</p>
    </section>

    <div class="sections-grid">

      <div class="section-card">
        <span class="sec-icon">✅</span>
        <h3>Habilidades requeridas</h3>
        <ul>
          <li>Habilidad numérica y analítica</li>
          <li>Interés en administración</li>
          <li>Organización y atención al detalle</li>
          <li>Disciplina y responsabilidad</li>
          <li>Interés en el mundo financiero</li>
        </ul>
      </div>

      <div class="section-card">
        <span class="sec-icon">💼</span>
        <h3>Salida laboral</h3>
        <ul>
          <li>Bancos e instituciones financieras</li>
          <li>Colegio de Contadores Privados</li>
          <li>Auxiliar contable en empresas</li>
          <li>Microempresas propias</li>
          <li>Servicios independientes</li>
          <li>Recursos Humanos</li>
          <li>Administración empresarial</li>
        </ul>
      </div>

      <div class="section-card">
        <span class="sec-icon">📚</span>
        <h3>Plan de estudio</h3>
        <ul>
          <li>Contabilidad básica y avanzada</li>
          <li>Finanzas empresariales</li>
          <li>Administración de empresas</li>
          <li>Legislación fiscal y comercial</li>
          <li>Herramientas informáticas contables</li>
          <li>Matemática financiera</li>
          <li>Emprendimiento</li>
        </ul>
      </div>

      <div class="section-card">
        <span class="sec-icon">⚠️</span>
        <h3>Retos</h3>
        <ul>
          <li>Tecnologías contables emergentes</li>
          <li>Normativas internacionales</li>
          <li>Mercado laboral globalizado</li>
          <li>Legislación fiscal cambiante</li>
          <li>Habilidades digitales</li>
        </ul>
      </div>

    </div>

    <div class="share-section">
      <button class="share-btn" id="share-btn" onclick="compartir()">
        📤 Compartir esta carrera
      </button>
      <p class="share-msg" id="share-msg"></p>
    </div>
  </main>

  <footer class="site-footer">
    <strong>CTP Pococí</strong><br>
    Limón, Costa Rica · Desde 1969<br>
    Ciencia · Virtud · Trabajo
  </footer>

  <script src="../js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verificar y abrir en navegador**

```bash
grep 'href="../index.html"' carreras/contabilidad-finanzas.html
open carreras/contabilidad-finanzas.html
```

- [ ] **Step 3: Commit**

```bash
git add carreras/contabilidad-finanzas.html
git commit -m "feat: agregar página de Contabilidad y Finanzas"
```

---

## Task 7: Página Diseño Publicitario

**Files:**
- Create: `carreras/diseno-publicitario.html`

- [ ] **Step 1: Crear la página**

```html
<!-- carreras/diseno-publicitario.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Diseño Publicitario en el CTP Pococí: comunicación visual, diseño gráfico y producción de contenido publicitario.">
  <title>Diseño Publicitario — CTP Pococí</title>
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>

  <header class="site-header">
    <a href="../index.html" class="back-link">← Volver</a>
    <div class="site-name" style="text-align:right;">
      CTP Pococí
      <span>Carreras Técnicas</span>
    </div>
  </header>

  <main>
    <section class="hero-career">
      <span class="career-big-icon">🎨</span>
      <h1>Diseño Publicitario</h1>
      <p>Carrera técnica creativa que forma profesionales en comunicación visual, diseño gráfico y producción de contenido publicitario.</p>
    </section>

    <div class="sections-grid">

      <div class="section-card">
        <span class="sec-icon">✅</span>
        <h3>Habilidades requeridas</h3>
        <ul>
          <li>Creatividad y arte visual</li>
          <li>Uso de herramientas digitales</li>
          <li>Proyectos creativos</li>
          <li>Sensibilidad estética</li>
          <li>Interés en fotografía y publicidad</li>
          <li>Software especializado (Adobe)</li>
        </ul>
      </div>

      <div class="section-card">
        <span class="sec-icon">💼</span>
        <h3>Salida laboral</h3>
        <ul>
          <li>Agencias de publicidad</li>
          <li>Diseño de marca en empresas</li>
          <li>Medios de comunicación</li>
          <li>Imprentas y editoriales</li>
          <li>Estudios de diseño</li>
          <li>Freelance</li>
          <li>Animación 2D y 3D</li>
        </ul>
      </div>

      <div class="section-card">
        <span class="sec-icon">📚</span>
        <h3>Plan de estudio</h3>
        <ul>
          <li>Diseño gráfico e identidad corporativa</li>
          <li>Adobe: Illustrator, Photoshop, XD</li>
          <li>Edición de video (Premiere, After Effects)</li>
          <li>Fotografía publicitaria</li>
          <li>Diseño web (Dreamweaver)</li>
          <li>Impresión 3D y sublimación</li>
        </ul>
      </div>

      <div class="section-card">
        <span class="sec-icon">⚠️</span>
        <h3>Retos</h3>
        <ul>
          <li>Plataformas digitales en evolución</li>
          <li>Mercado freelance competitivo</li>
          <li>Múltiples herramientas de diseño</li>
          <li>IA aplicada al diseño creativo</li>
          <li>Marca personal y portafolio</li>
        </ul>
      </div>

    </div>

    <div class="share-section">
      <button class="share-btn" id="share-btn" onclick="compartir()">
        📤 Compartir esta carrera
      </button>
      <p class="share-msg" id="share-msg"></p>
    </div>
  </main>

  <footer class="site-footer">
    <strong>CTP Pococí</strong><br>
    Limón, Costa Rica · Desde 1969<br>
    Ciencia · Virtud · Trabajo
  </footer>

  <script src="../js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verificar y abrir en navegador**

```bash
grep 'href="../index.html"' carreras/diseno-publicitario.html
open carreras/diseno-publicitario.html
```

- [ ] **Step 3: Commit**

```bash
git add carreras/diseno-publicitario.html
git commit -m "feat: agregar página de Diseño Publicitario"
```

---

## Task 8: Página Informática en Redes

**Files:**
- Create: `carreras/informatica-redes.html`

- [ ] **Step 1: Crear la página**

```html
<!-- carreras/informatica-redes.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Informática en Redes en el CTP Pococí: instalación, configuración y mantenimiento de redes. Academia Cisco certificada.">
  <title>Informática en Redes — CTP Pococí</title>
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>

  <header class="site-header">
    <a href="../index.html" class="back-link">← Volver</a>
    <div class="site-name" style="text-align:right;">
      CTP Pococí
      <span>Carreras Técnicas</span>
    </div>
  </header>

  <main>
    <section class="hero-career">
      <span class="career-big-icon">💻</span>
      <h1>Informática en Redes</h1>
      <p>Carrera técnica que forma profesionales capaces de instalar, configurar y mantener redes e infraestructura TI. Academia Cisco certificada.</p>
    </section>

    <div class="sections-grid">

      <div class="section-card">
        <span class="sec-icon">✅</span>
        <h3>Habilidades requeridas</h3>
        <ul>
          <li>Interés en tecnología y computación</li>
          <li>Resolución de problemas técnicos</li>
          <li>Capacidad analítica y lógica</li>
          <li>Curiosidad por las redes</li>
          <li>Aprendizaje continuo</li>
          <li>Trabajo en equipo</li>
        </ul>
      </div>

      <div class="section-card">
        <span class="sec-icon">💼</span>
        <h3>Salida laboral</h3>
        <ul>
          <li>Empresas de tecnología</li>
          <li>Departamentos de TI</li>
          <li>Soporte técnico y mantenimiento</li>
          <li>Redes empresariales</li>
          <li>Emprendimiento tecnológico</li>
        </ul>
      </div>

      <div class="section-card">
        <span class="sec-icon">📚</span>
        <h3>Plan de estudio</h3>
        <ul>
          <li>Introducción a la Programación</li>
          <li>Soporte a PCs e impresoras</li>
          <li>TI y Bases de Datos</li>
          <li>Configuración de Redes</li>
          <li>Seguridad informática</li>
          <li>Certificación Cisco</li>
        </ul>
      </div>

      <div class="section-card">
        <span class="sec-icon">⚠️</span>
        <h3>Retos</h3>
        <ul>
          <li>Evolución acelerada de redes</li>
          <li>Ciberseguridad empresarial</li>
          <li>Cloud e IoT</li>
          <li>Mercado laboral tecnológico</li>
          <li>Nuevas certificaciones</li>
        </ul>
      </div>

    </div>

    <div class="share-section">
      <button class="share-btn" id="share-btn" onclick="compartir()">
        📤 Compartir esta carrera
      </button>
      <p class="share-msg" id="share-msg"></p>
    </div>
  </main>

  <footer class="site-footer">
    <strong>CTP Pococí</strong><br>
    Limón, Costa Rica · Desde 1969<br>
    Ciencia · Virtud · Trabajo
  </footer>

  <script src="../js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verificar y abrir en navegador**

```bash
grep 'href="../index.html"' carreras/informatica-redes.html
open carreras/informatica-redes.html
```

- [ ] **Step 3: Commit**

```bash
git add carreras/informatica-redes.html
git commit -m "feat: agregar página de Informática en Redes"
```

---

## Task 9: Página Producción Agrícola Pecuaria

**Files:**
- Create: `carreras/produccion-agricola-pecuaria.html`

- [ ] **Step 1: Crear la página**

```html
<!-- carreras/produccion-agricola-pecuaria.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Producción Agrícola Pecuaria en el CTP Pococí: agricultura sostenible de precisión y producción animal.">
  <title>Producción Agrícola Pecuaria — CTP Pococí</title>
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>

  <header class="site-header">
    <a href="../index.html" class="back-link">← Volver</a>
    <div class="site-name" style="text-align:right;">
      CTP Pococí
      <span>Carreras Técnicas</span>
    </div>
  </header>

  <main>
    <section class="hero-career">
      <span class="career-big-icon">🌾</span>
      <h1>Producción Agrícola Pecuaria</h1>
      <p>Formación en agricultura sostenible y de precisión, producción animal, emprendimiento e innovación agropecuaria.</p>
    </section>

    <div class="sections-grid">

      <div class="section-card">
        <span class="sec-icon">✅</span>
        <h3>Habilidades requeridas</h3>
        <ul>
          <li>Interés en animales y cultivos</li>
          <li>Trabajo en campo</li>
          <li>Tecnologías agrícolas (drones, GPS)</li>
          <li>Ciencias naturales y biológicas</li>
          <li>Trabajo físico al aire libre</li>
          <li>Interés en emprendimiento</li>
        </ul>
      </div>

      <div class="section-card">
        <span class="sec-icon">💼</span>
        <h3>Salida laboral</h3>
        <ul>
          <li>Producción animal (inseminación, ordeño)</li>
          <li>Siembra y mercadeo agrícola</li>
          <li>Micropropagación de plantas</li>
          <li>Uso de drones y sensores</li>
          <li>Manejo integrado de plagas</li>
          <li>Producción en ambiente controlado</li>
        </ul>
      </div>

      <div class="section-card">
        <span class="sec-icon">📚</span>
        <h3>Plan de estudio</h3>
        <ul>
          <li>Administración de finca</li>
          <li>Producción agrícola (suelos, olericultura)</li>
          <li>Agricultura de Precisión</li>
          <li>Producción Pecuaria</li>
          <li>Emprendimiento e Innovación</li>
          <li>Práctica Profesional (320 horas)</li>
        </ul>
      </div>

      <div class="section-card">
        <span class="sec-icon">⚠️</span>
        <h3>Retos</h3>
        <ul>
          <li>Tecnologías de precisión (IoT)</li>
          <li>Producción sostenible</li>
          <li>Manejo eficiente del agua</li>
          <li>Competitividad de mercados</li>
          <li>Innovación en producción animal</li>
        </ul>
      </div>

    </div>

    <div class="share-section">
      <button class="share-btn" id="share-btn" onclick="compartir()">
        📤 Compartir esta carrera
      </button>
      <p class="share-msg" id="share-msg"></p>
    </div>
  </main>

  <footer class="site-footer">
    <strong>CTP Pococí</strong><br>
    Limón, Costa Rica · Desde 1969<br>
    Ciencia · Virtud · Trabajo
  </footer>

  <script src="../js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verificar y abrir en navegador**

```bash
grep 'href="../index.html"' carreras/produccion-agricola-pecuaria.html
open carreras/produccion-agricola-pecuaria.html
```

- [ ] **Step 3: Commit**

```bash
git add carreras/produccion-agricola-pecuaria.html
git commit -m "feat: agregar página de Producción Agrícola Pecuaria"
```

---

## Task 10: Página Salud Ocupacional

**Files:**
- Create: `carreras/salud-ocupacional.html`

- [ ] **Step 1: Crear la página**

```html
<!-- carreras/salud-ocupacional.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Salud Ocupacional en el CTP Pococí: prevención de accidentes y enfermedades laborales. Más que una opción académica, un estilo de vida.">
  <title>Salud Ocupacional — CTP Pococí</title>
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>

  <header class="site-header">
    <a href="../index.html" class="back-link">← Volver</a>
    <div class="site-name" style="text-align:right;">
      CTP Pococí
      <span>Carreras Técnicas</span>
    </div>
  </header>

  <main>
    <section class="hero-career">
      <span class="career-big-icon">🦺</span>
      <h1>Salud Ocupacional</h1>
      <p>Carrera orientada a promover y proteger la salud de las personas trabajadoras mediante la prevención de enfermedades y accidentes laborales.</p>
    </section>

    <div class="sections-grid">

      <div class="section-card">
        <span class="sec-icon">✅</span>
        <h3>Habilidades requeridas</h3>
        <ul>
          <li>Interés en seguridad y bienestar</li>
          <li>Análisis de riesgos laborales</li>
          <li>Comunicación y capacitación</li>
          <li>Responsabilidad y servicio</li>
          <li>Interés en legislación laboral</li>
          <li>Trabajo en campo e industria</li>
        </ul>
      </div>

      <div class="section-card">
        <span class="sec-icon">💼</span>
        <h3>Salida laboral</h3>
        <ul>
          <li>Inspección de riesgos laborales</li>
          <li>Elaboración de informes técnicos</li>
          <li>Atención de emergencias básicas</li>
          <li>Normativas nacionales e internacionales</li>
          <li>Empresas industriales y comerciales</li>
          <li>Instituciones públicas y privadas</li>
        </ul>
      </div>

      <div class="section-card">
        <span class="sec-icon">📚</span>
        <h3>Plan de estudio</h3>
        <ul>
          <li>Seguridad e higiene laboral</li>
          <li>Primeros auxilios</li>
          <li>Factores de riesgo mecánico y eléctrico</li>
          <li>Ergonomía y puestos de trabajo</li>
          <li>Legislación laboral</li>
          <li>Gestión empresarial y calidad</li>
        </ul>
      </div>

      <div class="section-card">
        <span class="sec-icon">⚠️</span>
        <h3>Retos</h3>
        <ul>
          <li>Normativas internacionales de seguridad</li>
          <li>Riesgos en entornos industriales</li>
          <li>Cultura preventiva en trabajadores</li>
          <li>Tecnología en gestión de seguridad</li>
          <li>Emergencias en tiempo real</li>
        </ul>
      </div>

    </div>

    <div class="share-section">
      <button class="share-btn" id="share-btn" onclick="compartir()">
        📤 Compartir esta carrera
      </button>
      <p class="share-msg" id="share-msg"></p>
    </div>
  </main>

  <footer class="site-footer">
    <strong>CTP Pococí</strong><br>
    Limón, Costa Rica · Desde 1969<br>
    Ciencia · Virtud · Trabajo
  </footer>

  <script src="../js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verificar y abrir en navegador**

```bash
grep 'href="../index.html"' carreras/salud-ocupacional.html
open carreras/salud-ocupacional.html
```

- [ ] **Step 3: Commit**

```bash
git add carreras/salud-ocupacional.html
git commit -m "feat: agregar página de Salud Ocupacional"
```

---

## Task 11: Página Secretariado Ejecutivo

**Files:**
- Create: `carreras/secretariado-ejecutivo.html`

- [ ] **Step 1: Crear la página**

```html
<!-- carreras/secretariado-ejecutivo.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Secretariado Ejecutivo en el CTP Pococí: gestión administrativa, atención al cliente y servicios secretariales con proyección laboral.">
  <title>Secretariado Ejecutivo — CTP Pococí</title>
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>

  <header class="site-header">
    <a href="../index.html" class="back-link">← Volver</a>
    <div class="site-name" style="text-align:right;">
      CTP Pococí
      <span>Carreras Técnicas</span>
    </div>
  </header>

  <main>
    <section class="hero-career">
      <span class="career-big-icon">📋</span>
      <h1>Secretariado Ejecutivo</h1>
      <p>Especialidad dinámica con gran proyección laboral. Formación integral en gestión administrativa, atención al cliente y servicios secretariales.</p>
    </section>

    <div class="sections-grid">

      <div class="section-card">
        <span class="sec-icon">✅</span>
        <h3>Habilidades requeridas</h3>
        <ul>
          <li>Responsabilidad y buena presentación</li>
          <li>Comunicación oral y escrita</li>
          <li>Trabajo en equipo y servicio</li>
          <li>Herramientas digitales</li>
          <li>Organización y planificación</li>
        </ul>
      </div>

      <div class="section-card">
        <span class="sec-icon">💼</span>
        <h3>Salida laboral</h3>
        <ul>
          <li>Clínicas y hospitales</li>
          <li>Almacenes y comercios</li>
          <li>Centros educativos</li>
          <li>Constructoras</li>
          <li>Bancos y aseguradoras</li>
          <li>Bufetes de abogados</li>
        </ul>
      </div>

      <div class="section-card">
        <span class="sec-icon">📚</span>
        <h3>Plan de estudio</h3>
        <ul>
          <li>Redacción y Comunicación Empresarial</li>
          <li>Gestión Documental y Archivo</li>
          <li>Etiqueta y Protocolo</li>
          <li>Lengua de Señas (LESCO)</li>
          <li>Herramientas digitales administrativas</li>
          <li>Matemática Financiera</li>
        </ul>
      </div>

      <div class="section-card">
        <span class="sec-icon">⚠️</span>
        <h3>Retos</h3>
        <ul>
          <li>Entornos laborales digitalizados</li>
          <li>Múltiples plataformas digitales</li>
          <li>Atención a la diversidad e inclusión</li>
          <li>Gestión documental híbrida</li>
          <li>Habilidades blandas corporativas</li>
        </ul>
      </div>

    </div>

    <div class="share-section">
      <button class="share-btn" id="share-btn" onclick="compartir()">
        📤 Compartir esta carrera
      </button>
      <p class="share-msg" id="share-msg"></p>
    </div>
  </main>

  <footer class="site-footer">
    <strong>CTP Pococí</strong><br>
    Limón, Costa Rica · Desde 1969<br>
    Ciencia · Virtud · Trabajo
  </footer>

  <script src="../js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verificar y abrir en navegador**

```bash
grep 'href="../index.html"' carreras/secretariado-ejecutivo.html
open carreras/secretariado-ejecutivo.html
```

- [ ] **Step 3: Commit**

```bash
git add carreras/secretariado-ejecutivo.html
git commit -m "feat: agregar página de Secretariado Ejecutivo"
```

---

## Task 12: Verificación final

**Files:** todos los archivos HTML

- [ ] **Step 1: Verificar que los 10 archivos HTML existen**

```bash
ls index.html carreras/*.html
# Esperado: 9 archivos (1 index + 8 carreras)
```

- [ ] **Step 2: Verificar que todos los enlaces de index.html apuntan a archivos que existen**

```bash
grep 'href="carreras/' index.html | sed 's/.*href="\([^"]*\)".*/\1/' | while read f; do
  [ -f "$f" ] && echo "OK: $f" || echo "FALTA: $f"
done
# Esperado: 8 líneas "OK"
```

- [ ] **Step 3: Verificar que todas las páginas de carrera enlazan de vuelta al index**

```bash
for f in carreras/*.html; do
  grep -q 'href="../index.html"' "$f" && echo "OK: $f" || echo "FALTA back-link: $f"
done
# Esperado: 8 líneas "OK"
```

- [ ] **Step 4: Verificar que todas las páginas incluyen main.js**

```bash
for f in carreras/*.html; do
  grep -q 'src="../js/main.js"' "$f" && echo "OK: $f" || echo "FALTA JS: $f"
done
# Esperado: 8 líneas "OK"
```

- [ ] **Step 5: Recorrido completo en navegador**

```bash
open index.html
```

Pasos a verificar:
1. La página principal carga con logo, hero azul y 8 carreras en lista
2. Hacer clic en cada carrera — verifica que navega correctamente
3. En la página de carrera: hero con degradado, 4 tarjetas en grilla 2×2, botón amarillo
4. El botón "← Volver" regresa al index
5. El botón "Compartir" funciona (copia URL o abre el diálogo nativo)

- [ ] **Step 6: Commit final**

```bash
git add -A
git commit -m "feat: sitio web CTP Pococí completo — 8 carreras técnicas"
```
