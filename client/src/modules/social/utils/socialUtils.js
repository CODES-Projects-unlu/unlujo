// Utilidades para el módulo de red social UNLujo
import { CHARACTER_LIMITS, POST_TYPE_COLORS, REPUTATION_LEVELS } from '../constants/socialConstants';

/**
 * Formatea una fecha para mostrar en posts
 * @param {string|Date} fecha - Fecha a formatear
 * @returns {string} - Fecha formateada
 */
export const formatFechaPost = (fecha) => {
  if (!fecha) return '';
  
  const fechaObj = new Date(fecha);
  const ahora = new Date();
  const diffTime = Math.abs(ahora - fechaObj);
  const diffMinutes = Math.ceil(diffTime / (1000 * 60));
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffMinutes < 1) return 'Ahora';
  if (diffMinutes < 60) return `Hace ${diffMinutes}m`;
  if (diffHours < 24) return `Hace ${diffHours}h`;
  if (diffDays < 7) return `Hace ${diffDays}d`;
  
  return fechaObj.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: fechaObj.getFullYear() !== ahora.getFullYear() ? 'numeric' : undefined
  });
};

/**
 * Formatea una fecha completa para mostrar en perfiles
 * @param {string|Date} fecha - Fecha a formatear
 * @returns {string} - Fecha formateada
 */
