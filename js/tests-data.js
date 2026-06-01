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
// SUB-ÁREAS (desgloses internos de áreas compartidas por varias carreras)
// Cada sub-área pertenece a un área padre y comparte sus preguntas etiquetadas.
// ============================================================

const SUBAREAS = [
  { id: "finanzas-contable", padre: "finanzas",       nombre: "Contabilidad" },
  { id: "finanzas-banca",    padre: "finanzas",       nombre: "Banca" },
  { id: "agro-produccion",   padre: "agro-naturaleza", nombre: "Producción" },
  { id: "agro-ecosistema",   padre: "agro-naturaleza", nombre: "Ecosistema" },
];

// ============================================================
// PREGUNTAS DE INTERESES (40 ítems)
// Distribución: 5 preguntas en agro-naturaleza, gastronomia,
// finanzas y tecnologia; 4 preguntas en las otras 5 áreas.
// Formato: actividades en español informal (tuteo "vos")
// ============================================================

const PREGUNTAS_INTERESES = [
  // --- agro-naturaleza (5) ---
  { id: "i01", area: "agro-naturaleza", subarea: "agro-produccion",  texto: "Sembrar y cuidar plantas en un huerto o jardín" },
  { id: "i02", area: "agro-naturaleza", subarea: "agro-ecosistema",  texto: "Observar animales y aprender sobre su comportamiento en la naturaleza" },
  { id: "i03", area: "agro-naturaleza", subarea: "agro-produccion",  texto: "Salir al campo a identificar suelos, plantas o fuentes de agua" },
  { id: "i04", area: "agro-naturaleza", subarea: "agro-ecosistema",  texto: "Participar en proyectos de reforestación o conservación ambiental" },
  { id: "i05", area: "agro-naturaleza", subarea: "agro-ecosistema",  texto: "Explorar cómo producir alimentos de manera respetuosa con el ambiente" },

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
  { id: "i15", area: "finanzas", subarea: "finanzas-contable", texto: "Llevar el control de gastos e ingresos de un negocio o proyecto personal" },
  { id: "i16", area: "finanzas", subarea: "finanzas-banca",    texto: "Entender cómo funcionan los bancos, préstamos e inversiones" },
  { id: "i17", area: "finanzas", subarea: "finanzas-contable", texto: "Resolver ejercicios de matemáticas con datos de empresas o mercados" },
  { id: "i18", area: "finanzas", subarea: "finanzas-contable", texto: "Ayudar a alguien a planificar su presupuesto o ahorros" },
  { id: "i19", area: "finanzas", subarea: "finanzas-banca",    texto: "Seguir noticias económicas y entender cómo afectan a las personas" },

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

  // --- agro-naturaleza nuevas: agro-produccion (2) ---
  { id: "i41", area: "agro-naturaleza", subarea: "agro-produccion", texto: "Manejar animales bovinos, cerdos u ovejas en una finca" },
  { id: "i42", area: "agro-naturaleza", subarea: "agro-produccion", texto: "Usar drones o tecnología para el riego o la supervisión de cultivos" },

  // --- agro-naturaleza nuevas: agro-ecosistema (3) ---
  { id: "i43", area: "agro-naturaleza", subarea: "agro-ecosistema", texto: "Cultivar alimentos sin usar pesticidas ni fertilizantes químicos" },
  { id: "i44", area: "agro-naturaleza", subarea: "agro-ecosistema", texto: "Diseñar un sistema de cultivo que imite los procesos naturales de un bosque o ecosistema" },
  { id: "i45", area: "agro-naturaleza", subarea: "agro-ecosistema", texto: "Aprender sobre plantas medicinales o nativas y su rol en el ecosistema agrícola" },

  // --- finanzas nuevas: finanzas-contable (2) ---
  { id: "i46", area: "finanzas", subarea: "finanzas-contable", texto: "Revisar y cuadrar los registros contables de una empresa al cierre del mes" },
  { id: "i47", area: "finanzas", subarea: "finanzas-contable", texto: "Preparar la declaración de impuestos de un negocio siguiendo la normativa costarricense" },

  // --- finanzas nuevas: finanzas-banca (2) ---
  { id: "i48", area: "finanzas", subarea: "finanzas-banca", texto: "Asesorar a una persona sobre qué préstamo, seguro o inversión le conviene según su situación" },
  { id: "i49", area: "finanzas", subarea: "finanzas-banca", texto: "Entender cómo funciona la bolsa de valores, los fondos de inversión y los certificados a plazo" },
];

