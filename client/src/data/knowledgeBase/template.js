// 🎯 TEMPLATE PARA AGREGAR NUEVA INFORMACIÓN AL CHATBOT
// Copia este template y rellena con la información real

export const templateData = {
  // 📚 CARRERAS - Agregar nuevas carreras aquí
  carreras: [
    {
      id: "nueva_carrera", // ID único (ej: "lsi", "lts", "le")
      nombre: "Nombre Completo de la Carrera", // Nombre oficial
      sigla: "SIGLA", // Sigla en mayúsculas (ej: "LSI")
      duracion: "X años", // Duración de la carrera
      modalidad: "Presencial", // Presencial/Remota/Híbrida
      sede: "Luján", // Luján/San Miguel/Chivilcoy
      titulo: "Título que otorga", // Título que se obtiene
      requisitos: [
        "Título secundario completo",
        "Examen de ingreso",
        "Documentación específica"
      ],
      perfil: "Descripción breve del perfil profesional",
      fechasImportantes: [
        {
          evento: "Inscripciones 2025",
          fecha: "2025-02-01", // Formato: YYYY-MM-DD
          fechaFin: "2025-02-15",
          descripcion: "Período de inscripción"
        }
      ]
    }
  ],

  // 🏢 SERVICIOS - Agregar servicios universitarios aquí
  servicios: [
    {
      id: "nuevo_servicio",
      nombre: "Nombre del Servicio",
      ubicacion: "Edificio y piso específico",
      horarios: {
        lunes_viernes: "08:00-16:00",
        sabados: "08:00-12:00",
        domingos: "Cerrado"
      },
      servicios: [
        "Lista de servicios que ofrece",
        "Otro servicio disponible"
      ],
      contacto: {
        telefono: "(02323) 420-400 int. XXX",
        email: "servicio@unlu.edu.ar",
        responsable: "Nombre del Responsable"
      }
    }
  ],

  // 💰 BECAS - Agregar becas disponibles aquí
  becas: [
    {
      id: "beca_nueva",
      nombre: "Nombre de la Beca",
      descripcion: "Descripción breve de la beca",
      requisitos: [
        "Requisito 1",
        "Requisito 2"
      ],
      monto: "Monto o descripción del beneficio",
      duracion: "Duración de la beca",
      fechaApertura: "2025-03-01", // Formato: YYYY-MM-DD
      fechaCierre: "2025-03-31",
      documentacion: [
        "Documento requerido 1",
        "Documento requerido 2"
      ],
      contacto: {
        telefono: "(02323) 420-400 int. XXX",
        email: "becas@unlu.edu.ar",
        oficina: "Oficina responsable"
      }
    }
  ],

  // 📞 CONTACTOS - Agregar contactos importantes aquí
  contactos: [
    {
      tipo: "secretaria", // secretaria/centro/servicio
      carrera: "Nombre de la Carrera",
      ubicacion: "Edificio y piso",
      telefono: "(02323) 420-400 int. XXX",
      email: "contacto@unlu.edu.ar",
      responsable: "Nombre del Responsable",
      horarios: "Lunes a Viernes 08:00-16:00"
    }
  ],

  // 📅 EVENTOS - Agregar eventos próximos aquí
  eventos: [
    {
      id: "evento_001",
      titulo: "Nombre del Evento",
      fecha: "2025-02-15", // Formato: YYYY-MM-DD
      hora: "18:00",
      lugar: "Aula Magna",
      descripcion: "Descripción del evento",
      organizador: "Carrera/Área organizadora",
      publico: "Estudiantes y docentes"
    }
  ]
};

// 📋 INSTRUCCIONES DE USO:
// 1. Copia la estructura que necesites
// 2. Reemplaza los valores de ejemplo con información real
// 3. Verifica que las fechas estén en formato YYYY-MM-DD
// 4. Confirma que los teléfonos tengan extensión
// 5. Prueba que el chatbot responda correctamente
// 6. Haz commit de tus cambios
