// Datos de prueba para el dashboard del Super Admin
export const mockUsers = [
  // Super Admin
  {
    id: "admin_001",
    email: "superadmin@unlu.edu.ar",
    name: "María González",
    role: "super_admin",
    carreraId: null,
    sedeId: null,
    isVerified: true,
    googleId: "google_super_admin",
    createdAt: "2024-01-15T10:00:00Z",
    lastLogin: "2025-01-15T14:30:00Z",
    notificationSettings: {
      general: true,
      carrera: false,
      sede: false,
      materias: false,
      eventos: true,
      recordatorios: true
    }
  },

  // Admins de Carrera
  {
    id: "admin_lsi_001",
    email: "admin.lsi@unlu.edu.ar",
    name: "Carlos Rodríguez",
    role: "carrera_admin",
    carreraId: "LSI",
    sedeId: "lujan",
    isVerified: true,
    googleId: "google_admin_lsi",
    createdAt: "2024-02-01T09:00:00Z",
    lastLogin: "2025-01-15T13:45:00Z",
    notificationSettings: {
      general: true,
      carrera: true,
      sede: true,
      materias: false,
      eventos: true,
      recordatorios: false
    }
  },
  {
    id: "admin_lts_001",
    email: "admin.lts@unlu.edu.ar",
    name: "Ana Martínez",
    role: "carrera_admin",
    carreraId: "LTS",
    sedeId: "lujan",
    isVerified: true,
    googleId: "google_admin_lts",
    createdAt: "2024-02-01T09:15:00Z",
    lastLogin: "2025-01-15T12:20:00Z",
    notificationSettings: {
      general: true,
      carrera: true,
      sede: true,
      materias: false,
      eventos: true,
      recordatorios: false
    }
  },
  {
    id: "admin_le_001",
    email: "admin.le@unlu.edu.ar",
    name: "Roberto Silva",
    role: "carrera_admin",
    carreraId: "LE",
    sedeId: "lujan",
    isVerified: true,
    googleId: "google_admin_le",
    createdAt: "2024-02-01T09:30:00Z",
    lastLogin: "2025-01-15T11:10:00Z",
    notificationSettings: {
      general: true,
      carrera: true,
      sede: true,
      materias: false,
      eventos: true,
      recordatorios: false
    }
  },

  // Estudiantes LSI
  {
    id: "est_001",
    email: "juan.perez@unlu.edu.ar",
    name: "Juan Pérez",
    role: "estudiante",
    carreraId: "LSI",
    sedeId: "lujan",
    isVerified: true,
    googleId: "google_juan_perez",
    createdAt: "2024-03-15T14:00:00Z",
    lastLogin: "2025-01-15T15:20:00Z",
    materiasCursando: [
      { materiaId: "LSI001", nombre: "Programación I", comision: "A" },
      { materiaId: "LSI002", nombre: "Matemática I", comision: "B" }
    ],
    notificationSettings: {
      general: true,
      carrera: true,
      sede: true,
      materias: true,
      eventos: false,
      recordatorios: true
    }
  },
  {
    id: "est_002",
    email: "sofia.garcia@unlu.edu.ar",
    name: "Sofía García",
    role: "estudiante",
    carreraId: "LSI",
    sedeId: "lujan",
    isVerified: true,
    googleId: "google_sofia_garcia",
    createdAt: "2024-03-20T10:30:00Z",
    lastLogin: "2025-01-15T14:45:00Z",
    materiasCursando: [
      { materiaId: "LSI003", nombre: "Sistemas de Información", comision: "A" },
      { materiaId: "LSI004", nombre: "Base de Datos", comision: "C" }
    ],
    notificationSettings: {
      general: true,
      carrera: true,
      sede: false,
      materias: true,
      eventos: true,
      recordatorios: true
    }
  },
  {
    id: "est_003",
    email: "miguel.lopez@unlu.edu.ar",
    name: "Miguel López",
    role: "estudiante",
    carreraId: "LSI",
    sedeId: "san_miguel",
    isVerified: true,
    googleId: "google_miguel_lopez",
    createdAt: "2024-04-01T16:20:00Z",
    lastLogin: "2025-01-15T13:15:00Z",
    materiasCursando: [
      { materiaId: "LSI001", nombre: "Programación I", comision: "B" },
      { materiaId: "LSI005", nombre: "Redes de Computadoras", comision: "A" }
    ],
    notificationSettings: {
      general: true,
      carrera: true,
      sede: true,
      materias: false,
      eventos: false,
      recordatorios: true
    }
  },
  {
    id: "est_004",
    email: "laura.martinez@unlu.edu.ar",
    name: "Laura Martínez",
    role: "estudiante",
    carreraId: "LSI",
    sedeId: "lujan",
    isVerified: false, // Pendiente de verificación
    googleId: "google_laura_martinez",
    createdAt: "2025-01-15T09:00:00Z",
    lastLogin: "2025-01-15T09:00:00Z",
    materiasCursando: [],
    notificationSettings: {
      general: true,
      carrera: false,
      sede: false,
      materias: false,
      eventos: false,
      recordatorios: false
    }
  },
  {
    id: "est_005",
    email: "diego.fernandez@unlu.edu.ar",
    name: "Diego Fernández",
    role: "estudiante",
    carreraId: "LSI",
    sedeId: "chivilcoy",
    isVerified: true,
    googleId: "google_diego_fernandez",
    createdAt: "2024-05-10T11:45:00Z",
    lastLogin: "2025-01-15T12:30:00Z",
    materiasCursando: [
      { materiaId: "LSI002", nombre: "Matemática I", comision: "A" },
      { materiaId: "LSI006", nombre: "Ingeniería de Software", comision: "B" }
    ],
    notificationSettings: {
      general: true,
      carrera: true,
      sede: true,
      materias: true,
      eventos: true,
      recordatorios: false
    }
  },

  // Estudiantes LTS
  {
    id: "est_006",
    email: "maria.rodriguez@unlu.edu.ar",
    name: "María Rodríguez",
    role: "estudiante",
    carreraId: "LTS",
    sedeId: "lujan",
    isVerified: true,
    googleId: "google_maria_rodriguez",
    createdAt: "2024-03-25T13:20:00Z",
    lastLogin: "2025-01-15T15:00:00Z",
    materiasCursando: [
      { materiaId: "LTS001", nombre: "Fundamentos del Trabajo Social", comision: "A" },
      { materiaId: "LTS002", nombre: "Psicología Social", comision: "B" }
    ],
    notificationSettings: {
      general: true,
      carrera: true,
      sede: true,
      materias: true,
      eventos: true,
      recordatorios: true
    }
  },
  {
    id: "est_007",
    email: "carlos.gutierrez@unlu.edu.ar",
    name: "Carlos Gutiérrez",
    role: "estudiante",
    carreraId: "LTS",
    sedeId: "lujan",
    isVerified: true,
    googleId: "google_carlos_gutierrez",
    createdAt: "2024-04-05T15:30:00Z",
    lastLogin: "2025-01-15T14:20:00Z",
    materiasCursando: [
      { materiaId: "LTS003", nombre: "Metodología de la Investigación", comision: "A" },
      { materiaId: "LTS004", nombre: "Políticas Sociales", comision: "C" }
    ],
    notificationSettings: {
      general: true,
      carrera: true,
      sede: false,
      materias: false,
      eventos: false,
      recordatorios: true
    }
  },
  {
    id: "est_008",
    email: "patricia.morales@unlu.edu.ar",
    name: "Patricia Morales",
    role: "estudiante",
    carreraId: "LTS",
    sedeId: "san_miguel",
    isVerified: true,
    googleId: "google_patricia_morales",
    createdAt: "2024-04-15T12:10:00Z",
    lastLogin: "2025-01-15T13:45:00Z",
    materiasCursando: [
      { materiaId: "LTS001", nombre: "Fundamentos del Trabajo Social", comision: "B" },
      { materiaId: "LTS005", nombre: "Trabajo Social Comunitario", comision: "A" }
    ],
    notificationSettings: {
      general: true,
      carrera: true,
      sede: true,
      materias: true,
      eventos: true,
      recordatorios: false
    }
  },
  {
    id: "est_009",
    email: "jorge.herrera@unlu.edu.ar",
    name: "Jorge Herrera",
    role: "estudiante",
    carreraId: "LTS",
    sedeId: "lujan",
    isVerified: false, // Pendiente de verificación
    googleId: "google_jorge_herrera",
    createdAt: "2025-01-14T16:00:00Z",
    lastLogin: "2025-01-14T16:00:00Z",
    materiasCursando: [],
    notificationSettings: {
      general: true,
      carrera: false,
      sede: false,
      materias: false,
      eventos: false,
      recordatorios: false
    }
  },
  {
    id: "est_010",
    email: "elena.castro@unlu.edu.ar",
    name: "Elena Castro",
    role: "estudiante",
    carreraId: "LTS",
    sedeId: "chivilcoy",
    isVerified: true,
    googleId: "google_elena_castro",
    createdAt: "2024-05-20T14:45:00Z",
    lastLogin: "2025-01-15T11:30:00Z",
    materiasCursando: [
      { materiaId: "LTS002", nombre: "Psicología Social", comision: "A" },
      { materiaId: "LTS006", nombre: "Práctica Profesional", comision: "B" }
    ],
    notificationSettings: {
      general: true,
      carrera: true,
      sede: true,
      materias: false,
      eventos: false,
      recordatorios: true
    }
  },

  // Estudiantes LE
  {
    id: "est_011",
    email: "andrea.torres@unlu.edu.ar",
    name: "Andrea Torres",
    role: "estudiante",
    carreraId: "LE",
    sedeId: "lujan",
    isVerified: true,
    googleId: "google_andrea_torres",
    createdAt: "2024-03-30T10:15:00Z",
    lastLogin: "2025-01-15T16:10:00Z",
    materiasCursando: [
      { materiaId: "LE001", nombre: "Fundamentos de Enfermería", comision: "A" },
      { materiaId: "LE002", nombre: "Anatomía y Fisiología", comision: "B" }
    ],
    notificationSettings: {
      general: true,
      carrera: true,
      sede: true,
      materias: true,
      eventos: true,
      recordatorios: true
    }
  },
  {
    id: "est_012",
    email: "fernando.ramirez@unlu.edu.ar",
    name: "Fernando Ramírez",
    role: "estudiante",
    carreraId: "LE",
    sedeId: "lujan",
    isVerified: true,
    googleId: "google_fernando_ramirez",
    createdAt: "2024-04-10T11:30:00Z",
    lastLogin: "2025-01-15T15:45:00Z",
    materiasCursando: [
      { materiaId: "LE003", nombre: "Farmacología", comision: "A" },
      { materiaId: "LE004", nombre: "Enfermería Médico-Quirúrgica", comision: "C" }
    ],
    notificationSettings: {
      general: true,
      carrera: true,
      sede: false,
      materias: false,
      eventos: false,
      recordatorios: true
    }
  },
  {
    id: "est_013",
    email: "isabel.vargas@unlu.edu.ar",
    name: "Isabel Vargas",
    role: "estudiante",
    carreraId: "LE",
    sedeId: "san_miguel",
    isVerified: true,
    googleId: "google_isabel_vargas",
    createdAt: "2024-04-25T13:45:00Z",
    lastLogin: "2025-01-15T14:15:00Z",
    materiasCursando: [
      { materiaId: "LE001", nombre: "Fundamentos de Enfermería", comision: "B" },
      { materiaId: "LE005", nombre: "Enfermería Pediátrica", comision: "A" }
    ],
    notificationSettings: {
      general: true,
      carrera: true,
      sede: true,
      materias: true,
      eventos: true,
      recordatorios: false
    }
  },
  {
    id: "est_014",
    email: "ricardo.mendoza@unlu.edu.ar",
    name: "Ricardo Mendoza",
    role: "estudiante",
    carreraId: "LE",
    sedeId: "lujan",
    isVerified: false, // Pendiente de verificación
    googleId: "google_ricardo_mendoza",
    createdAt: "2025-01-13T14:20:00Z",
    lastLogin: "2025-01-13T14:20:00Z",
    materiasCursando: [],
    notificationSettings: {
      general: true,
      carrera: false,
      sede: false,
      materias: false,
      eventos: false,
      recordatorios: false
    }
  },
  {
    id: "est_015",
    email: "carmen.delgado@unlu.edu.ar",
    name: "Carmen Delgado",
    role: "estudiante",
    carreraId: "LE",
    sedeId: "chivilcoy",
    isVerified: true,
    googleId: "google_carmen_delgado",
    createdAt: "2024-05-25T15:20:00Z",
    lastLogin: "2025-01-15T12:45:00Z",
    materiasCursando: [
      { materiaId: "LE002", nombre: "Anatomía y Fisiología", comision: "A" },
      { materiaId: "LE006", nombre: "Enfermería en Salud Mental", comision: "B" }
    ],
    notificationSettings: {
      general: true,
      carrera: true,
      sede: true,
      materias: false,
      eventos: false,
      recordatorios: true
    }
  },

  // Estudiantes adicionales para completar 20
  {
    id: "est_016",
    email: "pablo.sanchez@unlu.edu.ar",
    name: "Pablo Sánchez",
    role: "estudiante",
    carreraId: "LSI",
    sedeId: "lujan",
    isVerified: true,
    googleId: "google_pablo_sanchez",
    createdAt: "2024-06-01T09:30:00Z",
    lastLogin: "2025-01-15T10:20:00Z",
    materiasCursando: [
      { materiaId: "LSI007", nombre: "Inteligencia Artificial", comision: "A" }
    ],
    notificationSettings: {
      general: true,
      carrera: true,
      sede: true,
      materias: true,
      eventos: true,
      recordatorios: true
    }
  },
  {
    id: "est_017",
    email: "valeria.ruiz@unlu.edu.ar",
    name: "Valeria Ruiz",
    role: "estudiante",
    carreraId: "LTS",
    sedeId: "lujan",
    isVerified: true,
    googleId: "google_valeria_ruiz",
    createdAt: "2024-06-05T11:15:00Z",
    lastLogin: "2025-01-15T09:45:00Z",
    materiasCursando: [
      { materiaId: "LTS007", nombre: "Trabajo Social Familiar", comision: "C" }
    ],
    notificationSettings: {
      general: true,
      carrera: true,
      sede: false,
      materias: false,
      eventos: false,
      recordatorios: true
    }
  },
  {
    id: "est_018",
    email: "oscar.molina@unlu.edu.ar",
    name: "Oscar Molina",
    role: "estudiante",
    carreraId: "LE",
    sedeId: "lujan",
    isVerified: true,
    googleId: "google_oscar_molina",
    createdAt: "2024-06-10T13:00:00Z",
    lastLogin: "2025-01-15T08:30:00Z",
    materiasCursando: [
      { materiaId: "LE007", nombre: "Enfermería Geriátrica", comision: "A" }
    ],
    notificationSettings: {
      general: true,
      carrera: true,
      sede: true,
      materias: true,
      eventos: true,
      recordatorios: false
    }
  },
  {
    id: "est_019",
    email: "monica.espinoza@unlu.edu.ar",
    name: "Mónica Espinoza",
    role: "estudiante",
    carreraId: "LSI",
    sedeId: "san_miguel",
    isVerified: true,
    googleId: "google_monica_espinoza",
    createdAt: "2024-06-15T14:45:00Z",
    lastLogin: "2025-01-15T07:15:00Z",
    materiasCursando: [
      { materiaId: "LSI008", nombre: "Desarrollo Web", comision: "B" }
    ],
    notificationSettings: {
      general: true,
      carrera: true,
      sede: true,
      materias: false,
      eventos: true,
      recordatorios: true
    }
  },
  {
    id: "est_020",
    email: "hugo.aguilar@unlu.edu.ar",
    name: "Hugo Aguilar",
    role: "estudiante",
    carreraId: "LTS",
    sedeId: "chivilcoy",
    isVerified: true,
    googleId: "google_hugo_aguilar",
    createdAt: "2024-06-20T16:30:00Z",
    lastLogin: "2025-01-15T06:45:00Z",
    materiasCursando: [
      { materiaId: "LTS008", nombre: "Trabajo Social en Salud", comision: "A" }
    ],
    notificationSettings: {
      general: true,
      carrera: true,
      sede: true,
      materias: true,
      eventos: false,
      recordatorios: false
    }
  }
];

