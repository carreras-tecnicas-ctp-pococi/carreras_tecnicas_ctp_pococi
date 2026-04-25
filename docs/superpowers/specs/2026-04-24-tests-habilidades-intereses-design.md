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
  index.html          ← Landing: presenta ambos tests, muestra mini-radares de resultados guardados
  intereses.html      ← Test de intereses completo + página de resultados (inline)
  habilidades.html    ← Test de habilidades completo + página de resultados (inline)

js/
  main.js             ← existente, sin cambios
  tests-engine.js     ← nuevo: motor del quiz, radar chart, localStorage, compartir resultado
  tests-data.js       ← nuevo: preguntas, áreas, perfiles de carreras (datos puros)

css/
  styles.css          ← existente, extendido con clases para tests y radar
```

---

## Integración en el sitio

- **Header** (todas las páginas): enlace "Habilidades e Intereses" → `tests/index.html`
- **Homepage** (`index.html`): nueva sección destacada con llamada a la acción y enlace a `tests/index.html`

---

## Áreas temáticas (9 áreas — compartidas por ambos tests)

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

## Formato de los tests (basado en investigación psicométrica)

### Test de Intereses

| Atributo | Valor |
|---------|-------|
| Constructo | Preferencias afectivas hacia actividades |
| Formato | Escala Likert 5 puntos |
| Objeto del ítem | Actividades concretas ("Diseñar un afiche para redes sociales") |
| Anclas | "😍 Me encanta" / "🙂 Me gusta" / "😐 Me da igual" / "🙁 No me gusta" / "😤 Lo detesto" |
| Cantidad | 40 ítems (~4–5 por área) |
| Tiempo estimado | 8–9 minutos |
| Orden | Aleatorio al iniciar el test |

### Test de Habilidades

| Atributo | Valor |
|---------|-------|
| Constructo | Autoeficacia / competencia percibida |
| Formato | Escala de capacidad 4 puntos (sin punto neutro) |
| Objeto del ítem | Habilidades situacionales observables ("Puedo identificar errores en un registro contable") |
| Anclas | "Lo hago muy bien" / "Lo hago bien" / "Me cuesta hacerlo" / "No lo sé hacer" |
| Cantidad | 36 ítems (~4 por área) |
| Tiempo estimado | 9–10 minutos |
| Orden | Aleatorio al iniciar el test |

> Las áreas **no se muestran durante el test**. Son metadata interna para calcular los puntajes del radar. Solo aparecen en la página de resultados.

---

## Estructura de datos (`tests-data.js`)

### Áreas
```js
{
  id: "finanzas",
  nombre: "Finanzas",
  descripcion: "Trabajo con números, registros contables, análisis financiero y banca."
}
```

### Preguntas — intereses
```js
{ id: "i01", area: "finanzas", texto: "Revisar y registrar los ingresos y gastos de un negocio" }
```

### Preguntas — habilidades
```js
{ id: "h01", area: "finanzas", texto: "Puedo identificar errores en un registro de cuentas o facturas" }
```

### Perfil de carrera
```js
{
  id: "contabilidad-finanzas",
  nombre: "Contabilidad y Finanzas",
  emoji: "📊",
  perfil: { finanzas: 5, administracion: 4, tecnologia: 2, diseno: 0, mecanica: 0, gastronomia: 0, "agro-naturaleza": 0, agroindustria: 1, "salud-seguridad": 1 },
  descripcion_match: "Esta carrera requiere alta afinidad con Finanzas porque..."
}
```

Los perfiles y preguntas se generan leyendo los `.md` de cada carrera con un agente.

---

## Motor del quiz (`tests-engine.js`)

**Pantallas del test:**

1. **Inicio** — título, instrucciones breves, botón "Comenzar"
2. **Pregunta** — texto de la pregunta + escala de botones grandes táctiles + barra de progreso ("Pregunta 12 de 40") + botón "Atrás"
3. **Resultados** — radar chart + selector de carreras + texto explicativo

**Comportamiento de las preguntas:**
- Avance automático al seleccionar respuesta
- Botón "Atrás" siempre visible para corregir respuestas
- Sin agrupación por área visible para el estudiante

---

## Página de resultados (inline, misma página del test)

**Radar chart:**
- Librería: Chart.js desde CDN (sin build step)
- 9 ejes (uno por área)
- Capa del usuario: azul `--blue`, semi-transparente
- Capa de carrera seleccionada: amarillo `--yellow`, semi-transparente, superpuesta
- Al tocar una etiqueta del radar → modal con nombre y descripción del área

**Selector de carreras:**
- Lista de chips/botones con emoji + nombre de carrera, debajo del radar
- Al seleccionar: superpone el perfil de esa carrera en el radar + muestra texto explicativo de compatibilidad
- Solo una carrera activa a la vez

**Compartir:**
- Botón "Descargar imagen" → exporta canvas como PNG
- Botón "Compartir resultado" → codifica puntajes en hash URL: `tests/intereses.html#r=4.2,3.1,...`
- Al abrir URL con hash → salta el test y muestra resultados directamente

---

## Persistencia en `localStorage`

```
ctp_intereses_resultado  → { scores: { finanzas: 4.2, tecnologia: 3.1, ... }, fecha: "2026-04-24" }
ctp_habilidades_resultado → { scores: { ... }, fecha: "2026-04-24" }
```

---

## Landing `tests/index.html`

- Dos tarjetas: "Test de Intereses" y "Test de Habilidades"
- Si hay resultado guardado: mini-radar (canvas pequeño) + fecha + botón "Repetir test"
- Si no hay resultado: descripción del test + botón "Comenzar"
- Si ambos tests completados: sección adicional "Ver tus resultados combinados" (muestra los dos mini-radares juntos)

---

## Generación de contenido con agentes

Las 76 preguntas y los 12 perfiles de carrera se generan mediante agentes que leen los archivos `documentacion/carreras/[slug]/descripcion.md` y producen:

1. **Preguntas de intereses** (40): actividades concretas relacionadas a las 9 áreas, redactadas en segunda persona informal (vos), sin mencionar nombres de carreras.
2. **Preguntas de habilidades** (36): habilidades situacionales y observables, redactadas como afirmaciones en primera persona ("Puedo...").
3. **Perfiles de carrera** (12): puntajes 0–5 por área con justificación, basados en la sección "Habilidades Requeridas" de cada `.md`.
4. **Descripciones de match** (12): texto de 2–3 oraciones explicando por qué una carrera se relaciona con las áreas con mayor puntaje.

---

## Restricciones

- Sin backend, sin servidor — todo client-side
- Chart.js es la única dependencia externa (CDN)
- Mobile-first: botones de respuesta diseñados para dedos (mínimo 44px de altura)
- Todo el texto en español, tuteo informal (vos)
- Compatible con el patrón de archivos y convenciones del sitio actual
