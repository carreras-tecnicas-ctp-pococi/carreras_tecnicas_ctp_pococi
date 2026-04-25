# Tests de Habilidades e Intereses — Diseño

**Fecha:** 2026-04-24  
**Proyecto:** CTP Pococí — Carreras Técnicas  
**Estado:** Aprobado

---

## Objetivo

Agregar dos tests vocacionales interactivos al sitio estático del CTP Pococí que permitan a los estudiantes de secundaria (14–18 años):

- **Test de Intereses:** Identificar sus intereses y asociarlos a las carreras técnicas disponibles.
- **Test de Habilidades:** Autoevaluar sus habilidades y contrastarlas con las requeridas por cada carrera técnica.

Ambos tests producen resultados visualizados en un gráfico de radar interactivo que permite comparar el perfil del estudiante con el perfil de cada carrera.

> Los 10 minutos son una estimación de referencia, no un requisito duro.

---

## Contexto del proyecto

- Sitio estático puro: sin build step, sin npm, sin frameworks.
- Convenciones actuales: kebab-case, español, HTML5 semántico, CSS custom properties.
- Design tokens: `--blue: #1a237e`, `--yellow: #d4a017`, `--red: #c0392b`, `--bg: #f5f5f5`.
- 12 carreras técnicas documentadas en `documentacion/carreras/[slug]/descripcion.md`.

---

## Arquitectura de archivos

```
tests/
  index.html          ← Landing: presenta ambos tests, mini-radares, sección combinada
  intereses.html      ← Test de intereses completo + página de resultados (inline)
  habilidades.html    ← Test de habilidades completo + página de resultados (inline)

js/
  main.js             ← existente, sin cambios
  tests-engine.js     ← motor del quiz, radar chart, localStorage, compartir resultado
  tests-data.js       ← datos puros: preguntas, áreas, perfiles de carreras
  vendor/
    chart.min.js      ← Chart.js descargado localmente (sin CDN)

css/
  styles.css          ← existente, extendido con clases para tests y radar
```

### Responsabilidades de cada archivo JS

**`tests-data.js`** — solo datos, sin lógica:
- Array `AREAS` (9 áreas con id, nombre, descripción)
- Array `PREGUNTAS_INTERESES` (40 ítems con id, area, texto)
- Array `PREGUNTAS_HABILIDADES` (36 ítems con id, area, texto)
- Array `CARRERAS` (12 carreras con id, nombre, emoji, perfil de puntajes, descripcion_match)

**`tests-engine.js`** — toda la lógica y UI:
- Función `iniciarTest(preguntas, tipo)` — aleatoriza y muestra el quiz
- Función `calcularResultado(respuestas, tipo)` — calcula scores por área
- Función `mostrarRadar(canvasId, scoresUsuario, scoresCarrera?)` — dibuja el radar
- Función `guardarResultado(tipo, scores)` — persiste en localStorage
- Función `cargarResultado(tipo)` — lee de localStorage con validación
- Función `generarHashURL(scores)` / `leerHashURL()` — compartir por URL
- Función `descargarRadar(canvasId)` — exporta PNG

Cada página HTML (`intereses.html`, `habilidades.html`) llama a estas funciones con sus datos específicos. `tests-data.js` se carga antes que `tests-engine.js`.

---

## Integración en el sitio

- **Header** (todas las páginas): enlace "Habilidades e Intereses" → `tests/index.html`
- **Homepage** (`index.html`): nueva sección destacada con llamada a la acción y enlace a `tests/index.html`

---

## Áreas temáticas — mapeo completo

9 áreas compartidas por ambos tests. Cada área tiene un nombre, descripción y lista de carreras asociadas:

| # | ID | Nombre | Carreras asociadas |
|---|-----|--------|-------------------|
| 1 | `agro-naturaleza` | Agro / Naturaleza | Agroecología, Producción Agrícola y Pecuaria |
| 2 | `agroindustria` | Agroindustria / Calidad | Procesos Productivos e Inspección |
| 3 | `gastronomia` | Gastronomía / Servicios | Alimentos y Bebidas, Gerencia y Producción en Cocina |
| 4 | `finanzas` | Finanzas | Banca y Finanzas, Contabilidad y Finanzas |
| 5 | `administracion` | Administración / Oficina | Secretariado Ejecutivo |
| 6 | `tecnologia` | Tecnología / Informática | Configuración y Soporte |
| 7 | `diseno` | Diseño / Comunicación | Diseño Publicitario |
| 8 | `salud-seguridad` | Salud / Seguridad | Salud Ocupacional |
| 9 | `mecanica` | Mecánica / Técnico | Mecánica General |

---

## Formato de los tests

### Test de Intereses

