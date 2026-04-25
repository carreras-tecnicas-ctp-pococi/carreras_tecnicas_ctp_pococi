// ============================================================
// tests-data.js — Datos del quiz vocacional para CTP Pococí
// 9 áreas · 40 preguntas de intereses · 36 de habilidades
// 12 perfiles de carreras técnicas
// ============================================================

const AREAS = [
  {
    id: "agro-naturaleza",
    nombre: "Agro / Naturaleza",
    descripcion: "Trabajar con plantas, animales y ecosistemas al aire libre. Incluye actividades relacionadas con conservación ambiental, agricultura sostenible y el cuidado de recursos naturales."
  },
  {
    id: "agroindustria",
    nombre: "Agroindustria / Calidad",
    descripcion: "Transformar materias primas agrícolas en productos de consumo con altos estándares de calidad e inocuidad. Combina conocimientos de biología, procesos industriales y control de calidad."
  },
  {
    id: "gastronomia",
    nombre: "Gastronomía / Servicios",
    descripcion: "Preparar alimentos y bebidas con técnica profesional, atender clientes y gestionar establecimientos gastronómicos. Incluye cocina, servicio de salón, barismo, coctelería y organización de eventos."
  },
  {
    id: "finanzas",
    nombre: "Finanzas",
    descripcion: "Manejar dinero, registros contables, instrumentos financieros y operaciones bancarias. Requiere precisión numérica, análisis financiero y conocimiento de legislación económica."
  },
  {
    id: "administracion",
    nombre: "Administración / Oficina",
    descripcion: "Organizar procesos, gestionar documentos, atender clientes y coordinar actividades en entornos corporativos. Combina comunicación, tecnología de oficina y habilidades interpersonales."
  },
  {
    id: "tecnologia",
    nombre: "Tecnología / Informática",
    descripcion: "Instalar, configurar y dar mantenimiento a equipos de cómputo y redes. Incluye programación, ciberseguridad, bases de datos y soporte técnico en entornos empresariales."
  },
  {
    id: "diseno",
    nombre: "Diseño / Comunicación",
    descripcion: "Crear piezas visuales que comuniquen ideas, productos o servicios de forma atractiva. Abarca diseño gráfico, fotografía publicitaria, edición de video y producción de contenido digital."
  },
  {
    id: "salud-seguridad",
    nombre: "Salud / Seguridad",
    descripcion: "Proteger el bienestar de las personas en entornos laborales mediante la identificación y control de riesgos. Incluye primeros auxilios, legislación laboral y cultura preventiva."
  },
  {
    id: "mecanica",
    nombre: "Mecánica / Técnico",
    descripcion: "Diagnosticar, reparar y dar mantenimiento a motores, sistemas mecánicos y equipos industriales. Requiere destreza manual, pensamiento analítico y trabajo en taller."
  },
];

// ============================================================
// PREGUNTAS DE INTERESES (40 ítems)
// Distribución: 5 preguntas en agro-naturaleza, gastronomia,
// finanzas y tecnologia; 4 preguntas en las otras 5 áreas.
// Formato: actividades en español informal (tuteo "vos")
// ============================================================

