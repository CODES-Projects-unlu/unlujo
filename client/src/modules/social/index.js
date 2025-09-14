// Módulo Social - UNLujo Community
// Red social interna para la comunidad estudiantil

// Componentes principales
export { default as SocialFeed } from './components/SocialFeed';
export { default as PostCard } from './components/PostCard';
export { default as PostComposer } from './components/PostComposer';
export { default as FilterBar } from './components/FilterBar';
export { default as LoadingSpinner } from './components/LoadingSpinner';
export { default as ErrorMessage } from './components/ErrorMessage';
export { default as UserProfile } from './components/UserProfile';

// Hooks
export {
  useSocialFeed,
  usePost,
  useBuscarPosts,
  usePostsPorCarrera,
  usePostsPorTipo,
  usePostsPopulares
} from './hooks/useSocialFeed';
export { useUserProfile } from './hooks/useUserProfile';

// Utilidades
export {
  formatFechaPost,
  formatFechaCompleta,
  validarPost,
  extraerHashtags,
  sugerirHashtags,
  getColorTipoPost,
  getNivelReputacion,
  formatNumero,
  calcularTotalReacciones,
  puedeEditarPost,
  puedeEliminarPost,
  generarResumenPost,
  validarNombre,
  validarBio,
  generarId,
  sanitizarContenido,
  convertirTextoAHTML,
  calcularPopularidad,
  ordenarPorPopularidad,
  filtrarPosts
} from './utils/socialUtils';

// Constantes
export {
  CHARACTER_LIMITS,
  POST_TYPES,
  REACTION_TYPES,
  CARRERA_HASHTAGS,
  TYPE_HASHTAGS,
  MATERIA_HASHTAGS,
  POST_TYPE_COLORS,
  POST_TYPE_ICONS,
  REACTION_CONFIG,
  REPUTATION_LEVELS,
  GROUP_TYPES,
  EVENT_TYPES,
  POST_STATES,
  USER_STATES,
  NOTIFICATION_TYPES,
  FILTER_OPTIONS,
  SORT_OPTIONS,
  SEARCH_OPTIONS,
  VALIDATION_RULES,
  PAGINATION,
  TIME_CONFIG,
  FILE_CONFIG,
  MODERATION_CONFIG,
  UI_CONFIG,
  COLORS,
  BREAKPOINTS,
  Z_INDEX,
  LOADING_STATES
} from './constants/socialConstants';
export * from './constants/profileConstants';

// Datos
export {
  usuariosData,
  postsData,
  gruposData,
  eventosData,
  comentariosData,
  getUsuarioById,
  getPostById,
  getGrupoById,
  getEventoById,
  getPostsByUsuario,
  getPostsByCarrera,
  getPostsByTipo,
  getGruposByCarrera,
  getEventosByCarrera,
  getComentariosByPost,
  buscarPosts,
  getPostsPopulares,
  getUsuariosPopulares
} from './data/socialData';