| Atributo | Valor |
|---------|-------|
| Constructo | Preferencias afectivas hacia actividades |
| Formato | Escala Likert 5 puntos |
| Objeto del ítem | Actividades concretas ("Diseñar un afiche para redes sociales") |
| Anclas | 1="😤 Lo detesto" / 2="🙁 No me gusta" / 3="😐 Me da igual" / 4="🙂 Me gusta" / 5="😍 Me encanta" |
| Cantidad total | 40 ítems |
| Distribución por área | 5 ítems × 4 áreas + 4 ítems × 5 áreas = 40 |
| Tiempo estimado | ~8 minutos |
| Orden | Aleatorio al iniciar (Fisher-Yates shuffle) |

### Test de Habilidades

| Atributo | Valor |
|---------|-------|
| Constructo | Autoeficacia / competencia percibida |
| Formato | Escala de capacidad 4 puntos (sin punto neutro) |
| Objeto del ítem | Habilidades situacionales observables ("Puedo identificar errores en un registro contable") |
| Anclas | 1="No lo sé hacer" / 2="Me cuesta hacerlo" / 3="Lo hago bien" / 4="Lo hago muy bien" |
| Cantidad total | 36 ítems |
| Distribución por área | 4 ítems × 9 áreas = 36 (distribución uniforme) |
| Tiempo estimado | ~9 minutos |
| Orden | Aleatorio al iniciar (Fisher-Yates shuffle) |

> Las áreas **no se muestran durante el test**. Son metadata interna para calcular los puntajes del radar. Solo aparecen en la página de resultados.

---

## Cálculo de puntajes del radar

### Fórmula
El puntaje de cada área se calcula como el **promedio de las respuestas** de los ítems de esa área, **normalizado a escala 0–5**:

- **Intereses** (escala 1–5): `score_area = promedio(respuestas_area)` → resultado ya está en 0–5 (mapear: valor-1 para que 1→0, 5→4... o simplemente usar el promedio 1–5 directamente en el radar con max=5)
- **Habilidades** (escala 1–4): `score_area = promedio(respuestas_area) × (5/4)` → normaliza a escala 0–5

Ambos tests producen scores en el rango **0–5** para comparabilidad en el radar.

### Perfiles de carrera
Cada carrera tiene un perfil de puntajes por área en escala **0–5**, definido manualmente en `tests-data.js` a partir de las secciones "Habilidades Requeridas" de los `.md` de cada carrera. Usan la misma escala 0–5 que los scores del usuario, lo que hace directamente comparables las capas del radar.

---

## Motor del quiz (`tests-engine.js`)

### Pantallas del test

1. **Inicio** — título del test, instrucciones (2–3 líneas), botón "Comenzar"
2. **Pregunta** — una pregunta a la vez, escala táctil, barra de progreso, botón "Atrás"
3. **Resultados** — radar + selector de carreras + texto explicativo (misma página, sin recarga)

### Comportamiento de la pregunta

- La pregunta actual muestra su texto y la escala de botones grandes (mínimo 44px de altura, mobile-first)
- Si la pregunta ya fue respondida (al volver con "Atrás"), se muestra con la respuesta previa **preseleccionada** y editable
- Al seleccionar una respuesta → **avance automático** a la siguiente pregunta (sin botón "Siguiente")
- **Botón "Atrás"** siempre visible: vuelve a la pregunta anterior con la respuesta previa marcada, permitiendo cambiarla
- En la primera pregunta, el botón "Atrás" está deshabilitado (no oculto)
- Barra de progreso: "Pregunta 12 de 40"

### Recuperación de sesión interrumpida

- El progreso **no** se guarda durante el test — si el usuario recarga o abandona, el test reinicia desde cero
- Al finalizar el test, los resultados sí se persisten en localStorage
- Si `localStorage` no está disponible (modo privado, permisos denegados): el test funciona igual pero sin persistencia — la página de resultados funciona normalmente en sesión, sin mini-radar en la landing

---

## Página de resultados (inline, misma página del test)

### Radar chart

