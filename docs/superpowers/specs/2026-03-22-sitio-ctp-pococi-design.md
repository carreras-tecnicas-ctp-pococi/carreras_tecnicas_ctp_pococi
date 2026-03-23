# Diseño: Sitio Web CTP Pococí — Carreras Técnicas

**Fecha:** 2026-03-22
**Estado:** Aprobado

---

## Resumen

Sitio web estático (HTML/CSS/JS puro) para el Colegio Técnico Profesional de Pococí, Limón, Costa Rica. Su propósito es dar a conocer las 8 carreras técnicas disponibles a estudiantes de secundaria y padres de familia, permitiendo que cada carrera tenga su propia URL compartible.

---

## Audiencia

- Estudiantes de secundaria evaluando opciones de carrera técnica
- Padres de familia informándose sobre las opciones del colegio

## Objetivo principal

Que el visitante salga con una idea clara de cuál carrera le interesa. No se requiere contacto ni descarga; solo informarse.

---

## Stack tecnológico

- **HTML/CSS/JS puro** — sin frameworks ni dependencias externas
- **Tipografía:** system font stack (sin Google Fonts)
- **Despliegue:** cualquier servidor estático (GitHub Pages, Netlify, etc.)
- **Sin backend ni base de datos**

---

## Estructura de archivos

```
/
├── index.html                          ← Página principal
├── logo.jpeg                           ← Logo institucional existente
├── css/
│   └── styles.css                      ← Estilos compartidos
├── js/
│   └── main.js                         ← Funcionalidad compartir (Web Share API)
└── carreras/
    ├── agroecologia.html
    ├── agroindustria.html
    ├── contabilidad-finanzas.html
    ├── diseno-publicitario.html
    ├── informatica-redes.html
    ├── produccion-agricola-pecuaria.html
    ├── salud-ocupacional.html
    └── secretariado-ejecutivo.html
```

---

## Identidad visual

| Token | Valor | Uso |
|---|---|---|
| Azul oscuro | `#1a237e` | Header, hero, acentos institucionales |
| Amarillo mostaza | `#d4a017` | Botones CTA, acento principal, línea del header |
| Rojo | `#c0392b` | Degradado del hero en páginas de carrera |
| Gris claro | `#f5f5f5` | Fondo general del cuerpo |
| Blanco | `#ffffff` | Tarjetas con `box-shadow` |

**Logo:** `logo.jpeg` (escudo institucional, fondo negro con borde amarillo)

---

## Componentes compartidos

### Header
- Fondo `#1a237e`, borde inferior `3px solid #d4a017`
- Logo del CTP (32×32px circular) + nombre "CTP Pococí" con subtítulo "Ciencia · Virtud · Trabajo"
- En páginas de carrera: botón "← Volver" a la izquierda alineado al logo

### Footer
- Fondo `#1a237e`, texto centrado color blanco/70%
- Contenido: nombre del colegio, ubicación, año de fundación (1969), lema

---

## Página principal (`index.html`)

### Hero
- Fondo `#1a237e`
- Etiqueta pequeña en amarillo: "Carreras Técnicas"
- Título H1: "Descubrí tu futuro en el CTP Pococí"
- Párrafo motivacional breve

### Lista de carreras
- Diseño mobile-first, una columna
- Fondo `#f5f5f5`, ítems en tarjetas blancas con `box-shadow`
- Cada tarjeta: emoji/ícono por área + nombre de carrera + descripción breve + botón "Ver →" en amarillo mostaza
- Cada tarjeta es un enlace `<a href="carreras/[slug].html">`

### Carreras y sus íconos

| Carrera | Slug | Ícono |
|---|---|---|
| Agroecología | `agroecologia` | 🌿 |
| Agroindustria | `agroindustria` | 🏭 |
| Contabilidad y Finanzas | `contabilidad-finanzas` | 💰 |
| Diseño Publicitario | `diseno-publicitario` | 🎨 |
| Informática en Redes | `informatica-redes` | 💻 |
| Producción Agrícola Pecuaria | `produccion-agricola-pecuaria` | 🌾 |
| Salud Ocupacional | `salud-ocupacional` | 🦺 |
| Secretariado Ejecutivo | `secretariado-ejecutivo` | 📋 |

---

## Página de carrera (`carreras/*.html`)

### Hero
- Degradado `linear-gradient(160deg, #1a237e, #c0392b)`
- Ícono emoji grande (48px)
- H1 con nombre de la carrera
- Párrafo con descripción general (contenido de la sección `## Descripción General` del `descripcion.md` de cada carrera)

### Grilla de secciones (2×2)
Tarjetas blancas con sombra, cada una con ícono, título y lista de ítems:

| Tarjeta | Ícono | Fuente de datos |
|---|---|---|
| Habilidades requeridas | ✅ | `## Habilidades Requeridas` del `.md` |
| Salida laboral | 💼 | Subsección `### Áreas de trabajo:` dentro de `## Perfil de Salida` |
| Plan de estudio | 📚 | `## Plan de Estudio` |
| Retos | ⚠️ | `## Retos a Enfrentar` |

### Botón compartir
- Ancho completo, fondo `#d4a017`, texto "📤 Compartir esta carrera"
- Usa la **Web Share API** (`navigator.share`) cuando está disponible (móvil)
- Fallback: copia la URL al portapapeles y muestra un mensaje inline debajo del botón ("¡Enlace copiado!") que desaparece a los 2 segundos

---

## Contenido

El contenido de cada carrera se extrae de los archivos existentes en:
```
documentacion/carreras/<slug>/descripcion.md
```

Cada archivo `.md` tiene secciones estructuradas que se mapean directamente a las 4 tarjetas de la grilla.

---

## Decisiones de diseño

- **Mobile-first:** optimizado para teléfonos móviles (layout vertical, tarjetas en 2 columnas solo en la grilla de secciones a partir de `360px` de ancho — aplica a prácticamente todos los smartphones modernos)
- **Sin dependencias:** no requiere Node.js, npm ni herramientas de build para funcionar
- **URLs compartibles:** cada carrera tiene su propia URL estática, compatible con compartir por WhatsApp, Instagram, etc.
- **Sin JavaScript crítico:** el sitio funciona aunque JS falle; el botón compartir es la única función JS