const PREGUNTAS_INTERESES = [
  // --- agro-naturaleza (5) ---
  { id: "i01", area: "agro-naturaleza", texto: "Sembrar y cuidar plantas en un huerto o jardín" },
  { id: "i02", area: "agro-naturaleza", texto: "Observar animales y aprender sobre su comportamiento en la naturaleza" },
  { id: "i03", area: "agro-naturaleza", texto: "Salir al campo a identificar suelos, plantas o fuentes de agua" },
  { id: "i04", area: "agro-naturaleza", texto: "Participar en proyectos de reforestación o conservación ambiental" },
  { id: "i05", area: "agro-naturaleza", texto: "Explorar cómo producir alimentos de manera respetuosa con el ambiente" },

  // --- agroindustria (4) ---
  { id: "i06", area: "agroindustria", texto: "Aprender cómo se transforma la leche o la fruta en productos de supermercado" },
  { id: "i07", area: "agroindustria", texto: "Trabajar en un laboratorio revisando muestras de alimentos" },
  { id: "i08", area: "agroindustria", texto: "Controlar que un proceso de producción cumpla con normas de higiene y calidad" },
  { id: "i09", area: "agroindustria", texto: "Investigar nuevas formas de conservar o mejorar alimentos industrializados" },

  // --- gastronomia (5) ---
  { id: "i10", area: "gastronomia", texto: "Preparar recetas nuevas y presentarlas de forma creativa" },
  { id: "i11", area: "gastronomia", texto: "Atender a personas en un restaurante o evento y hacerlas sentir bien" },
  { id: "i12", area: "gastronomia", texto: "Explorar sabores, ingredientes y técnicas de cocinas del mundo" },
  { id: "i13", area: "gastronomia", texto: "Preparar bebidas como cócteles o café de especialidad" },
  { id: "i14", area: "gastronomia", texto: "Organizar la logística de un evento gastronómico o banquete" },

  // --- finanzas (5) ---
  { id: "i15", area: "finanzas", texto: "Llevar el control de gastos e ingresos de un negocio o proyecto personal" },
  { id: "i16", area: "finanzas", texto: "Entender cómo funcionan los bancos, préstamos e inversiones" },
  { id: "i17", area: "finanzas", texto: "Resolver ejercicios de matemáticas con datos de empresas o mercados" },
  { id: "i18", area: "finanzas", texto: "Ayudar a alguien a planificar su presupuesto o ahorros" },
  { id: "i19", area: "finanzas", texto: "Seguir noticias económicas y entender cómo afectan a las personas" },

  // --- administracion (4) ---
  { id: "i20", area: "administracion", texto: "Organizar documentos, archivos y correspondencia de manera ordenada" },
  { id: "i21", area: "administracion", texto: "Atender a personas, responder consultas y brindar un servicio amable" },
  { id: "i22", area: "administracion", texto: "Redactar cartas, informes o comunicados formales" },
  { id: "i23", area: "administracion", texto: "Coordinar reuniones, agendas y eventos en una empresa u organización" },

  // --- tecnologia (5) ---
  { id: "i24", area: "tecnologia", texto: "Armar o reparar computadoras y resolver problemas técnicos" },
  { id: "i25", area: "tecnologia", texto: "Explorar cómo funciona una red de internet en un edificio o empresa" },
  { id: "i26", area: "tecnologia", texto: "Escribir código o automatizar tareas con programas" },
  { id: "i27", area: "tecnologia", texto: "Aprender sobre ciberseguridad y cómo proteger datos en internet" },
  { id: "i28", area: "tecnologia", texto: "Configurar equipos y aplicaciones para que otros puedan usarlos fácilmente" },

  // --- diseno (4) ---
  { id: "i29", area: "diseno", texto: "Crear afiches, logos o materiales visuales para proyectos o redes sociales" },
  { id: "i30", area: "diseno", texto: "Tomar fotos y editarlas para que queden atractivas" },
  { id: "i31", area: "diseno", texto: "Producir o editar videos cortos para comunicar un mensaje" },
  { id: "i32", area: "diseno", texto: "Explorar software de diseño para construir identidades visuales de marcas" },

  // --- salud-seguridad (4) ---
  { id: "i33", area: "salud-seguridad", texto: "Identificar situaciones peligrosas en un lugar de trabajo y proponer soluciones" },
  { id: "i34", area: "salud-seguridad", texto: "Aprender técnicas de primeros auxilios y saber cómo reaccionar en emergencias" },
  { id: "i35", area: "salud-seguridad", texto: "Revisar que una empresa o taller cumpla con normas de seguridad e higiene" },
  { id: "i36", area: "salud-seguridad", texto: "Capacitar a otras personas sobre cómo protegerse de riesgos en su trabajo" },

  // --- mecanica (4) ---
  { id: "i37", area: "mecanica", texto: "Desarmar y volver a armar un motor o mecanismo para entender cómo funciona" },
  { id: "i38", area: "mecanica", texto: "Usar herramientas manuales o eléctricas para reparar o construir algo" },
  { id: "i39", area: "mecanica", texto: "Diagnosticar por qué un vehículo o máquina falla y buscar la solución" },
  { id: "i40", area: "mecanica", texto: "Hacer mantenimiento preventivo de equipos para evitar que se dañen" },
];