export const formatFechaCompleta = (fecha) => {
  if (!fecha) return '';
  
  const fechaObj = new Date(fecha);
  return fechaObj.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Valida el contenido de un post
 * @param {string} contenido - Contenido del post
 * @returns {object} - Resultado de la validación
 */
export const validarPost = (contenido) => {
  const errores = [];
  const advertencias = [];
  
  if (!contenido || contenido.trim().length === 0) {
    errores.push('El post no puede estar vacío');
  }
  
  if (contenido && contenido.length > CHARACTER_LIMITS.POST_MAX) {
    errores.push(`El post no puede tener más de ${CHARACTER_LIMITS.POST_MAX} caracteres`);
  }
  
  if (contenido && contenido.length > CHARACTER_LIMITS.POST_MAX * 0.9) {
    advertencias.push('Te estás acercando al límite de caracteres');
  }
  
  return {
    valido: errores.length === 0,
    errores,
    advertencias,
    caracteresRestantes: CHARACTER_LIMITS.POST_MAX - (contenido?.length || 0)
  };
};

/**
 * Extrae hashtags de un texto
 * @param {string} texto - Texto del que extraer hashtags
 * @returns {Array} - Array de hashtags encontrados
 */
export const extraerHashtags = (texto) => {
  if (!texto) return [];
  
  const hashtagRegex = /#[\w\u00c0-\u017f]+/gi;
  const hashtags = texto.match(hashtagRegex) || [];
  
  // Remover duplicados y convertir a minúsculas
  return [...new Set(hashtags.map(tag => tag.toLowerCase()))];
};

/**
 * Sugiere hashtags basados en el contenido
 * @param {string} contenido - Contenido del post
 * @param {string} carrera - Carrera del usuario
 * @returns {Array} - Array de hashtags sugeridos
 */
export const sugerirHashtags = (contenido, carrera) => {
  const sugerencias = [];
  const contenidoLower = contenido.toLowerCase();
  
  // Hashtags por carrera
  const hashtagsCarrera = {
    'LSI': ['#LSI', '#Programacion', '#Sistemas', '#Tecnologia'],
    'LTS': ['#LTS', '#TrabajoSocial', '#DerechosHumanos', '#Comunidad'],
    'LE': ['#LE', '#Enfermeria', '#Salud', '#Cuidados']
  };
  
  if (carrera && hashtagsCarrera[carrera]) {
    sugerencias.push(...hashtagsCarrera[carrera]);
  }
  
  // Hashtags por palabras clave
  const palabrasClave = {
    'apuntes': ['#Apuntes', '#Estudio'],
    'examen': ['#Examen', '#Parcial'],
    'dudas': ['#Dudas', '#Ayuda'],
    'evento': ['#Eventos', '#Actividad'],
    'trabajo': ['#Trabajo', '#Empleo'],
    'pasantia': ['#Pasantia', '#Practica'],
    'grupo': ['#GrupoEstudio', '#Colaboracion'],
    'recurso': ['#Recursos', '#Material']
  };
  
  Object.entries(palabrasClave).forEach(([palabra, hashtags]) => {
    if (contenidoLower.includes(palabra)) {
      sugerencias.push(...hashtags);
    }
  });
  
  // Remover duplicados y limitar a 5 sugerencias
  return [...new Set(sugerencias)].slice(0, 5);
};

/**
 * Obtiene el color asociado a un tipo de post
 * @param {string} tipo - Tipo de post
 * @returns {string} - Color en formato hexadecimal
 */
export const getColorTipoPost = (tipo) => {
  return POST_TYPE_COLORS[tipo] || '#6B7280';
};

/**
 * Obtiene el nivel de reputación de un usuario
 * @param {number} reputacion - Puntos de reputación
 * @returns {object} - Información del nivel
 */
export const getNivelReputacion = (reputacion) => {
  const niveles = Object.values(REPUTATION_LEVELS);
  
  for (const nivel of niveles) {
    if (reputacion >= nivel.min && reputacion <= nivel.max) {
      return nivel;
    }
  }
  
  return niveles[niveles.length - 1]; // Nivel más alto
};

/**
 * Formatea un número para mostrar (ej: 1.2K, 1.5M)
 * @param {number} numero - Número a formatear
 * @returns {string} - Número formateado
 */
export const formatNumero = (numero) => {
  if (!numero && numero !== 0) return '0';
  
  if (numero < 1000) return numero.toString();
  if (numero < 1000000) return `${(numero / 1000).toFixed(1)}K`;
  return `${(numero / 1000000).toFixed(1)}M`;
};

/**
 * Calcula el total de reacciones de un post
 * @param {object} reacciones - Objeto con las reacciones
 * @returns {number} - Total de reacciones
 */
export const calcularTotalReacciones = (reacciones) => {
  if (!reacciones) return 0;
  
  return Object.values(reacciones).reduce((total, cantidad) => total + cantidad, 0);
};

/**
 * Verifica si un usuario puede editar un post
 * @param {number} postAutorId - ID del autor del post
 * @param {number} usuarioId - ID del usuario actual
 * @param {string} fechaPost - Fecha del post
 * @returns {boolean} - True si puede editar
 */
export const puedeEditarPost = (postAutorId, usuarioId, fechaPost) => {
  // Solo el autor puede editar
  if (postAutorId !== usuarioId) return false;
  
  // Solo se puede editar en los primeros 5 minutos
  const fechaPostObj = new Date(fechaPost);
  const ahora = new Date();
  const diffTime = ahora - fechaPostObj;
  const diffMinutes = diffTime / (1000 * 60);
  
  return diffMinutes <= 5;
};

/**
 * Verifica si un usuario puede eliminar un post
 * @param {number} postAutorId - ID del autor del post
 * @param {number} usuarioId - ID del usuario actual
 * @param {string} fechaPost - Fecha del post
 * @returns {boolean} - True si puede eliminar
 */
export const puedeEliminarPost = (postAutorId, usuarioId, fechaPost) => {
  // Solo el autor puede eliminar
  if (postAutorId !== usuarioId) return false;
  
  // Solo se puede eliminar en las primeras 24 horas
  const fechaPostObj = new Date(fechaPost);
  const ahora = new Date();
  const diffTime = ahora - fechaPostObj;
  const diffHours = diffTime / (1000 * 60 * 60);
  
  return diffHours <= 24;
};

/**
 * Genera un resumen de un post para mostrar en listas
 * @param {string} contenido - Contenido del post
 * @param {number} maxLength - Longitud máxima del resumen
 * @returns {string} - Resumen del post
 */
export const generarResumenPost = (contenido, maxLength = 100) => {
  if (!contenido) return '';
  
  if (contenido.length <= maxLength) return contenido;
  
  return contenido.substring(0, maxLength).trim() + '...';
};

/**
 * Valida un nombre de usuario
 * @param {string} nombre - Nombre a validar
 * @returns {object} - Resultado de la validación
 */
export const validarNombre = (nombre) => {
  const errores = [];
  
  if (!nombre || nombre.trim().length === 0) {
    errores.push('El nombre es requerido');
  }
  
  if (nombre && nombre.length < 2) {
    errores.push('El nombre debe tener al menos 2 caracteres');
  }
  
  if (nombre && nombre.length > 50) {
    errores.push('El nombre no puede tener más de 50 caracteres');
  }
  
  return {
    valido: errores.length === 0,
    errores
  };
};

/**
 * Valida una biografía de usuario
 * @param {string} bio - Biografía a validar
 * @returns {object} - Resultado de la validación
 */
export const validarBio = (bio) => {
  const errores = [];
  
  if (bio && bio.length > CHARACTER_LIMITS.BIO_MAX) {
    errores.push(`La biografía no puede tener más de ${CHARACTER_LIMITS.BIO_MAX} caracteres`);
  }
  
  return {
    valido: errores.length === 0,
    errores,
    caracteresRestantes: CHARACTER_LIMITS.BIO_MAX - (bio?.length || 0)
  };
};

/**
 * Genera un ID único para posts, comentarios, etc.
 * @param {string} prefijo - Prefijo para el ID
 * @returns {string} - ID único
 */
export const generarId = (prefijo = 'item') => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `${prefijo}_${timestamp}_${random}`;
};

