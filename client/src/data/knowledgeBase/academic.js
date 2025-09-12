// Datos académicos reales de UNLu para entrenar el chatbot
export const academicData = {
  carreras: [
    {
      id: "lsi",
      nombre: "Licenciatura en Sistemas de Información",
      sigla: "LSI",
      duracion: "5 años",
      modalidad: "Presencial",
      sede: "Luján",
      titulo: "Licenciado en Sistemas de Información",
      requisitos: [
        "Título secundario completo",
        "Examen de ingreso (Matemática y Lógica)",
        "Documentación completa",
        "Certificado de aptitud psicofísica"
      ],
      perfil: "Formación integral en desarrollo de software, gestión de sistemas informáticos y tecnologías de la información",
      materias: [
        {
          año: 1,
          cuatrimestre: 1,
          materias: [
            {
              codigo: "11071",
              nombre: "Introducción a la Programación",
              horas_semanales: 6,
              horas_totales: 96,
              correlatividad: "--------",
              horarios: ["Lunes 18:00-22:00", "Miércoles 18:00-22:00"],
              aula: "Lab. de Sistemas 1",
              profesor: "Dr. Juan Pérez",
              modalidad: "Presencial"
            },
            {
              codigo: "11072",
              nombre: "Álgebra y Lógica Computacional",
              horas_semanales: 6,
              horas_totales: 96,
              correlatividad: "--------",
              horarios: ["Martes 18:00-22:00", "Jueves 18:00-22:00"],
              aula: "Aula 15",
              profesor: "Lic. María González",
              modalidad: "Presencial"
            },
            {
              codigo: "21056",
              nombre: "Introducción a los Sistemas de Información",
              horas_semanales: 6,
              horas_totales: 96,
              correlatividad: "--------",
              horarios: ["Viernes 18:00-22:00"],
              aula: "Aula 20",
              profesor: "Lic. Carlos Mendoza",
              modalidad: "Presencial"
            },
            {
              codigo: "41407",
              nombre: "Organización de Computadoras",
              horas_semanales: 4,
              horas_totales: 64,
              correlatividad: "--------",
              horarios: ["Sábado 08:00-12:00"],
              aula: "Lab. de Hardware",
              profesor: "Ing. Ana Rodríguez",
              modalidad: "Presencial"
            }
          ]
        },
        {
          año: 1,
          cuatrimestre: 2,
          materias: [
            {
              codigo: "11073",
              nombre: "Matemática Discreta",
              horas_semanales: 6,
              horas_totales: 96,
              correlatividad: "11072",
              horarios: ["Lunes 18:00-22:00", "Miércoles 18:00-22:00"],
              aula: "Aula 15",
              profesor: "Lic. María González",
              modalidad: "Presencial"
            },
            {
              codigo: "11074",
              nombre: "Programación I",
              horas_semanales: 6,
              horas_totales: 96,
              correlatividad: "11071",
              horarios: ["Martes 18:00-22:00", "Jueves 18:00-22:00"],
              aula: "Lab. de Sistemas 1",
              profesor: "Dr. Juan Pérez",
              modalidad: "Presencial"
            },
            {
              codigo: "41406",
              nombre: "Arquitectura de Computadoras",
              horas_semanales: 6,
              horas_totales: 96,
              correlatividad: "41407",
              horarios: ["Viernes 18:00-22:00"],
              aula: "Lab. de Hardware",
              profesor: "Ing. Ana Rodríguez",
              modalidad: "Presencial"
            },
            {
              codigo: "31971",
              nombre: "Inglés I",
              horas_semanales: 4,
              horas_totales: 64,
              correlatividad: "---------",
              horarios: ["Sábado 08:00-12:00"],
              aula: "Aula 25",
              profesor: "Prof. Laura Silva",
              modalidad: "Presencial"
            }
          ]
        }
      ],
      fechasImportantes: [
        {
          evento: "Inscripciones 2025",
          fecha: "2025-02-01",
          fechaFin: "2025-02-15",
          descripcion: "Inscripción a materias del primer cuatrimestre"
        },
        {
          evento: "Examen de Ingreso",
          fecha: "2025-01-20",
          descripcion: "Examen de ingreso para nuevos estudiantes"
        }
      ]
    },
    {
      id: "lts",
      nombre: "Licenciatura en Trabajo Social",
      sigla: "LTS",
      duracion: "4 años",
      modalidad: "Presencial",
      sede: "Luján",
      titulo: "Licenciado en Trabajo Social",
      requisitos: [
        "Título secundario completo",
        "Entrevista personal",
        "Documentación completa",
        "Certificado de aptitud psicofísica"
      ],
      perfil: "Formación para la intervención social, comunitaria y promoción del bienestar social",
      fechasImportantes: [
        {
          evento: "Inscripciones 2025",
          fecha: "2025-02-01",
          fechaFin: "2025-02-15",
          descripcion: "Inscripción a materias del primer cuatrimestre"
        }
      ]
    },
    {
      id: "le",
      nombre: "Licenciatura en Enfermería",
      sigla: "LE",
      duracion: "4 años",
      modalidad: "Presencial",
      sede: "Luján",
      titulo: "Licenciado en Enfermería",
      requisitos: [
        "Título secundario completo",
        "Examen de ingreso (Biología y Química)",
        "Documentación completa",
        "Certificado de aptitud psicofísica"
      ],
      perfil: "Formación profesional en cuidados de la salud y atención al paciente",
      fechasImportantes: [
        {
          evento: "Inscripciones 2025",
          fecha: "2025-02-01",
          fechaFin: "2025-02-15",
          descripcion: "Inscripción a materias del primer cuatrimestre"
        }
      ]
    }
  ],
  
  horariosGenerales: {
    cursada: {
      primerCuatrimestre: "Marzo - Julio",
      segundoCuatrimestre: "Agosto - Diciembre"
    },
    examenes: {
      parciales: "Abril y Octubre",
      finales: "Julio y Diciembre",
      recuperatorios: "Agosto y Febrero"
    }
  },
  
  calendarioAcademico: {
    "2025": [
      {
        mes: "Febrero",
        eventos: [
          { fecha: "01-02", evento: "Inicio de inscripciones" },
          { fecha: "15-02", evento: "Cierre de inscripciones" },
          { fecha: "20-02", evento: "Examen de ingreso" }
        ]
      },
      {
        mes: "Marzo",
        eventos: [
          { fecha: "01-03", evento: "Inicio de clases" },
          { fecha: "24-03", evento: "Día Nacional de la Memoria" }
        ]
      }
    ]
  }
};