// Datos de carreras
export const mockCarreras = [
  {
    id: "LSI",
    codigo: "LSI",
    nombre: "Licenciatura en Sistemas de Información",
    descripcion: "Formación integral en tecnologías de la información",
    adminUserId: "admin_lsi_001",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "LTS",
    codigo: "LTS",
    nombre: "Licenciatura en Trabajo Social",
    descripcion: "Formación profesional para la intervención social",
    adminUserId: "admin_lts_001",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "LE",
    codigo: "LE",
    nombre: "Licenciatura en Enfermería",
    descripcion: "Formación científica y humanística para el cuidado de la salud",
    adminUserId: "admin_le_001",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z"
  }
];

// Datos de sedes
export const mockSedes = [
  {
    id: "lujan",
    codigo: "lujan",
    nombre: "Luján",
    direccion: "Ruta 5 y Constitución, Luján, Buenos Aires",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "san_miguel",
    codigo: "san_miguel",
    nombre: "San Miguel",
    direccion: "Av. Perón 2015, San Miguel, Buenos Aires",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "chivilcoy",
    codigo: "chivilcoy",
    nombre: "Chivilcoy",
    direccion: "Av. Mitre 1234, Chivilcoy, Buenos Aires",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z"
  }
];

// Estadísticas para el dashboard
export const mockStats = {
  totalUsers: 20,
  verifiedUsers: 17,
  pendingVerification: 3,
  totalNews: 10,
  activeNews: 9,
  inactiveNews: 1,
  activeUsers: 12,
  growthRate: 15.5,
  verificationRate: 85.0,
  engagementRate: 78.3
};