// ============================================================
// PREGUNTAS DE HABILIDADES (36 ítems, exactamente 4 por área)
// Formato: afirmaciones en primera persona
// ============================================================

const PREGUNTAS_HABILIDADES = [
  // --- agro-naturaleza (4) ---
  { id: "h01", area: "agro-naturaleza", subarea: "agro-ecosistema",  texto: "Me es fácil reconocer plantas, pájaros o insectos cuando salgo al campo, jardín o parque" },
  { id: "h02", area: "agro-naturaleza", subarea: "agro-produccion",  texto: "He participado en actividades de siembra o cosecha en un patio, jardín o finca, aunque sea una vez" },
  { id: "h03", area: "agro-naturaleza", subarea: "agro-ecosistema",  texto: "Me preocupa saber cómo acciones cotidianas (tirar basura, usar agroquímicos) afectan el suelo y el agua" },
  { id: "h04", area: "agro-naturaleza", subarea: "agro-produccion",  texto: "Puedo trabajar durante horas al aire libre en condiciones variables sin que eso me afecte" },

  // --- agroindustria (4) ---
  { id: "h05", area: "agroindustria", texto: "En la cocina de mi casa, siempre me aseguro de que los alimentos estén limpios y bien preparados" },
  { id: "h06", area: "agroindustria", texto: "Cuando hago un experimento o proyecto de ciencias, anoto todo con cuidado para no perder ningún dato" },
  { id: "h07", area: "agroindustria", texto: "Noto cuando algo no está bien hecho o le falta calidad a un producto que compro o uso" },
  { id: "h08", area: "agroindustria", texto: "Puedo seguir instrucciones paso a paso, aunque sean largas y detalladas, sin saltarme ninguna" },

  // --- gastronomia (4) ---
  { id: "h09", area: "gastronomia", texto: "Puedo seguir una receta paso a paso y ajustar cantidades de ingredientes según la porción requerida" },
  { id: "h10", area: "gastronomia", texto: "En reuniones familiares o eventos, soy de los que ayudan a atender a los invitados con amabilidad" },
  { id: "h11", area: "gastronomia", texto: "Puedo ayudar a preparar una comida en casa, calculando cuándo poner cada cosa para que todo esté listo al mismo tiempo" },
  { id: "h12", area: "gastronomia", texto: "Cuando voy al supermercado, puedo calcular cuánto me cuesta lo que compro y si el dinero me alcanza" },

  // --- finanzas (4) ---
  { id: "h13", area: "finanzas", subarea: "finanzas-contable", texto: "Llevo un registro (aunque sea en un cuaderno o en mi cabeza) de en qué gasto mi plata" },
  { id: "h14", area: "finanzas", subarea: "finanzas-banca",    texto: "Cuando reviso un recibo o factura, me fijo en los números y noto si algo no cuadra" },
  { id: "h15", area: "finanzas", subarea: "finanzas-banca",    texto: "Entiendo la diferencia entre pagar de contado y a plazos, y sé que a plazos se termina pagando más" },
  { id: "h16", area: "finanzas", subarea: "finanzas-contable", texto: "Puedo hacer un presupuesto sencillo para una compra o evento (una fiesta, un regalo grupal)" },

  // --- administracion (4) ---
  { id: "h17", area: "administracion", texto: "Puedo escribir una carta o correo claro y ordenado, cuidando la ortografía y la presentación" },
  { id: "h18", area: "administracion", texto: "En mi cuarto o mochila, tengo mis cosas organizadas de modo que sé dónde está cada cosa" },
  { id: "h19", area: "administracion", texto: "Puedo organizar una actividad grupal (un trabajo en equipo, un evento) coordinando qué hace cada quien y cuándo" },
  { id: "h20", area: "administracion", texto: "Puedo usar un procesador de texto y una hoja de cálculo básica, y enviar correos sin necesitar ayuda" },

  // --- tecnologia (4) ---
  { id: "h21", area: "tecnologia", texto: "Cuando mi celular o computadora tiene un problema, busco la solución yo mismo antes de pedirle ayuda a alguien" },
  { id: "h22", area: "tecnologia", texto: "He conectado mi casa a internet o ayudado a alguien a hacerlo, siguiendo instrucciones del proveedor" },
  { id: "h23", area: "tecnologia", texto: "Puedo instalar programas en una computadora, incluyendo controladores como los de una impresora" },
  { id: "h24", area: "tecnologia", texto: "Cuando aparece un mensaje de error en mi pantalla, lo leo con atención y trato de entender qué me está diciendo" },

  // --- diseno (4) ---
  { id: "h25", area: "diseno", texto: "He usado alguna app para editar fotos o crear contenido visual (Canva, PicsArt, Instagram) y me quedó bien" },
  { id: "h26", area: "diseno", texto: "Cuando hago una presentación, cuido que se vea ordenada: letras legibles, colores que combinan, sin exceso" },
  { id: "h27", area: "diseno", texto: "Sé ajustar el tamaño de una imagen o documento según para qué lo voy a usar (WhatsApp, imprimir, presentación)" },
  { id: "h28", area: "diseno", texto: "He diseñado un afiche, invitación o publicación para redes sociales y me quedó bien comunicado" },

  // --- salud-seguridad (4) ---
  { id: "h29", area: "salud-seguridad", texto: "En mi casa, noto cuando algo puede ser peligroso: cables pelados, cosas resbalosas, productos químicos mal guardados" },
  { id: "h30", area: "salud-seguridad", texto: "Sé qué hacer básicamente si alguien se corta, se golpea o se desmaya: pedir ayuda, no mover si es grave, hacer presión" },
  { id: "h31", area: "salud-seguridad", texto: "Puedo describir por escrito lo que pasó en un accidente, con detalles claros de qué, cuándo y cómo ocurrió" },
  { id: "h32", area: "salud-seguridad", texto: "Puedo explicarle a alguien cómo protegerse ante un peligro común: usar casco, guantes, mascarilla, cinturón" },

  // --- mecanica (4) ---
  { id: "h33", area: "mecanica", texto: "He usado herramientas básicas del hogar (martillo, destornillador, llave) para arreglar o armar algo" },
  { id: "h34", area: "mecanica", texto: "Cuando algo se rompe en casa, trato de entender por qué falló antes de intentar arreglarlo o llamar a alguien" },
  { id: "h35", area: "mecanica", texto: "Sé que los vehículos y máquinas necesitan revisiones periódicas (aceite, llantas, frenos) para no dañarse" },
  { id: "h36", area: "mecanica", texto: "Puedo seguir instrucciones escritas paso a paso para armar o reparar algo (como armar un mueble siguiendo el manual)" },

  // --- agro-naturaleza nuevas: agro-produccion (4) ---
  { id: "h37", area: "agro-naturaleza", subarea: "agro-produccion", texto: "He sembrado alguna planta en maceta o patio y la he cuidado hasta que creció" },
  { id: "h38", area: "agro-naturaleza", subarea: "agro-produccion", texto: "Me llama la atención aprender a manejar maquinaria de campo como tractores o motosierras" },
  { id: "h39", area: "agro-naturaleza", subarea: "agro-produccion", texto: "He cuidado o ayudado a cuidar animales de granja (gallinas, cerdos, vacas, truchas) en casa o en una finca" },
  { id: "h40", area: "agro-naturaleza", subarea: "agro-produccion", texto: "He vendido o ayudado a vender frutas, verduras u otros productos de la finca o huerto familiar en un mercado o feria" },

  // --- agro-naturaleza nuevas: agro-ecosistema (3) ---
  { id: "h41", area: "agro-naturaleza", subarea: "agro-ecosistema", texto: "He ayudado a sembrar plantas o cuidar un jardín/huerto en casa, en la escuela o en mi comunidad" },
  { id: "h42", area: "agro-naturaleza", subarea: "agro-ecosistema", texto: "Sé distinguir entre plantas cultivadas y plantas silvestres en mi entorno cercano" },
  { id: "h43", area: "agro-naturaleza", subarea: "agro-ecosistema", texto: "He visto o intentado controlar plagas en plantas usando métodos caseros (jabón, ajo, trampas)" },

  // --- finanzas nuevas: finanzas-contable (2) ---
  { id: "h44", area: "finanzas", subarea: "finanzas-contable", texto: "Cuando mi familia tiene ingresos y gastos, puedo ayudar a organizar cuánto entró y cuánto salió" },
  { id: "h45", area: "finanzas", subarea: "finanzas-contable", texto: "Sé que los negocios deben pagar impuestos y entiendo por qué eso es importante para el país" },

  // --- finanzas nuevas: finanzas-banca (2) ---
  { id: "h46", area: "finanzas", subarea: "finanzas-banca", texto: "Puedo explicarle a alguien en palabras simples qué significa pedir un préstamo y cuáles son los riesgos" },
  { id: "h47", area: "finanzas", subarea: "finanzas-banca", texto: "Puedo evaluar si alguien puede pagar algo según lo que gana, usando lógica y sentido común" },
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
    perfilSubareas: {
      "agro-produccion": 2,
      "agro-ecosistema": 5,
    },
    descripcion_match: "Esta carrera es ideal si te apasionan las plantas, los animales y la conservación ambiental, ya que el área de Agro / Naturaleza es el núcleo de toda la formación. También incorpora nociones de Agroindustria para el procesamiento básico de productos del campo, y de Tecnología agrícola de precisión para el manejo moderno de cultivos."
  },
  {
    id: "alimentos-bebidas",
    nombre: "Organización de Operaciones y Servicios de Alimentos y Bebidas",
    emoji: "🍴",
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
    perfilSubareas: {
      "finanzas-contable": 2,
      "finanzas-banca":    5,
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
    perfilSubareas: {
      "finanzas-contable": 5,
      "finanzas-banca":    2,
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
    emoji: "🍳",
    perfil: {
      "agro-naturaleza":  0,
      "agroindustria":    2,
      "gastronomia":      5,
      "finanzas":         2,
      "administracion":   4,
      "tecnologia":       1,
      "diseno":           1,
      "salud-seguridad":  1,
      "mecanica":         0
    },
    descripcion_match: "La Gastronomía / Servicios es el núcleo de esta carrera, con producción culinaria profesional que va desde técnicas básicas hasta alta cocina, pastelería y chocolatería. La Administración / Oficina tiene un peso alto porque el perfil incluye dirección de cocina, control de costos, gestión de operaciones y liderazgo de equipos de trabajo."
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
    perfilSubareas: {
      "agro-produccion": 5,
      "agro-ecosistema": 2,
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
      "tecnologia":       1,
      "diseno":           1,
      "salud-seguridad":  0,
      "mecanica":         0
    },
    descripcion_match: "La Administración / Oficina es el área central de esta especialidad: gestión documental, atención al cliente, redacción empresarial, organización de eventos y protocolo corporativo. Las Finanzas tienen presencia secundaria porque el plan de estudios incluye contabilidad básica, matemática financiera y estadística empresarial."
  },
];