// ============================================================
// PREGUNTAS DE HABILIDADES (36 ítems, exactamente 4 por área)
// Formato: afirmaciones en primera persona
// ============================================================

const PREGUNTAS_HABILIDADES = [
  // --- agro-naturaleza (4) ---
  { id: "h01", area: "agro-naturaleza", texto: "Puedo identificar diferentes tipos de plantas, suelos o animales en un entorno natural" },
  { id: "h02", area: "agro-naturaleza", texto: "Sé cómo planificar y ejecutar actividades de siembra o cuidado de cultivos" },
  { id: "h03", area: "agro-naturaleza", texto: "Entiendo cómo las prácticas agrícolas pueden impactar positiva o negativamente el ambiente" },
  { id: "h04", area: "agro-naturaleza", texto: "Puedo trabajar durante horas al aire libre en condiciones variables sin que eso me afecte" },

  // --- agroindustria (4) ---
  { id: "h05", area: "agroindustria", texto: "Puedo identificar si un proceso de producción de alimentos cumple con normas básicas de higiene" },
  { id: "h06", area: "agroindustria", texto: "Sé cómo registrar observaciones y resultados de manera precisa en una bitácora o formulario" },
  { id: "h07", area: "agroindustria", texto: "Entiendo cómo se aplican controles de calidad en una línea de producción industrial" },
  { id: "h08", area: "agroindustria", texto: "Puedo seguir protocolos estrictos de inocuidad y seguridad en un ambiente de laboratorio o planta" },

  // --- gastronomia (4) ---
  { id: "h09", area: "gastronomia", texto: "Puedo seguir una receta paso a paso y ajustar cantidades de ingredientes según la porción requerida" },
  { id: "h10", area: "gastronomia", texto: "Sé cómo atender a un cliente en un espacio de comida o servicio de manera amable y profesional" },
  { id: "h11", area: "gastronomia", texto: "Entiendo cómo organizar los tiempos y el espacio en una cocina para que el servicio funcione bien" },
  { id: "h12", area: "gastronomia", texto: "Puedo calcular el costo de un platillo o menú y determinar un precio de venta razonable" },

  // --- finanzas (4) ---
  { id: "h13", area: "finanzas", texto: "Puedo registrar ingresos y gastos en una hoja de cálculo o cuaderno contable sin cometer errores" },
  { id: "h14", area: "finanzas", texto: "Sé cómo interpretar un estado de cuenta bancario e identificar movimientos inusuales" },
  { id: "h15", area: "finanzas", texto: "Entiendo cómo funcionan los intereses sobre préstamos o ahorros y puedo hacer cálculos básicos" },
  { id: "h16", area: "finanzas", texto: "Puedo elaborar un presupuesto mensual para una persona o pequeña empresa" },

  // --- administracion (4) ---
  { id: "h17", area: "administracion", texto: "Puedo redactar un documento formal (carta, informe, memorándum) con claridad y sin errores ortográficos" },
  { id: "h18", area: "administracion", texto: "Sé cómo organizar archivos físicos o digitales para que cualquier persona pueda encontrar un documento fácilmente" },
  { id: "h19", area: "administracion", texto: "Entiendo cómo manejar una agenda de citas y coordinar actividades entre varias personas" },
  { id: "h20", area: "administracion", texto: "Puedo usar herramientas de oficina como Word, Excel y correo electrónico de forma eficiente" },

  // --- tecnologia (4) ---
  { id: "h21", area: "tecnologia", texto: "Puedo identificar y resolver problemas comunes en una computadora o dispositivo tecnológico" },
  { id: "h22", area: "tecnologia", texto: "Sé cómo conectar y configurar equipos de red básicos como routers o switches" },
  { id: "h23", area: "tecnologia", texto: "Entiendo cómo funciona un sistema operativo y puedo instalarlo o actualizarlo cuando es necesario" },
  { id: "h24", area: "tecnologia", texto: "Puedo leer un mensaje de error o log del sistema y deducir qué está fallando" },

  // --- diseno (4) ---
  { id: "h25", area: "diseno", texto: "Puedo usar software de edición de imágenes para retocar fotos y crear composiciones visuales" },
  { id: "h26", area: "diseno", texto: "Sé cómo aplicar principios básicos de tipografía, color y composición en un diseño" },
  { id: "h27", area: "diseno", texto: "Entiendo cómo adaptar un diseño a distintos formatos: redes sociales, impresión o pantallas" },
  { id: "h28", area: "diseno", texto: "Puedo producir una pieza visual (afiche, publicación, banner) que comunique un mensaje de forma clara y atractiva" },

  // --- salud-seguridad (4) ---
  { id: "h29", area: "salud-seguridad", texto: "Puedo identificar factores de riesgo mecánico, eléctrico o químico en un ambiente de trabajo" },
  { id: "h30", area: "salud-seguridad", texto: "Sé cómo aplicar los primeros pasos de atención en un accidente laboral antes de que llegue el personal médico" },
  { id: "h31", area: "salud-seguridad", texto: "Entiendo cómo elaborar un informe básico de incidente o accidente según las normas de seguridad" },
  { id: "h32", area: "salud-seguridad", texto: "Puedo explicarle a otras personas cómo usar correctamente el equipo de protección personal" },

  // --- mecanica (4) ---
  { id: "h33", area: "mecanica", texto: "Puedo usar herramientas de taller (llaves, calibres, multímetro) de forma segura y precisa" },
  { id: "h34", area: "mecanica", texto: "Sé cómo identificar síntomas de falla en un motor o sistema mecánico y proponer un diagnóstico" },
  { id: "h35", area: "mecanica", texto: "Entiendo cómo realizar el mantenimiento preventivo básico de un vehículo o máquina" },
  { id: "h36", area: "mecanica", texto: "Puedo leer un diagrama o manual técnico y seguir los pasos indicados para una reparación" },
];

