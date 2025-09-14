// Datos mock para el módulo de red social UNLujo

// Usuarios de ejemplo
export const usuariosData = [
  {
    id: 1,
    nombre: 'Ana Martínez',
    apellido: 'González',
    carrera: 'LSI',
    año: 3,
    foto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Estudiante de LSI, apasionada por el desarrollo web y la IA',
    reputacion: 245,
    seguidores: 89,
    siguiendo: 156,
    fechaRegistro: '2023-03-15',
    estado: 'active',
    posts: 23,
    grupos: ['Programación Web', 'IA y Machine Learning']
  },
  {
    id: 2,
    nombre: 'Carlos López',
    apellido: 'Rodríguez',
    carrera: 'LTS',
    año: 2,
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Trabajador social en formación, comprometido con la justicia social',
    reputacion: 189,
    seguidores: 67,
    siguiendo: 98,
    fechaRegistro: '2023-08-20',
    estado: 'active',
    posts: 18,
    grupos: ['Intervención Social', 'Derechos Humanos']
  },
  {
    id: 3,
    nombre: 'María Fernández',
    apellido: 'Silva',
    carrera: 'LE',
    año: 4,
    foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Futura enfermera, especializada en cuidados intensivos',
    reputacion: 312,
    seguidores: 124,
    siguiendo: 203,
    fechaRegistro: '2022-09-10',
    estado: 'active',
    posts: 31,
    grupos: ['Enfermería Intensiva', 'Salud Comunitaria']
  },
  {
    id: 4,
    nombre: 'Diego Ruiz',
    apellido: 'Mendoza',
    carrera: 'LSI',
    año: 1,
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Nuevo en LSI, aprendiendo programación desde cero',
    reputacion: 45,
    seguidores: 12,
    siguiendo: 45,
    fechaRegistro: '2024-02-01',
    estado: 'active',
    posts: 8,
    grupos: ['Programación Básica']
  },
  {
    id: 5,
    nombre: 'Diego Ramírez',
    apellido: 'Torres',
    carrera: 'LSI',
    año: 2,
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    bio: 'Estudiante de LSI, enfocado en desarrollo web y móvil',
    reputacion: 178,
    seguidores: 45,
    siguiendo: 78,
    fechaRegistro: '2023-05-12',
    estado: 'active',
    posts: 15,
    grupos: ['Desarrollo Web', 'Programación Móvil']
  },
  {
    id: 6,
    nombre: 'Sofia Herrera',
    apellido: 'Vega',
    carrera: 'LTS',
    año: 3,
    foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    bio: 'Trabajadora social especializada en infancia y adolescencia',
    reputacion: 267,
    seguidores: 92,
    siguiendo: 134,
    fechaRegistro: '2022-11-08',
    estado: 'active',
    posts: 22,
    grupos: ['Infancia', 'Adolescencia', 'Derechos Humanos']
  },
  {
    id: 7,
    nombre: 'Lucas Morales',
    apellido: 'Jiménez',
    carrera: 'LE',
    año: 2,
    foto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    bio: 'Estudiante de enfermería, apasionado por la salud comunitaria',
    reputacion: 156,
    seguidores: 38,
    siguiendo: 67,
    fechaRegistro: '2023-09-15',
    estado: 'active',
    posts: 12,
    grupos: ['Salud Comunitaria', 'Enfermería General']
  },
  {
    id: 8,
    nombre: 'Valentina Castro',
    apellido: 'Rojas',
    carrera: 'LSI',
    año: 4,
    foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    bio: 'Estudiante avanzada de LSI, especializada en inteligencia artificial',
    reputacion: 389,
    seguidores: 156,
    siguiendo: 203,
    fechaRegistro: '2021-08-20',
    estado: 'active',
    posts: 28,
    grupos: ['Inteligencia Artificial', 'Machine Learning', 'Data Science']
  }
];

