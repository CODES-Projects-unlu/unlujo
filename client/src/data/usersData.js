// Datos de usuarios con roles jerárquicos para UNLujo

export const usuariosData = [
  // SUPER ADMIN
  {
    id: 1,
    nombre: 'Alejandro',
    apellido: 'Rodríguez',
    carrera: 'ADMIN',
    año: null,
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Super Administrador del sistema UNLujo. Coordinador general de la plataforma estudiantil.',
    reputacion: 1000,
    seguidores: 500,
    siguiendo: 50,
    fechaRegistro: '2022-01-01',
    estado: 'active',
    posts: 45,
    grupos: ['Administración', 'Gestión'],
    rol: 'super_admin',
    permisos: ['all'],
    // Datos adicionales del perfil general
    email: 'alejandro.rodriguez@unlu.edu.ar',
    telefono: '+54 9 11 1234-5678',
    fechaNacimiento: '1985-03-15',
    direccion: 'Av. Constitución 1234',
    ciudad: 'Luján',
    codigoPostal: '6700',
    dni: '12345678',
    añoIngreso: 2022,
    estadoAcademico: 'Activo',
    materiasCursando: []
  },

  // ADMIN LSI
  {
    id: 2,
    nombre: 'Sofia',
    apellido: 'González',
    carrera: 'Licenciatura en Sistemas de Información',
    año: null,
    foto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Administradora de LSI. Coordinadora de la carrera de Licenciatura en Sistemas de Información.',
    reputacion: 850,
    seguidores: 200,
    siguiendo: 30,
    fechaRegistro: '2022-03-15',
    estado: 'active',
    posts: 28,
    grupos: ['LSI', 'Tecnología', 'Administración'],
    rol: 'admin_carrera',
    permisos: ['lsi'],
    // Datos adicionales del perfil general
    email: 'sofia.gonzalez@unlu.edu.ar',
    telefono: '+54 9 11 2345-6789',
    fechaNacimiento: '1990-07-22',
    direccion: 'Calle San Martín 567',
    ciudad: 'Luján',
    codigoPostal: '6700',
    dni: '23456789',
    añoIngreso: 2022,
    estadoAcademico: 'Activo',
    materiasCursando: []
  },

  // ADMIN LTS
  {
    id: 3,
    nombre: 'Diego',
    apellido: 'Martínez',
    carrera: 'LTS',
    año: null,
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Administrador de LTS. Coordinador de la carrera de Licenciatura en Trabajo Social.',
    reputacion: 800,
    seguidores: 180,
    siguiendo: 25,
    fechaRegistro: '2022-04-10',
    estado: 'active',
    posts: 22,
    grupos: ['LTS', 'Trabajo Social', 'Administración'],
    rol: 'admin_carrera',
    permisos: ['lts']
  },

  // ADMIN LE
  {
    id: 4,
    nombre: 'Valentina',
    apellido: 'Silva',
    carrera: 'LE',
    año: null,
    foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Administradora de LE. Coordinadora de la carrera de Licenciatura en Enfermería.',
    reputacion: 820,
    seguidores: 190,
    siguiendo: 28,
    fechaRegistro: '2022-05-20',
    estado: 'active',
    posts: 25,
    grupos: ['LE', 'Enfermería', 'Administración'],
    rol: 'admin_carrera',
    permisos: ['le']
  },

  // USUARIOS LSI (5 estudiantes)
  {
    id: 5,
    nombre: 'Ana',
    apellido: 'García',
    carrera: 'LSI',
    año: 3,
    foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    bio: 'Estudiante de LSI, apasionada por el desarrollo web y la IA',
    reputacion: 245,
    seguidores: 89,
    siguiendo: 156,
    fechaRegistro: '2023-03-15',
    estado: 'active',
    posts: 23,
    grupos: ['Programación Web', 'IA y Machine Learning'],
    rol: 'estudiante'
  },
  {
    id: 6,
    nombre: 'Lucas',
    apellido: 'Fernández',
    carrera: 'LSI',
    año: 2,
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    bio: 'Desarrollador full-stack en formación. Me encanta crear soluciones innovadoras',
    reputacion: 180,
    seguidores: 45,
    siguiendo: 78,
    fechaRegistro: '2023-08-20',
    estado: 'active',
    posts: 15,
    grupos: ['Desarrollo Web', 'Base de Datos'],
    rol: 'estudiante'
  },
  {
    id: 7,
    nombre: 'Camila',
    apellido: 'Rodríguez',
    carrera: 'LSI',
    año: 4,
    foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    bio: 'Especialista en ciberseguridad y desarrollo de aplicaciones móviles',
    reputacion: 320,
    seguidores: 120,
    siguiendo: 95,
    fechaRegistro: '2022-09-10',
    estado: 'active',
    posts: 35,
    grupos: ['Ciberseguridad', 'Mobile Development'],
    rol: 'estudiante'
  },
  {
    id: 8,
    nombre: 'Mateo',
    apellido: 'López',
    carrera: 'LSI',
    año: 1,
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Nuevo en LSI, aprendiendo programación y algoritmos',
    reputacion: 50,
    seguidores: 12,
    siguiendo: 45,
    fechaRegistro: '2024-03-01',
    estado: 'active',
    posts: 8,
    grupos: ['Programación Básica', 'Algoritmos'],
    rol: 'estudiante'
  },
  {
    id: 9,
    nombre: 'Isabella',
    apellido: 'Martín',
    carrera: 'LSI',
    año: 3,
    foto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Interesada en IA y machine learning. Participante activa en hackathones',
    reputacion: 280,
    seguidores: 95,
    siguiendo: 110,
    fechaRegistro: '2023-02-28',
    estado: 'active',
    posts: 28,
    grupos: ['Machine Learning', 'Hackathones'],
    rol: 'estudiante'
  },

  // USUARIOS LTS (5 estudiantes)
  {
    id: 10,
    nombre: 'Carlos',
    apellido: 'Herrera',
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
    grupos: ['Intervención Social', 'Derechos Humanos'],
    rol: 'estudiante'
  },
  {
    id: 11,
    nombre: 'María',
    apellido: 'Castro',
    carrera: 'LTS',
    año: 3,
    foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Especializada en trabajo social comunitario y políticas públicas',
    reputacion: 220,
    seguidores: 75,
    siguiendo: 85,
    fechaRegistro: '2023-01-15',
    estado: 'active',
    posts: 22,
    grupos: ['Trabajo Comunitario', 'Políticas Públicas'],
    rol: 'estudiante'
  },
  {
    id: 12,
    nombre: 'Javier',
    apellido: 'Morales',
    carrera: 'LTS',
    año: 4,
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    bio: 'Futuro trabajador social especializado en niñez y adolescencia',
    reputacion: 195,
    seguidores: 58,
    siguiendo: 72,
    fechaRegistro: '2022-11-10',
    estado: 'active',
    posts: 19,
    grupos: ['Niñez y Adolescencia', 'Familia'],
    rol: 'estudiante'
  },
  {
    id: 13,
    nombre: 'Lucía',
    apellido: 'Vega',
    carrera: 'LTS',
    año: 1,
    foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    bio: 'Nueva en LTS, interesada en intervención social y derechos humanos',
    reputacion: 45,
    seguidores: 15,
    siguiendo: 35,
    fechaRegistro: '2024-02-15',
    estado: 'active',
    posts: 6,
    grupos: ['Derechos Humanos', 'Intervención Social'],
    rol: 'estudiante'
  },
  {
    id: 14,
    nombre: 'Roberto',
    apellido: 'Jiménez',
    carrera: 'LTS',
    año: 3,
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Enfocado en trabajo social con adultos mayores y discapacidad',
    reputacion: 175,
    seguidores: 52,
    siguiendo: 68,
    fechaRegistro: '2023-05-20',
    estado: 'active',
    posts: 16,
    grupos: ['Adultos Mayores', 'Discapacidad'],
    rol: 'estudiante'
  },

  // USUARIOS LE (5 estudiantes)
  {
    id: 15,
    nombre: 'Elena',
    apellido: 'Torres',
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
    grupos: ['Cuidados Intensivos', 'Salud Comunitaria'],
    rol: 'estudiante'
  },
  {
    id: 16,
    nombre: 'Andrés',
    apellido: 'Ramos',
    carrera: 'LE',
    año: 2,
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Estudiante de enfermería interesado en emergencias y trauma',
    reputacion: 165,
    seguidores: 48,
    siguiendo: 75,
    fechaRegistro: '2023-07-10',
    estado: 'active',
    posts: 14,
    grupos: ['Emergencias', 'Trauma'],
    rol: 'estudiante'
  },
  {
    id: 17,
    nombre: 'Paola',
    apellido: 'Díaz',
    carrera: 'LE',
    año: 3,
    foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    bio: 'Especializada en enfermería pediátrica y cuidados neonatales',
    reputacion: 240,
    seguidores: 88,
    siguiendo: 95,
    fechaRegistro: '2023-01-20',
    estado: 'active',
    posts: 24,
    grupos: ['Enfermería Pediátrica', 'Neonatología'],
    rol: 'estudiante'
  },
  {
    id: 18,
    nombre: 'Fernando',
    apellido: 'Gutiérrez',
    carrera: 'LE',
    año: 1,
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    bio: 'Nuevo en enfermería, aprendiendo los fundamentos del cuidado',
    reputacion: 35,
    seguidores: 18,
    siguiendo: 42,
    fechaRegistro: '2024-03-05',
    estado: 'active',
    posts: 5,
    grupos: ['Fundamentos de Enfermería', 'Anatomía'],
    rol: 'estudiante'
  },
  {
    id: 19,
    nombre: 'Natalia',
    apellido: 'Ortega',
    carrera: 'LE',
    año: 3,
    foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    bio: 'Interesada en enfermería geriátrica y cuidados paliativos',
    reputacion: 200,
    seguidores: 72,
    siguiendo: 85,
    fechaRegistro: '2023-03-01',
    estado: 'active',
    posts: 20,
    grupos: ['Enfermería Geriátrica', 'Cuidados Paliativos'],
    rol: 'estudiante'
  }
];

// Funciones de utilidad para roles
export const getUserRole = (usuario) => {
  return usuario?.rol || 'estudiante';
};

export const isSuperAdmin = (usuario) => {
  return getUserRole(usuario) === 'super_admin';
};

export const isAdminCarrera = (usuario) => {
  return getUserRole(usuario) === 'admin_carrera';
};

export const isEstudiante = (usuario) => {
  return getUserRole(usuario) === 'estudiante';
};

export const canManageCarrera = (usuario, carrera) => {
  if (isSuperAdmin(usuario)) return true;
  if (isAdminCarrera(usuario) && usuario.carrera === carrera) return true;
  return false;
};

export const getUsersByRole = (rol) => {
  return usuariosData.filter(usuario => usuario.rol === rol);
};

export const getUsersByCarrera = (carrera) => {
  return usuariosData.filter(usuario => usuario.carrera === carrera);
};

export const getAdminsByCarrera = (carrera) => {
  return usuariosData.filter(usuario => 
    usuario.rol === 'admin_carrera' && usuario.carrera === carrera
  );
};