// Certificados pendientes de revisión
export const mockPendingCertificates = [
  {
    id: "cert_001",
    userId: "est_004",
    userName: "Laura Martínez",
    userEmail: "laura.martinez@unlu.edu.ar",
    carreraId: "LSI",
    sedeId: "lujan",
    uploadedAt: "2025-01-15T09:00:00Z",
    status: "pending",
    confidence: 95.5,
    extractedData: {
      nombre: "LAURA MARTINEZ",
      dni: "12345678",
      legajo: "179405",
      carrera: "LIC.EN SISTEMAS DE INFORMACION",
      cicloLectivo: "2024"
    }
  },
  {
    id: "cert_002",
    userId: "est_009",
    userName: "Jorge Herrera",
    userEmail: "jorge.herrera@unlu.edu.ar",
    carreraId: "LTS",
    sedeId: "lujan",
    uploadedAt: "2025-01-14T16:00:00Z",
    status: "pending",
    confidence: 88.2,
    extractedData: {
      nombre: "JORGE HERRERA",
      dni: "87654321",
      legajo: "179406",
      carrera: "LIC.EN TRABAJO SOCIAL",
      cicloLectivo: "2024"
    }
  },
  {
    id: "cert_003",
    userId: "est_014",
    userName: "Ricardo Mendoza",
    userEmail: "ricardo.mendoza@unlu.edu.ar",
    carreraId: "LE",
    sedeId: "lujan",
    uploadedAt: "2025-01-13T14:20:00Z",
    status: "pending",
    confidence: 92.1,
    extractedData: {
      nombre: "RICARDO MENDOZA",
      dni: "11223344",
      legajo: "179407",
      carrera: "LIC.EN ENFERMERIA",
      cicloLectivo: "2024"
    }
  }
];