- Librería: **Chart.js** descargada y guardada localmente en `js/vendor/chart.min.js` — sin dependencia de CDN
- 9 ejes (uno por área), escala 0–5
- **Capa del usuario:** azul `--blue` (#1a237e), relleno semi-transparente (alpha 0.3)
- **Capa de carrera seleccionada:** amarillo `--yellow` (#d4a017), relleno semi-transparente (alpha 0.3), superpuesta
- Sin carrera seleccionada: solo capa del usuario

### Acceso a descripciones de área (mobile-first)

Las etiquetas del radar en canvas son pequeñas en móvil. Solución de dos capas:
1. Las etiquetas del canvas son decorativas (solo texto)
2. Debajo del radar: **fila de 9 chips clicables** con el nombre de cada área — al tocar un chip → modal/drawer con nombre y descripción del área

### Selector de carreras

- Lista de **chips/botones** con emoji + nombre de carrera, debajo de los chips de área
- Al seleccionar: superpone perfil de esa carrera en el radar (capa amarilla) + muestra texto `descripcion_match` debajo
- Al volver a tocar la carrera activa: la deselecciona — la capa amarilla desaparece y queda solo el perfil del usuario
- Solo una carrera activa a la vez

### Compartir resultado

**Formato del hash URL:**
```
tests/intereses.html#r=4.2-3.0-2.8-4.5-1.0-3.2-2.0-4.8-1.5
```
- 9 números (uno por área en el orden del array `AREAS`), separados por guiones, redondeados a 1 decimal
- Al cargar la página con hash válido: se salta el quiz y se muestran directamente los resultados
- Al cargar con hash inválido o malformado: se ignora el hash y se muestra la pantalla de inicio del test

**Descargar imagen:**
- Botón "Descargar imagen" → `canvas.toBlob()` → descarga como `resultado-intereses.png` o `resultado-habilidades.png`

---

## Persistencia en `localStorage`

```js
// Estructura guardada
{
  scores: {
    "agro-naturaleza": 4.2,
    "agroindustria": 3.0,
    "gastronomia": 2.8,
    "finanzas": 4.5,
    "administracion": 1.0,
    "tecnologia": 3.2,
    "diseno": 2.0,
    "salud-seguridad": 4.8,
    "mecanica": 1.5
  },
  fecha: "2026-04-24"
}
```

Claves: `ctp_intereses_resultado` y `ctp_habilidades_resultado`.

Si el valor en localStorage es inválido, nulo, o no parseable como JSON: se trata como si no hubiera resultado guardado (sin crash).

---

## Landing `tests/index.html`

### Tarjetas de test (siempre visibles)

Dos tarjetas: "Test de Intereses" y "Test de Habilidades". Cada tarjeta muestra:
- **Sin resultado guardado:** descripción del test (2 líneas) + botón "Comenzar"
- **Con resultado guardado:** mini-radar (canvas pequeño ~200px) + fecha de realización + botón "Repetir test" + botón "Ver resultado completo" (navega a la página del test con hash de los scores guardados)

### Sección combinada (solo si ambos tests están completos)

Visible debajo de las dos tarjetas cuando hay resultados guardados para ambos tests.

Muestra:
- Título: "Tu perfil vocacional completo"
- Un **radar doble** con dos capas: intereses (azul) y habilidades (amarillo), en el mismo gráfico
- Debajo: **ranking de las 3 carreras más compatibles**, calculado como el promedio simple de dos distancias euclidianas: `(dist_intereses(usuario, carrera) + dist_habilidades(usuario, carrera)) / 2`, donde cada distancia se calcula sobre el vector de 9 componentes (una por área) y se invierte para que mayor similitud = menor distancia. Se usa el promedio de distancias (no distancia sobre vector de 18 componentes) para tratar ambos tests con igual peso.
- Cada carrera del ranking muestra: emoji + nombre + barra de compatibilidad (%)
- Botón "Explorar todas las carreras" → lleva a `tests/intereses.html` con hash del resultado guardado, con el selector de carreras ya activo

---

## Generación de contenido con agentes

Las 76 preguntas y los 12 perfiles de carrera se generan mediante agentes que leen `documentacion/carreras/[slug]/descripcion.md` y producen:

1. **Preguntas de intereses** (40): actividades concretas por área, tuteo informal (vos), sin mencionar nombres de carreras ni áreas.
2. **Preguntas de habilidades** (36, 4 por área): afirmaciones en primera persona ("Puedo..."), habilidades situacionales y observables.
3. **Perfiles de carrera** (12): puntajes 0–5 por área basados en "Habilidades Requeridas" de cada `.md`. Escala: 0=no relevante, 5=central para la carrera.
4. **Descripciones de match** (12): texto de 2–3 oraciones explicando por qué una carrera se relaciona con las áreas de mayor puntaje en su perfil.
5. **Descripciones de áreas** (9): texto de 1–2 oraciones para el modal de cada área en los resultados.

---

## Restricciones

- Sin backend, sin servidor — todo client-side
- Chart.js guardado localmente en `js/vendor/chart.min.js` — sin dependencias externas
- Mobile-first: botones de respuesta mínimo 44px de altura
- Todo el texto en español, tuteo informal (vos)
- Compatible con el patrón de archivos y convenciones del sitio actual
- Sin localStorage → el test funciona en sesión sin persistencia, sin crash
