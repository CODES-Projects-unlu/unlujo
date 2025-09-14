// Datos de ejemplo para el módulo de carreras
// Este archivo contiene datos mock para desarrollo y testing

export const carrerasData = [
  {
    id: 1,
    codigo: "LSI",
    nombre: "Licenciatura en Sistemas de Información",
    descripcion: "Carrera orientada al desarrollo de software, sistemas informáticos y tecnologías de la información",
    color: "#3B82F6",
    duracion: "5 años",
    modalidad: "Presencial",
    sede: "Luján",
    titulo: "Licenciado en Sistemas de Información",
    estadisticas: {
      estudiantesActivos: 150,
      materias: 25,
      profesores: 12,
      egresados: 45,
      promedioEdad: 22,
      porcentajeMujeres: 35
    },
    noticias: [
      {
        id: 1,
        titulo: "Nueva materia: Inteligencia Artificial",
        contenido: "Se incorpora IA como materia optativa para estudiantes de 4to año. Las inscripciones están abiertas hasta el 15 de marzo.",
        fecha: "2025-01-15",
        tipo: "academico",
        prioridad: "alta"
      },
      {
        id: 2,
        titulo: "Hackathon 2025 - Inscripciones abiertas",
        contenido: "El Centro de Estudiantes organiza el Hackathon anual. Premios en efectivo y pasantías para los ganadores.",
        fecha: "2025-01-10",
        tipo: "evento",
        prioridad: "media"
      },
      {
        id: 3,
        titulo: "Nuevo laboratorio de programación",
        contenido: "Se inauguró el nuevo laboratorio con 30 computadoras de última generación para prácticas de programación.",
        fecha: "2025-01-05",
        tipo: "infraestructura",
        prioridad: "baja"
      }
    ],
    enlaces: [
      {
        id: 1,
        nombre: "Plan de Estudios",
        url: "/plan-estudios-lsi",
        tipo: "academico",
        icono: "BookOpen"
      },
      {
        id: 2,
        nombre: "Calendario Académico",
        url: "/calendario-lsi",
        tipo: "academico",
        icono: "Calendar"
      },
      {
        id: 3,
        nombre: "Reglamento Estudiantil",
        url: "/reglamento",
        tipo: "administrativo",
        icono: "FileText"
      },
      {
        id: 4,
        nombre: "Biblioteca Virtual",
        url: "/biblioteca",
        tipo: "recursos",
        icono: "Library"
      },
      {
        id: 5,
        nombre: "Centro de Estudiantes",
        url: "https://codes-unlu.github.io/Web-Codes/",
        tipo: "centro",
        icono: "Users",
        externo: true
      }
    ],
    materias: [
      {
        año: 1,
        cuatrimestre: 1,
        materias: [
          {
            codigo: "LSI-101",
            nombre: "Introducción a la Programación",
            creditos: 6,
            horarios: ["Lunes 18:00-22:00", "Miércoles 18:00-22:00"],
            aula: "Lab 1",
            profesor: "Dr. Juan Pérez"
          },
          {
            codigo: "LSI-102",
            nombre: "Matemática I",
            creditos: 6,
            horarios: ["Martes 18:00-22:00", "Jueves 18:00-22:00"],
            aula: "Aula 15",
            profesor: "Lic. María González"
          }
        ]
      },
      {
        año: 1,
        cuatrimestre: 2,
        materias: [
          {
            codigo: "LSI-103",
            nombre: "Programación Orientada a Objetos",
            creditos: 6,
            horarios: ["Lunes 18:00-22:00", "Miércoles 18:00-22:00"],
            aula: "Lab 2",
            profesor: "Ing. Carlos López"
          }
        ]
      }
    ],
    centroEstudiantes: {
      nombre: "CODES++",
      nombreCompleto: "Centro Organizado de Estudiantes de Sistemas",
      presidente: "Ana Martínez",
      vicepresidente: "Luis Rodríguez",
      contacto: {
        email: "codes@unlu.edu.ar",
        telefono: "(02323) 420-400 int. 123",
        ubicacion: "Edificio Central, 2do piso"
      },
      horarios: "Lunes a Viernes 18:00-22:00",
      actividades: [
        "Sorteos y eventos",
        "Recursos académicos",
        "Grupos de estudio",
        "Hackathons",
        "Charlas técnicas"
      ]
    }
  },
  {
    id: 2,
    codigo: "LTS",
    nombre: "Licenciatura en Trabajo Social",
    descripcion: "Carrera enfocada en la intervención social, promoción de derechos y transformación social",
    color: "#10B981",
    duracion: "5 años",
    modalidad: "Presencial",
    sede: "Luján",
    titulo: "Licenciado en Trabajo Social",
    estadisticas: {
      estudiantesActivos: 120,
      materias: 22,
      profesores: 15,
      egresados: 38,
      promedioEdad: 24,
      porcentajeMujeres: 78
    },
    noticias: [
      {
        id: 1,
        titulo: "Práctica profesional en barrios vulnerables",
        contenido: "Se abren las inscripciones para prácticas en organizaciones sociales de la zona.",
        fecha: "2025-01-12",
        tipo: "practicas",
        prioridad: "alta"
      },
      {
        id: 2,
        titulo: "Conferencia: Derechos Humanos y Trabajo Social",
        contenido: "Charla abierta con especialistas en derechos humanos el próximo viernes.",
        fecha: "2025-01-08",
        tipo: "evento",
        prioridad: "media"
      }
    ],
    enlaces: [
      {
        id: 1,
        nombre: "Plan de Estudios",
        url: "/plan-estudios-lts",
        tipo: "academico",
        icono: "BookOpen"
      },
      {
        id: 2,
        nombre: "Calendario Académico",
        url: "/calendario-lts",
        tipo: "academico",
        icono: "Calendar"
      },
      {
        id: 3,
        nombre: "Reglamento Estudiantil",
        url: "/reglamento",
        tipo: "administrativo",
        icono: "FileText"
      },
      {
        id: 4,
        nombre: "Biblioteca Virtual",
        url: "/biblioteca",
        tipo: "recursos",
        icono: "Library"
      }
    ],
    materias: [
      {
        año: 1,
        cuatrimestre: 1,
        materias: [
          {
            codigo: "LTS-101",
            nombre: "Introducción al Trabajo Social",
            creditos: 6,
            horarios: ["Lunes 18:00-22:00", "Miércoles 18:00-22:00"],
            aula: "Aula 8",
            profesor: "Lic. Patricia Fernández"
          }
        ]
      }
    ],
    centroEstudiantes: null // No tiene centro de estudiantes activo
  },
  {
    id: 3,
    codigo: "LE",
    nombre: "Licenciatura en Enfermería",
    descripcion: "Carrera orientada a la formación de profesionales de la salud con enfoque en cuidados integrales",
    color: "#EF4444",
    duracion: "5 años",
    modalidad: "Presencial",
    sede: "Luján",
    titulo: "Licenciado en Enfermería",
    estadisticas: {
      estudiantesActivos: 95,
      materias: 28,
      profesores: 18,
      egresados: 32,
      promedioEdad: 23,
      porcentajeMujeres: 85
    },
    noticias: [
      {
        id: 1,
        titulo: "Prácticas en Hospital Regional",
        contenido: "Se firmó convenio con el Hospital Regional para prácticas de estudiantes de 3er año.",
        fecha: "2025-01-14",
        tipo: "practicas",
        prioridad: "alta"
      },
      {
        id: 2,
        titulo: "Simulacros de emergencia",
        contenido: "Próximo simulacro de emergencia médica el 20 de enero en el laboratorio de simulación.",
        fecha: "2025-01-09",
        tipo: "evento",
        prioridad: "media"
      }
    ],
    enlaces: [
      {
        id: 1,
        nombre: "Plan de Estudios",
        url: "/plan-estudios-le",
        tipo: "academico",
        icono: "BookOpen"
      },
      {
        id: 2,
        nombre: "Calendario Académico",
        url: "/calendario-le",
        tipo: "academico",
        icono: "Calendar"
      },
      {
        id: 3,
        nombre: "Reglamento Estudiantil",
        url: "/reglamento",
        tipo: "administrativo",
        icono: "FileText"
      },
      {
        id: 4,
        nombre: "Biblioteca Virtual",
        url: "/biblioteca",
        tipo: "recursos",
        icono: "Library"
      }
    ],
    materias: [
      {
        año: 1,
        cuatrimestre: 1,
        materias: [
          {
            codigo: "LE-101",
            nombre: "Fundamentos de Enfermería",
            creditos: 6,
            horarios: ["Lunes 18:00-22:00", "Miércoles 18:00-22:00"],
            aula: "Lab Enfermería",
            profesor: "Lic. Rosa Mendoza"
          }
        ]
      }
    ],
    centroEstudiantes: null // No tiene centro de estudiantes activo
  }
];

// Funciones utilitarias para trabajar con los datos
export const getCarreraById = (id) => {
  return carrerasData.find(carrera => carrera.id === parseInt(id));
};

export const getCarreraByCodigo = (codigo) => {
  return carrerasData.find(carrera => carrera.codigo === codigo);
};

export const getAllCarreras = () => {
  return carrerasData;
};

export const getCarrerasConCentro = () => {
  return carrerasData.filter(carrera => carrera.centroEstudiantes !== null);
};

export const getNoticiasByCarrera = (carreraId) => {
  const carrera = getCarreraById(carreraId);
  return carrera ? carrera.noticias : [];
};

export const getEnlacesByCarrera = (carreraId) => {
  const carrera = getCarreraById(carreraId);
  return carrera ? carrera.enlaces : [];
};

export const getEstadisticasByCarrera = (carreraId) => {
  const carrera = getCarreraById(carreraId);
  return carrera ? carrera.estadisticas : null;
};