// Actividad reciente
export const mockRecentActivity = [
  {
    id: "act_001",
    type: "user_registered",
    message: "Juan Pérez se registró como estudiante de LSI",
    timestamp: "2025-01-15T15:20:00Z",
    userId: "est_001"
  },
  {
    id: "act_002",
    type: "news_published",
    message: "Nueva noticia publicada en LSI: 'Nuevo laboratorio de computación'",
    timestamp: "2025-01-15T14:30:00Z",
    userId: "admin_lsi_001"
  },
  {
    id: "act_003",
    type: "user_verified",
    message: "15 usuarios verificados automáticamente",
    timestamp: "2025-01-15T13:45:00Z",
    userId: "admin_001"
  },
  {
    id: "act_004",
    type: "certificate_uploaded",
    message: "Laura Martínez subió certificado para verificación",
    timestamp: "2025-01-15T09:00:00Z",
    userId: "est_004"
  }
];

// Noticias para el Super Admin
export const mockNews = [
  {
    id: "news_001",
    titulo: "Elecciones Generales UNLu 2025",
    contenido: "El Consejo Superior convocó a elecciones generales de la Universidad para el día 12 de noviembre de 2025 para elegir fórmulas de candidatos/as a Rector/a y Vicerrector/a. La participación estudiantil es fundamental para el futuro de nuestra institución.",
    categoria: "institucional",
    imagen: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop&crop=center",
    fecha: "2025-01-15",
    fechaCaducidad: "2025-11-15",
    destacada: true,
    activa: true,
    autorId: "admin_001",
    autorNombre: "María González",
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z"
  },
  {
    id: "news_002",
    titulo: "Becas Estudiantiles Internas 2026",
    contenido: "Hasta el 12 de octubre próximo se encuentra abierta la inscripción de aspirantes a Becas Estudiantiles Internas 2026. Los estudiantes pueden consultar los requisitos y formularios en la página web de la universidad.",
    categoria: "academico",
    imagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&crop=center",
    fecha: "2025-01-12",
    fechaCaducidad: "2025-10-12",
    destacada: false,
    activa: true,
    autorId: "admin_001",
    autorNombre: "María González",
    createdAt: "2025-01-12T14:30:00Z",
    updatedAt: "2025-01-12T14:30:00Z"
  },
  {
    id: "news_003",
    titulo: "Workshop SIED III en la UNLu",
    contenido: "La UNLu será sede del Workshop SIED III sobre 'Debates, perspectivas y desafíos de los modelos de gestión en los sistemas institucionales de educación a distancia'. El evento contará con destacados especialistas del área.",
    categoria: "academico",
    imagen: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop&crop=center",
    fecha: "2025-01-10",
    fechaCaducidad: "2025-12-31",
    destacada: false,
    activa: true,
    autorId: "admin_lsi_001",
    autorNombre: "Carlos Rodríguez",
    createdAt: "2025-01-10T09:15:00Z",
    updatedAt: "2025-01-10T09:15:00Z"
  },
  {
    id: "news_004",
    titulo: "2° Encuentro por los Derechos de los Niños",
    contenido: "Se realizará en la UNLu el 18 y 19 de septiembre el Segundo Encuentro Regional por los Derechos de los Niños, Niñas y Adolescentes. La actividad es organizada por la carrera de Trabajo Social.",
    categoria: "eventos",
    imagen: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop&crop=center",
    fecha: "2025-01-08",
    fechaCaducidad: "2025-09-20",
    destacada: false,
    activa: true,
    autorId: "admin_lts_001",
    autorNombre: "Ana Martínez",
    createdAt: "2025-01-08T16:20:00Z",
    updatedAt: "2025-01-08T16:20:00Z"
  },
  {
    id: "news_005",
    titulo: "Encuesta de factores de riesgo",
    contenido: "El miércoles 24 de septiembre se realizará la actividad extracurricular 'Encuesta y medición de factores de riesgo de la población de la Universidad Nacional de Luján'. Participación voluntaria para estudiantes de todas las carreras.",
    categoria: "salud",
    imagen: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop&crop=center",
    fecha: "2025-01-05",
    fechaCaducidad: "2025-09-25",
    destacada: false,
    activa: true,
    autorId: "admin_le_001",
    autorNombre: "Roberto Silva",
    createdAt: "2025-01-05T11:45:00Z",
    updatedAt: "2025-01-05T11:45:00Z"
  },
  {
    id: "news_006",
    titulo: "Cursos de posgrado disponibles",
    contenido: "Se encuentran abiertas las inscripciones al Curso de Posgrado 'Abordaje integral de la discapacidad' a cargo de la Esp. Marcela Bel. Dirigido a profesionales del área de salud y educación.",
    categoria: "academico",
    imagen: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop&crop=center",
    fecha: "2025-01-03",
    fechaCaducidad: "2025-12-31",
    destacada: false,
    activa: true,
    autorId: "admin_001",
    autorNombre: "María González",
    createdAt: "2025-01-03T13:30:00Z",
    updatedAt: "2025-01-03T13:30:00Z"
  },
  {
    id: "news_007",
    titulo: "Nuevo laboratorio de computación",
    contenido: "Se inauguró el nuevo laboratorio de computación en la sede de Luján, equipado con las últimas tecnologías para estudiantes de Sistemas de Información. El laboratorio cuenta con 30 computadoras de última generación.",
    categoria: "academico",
    imagen: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop&crop=center",
    fecha: "2025-01-01",
    fechaCaducidad: "2025-12-31",
    destacada: true,
    activa: true,
    autorId: "admin_lsi_001",
    autorNombre: "Carlos Rodríguez",
    createdAt: "2025-01-01T10:00:00Z",
    updatedAt: "2025-01-01T10:00:00Z"
  },
  {
    id: "news_008",
    titulo: "Torneo de fútbol inter-carreras",
    contenido: "Se realizará el torneo de fútbol inter-carreras los días 15 y 16 de febrero. Inscripciones abiertas hasta el 10 de febrero. Premios para los primeros tres puestos.",
    categoria: "deportes",
    imagen: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=400&fit=crop&crop=center",
    fecha: "2024-12-28",
    fechaCaducidad: "2025-02-17",
    destacada: false,
    activa: true,
    autorId: "admin_001",
    autorNombre: "María González",
    createdAt: "2024-12-28T15:20:00Z",
    updatedAt: "2024-12-28T15:20:00Z"
  },
  {
    id: "news_009",
    titulo: "Mantenimiento programado del sistema",
    contenido: "El sistema de gestión académica estará en mantenimiento el domingo 20 de enero de 02:00 a 06:00. Durante este período no estará disponible el acceso a calificaciones y trámites.",
    categoria: "general",
    imagen: "",
    fecha: "2024-12-25",
    fechaCaducidad: "2025-01-21",
    destacada: false,
    activa: false,
    autorId: "admin_001",
    autorNombre: "María González",
    createdAt: "2024-12-25T12:00:00Z",
    updatedAt: "2024-12-25T12:00:00Z"
  },
  {
    id: "news_010",
    titulo: "Conferencia sobre inteligencia artificial",
    contenido: "El Dr. Juan Pérez dictará una conferencia sobre 'Inteligencia Artificial en la Educación' el próximo viernes 25 de enero a las 18:00 en el Aula Magna. Entrada libre y gratuita.",
    categoria: "academico",
    imagen: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop&crop=center",
    fecha: "2024-12-20",
    fechaCaducidad: "2025-01-26",
    destacada: false,
    activa: true,
    autorId: "admin_lsi_001",
    autorNombre: "Carlos Rodríguez",
    createdAt: "2024-12-20T09:30:00Z",
    updatedAt: "2024-12-20T09:30:00Z"
  }
];