// ============================================================
// PERFILES DE CARRERAS (12 carreras)
// Escala de relevancia por área: 0 = no relevante, 5 = central
// ============================================================

const CARRERAS = [
  {
    id: "agroecologia",
    nombre: "Agroecología",
    emoji: "🌿",
    perfil: {
      "agro-naturaleza":  5,
      "agroindustria":    2,
      "gastronomia":      0,
      "finanzas":         1,
      "administracion":   1,
      "tecnologia":       2,
      "diseno":           0,
      "salud-seguridad":  2,
      "mecanica":         1
    },
    descripcion_match: "Esta carrera es ideal si te apasionan las plantas, los animales y la conservación ambiental, ya que el área de Agro / Naturaleza es el núcleo de toda la formación. También tiene componentes de tecnología agrícola de precisión y de salud/seguridad aplicadas al trabajo en campo."
  },
  {
    id: "alimentos-bebidas",
    nombre: "Organización de Operaciones y Servicios de Alimentos y Bebidas",
    emoji: "🍽️",
    perfil: {
      "agro-naturaleza":  0,
      "agroindustria":    1,
      "gastronomia":      5,
      "finanzas":         2,
      "administracion":   3,
      "tecnologia":       1,
      "diseno":           1,
      "salud-seguridad":  1,
      "mecanica":         0
    },
    descripcion_match: "El área de Gastronomía / Servicios es el centro de esta especialidad, desde la preparación de bebidas hasta la atención en salón y la organización de eventos. La Administración / Oficina tiene un peso importante porque el perfil incluye gestión de negocios gastronómicos y emprendimiento."
  },
  {
    id: "banca-finanzas",
    nombre: "Banca y Finanzas",
    emoji: "🏦",
    perfil: {
      "agro-naturaleza":  0,
      "agroindustria":    0,
      "gastronomia":      0,
      "finanzas":         5,
      "administracion":   3,
      "tecnologia":       2,
      "diseno":           0,
      "salud-seguridad":  0,
      "mecanica":         0
    },
    descripcion_match: "Las Finanzas son el corazón de esta carrera: banca, mercado financiero, seguros y gestión de pensiones. La Administración / Oficina ocupa un segundo lugar relevante porque el técnico también desarrolla habilidades en servicio al cliente, recursos humanos y gestión empresarial."
  },
  {
    id: "configuracion-soporte",
    nombre: "Configuración y Soporte (Informática en Redes)",
    emoji: "💻",
    perfil: {
      "agro-naturaleza":  0,
      "agroindustria":    0,
      "gastronomia":      0,
      "finanzas":         0,
      "administracion":   1,
      "tecnologia":       5,
      "diseno":           1,
      "salud-seguridad":  1,
      "mecanica":         2
    },
    descripcion_match: "Tecnología / Informática es el área dominante en esta carrera, con énfasis en redes, soporte de hardware, programación y ciberseguridad. La Mecánica / Técnico tiene relevancia secundaria porque el perfil incluye trabajo práctico con equipos físicos, cableado y mantenimiento de infraestructura."
  },
  {
    id: "contabilidad-finanzas",
    nombre: "Contabilidad y Finanzas",
    emoji: "📊",
    perfil: {
      "agro-naturaleza":  0,
      "agroindustria":    0,
      "gastronomia":      0,
      "finanzas":         5,
      "administracion":   4,
      "tecnologia":       2,
      "diseno":           0,
      "salud-seguridad":  0,
      "mecanica":         0
    },
    descripcion_match: "Las Finanzas son el eje principal de esta especialidad, cubriendo contabilidad básica y avanzada, matemática financiera y legislación fiscal. La Administración / Oficina tiene un peso alto porque también se abarca recursos humanos, administración empresarial y emprendimiento."
  },
  {
    id: "diseno-publicitario",
    nombre: "Diseño Publicitario",
    emoji: "🎨",
    perfil: {
      "agro-naturaleza":  0,
      "agroindustria":    0,
      "gastronomia":      0,
      "finanzas":         0,
      "administracion":   1,
      "tecnologia":       3,
      "diseno":           5,
      "salud-seguridad":  0,
      "mecanica":         0
    },
    descripcion_match: "Diseño / Comunicación es el área central, con formación en diseño gráfico, fotografía publicitaria, edición de video y software Adobe. La Tecnología / Informática es secundaria porque el trabajo profesional depende del dominio de herramientas digitales avanzadas y plataformas de producción multimedia."
  },
  {
    id: "gerencia-produccion-cocina",
    nombre: "Gerencia y Producción en Cocina",
    emoji: "👨‍🍳",
    perfil: {
      "agro-naturaleza":  0,
      "agroindustria":    2,
      "gastronomia":      5,
      "finanzas":         2,
      "administracion":   3,
      "tecnologia":       1,
      "diseno":           1,
      "salud-seguridad":  1,
      "mecanica":         0
    },
    descripcion_match: "La Gastronomía / Servicios es el núcleo de esta carrera, con producción culinaria profesional que va desde técnicas básicas hasta alta cocina, pastelería y chocolatería. La Administración / Oficina tiene relevancia significativa porque el perfil incluye dirección de cocina, control de costos y gestión de operaciones."
  },
  {
    id: "mecanica-general",
    nombre: "Mecánica General",
    emoji: "🔧",
    perfil: {
      "agro-naturaleza":  0,
      "agroindustria":    0,
      "gastronomia":      0,
      "finanzas":         0,
      "administracion":   1,
      "tecnologia":       2,
      "diseno":           0,
      "salud-seguridad":  3,
      "mecanica":         5
    },
    descripcion_match: "Mecánica / Técnico es el área central, con formación en diagnóstico, mantenimiento y reparación de motores y sistemas mecánicos. La Salud / Seguridad tiene un peso notable porque trabajar en taller implica cumplir normas de seguridad, manejo de residuos y protección personal."
  },
  {
    id: "procesos-productivos-inspeccion",
    nombre: "Procesos Productivos e Inspección",
    emoji: "🏭",
    perfil: {
      "agro-naturaleza":  2,
      "agroindustria":    5,
      "gastronomia":      1,
      "finanzas":         1,
      "administracion":   2,
      "tecnologia":       2,
      "diseno":           0,
      "salud-seguridad":  3,
      "mecanica":         1
    },
    descripcion_match: "La Agroindustria / Calidad es el área central, con enfoque en control de calidad, inocuidad e inspección de procesos industriales alimentarios. La Salud / Seguridad ocupa un lugar destacado porque el trabajo en planta exige cumplimiento estricto de normas de higiene, seguridad y gestión ambiental."
  },
  {
    id: "produccion-agricola-pecuaria",
    nombre: "Producción Agrícola y Pecuaria",
    emoji: "🌾",
    perfil: {
      "agro-naturaleza":  5,
      "agroindustria":    2,
      "gastronomia":      0,
      "finanzas":         1,
      "administracion":   2,
      "tecnologia":       3,
      "diseno":           0,
      "salud-seguridad":  1,
      "mecanica":         1
    },
    descripcion_match: "Agro / Naturaleza es el núcleo de esta carrera, con trabajo práctico en producción animal, cultivos frutícolas y hortícolas, y manejo de suelos. La Tecnología / Informática tiene relevancia secundaria porque el perfil incluye agricultura de precisión con drones, sensores, GPS y herramientas digitales de gestión."
  },
  {
    id: "salud-ocupacional",
    nombre: "Salud Ocupacional",
    emoji: "🦺",
    perfil: {
      "agro-naturaleza":  0,
      "agroindustria":    1,
      "gastronomia":      0,
      "finanzas":         0,
      "administracion":   3,
      "tecnologia":       1,
      "diseno":           0,
      "salud-seguridad":  5,
      "mecanica":         1
    },
    descripcion_match: "La Salud / Seguridad es el eje de toda la formación: identificación de riesgos, equipo de protección personal, primeros auxilios, legislación laboral y planes de prevención. La Administración / Oficina tiene un peso relevante porque el técnico también capacita personas, elabora informes técnicos y gestiona el entorno administrativo de la seguridad."
  },
  {
    id: "secretariado-ejecutivo",
    nombre: "Secretariado Ejecutivo",
    emoji: "📋",
    perfil: {
      "agro-naturaleza":  0,
      "agroindustria":    0,
      "gastronomia":      0,
      "finanzas":         2,
      "administracion":   5,
      "tecnologia":       2,
      "diseno":           1,
      "salud-seguridad":  0,
      "mecanica":         0
    },
    descripcion_match: "La Administración / Oficina es el área central de esta especialidad: gestión documental, atención al cliente, redacción empresarial, organización de eventos y protocolo corporativo. Las Finanzas tienen presencia secundaria porque el plan de estudios incluye contabilidad básica, matemática financiera y estadística empresarial."
  },
];
