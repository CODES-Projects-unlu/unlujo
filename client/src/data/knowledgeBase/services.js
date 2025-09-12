// Servicios universitarios de UNLu para entrenar el chatbot
export const servicesData = {
  biblioteca: {
    nombre: "Biblioteca Central",
    ubicacion: "Edificio Central, Planta Baja",
    horarios: {
      lunes_viernes: "08:00-22:00",
      sabados: "08:00-18:00",
      domingos: "14:00-20:00",
      feriados: "Cerrada"
    },
    servicios: [
      "Préstamo de libros (hasta 3 libros por 15 días)",
      "Sala de estudio individual y grupal",
      "Acceso a bases de datos académicas",
      "Fotocopias e impresiones",
      "WiFi gratuito",
      "Computadoras para consulta"
    ],
    contacto: {
      telefono: "(02323) 420-400 int. 123",
      email: "biblioteca@unlu.edu.ar",
      responsable: "Lic. Ana Martínez"
    },
    catalogo: "Disponible en línea en www.unlu.edu.ar/biblioteca"
  },
  
  laboratorios: {
    informatica: {
      nombre: "Laboratorio de Informática",
      ubicacion: "Edificio de Sistemas, 2do piso",
      equipamiento: "30 computadoras, proyector, pizarra digital",
      horarios: "Lunes a Viernes 08:00-22:00",
      reservas: "Por sistema online o presencial"
    },
    enfermeria: {
      nombre: "Laboratorio de Enfermería",
      ubicacion: "Edificio de Salud, 1er piso",
      equipamiento: "Maniquíes, equipos de simulación, instrumental",
      horarios: "Lunes a Viernes 08:00-20:00"
    }
  },
  
  becas: [
    {
      id: "beca_interna",
      nombre: "Becas Estudiantiles Internas",
      descripcion: "Ayuda económica para estudiantes regulares",
      requisitos: [
        "Ser estudiante regular de la universidad",
        "Rendir al menos 2 materias por año",
        "Situación socioeconómica desfavorable",
        "No tener otra beca de similar naturaleza"
      ],
      monto: "Variable según situación (entre $15.000 y $50.000)",
      duracion: "1 año (renovable)",
      fechaApertura: "2025-03-01",
      fechaCierre: "2025-03-31",
      documentacion: [
        "Formulario de solicitud",
        "Constancia de alumno regular",
        "Certificado de ingresos familiares",
        "DNI y fotocopia"
      ],
      contacto: {
        telefono: "(02323) 420-400 int. 456",
        email: "becas@unlu.edu.ar",
        oficina: "Secretaría de Bienestar Estudiantil"
      }
    },
    {
      id: "beca_transporte",
      nombre: "Beca de Transporte",
      descripcion: "Ayuda para gastos de transporte",
      requisitos: [
        "Vivir a más de 20km de la universidad",
        "Ser estudiante regular",
        "Comprobar gastos de transporte"
      ],
      monto: "Hasta $8.000 mensuales",
      fechaApertura: "2025-03-01",
      fechaCierre: "2025-03-31"
    }
  ],
  
  deportes: {
    nombre: "Área de Deportes y Recreación",
    ubicacion: "Complejo Deportivo",
    actividades: [
      "Fútbol 11 y 5",
      "Básquet",
      "Vóley",
      "Handball",
      "Atletismo",
      "Natación",
      "Gimnasia",
      "Tenis"
    ],
    horarios: "Lunes a Viernes 08:00-22:00, Sábados 08:00-18:00",
    instalaciones: [
      "Cancha de fútbol 11",
      "2 canchas de fútbol 5",
      "Cancha de básquet",
      "Cancha de vóley",
      "Pista de atletismo",
      "Pileta climatizada"
    ],
    contacto: {
      telefono: "(02323) 420-400 int. 789",
      email: "deportes@unlu.edu.ar"
    }
  },
  
  bienestarEstudiantil: {
    nombre: "Secretaría de Bienestar Estudiantil",
    ubicacion: "Edificio Central, 1er piso",
    servicios: [
      "Orientación vocacional",
      "Apoyo psicológico",
      "Asesoramiento legal",
      "Programas de inclusión",
      "Actividades culturales"
    ],
    horarios: "Lunes a Viernes 08:00-16:00",
    contacto: {
      telefono: "(02323) 420-400 int. 321",
      email: "bienestar@unlu.edu.ar"
    }
  },
  
  tramites: [
    {
      nombre: "Certificado de Alumno Regular",
      descripcion: "Constancia de que el estudiante está inscripto regularmente",
      requisitos: [
        "Estar inscripto en al menos 2 materias",
        "No tener deudas administrativas"
      ],
      tiempo: "24-48 horas",
      costo: "Gratuito",
      donde: "Secretaría de la carrera"
    },
    {
      nombre: "Constancia de Materias Aprobadas",
      descripcion: "Listado de materias aprobadas con calificaciones",
      requisitos: [
        "Tener materias aprobadas",
        "No tener deudas administrativas"
      ],
      tiempo: "48-72 horas",
      costo: "Gratuito",
      donde: "Secretaría de la carrera"
    },
    {
      nombre: "Equivalencias",
      descripcion: "Reconocimiento de materias cursadas en otra institución",
      requisitos: [
        "Programa de la materia",
        "Certificado de aprobación",
        "Sílabo o plan de estudios"
      ],
      tiempo: "30 días hábiles",
      costo: "Gratuito",
      donde: "Secretaría Académica"
    }
  ]
};