/**
 * Sanitiza el contenido de un post para prevenir XSS
 * @param {string} contenido - Contenido a sanitizar
 * @returns {string} - Contenido sanitizado
 */
export const sanitizarContenido = (contenido) => {
  if (!contenido) return '';
  
  return contenido
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Convierte texto plano a HTML con hashtags y menciones
 * @param {string} texto - Texto a convertir
 * @returns {string} - HTML generado
 */
export const convertirTextoAHTML = (texto) => {
  if (!texto) return '';
  
  return texto
    .replace(/#[\w\u00c0-\u017f]+/gi, '<span class="hashtag">$&</span>')
    .replace(/@[\w\u00c0-\u017f]+/gi, '<span class="mencion">$&</span>')
    .replace(/\n/g, '<br>');
};

/**
 * Calcula la popularidad de un post
 * @param {object} post - Post a evaluar
 * @returns {number} - Puntuación de popularidad
 */
export const calcularPopularidad = (post) => {
  if (!post) return 0;
  
  const reacciones = calcularTotalReacciones(post.reacciones);
  const comentarios = post.comentarios || 0;
  const compartidos = post.compartidos || 0;
  
  // Peso: reacciones (1), comentarios (2), compartidos (3)
  return reacciones + (comentarios * 2) + (compartidos * 3);
};

/**
 * Ordena posts por popularidad
 * @param {Array} posts - Array de posts
 * @returns {Array} - Posts ordenados por popularidad
 */
export const ordenarPorPopularidad = (posts) => {
  return [...posts].sort((a, b) => {
    const popularidadA = calcularPopularidad(a);
    const popularidadB = calcularPopularidad(b);
    return popularidadB - popularidadA;
  });
};

/**
 * Filtra posts por criterios específicos
 * @param {Array} posts - Array de posts
 * @param {object} filtros - Criterios de filtrado
 * @returns {Array} - Posts filtrados
 */
export const filtrarPosts = (posts, filtros) => {
  if (!posts || !Array.isArray(posts)) return [];
  
  return posts.filter(post => {
    // Filtro por tipo
    if (filtros.tipo && filtros.tipo !== 'all' && post.tipo !== filtros.tipo) return false;
    
    // Filtro por carrera
    if (filtros.carrera && post.autor.carrera !== filtros.carrera) return false;
    
    // Filtro por hashtag
    if (filtros.hashtag && !post.hashtags.includes(filtros.hashtag)) return false;
    
    // Filtro por búsqueda
    if (filtros.busqueda) {
      const termino = filtros.busqueda.toLowerCase();
      const contenidoMatch = post.contenido.toLowerCase().includes(termino);
      const hashtagMatch = post.hashtags.some(tag => tag.toLowerCase().includes(termino));
      if (!contenidoMatch && !hashtagMatch) return false;
    }
    
    // Filtro por fecha
    if (filtros.fechaDesde) {
      const fechaPost = new Date(post.fecha);
      const fechaDesde = new Date(filtros.fechaDesde);
      if (fechaPost < fechaDesde) return false;
    }
    
    if (filtros.fechaHasta) {
      const fechaPost = new Date(post.fecha);
      const fechaHasta = new Date(filtros.fechaHasta);
      if (fechaPost > fechaHasta) return false;
    }
    
    return true;
  });
};