// Notificaciones Push para el Super Admin
export const mockNotifications = [
  {
    id: "notif_001",
    titulo: "Nuevo laboratorio inaugurado",
    mensaje: "Se inauguró el nuevo laboratorio de computación en la sede de Luján",
    audiencia: "todos",
    carreraId: null,
    sedeId: null,
    urgencia: "normal",
    programada: false,
    fechaProgramacion: null,
    horaProgramacion: null,
    enviada: true,
    fechaEnvio: "2025-01-15T10:30:00Z",
    destinatarios: "Todos los usuarios (1,200)",
    leida: 1150,
    clickeada: 45
  },
  {
    id: "notif_002",
    titulo: "Becas 2026 - Últimos días",
    mensaje: "Solo quedan 3 días para inscribirse a las Becas Estudiantiles Internas 2026",
    audiencia: "todos",
    carreraId: null,
    sedeId: null,
    urgencia: "alta",
    programada: false,
    fechaProgramacion: null,
    horaProgramacion: null,
    enviada: true,
    fechaEnvio: "2025-01-12T14:00:00Z",
    destinatarios: "Todos los usuarios (1,200)",
    leida: 1180,
    clickeada: 89
  },
  {
    id: "notif_003",
    titulo: "Workshop SIED III - Recordatorio",
    mensaje: "No olvides inscribirte al Workshop SIED III que se realizará mañana",
    audiencia: "carrera",
    carreraId: "lsi",
    sedeId: null,
    urgencia: "normal",
    programada: false,
    fechaProgramacion: null,
    horaProgramacion: null,
    enviada: true,
    fechaEnvio: "2025-01-09T09:15:00Z",
    destinatarios: "Carrera: Lic. en Sistemas de Información (150)",
    leida: 142,
    clickeada: 23
  },
  {
    id: "notif_004",
    titulo: "Mantenimiento programado",
    mensaje: "El sistema estará en mantenimiento el domingo de 02:00 a 06:00",
    audiencia: "todos",
    carreraId: null,
    sedeId: null,
    urgencia: "baja",
    programada: false,
    fechaProgramacion: null,
    horaProgramacion: null,
    enviada: true,
    fechaEnvio: "2025-01-05T12:00:00Z",
    destinatarios: "Todos los usuarios (1,200)",
    leida: 980,
    clickeada: 12
  },
  {
    id: "notif_005",
    titulo: "Torneo de fútbol - Inscripciones abiertas",
    mensaje: "Se realizará el torneo inter-carreras los días 15 y 16 de febrero",
    audiencia: "sede",
    carreraId: null,
    sedeId: "lujan",
    urgencia: "normal",
    programada: false,
    fechaProgramacion: null,
    horaProgramacion: null,
    enviada: true,
    fechaEnvio: "2024-12-28T15:20:00Z",
    destinatarios: "Sede: Luján (400)",
    leida: 320,
    clickeada: 67
  },
  {
    id: "notif_006",
    titulo: "Conferencia IA - Mañana 18:00",
    mensaje: "Conferencia sobre Inteligencia Artificial en la Educación en el Aula Magna",
    audiencia: "carrera",
    carreraId: "lsi",
    sedeId: null,
    urgencia: "normal",
    programada: false,
    fechaProgramacion: null,
    horaProgramacion: null,
    enviada: true,
    fechaEnvio: "2024-12-24T09:30:00Z",
    destinatarios: "Carrera: Lic. en Sistemas de Información (150)",
    leida: 138,
    clickeada: 34
  }
];
