// Constantes para el módulo de perfil de usuario

export const PROFILE_TABS = {
  POSTS: 'posts',
  FOLLOWERS: 'seguidores',
  FOLLOWING: 'siguiendo',
  PHOTOS: 'fotos'
};

export const PROFILE_TAB_CONFIG = [
  { id: PROFILE_TABS.POSTS, label: 'Posts', icon: '📝' },
  { id: PROFILE_TABS.FOLLOWERS, label: 'Seguidores', icon: '👥' },
  { id: PROFILE_TABS.FOLLOWING, label: 'Siguiendo', icon: '👤' },
  { id: PROFILE_TABS.PHOTOS, label: 'Fotos', icon: '📸' }
];

export const PROFILE_EDIT_FIELDS = {
  NOMBRE: 'nombre',
  CARRERA: 'carrera',
  BIO: 'bio',
  UBICACION: 'ubicacion',
  SITIO_WEB: 'sitioWeb',
  FECHA_NACIMIENTO: 'fechaNacimiento'
};

export const PROFILE_STATS = {
  POSTS: 'posts',
  FOLLOWERS: 'seguidores',
  FOLLOWING: 'siguiendo'
};

export const PROFILE_ACTIONS = {
  EDIT: 'edit',
  FOLLOW: 'follow',
  UNFOLLOW: 'unfollow',
  MESSAGE: 'message'
};

export const PROFILE_LOADING_STATES = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
};

export const PROFILE_ERROR_MESSAGES = {
  USER_NOT_FOUND: 'Usuario no encontrado',
  LOAD_ERROR: 'Error al cargar el perfil',
  SAVE_ERROR: 'Error al guardar los cambios',
  FOLLOW_ERROR: 'Error al seguir/dejar de seguir'
};

export const PROFILE_SUCCESS_MESSAGES = {
  PROFILE_SAVED: 'Perfil actualizado correctamente',
  FOLLOW_SUCCESS: 'Ahora sigues a este usuario',
  UNFOLLOW_SUCCESS: 'Has dejado de seguir a este usuario'
};
