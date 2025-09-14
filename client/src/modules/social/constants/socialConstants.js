// Constantes para el módulo de red social UNLujo

// Límites de caracteres
export const CHARACTER_LIMITS = {
  POST_MAX: 280,
  BIO_MAX: 160,
  COMMENT_MAX: 200,
  GROUP_DESCRIPTION_MAX: 500
};

// Tipos de posts
export const POST_TYPES = {
  ACADEMICO: 'academico',
  EVENTO: 'evento',
  PROFESIONAL: 'profesional',
  SOCIAL: 'social',
  RECURSO: 'recurso',
  DUDA: 'duda'
};

// Tipos de reacciones
export const REACTION_TYPES = {
  LIKE: 'like',
  USEFUL: 'useful',
  IMPORTANT: 'important',
  LOVE: 'love',
  LAUGH: 'laugh'
};

// Hashtags por carrera
export const CARRERA_HASHTAGS = {
  LSI: '#LSI',
  LTS: '#LTS',
  LE: '#LE'
};

// Hashtags por tipo
export const TYPE_HASHTAGS = {
  APUNTES: '#Apuntes',
  EVENTOS: '#Eventos',
  DUDAS: '#Dudas',
  GRUPO_ESTUDIO: '#GrupoEstudio',
  TRABAJO: '#Trabajo',
  PASANTIA: '#Pasantia',
  RECURSOS: '#Recursos'
};

// Hashtags por materia
export const MATERIA_HASHTAGS = {
  PROGRAMACION: '#Programacion',
  MATEMATICA: '#Matematica',
  INGLES: '#Ingles',
  SISTEMAS: '#Sistemas',
  TRABAJO_SOCIAL: '#TrabajoSocial',
  ENFERMERIA: '#Enfermeria'
};

// Colores por tipo de post
export const POST_TYPE_COLORS = {
  academico: '#3B82F6',    // Azul
  evento: '#10B981',       // Verde
  profesional: '#F59E0B',  // Amarillo
  social: '#8B5CF6',       // Púrpura
  recurso: '#EF4444',      // Rojo
  duda: '#06B6D4'          // Cian
};

// Iconos por tipo de post
export const POST_TYPE_ICONS = {
  academico: 'BookOpen',
  evento: 'Calendar',
  profesional: 'Briefcase',
  social: 'Users',
  recurso: 'FileText',
  duda: 'HelpCircle'
};

// Configuración de reacciones
export const REACTION_CONFIG = {
  like: {
    icon: 'Heart',
    color: '#EF4444',
    label: 'Me gusta'
  },
  useful: {
    icon: 'ThumbsUp',
    color: '#10B981',
    label: 'Útil'
  },
  important: {
    icon: 'Star',
    color: '#F59E0B',
    label: 'Importante'
  },
  love: {
    icon: 'Heart',
    color: '#EC4899',
    label: 'Me encanta'
  },
  laugh: {
    icon: 'Laugh',
    color: '#8B5CF6',
    label: 'Divertido'
  }
};

// Niveles de reputación
export const REPUTATION_LEVELS = {
  NUEVO: { min: 0, max: 50, name: 'Nuevo', color: '#6B7280' },
  ACTIVO: { min: 51, max: 150, name: 'Activo', color: '#3B82F6' },
  COLABORADOR: { min: 151, max: 300, name: 'Colaborador', color: '#10B981' },
  EXPERTO: { min: 301, max: 500, name: 'Experto', color: '#F59E0B' },
  MAESTRO: { min: 501, max: 1000, name: 'Maestro', color: '#8B5CF6' },
  LEGENDARIO: { min: 1001, max: Infinity, name: 'Legendario', color: '#EF4444' }
};

// Configuración de grupos
export const GROUP_TYPES = {
  ESTUDIO: 'estudio',
  MATERIA: 'materia',
  CARRERA: 'carrera',
  EVENTO: 'evento',
  GENERAL: 'general'
};

// Configuración de eventos
export const EVENT_TYPES = {
  ACADEMICO: 'academico',
  SOCIAL: 'social',
  CULTURAL: 'cultural',
  DEPORTIVO: 'deportivo',
  PROFESIONAL: 'profesional'
};

// Estados de posts
export const POST_STATES = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
  DELETED: 'deleted'
};

// Estados de usuarios
export const USER_STATES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  BANNED: 'banned'
};

// Configuración de notificaciones
export const NOTIFICATION_TYPES = {
  LIKE: 'like',
  COMMENT: 'comment',
  SHARE: 'share',
  FOLLOW: 'follow',
  MENTION: 'mention',
  EVENT: 'event',
  GROUP: 'group'
};

// Configuración de filtros
export const FILTER_OPTIONS = {
  ALL: 'all',
  FOLLOWING: 'following',
  CARRERA: 'carrera',
  TYPE: 'type',
  DATE: 'date',
  POPULAR: 'popular'
};

// Configuración de ordenamiento
export const SORT_OPTIONS = {
  RECENT: 'recent',
  POPULAR: 'popular',
  RELEVANT: 'relevant',
  OLDEST: 'oldest'
};

// Configuración de búsqueda
export const SEARCH_OPTIONS = {
  POSTS: 'posts',
  USERS: 'users',
  GROUPS: 'groups',
  EVENTS: 'events',
  HASHTAGS: 'hashtags'
};

// Configuración de estados de carga
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
};

// Configuración de validación
export const VALIDATION_RULES = {
  POST_CONTENT: {
    minLength: 1,
    maxLength: 280,
    required: true
  },
  USER_BIO: {
    minLength: 0,
    maxLength: 160,
    required: false
  },
  GROUP_NAME: {
    minLength: 3,
    maxLength: 50,
    required: true
  },
  GROUP_DESCRIPTION: {
    minLength: 0,
    maxLength: 500,
    required: false
  }
};

// Configuración de paginación
export const PAGINATION = {
  POSTS_PER_PAGE: 20,
  COMMENTS_PER_PAGE: 10,
  USERS_PER_PAGE: 15,
  GROUPS_PER_PAGE: 12
};

// Configuración de tiempo
export const TIME_CONFIG = {
  POST_EDIT_WINDOW: 5 * 60 * 1000, // 5 minutos
  POST_DELETE_WINDOW: 24 * 60 * 60 * 1000, // 24 horas
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutos
  CACHE_DURATION: 5 * 60 * 1000 // 5 minutos
};

// Configuración de archivos
export const FILE_CONFIG = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  MAX_FILES_PER_POST: 4
};

// Configuración de moderación
export const MODERATION_CONFIG = {
  AUTO_DELETE_KEYWORDS: ['spam', 'scam', 'fake'],
  REPORT_THRESHOLD: 5,
  TEMP_BAN_DURATION: 7 * 24 * 60 * 60 * 1000, // 7 días
  PERM_BAN_THRESHOLD: 3
};

// Configuración de UI
export const UI_CONFIG = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  INFINITE_SCROLL_THRESHOLD: 100,
  TOAST_DURATION: 3000
};

// Configuración de colores
export const COLORS = {
  PRIMARY: '#3B82F6',
  SECONDARY: '#10B981',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#06B6D4',
  LIGHT: '#F8FAFC',
  DARK: '#1E293B',
  GRAY: '#6B7280'
};

// Configuración de breakpoints
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px'
};

// Configuración de z-index
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070
};