// Posts de ejemplo
export const postsData = [
  {
    id: 1,
    autor: {
      id: 1,
      nombre: 'Ana Martínez',
      apellido: 'González',
      carrera: 'LSI',
      foto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    contenido: '¿Alguien tiene apuntes de Algoritmos y Estructuras de Datos? Tengo parcial la semana que viene y necesito repasar los árboles binarios 🌳 #LSI #Apuntes #Algoritmos',
    tipo: 'academico',
    hashtags: ['#LSI', '#Apuntes', '#Algoritmos'],
    fecha: '2025-01-15T10:30:00Z',
    reacciones: {
      like: 12,
      useful: 8,
      important: 3,
      love: 2,
      laugh: 1
    },
    comentarios: 5,
    compartidos: 3,
    estado: 'published',
    imagen: null,
    grupo: null
  },
  {
    id: 2,
    autor: {
      id: 2,
      nombre: 'Carlos López',
      apellido: 'Rodríguez',
      carrera: 'LTS',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    contenido: '¡Increíble charla sobre derechos humanos en la facultad! Gracias a todos los que participaron. La próxima semana tenemos otra sobre violencia de género 🎯 #LTS #Eventos #DerechosHumanos',
    tipo: 'evento',
    hashtags: ['#LTS', '#Eventos', '#DerechosHumanos'],
    fecha: '2025-01-14T16:45:00Z',
    reacciones: {
      like: 18,
      useful: 15,
      important: 7,
      love: 4,
      laugh: 0
    },
    comentarios: 8,
    compartidos: 12,
    estado: 'published',
    imagen: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop',
    grupo: null
  },
  {
    id: 3,
    autor: {
      id: 3,
      nombre: 'María Fernández',
      apellido: 'Silva',
      carrera: 'LE',
      foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    contenido: 'Comparto este recurso súper útil sobre técnicas de vendaje que encontré. Me ayudó mucho en las prácticas clínicas 🩹 #LE #Recursos #Enfermeria',
    tipo: 'recurso',
    hashtags: ['#LE', '#Recursos', '#Enfermeria'],
    fecha: '2025-01-13T14:20:00Z',
    reacciones: {
      like: 25,
      useful: 22,
      important: 9,
      love: 6,
      laugh: 1
    },
    comentarios: 12,
    compartidos: 18,
    estado: 'published',
    imagen: null,
    grupo: null
  },
  {
    id: 4,
    autor: {
      id: 4,
      nombre: 'Diego Ruiz',
      apellido: 'Mendoza',
      carrera: 'LSI',
      foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    contenido: 'Primer día de clases de Programación I y ya estoy perdido 😅 ¿Algún veterano que me pueda dar una mano? #LSI #Dudas #Programacion',
    tipo: 'duda',
    hashtags: ['#LSI', '#Dudas', '#Programacion'],
    fecha: '2025-01-12T09:15:00Z',
    reacciones: {
      like: 8,
      useful: 5,
      important: 2,
      love: 3,
      laugh: 4
    },
    comentarios: 15,
    compartidos: 2,
    estado: 'published',
    imagen: null,
    grupo: null
  },
  {
    id: 5,
    autor: {
      id: 1,
      nombre: 'Ana Martínez',
      apellido: 'González',
      carrera: 'LSI',
      foto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    contenido: '¡Hackathon de fin de semana! ¿Quién se suma? Vamos a desarrollar una app para ayudar a estudiantes con horarios y materias. Pizza y café incluidos 🍕☕ #LSI #Eventos #Hackathon',
    tipo: 'evento',
    hashtags: ['#LSI', '#Eventos', '#Hackathon'],
    fecha: '2025-01-11T20:30:00Z',
    reacciones: {
      like: 32,
      useful: 18,
      important: 12,
      love: 8,
      laugh: 2
    },
    comentarios: 22,
    compartidos: 28,
    estado: 'published',
    imagen: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
    grupo: null
  },
  {
    id: 6,
    autor: {
      id: 3,
      nombre: 'María Fernández',
      apellido: 'Silva',
      carrera: 'LE',
      foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    contenido: '¡Feliz de compartir que aprobé el examen de Farmacología! Gracias a todos los que me ayudaron a estudiar. Ahora a por Anatomía 💪 #LE #Examenes #Farmacologia',
    tipo: 'social',
    hashtags: ['#LE', '#Examenes', '#Farmacologia'],
    fecha: '2025-01-14T16:45:00Z',
    reacciones: {
      like: 28,
      useful: 15,
      important: 8,
      love: 12,
      laugh: 3
    },
    comentarios: 18,
    compartidos: 7,
    estado: 'published',
    imagen: null,
    grupo: null
  },
  {
    id: 7,
    autor: {
      id: 2,
      nombre: 'Carlos López',
      apellido: 'Rodríguez',
      carrera: 'LTS',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    contenido: '¿Alguien conoce buenos lugares para hacer las prácticas de campo? Estoy buscando opciones en el área de salud mental 🧠 #LTS #Practicas #SaludMental',
    tipo: 'duda',
    hashtags: ['#LTS', '#Practicas', '#SaludMental'],
    fecha: '2025-01-14T14:20:00Z',
    reacciones: {
      like: 9,
      useful: 12,
      important: 5,
      love: 2,
      laugh: 1
    },
    comentarios: 11,
    compartidos: 4,
    estado: 'published',
    imagen: null,
    grupo: null
  },
  {
    id: 8,
    autor: {
      id: 1,
      nombre: 'Ana Martínez',
      apellido: 'González',
      carrera: 'LSI',
      foto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    contenido: 'Comparto este tutorial de React que me ayudó mucho con el proyecto final. Espero que les sirva a otros compañeros! 🚀 #LSI #React #Tutorial #Programacion',
    tipo: 'recurso',
    hashtags: ['#LSI', '#React', '#Tutorial', '#Programacion'],
    fecha: '2025-01-14T12:15:00Z',
    reacciones: {
      like: 35,
      useful: 42,
      important: 18,
      love: 8,
      laugh: 2
    },
    comentarios: 25,
    compartidos: 31,
    estado: 'published',
    imagen: 'https://images.unsplash.com/photo-1633356122544-f134324a6cce?w=400&h=200&fit=crop',
    grupo: null
  },
  {
    id: 9,
    autor: {
      id: 5,
      nombre: 'Diego Ramírez',
      apellido: 'Torres',
      carrera: 'LSI',
      foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    contenido: '¡Primera clase de Base de Datos y ya estoy emocionado! Los profesores explican súper bien. ¿Algún consejo para esta materia? #LSI #BaseDeDatos #PrimerAño',
    tipo: 'social',
    hashtags: ['#LSI', '#BaseDeDatos', '#PrimerAño'],
    fecha: '2025-01-14T09:30:00Z',
    reacciones: {
      like: 15,
      useful: 8,
      important: 3,
      love: 5,
      laugh: 7
    },
    comentarios: 12,
    compartidos: 3,
    estado: 'published',
    imagen: null,
    grupo: null
  },
  {
    id: 10,
    autor: {
      id: 3,
      nombre: 'María Fernández',
      apellido: 'Silva',
      carrera: 'LE',
      foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    contenido: '¡Charla sobre cuidados paliativos mañana a las 18hs en el aula magna! Invitamos a todos los estudiantes de enfermería. Habrá certificado de asistencia 📋 #LE #Eventos #CuidadosPaliativos',
    tipo: 'evento',
    hashtags: ['#LE', '#Eventos', '#CuidadosPaliativos'],
    fecha: '2025-01-13T20:00:00Z',
    reacciones: {
      like: 22,
      useful: 18,
      important: 12,
      love: 6,
      laugh: 1
    },
    comentarios: 16,
    compartidos: 19,
    estado: 'published',
    imagen: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop',
    grupo: null
  },
  {
    id: 11,
    autor: {
      id: 2,
      nombre: 'Carlos López',
      apellido: 'Rodríguez',
      carrera: 'LTS',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    contenido: 'Reflexión del día: La empatía es la base del trabajo social. Cada persona tiene su historia y merece ser escuchada sin prejuicios 💙 #LTS #Reflexion #TrabajoSocial',
    tipo: 'social',
    hashtags: ['#LTS', '#Reflexion', '#TrabajoSocial'],
    fecha: '2025-01-13T17:30:00Z',
    reacciones: {
      like: 41,
      useful: 28,
      important: 15,
      love: 19,
      laugh: 2
    },
    comentarios: 23,
    compartidos: 14,
    estado: 'published',
    imagen: null,
    grupo: null
  },
  {
    id: 12,
    autor: {
      id: 1,
      nombre: 'Ana Martínez',
      apellido: 'González',
      carrera: 'LSI',
      foto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    contenido: '¿Alguien más está teniendo problemas con la conexión del laboratorio de computación? No puedo acceder a los servidores para el proyecto 😤 #LSI #ProblemasTecnicos #Laboratorio',
    tipo: 'duda',
    hashtags: ['#LSI', '#ProblemasTecnicos', '#Laboratorio'],
    fecha: '2025-01-13T15:45:00Z',
    reacciones: {
      like: 8,
      useful: 5,
      important: 2,
      love: 1,
      laugh: 3
    },
    comentarios: 9,
    compartidos: 2,
    estado: 'published',
    imagen: null,
    grupo: null
  },
  {
    id: 13,
    autor: {
      id: 5,
      nombre: 'Diego Ramírez',
      apellido: 'Torres',
      carrera: 'LSI',
      foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    contenido: '¡Encontré este curso gratuito de Python que está genial! Perfecto para complementar lo que vemos en clase. Se los dejo por si les interesa 🐍 #LSI #Python #Cursos #Programacion',
    tipo: 'recurso',
    hashtags: ['#LSI', '#Python', '#Cursos', '#Programacion'],
    fecha: '2025-01-13T13:20:00Z',
    reacciones: {
      like: 29,
      useful: 35,
      important: 12,
      love: 7,
      laugh: 1
    },
    comentarios: 18,
    compartidos: 22,
    estado: 'published',
    imagen: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=200&fit=crop',
    grupo: null
  },
  {
    id: 14,
    autor: {
      id: 3,
      nombre: 'María Fernández',
      apellido: 'Silva',
      carrera: 'LE',
      foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    contenido: '¡Primer día de prácticas en el hospital! Estoy nerviosa pero emocionada. Los pacientes son muy amables y los profesionales nos enseñan mucho 🏥 #LE #Practicas #Hospital',
    tipo: 'social',
    hashtags: ['#LE', '#Practicas', '#Hospital'],
    fecha: '2025-01-13T11:00:00Z',
    reacciones: {
      like: 33,
      useful: 19,
      important: 8,
      love: 16,
      laugh: 4
    },
    comentarios: 21,
    compartidos: 8,
    estado: 'published',
    imagen: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop',
    grupo: null
  },
  {
    id: 15,
    autor: {
      id: 2,
      nombre: 'Carlos López',
      apellido: 'Rodríguez',
      carrera: 'LTS',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    contenido: '¡Taller de primeros auxilios psicológicos el viernes! Es gratuito y abierto a todas las carreras. Los cupos son limitados así que anótense rápido 🆘 #LTS #Eventos #PrimerosAuxilios #TodasLasCarreras',
    tipo: 'evento',
    hashtags: ['#LTS', '#Eventos', '#PrimerosAuxilios', '#TodasLasCarreras'],
    fecha: '2025-01-12T19:30:00Z',
    reacciones: {
      like: 47,
      useful: 38,
      important: 25,
      love: 12,
      laugh: 3
    },
    comentarios: 31,
    compartidos: 28,
    estado: 'published',
    imagen: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=200&fit=crop',
    grupo: null
  }
];

// Grupos de ejemplo
export const gruposData = [
  {
    id: 1,
    nombre: 'Programación Web',
    descripcion: 'Grupo para compartir recursos y dudas sobre desarrollo web',
    tipo: 'materia',
    carrera: 'LSI',
    miembros: 45,
    posts: 23,
    creadoPor: 1,
    fechaCreacion: '2024-09-15',
    hashtags: ['#Programacion', '#Web', '#LSI'],
    imagen: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop'
  },
  {
    id: 2,
    nombre: 'Intervención Social',
    descripcion: 'Espacio para discutir casos y técnicas de intervención social',
    tipo: 'materia',
    carrera: 'LTS',
    miembros: 38,
    posts: 19,
    creadoPor: 2,
    fechaCreacion: '2024-08-20',
    hashtags: ['#TrabajoSocial', '#Intervencion', '#LTS'],
    imagen: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300&h=200&fit=crop'
  },
  {
    id: 3,
    nombre: 'Enfermería Intensiva',
    descripcion: 'Grupo para estudiantes interesados en cuidados intensivos',
    tipo: 'especializacion',
    carrera: 'LE',
    miembros: 52,
    posts: 31,
    creadoPor: 3,
    fechaCreacion: '2024-07-10',
    hashtags: ['#Enfermeria', '#Intensivos', '#LE'],
    imagen: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop'
  },
  {
    id: 4,
    nombre: 'Eventos UNLujo',
    descripcion: 'Grupo para organizar y compartir eventos universitarios',
    tipo: 'general',
    carrera: 'TODAS',
    miembros: 156,
    posts: 67,
    creadoPor: 1,
    fechaCreacion: '2024-06-01',
    hashtags: ['#Eventos', '#UNLujo', '#General'],
    imagen: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=300&h=200&fit=crop'
  }
];

// Eventos de ejemplo
export const eventosData = [
  {
    id: 1,
    titulo: 'Hackathon UNLujo 2025',
    descripcion: 'Competencia de programación de 48 horas para desarrollar soluciones innovadoras',
    tipo: 'academico',
    fecha: '2025-02-15T09:00:00Z',
    fechaFin: '2025-02-17T18:00:00Z',
    ubicacion: 'Aula Magna - UNLujo',
    organizador: {
      id: 1,
      nombre: 'Ana Martínez',
      carrera: 'LSI'
    },
    asistentes: 45,
    maxAsistentes: 100,
    costo: 0,
    requisitos: 'Estudiante de LSI, conocimientos básicos de programación',
    hashtags: ['#Hackathon', '#Programacion', '#LSI'],
    imagen: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
    estado: 'activo'
  },
  {
    id: 2,
    titulo: 'Charla: Derechos Humanos en el Trabajo Social',
    descripcion: 'Conferencia sobre la importancia de los derechos humanos en la práctica profesional',
    tipo: 'academico',
    fecha: '2025-01-25T18:00:00Z',
    fechaFin: '2025-01-25T20:00:00Z',
    ubicacion: 'Aula 15 - UNLujo',
    organizador: {
      id: 2,
      nombre: 'Carlos López',
      carrera: 'LTS'
    },
    asistentes: 23,
    maxAsistentes: 50,
    costo: 0,
    requisitos: 'Estudiante de LTS o carreras afines',
    hashtags: ['#DerechosHumanos', '#TrabajoSocial', '#LTS'],
    imagen: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop',
    estado: 'activo'
  },
  {
    id: 3,
    titulo: 'Taller de Primeros Auxilios',
    descripcion: 'Taller práctico de técnicas básicas de primeros auxilios',
    tipo: 'academico',
    fecha: '2025-02-01T14:00:00Z',
    fechaFin: '2025-02-01T17:00:00Z',
    ubicacion: 'Laboratorio de Enfermería - UNLujo',
    organizador: {
      id: 3,
      nombre: 'María Fernández',
      carrera: 'LE'
    },
    asistentes: 18,
    maxAsistentes: 25,
    costo: 0,
    requisitos: 'Estudiante de LE o carreras de salud',
    hashtags: ['#PrimerosAuxilios', '#Enfermeria', '#LE'],
    imagen: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop',
    estado: 'activo'
  }
];

// Comentarios de ejemplo
export const comentariosData = [
  {
    id: 1,
    postId: 1,
    autor: {
      id: 2,
      nombre: 'Carlos López',
      apellido: 'Rodríguez',
      carrera: 'LTS',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    contenido: 'Yo tengo unos apuntes muy buenos de esa materia, te los puedo pasar',
    fecha: '2025-01-15T11:00:00Z',
    reacciones: {
      like: 3,
      useful: 2,
      important: 0,
      love: 1,
      laugh: 0
    }
  },
  {
    id: 2,
    postId: 1,
    autor: {
      id: 4,
      nombre: 'Diego Ruiz',
      apellido: 'Mendoza',
      carrera: 'LSI',
      foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    contenido: 'También necesito esos apuntes, ¿me los podrías compartir?',
    fecha: '2025-01-15T11:30:00Z',
    reacciones: {
      like: 1,
      useful: 0,
      important: 0,
      love: 0,
      laugh: 0
    }
  },
  {
    id: 16,
    autor: {
      id: 6,
      nombre: 'Sofia Herrera',
      apellido: 'Vega',
      carrera: 'LTS',
      foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    },
    contenido: '¡Excelente charla sobre derechos de la infancia! Es fundamental que como futuros trabajadores sociales conozcamos estas herramientas 💙 #LTS #DerechosInfancia #TrabajoSocial',
    tipo: 'evento',
    hashtags: ['#LTS', '#DerechosInfancia', '#TrabajoSocial'],
    fecha: '2025-01-15T08:45:00Z',
    reacciones: {
      like: 22,
      useful: 15,
      important: 8,
      love: 12,
      laugh: 3
    },
    comentarios: 4,
    compartidos: 7,
    estado: 'published',
    imagen: null,
    grupo: null
  },
  {
    id: 17,
    autor: {
      id: 7,
      nombre: 'Lucas Morales',
      apellido: 'Jiménez',
      carrera: 'LE',
      foto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
    },
    contenido: 'Comparto este protocolo de primeros auxilios que me ayudó mucho en las prácticas. Espero que les sirva a mis compañeros de enfermería 🩹 #LE #PrimerosAuxilios #Protocolos',
    tipo: 'recurso',
    hashtags: ['#LE', '#PrimerosAuxilios', '#Protocolos'],
    fecha: '2025-01-15T07:20:00Z',
    reacciones: {
      like: 18,
      useful: 25,
      important: 12,
      love: 8,
      laugh: 2
    },
    comentarios: 6,
    compartidos: 12,
    estado: 'published',
    imagen: null,
    grupo: null
  },
  {
    id: 18,
    autor: {
      id: 8,
      nombre: 'Valentina Castro',
      apellido: 'Rojas',
      carrera: 'LSI',
      foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
    },
    contenido: '¡Proyecto de IA terminado! Desarrollamos un sistema de recomendación para la biblioteca universitaria. Muy contenta con los resultados 🤖 #LSI #IA #ProyectoFinal #MachineLearning',
    tipo: 'social',
    hashtags: ['#LSI', '#IA', '#ProyectoFinal', '#MachineLearning'],
    fecha: '2025-01-14T21:30:00Z',
    reacciones: {
      like: 45,
      useful: 32,
      important: 18,
      love: 28,
      laugh: 5
    },
    comentarios: 12,
    compartidos: 18,
    estado: 'published',
    imagen: null,
    grupo: null
  }
];

// Funciones utilitarias para trabajar con los datos
export const getUsuarioById = (id) => {
  return usuariosData.find(usuario => usuario.id === parseInt(id));
};

export const getPostById = (id) => {
  return postsData.find(post => post.id === parseInt(id));
};

export const getGrupoById = (id) => {
  return gruposData.find(grupo => grupo.id === parseInt(id));
};

export const getEventoById = (id) => {
  return eventosData.find(evento => evento.id === parseInt(id));
};

export const getPostsByUsuario = (usuarioId) => {
  return postsData.filter(post => post.autor.id === parseInt(usuarioId));
};

export const getPostsByCarrera = (carrera) => {
  return postsData.filter(post => post.autor.carrera === carrera);
};

export const getPostsByTipo = (tipo) => {
  return postsData.filter(post => post.tipo === tipo);
};

export const getGruposByCarrera = (carrera) => {
  return gruposData.filter(grupo => grupo.carrera === carrera || grupo.carrera === 'TODAS');
};

export const getEventosByCarrera = (carrera) => {
  return eventosData.filter(evento => evento.organizador.carrera === carrera);
};

export const getComentariosByPost = (postId) => {
  return comentariosData.filter(comentario => comentario.postId === parseInt(postId));
};

export const buscarPosts = (termino) => {
  const terminoLower = termino.toLowerCase();
  return postsData.filter(post => 
    post.contenido.toLowerCase().includes(terminoLower) ||
    post.hashtags.some(hashtag => hashtag.toLowerCase().includes(terminoLower))
  );
};

export const getPostsPopulares = () => {
  return [...postsData].sort((a, b) => {
    const totalA = a.reacciones.like + a.reacciones.useful + a.reacciones.important;
    const totalB = b.reacciones.like + b.reacciones.useful + b.reacciones.important;
    return totalB - totalA;
  });
};

export const getUsuariosPopulares = () => {
  return [...usuariosData].sort((a, b) => b.seguidores - a.seguidores);
};
