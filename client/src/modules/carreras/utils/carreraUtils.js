// Utilidades para el módulo de carreras
import { CARRERA_COLORS, CARRERA_ICONS, ESTADISTICAS_CONFIG } from '../constants/carrerasConstants';

/**
 * Formatea el nombre de una carrera para mostrar
 * @param {string} nombre - Nombre completo de la carrera
 * @returns {string} - Nombre formateado
 */
export const formatCarreraName = (nombre) => {
  if (!nombre) return '';
  return nombre.replace(/Licenciatura en/g, 'Lic. en');
};

/**
 * Obtiene el color asociado a una carrera
 * @param {string} codigo - Código de la carrera
 * @returns {string} - Color en formato hexadecimal
 */
export const getCarreraColor = (codigo) => {
  return CARRERA_COLORS[codigo] || '#6B7280';
};

/**
 * Obtiene el icono asociado a una carrera
 * @param {string} codigo - Código de la carrera
 * @returns {string} - Nombre del icono
 */
export const getCarreraIcon = (codigo) => {
  return CARRERA_ICONS[codigo] || 'BookOpen';
};

/**
 * Formatea una fecha para mostrar
 * @param {string|Date} fecha - Fecha a formatear
 * @returns {string} - Fecha formateada
 */
export const formatFecha = (fecha) => {
  if (!fecha) return '';
  
  const fechaObj = new Date(fecha);
  return fechaObj.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Formatea una fecha relativa (hace X días)
 * @param {string|Date} fecha - Fecha a formatear
 * @returns {string} - Fecha relativa
 */
export const formatFechaRelativa = (fecha) => {
  if (!fecha) return '';
  
  const fechaObj = new Date(fecha);
  const ahora = new Date();
  const diffTime = Math.abs(ahora - fechaObj);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return 'Ayer';
  if (diffDays < 7) return `Hace ${diffDays} días`;
  if (diffDays < 30) return `Hace ${Math.ceil(diffDays / 7)} semanas`;
  if (diffDays < 365) return `Hace ${Math.ceil(diffDays / 30)} meses`;
  return `Hace ${Math.ceil(diffDays / 365)} años`;
};

/**
 * Calcula el porcentaje de una estadística
 * @param {number} valor - Valor actual
 * @param {number} total - Valor total
 * @returns {number} - Porcentaje calculado
 */
export const calcularPorcentaje = (valor, total) => {
  if (!total || total === 0) return 0;
  return Math.round((valor / total) * 100);
};

/**
 * Formatea un número con separadores de miles
 * @param {number} numero - Número a formatear
 * @returns {string} - Número formateado
 */
export const formatNumero = (numero) => {
  if (!numero && numero !== 0) return '0';
  return numero.toLocaleString('es-ES');
};

/**
 * Obtiene la configuración de una estadística
 * @param {string} clave - Clave de la estadística
 * @returns {object} - Configuración de la estadística
 */
export const getEstadisticaConfig = (clave) => {
  return ESTADISTICAS_CONFIG[clave] || {
    label: clave,
    icon: 'Info',
    color: 'gray'
  };
};

/**
 * Valida si una carrera existe
 * @param {string|number} id - ID de la carrera
 * @param {Array} carreras - Lista de carreras
 * @returns {boolean} - True si existe
 */
export const validarCarreraExiste = (id, carreras) => {
  if (!carreras || !Array.isArray(carreras)) return false;
  return carreras.some(carrera => carrera.id === parseInt(id));
};

/**
 * Filtra noticias por tipo
 * @param {Array} noticias - Lista de noticias
 * @param {string} tipo - Tipo de noticia
 * @returns {Array} - Noticias filtradas
 */
export const filtrarNoticiasPorTipo = (noticias, tipo) => {
  if (!noticias || !Array.isArray(noticias)) return [];
  if (!tipo) return noticias;
  return noticias.filter(noticia => noticia.tipo === tipo);
};

/**
 * Ordena noticias por fecha (más recientes primero)
 * @param {Array} noticias - Lista de noticias
 * @returns {Array} - Noticias ordenadas
 */
export const ordenarNoticiasPorFecha = (noticias) => {
  if (!noticias || !Array.isArray(noticias)) return [];
  return [...noticias].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
};

/**
 * Filtra enlaces por tipo
 * @param {Array} enlaces - Lista de enlaces
 * @param {string} tipo - Tipo de enlace
 * @returns {Array} - Enlaces filtrados
 */
export const filtrarEnlacesPorTipo = (enlaces, tipo) => {
  if (!enlaces || !Array.isArray(enlaces)) return [];
  if (!tipo) return enlaces;
  return enlaces.filter(enlace => enlace.tipo === tipo);
};

/**
 * Genera un ID único para elementos
 * @param {string} prefijo - Prefijo para el ID
 * @returns {string} - ID único
 */
export const generarId = (prefijo = 'item') => {
  return `${prefijo}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Valida si un enlace es externo
 * @param {string} url - URL a validar
 * @returns {boolean} - True si es externo
 */
export const esEnlaceExterno = (url) => {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://');
};

/**
 * Obtiene el dominio de una URL
 * @param {string} url - URL a analizar
 * @returns {string} - Dominio de la URL
 */
export const obtenerDominio = (url) => {
  if (!url) return '';
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (error) {
    return '';
  }
};

/**
 * Formatea un número de teléfono
 * @param {string} telefono - Número de teléfono
 * @returns {string} - Teléfono formateado
 */
export const formatTelefono = (telefono) => {
  if (!telefono) return '';
  // Formato: (02323) 420-400 int. 123
  return telefono;
};

/**
 * Valida un email
 * @param {string} email - Email a validar
 * @returns {boolean} - True si es válido
 */
export const validarEmail = (email) => {
  if (!email) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Obtiene las iniciales de un nombre
 * @param {string} nombre - Nombre completo
 * @returns {string} - Iniciales
 */
export const obtenerIniciales = (nombre) => {
  if (!nombre) return '';
  return nombre
    .split(' ')
    .map(palabra => palabra.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
};

/**
 * Calcula la edad promedio de los estudiantes
 * @param {Array} estudiantes - Lista de estudiantes
 * @returns {number} - Edad promedio
 */
export const calcularEdadPromedio = (estudiantes) => {
  if (!estudiantes || !Array.isArray(estudiantes) || estudiantes.length === 0) return 0;
  
  const sumaEdades = estudiantes.reduce((total, estudiante) => {
    return total + (estudiante.edad || 0);
  }, 0);
  
  return Math.round(sumaEdades / estudiantes.length);
};

/**
 * Obtiene el porcentaje de mujeres en una carrera
 * @param {Array} estudiantes - Lista de estudiantes
 * @returns {number} - Porcentaje de mujeres
 */
export const calcularPorcentajeMujeres = (estudiantes) => {
  if (!estudiantes || !Array.isArray(estudiantes) || estudiantes.length === 0) return 0;
  
  const mujeres = estudiantes.filter(estudiante => estudiante.genero === 'femenino').length;
  return Math.round((mujeres / estudiantes.length) * 100);
};

/**
 * Formatea un período de tiempo
 * @param {string} inicio - Fecha de inicio
 * @param {string} fin - Fecha de fin
 * @returns {string} - Período formateado
 */
export const formatPeriodo = (inicio, fin) => {
  if (!inicio) return '';
  if (!fin) return formatFecha(inicio);
  
  const fechaInicio = new Date(inicio);
  const fechaFin = new Date(fin);
  
  const mesInicio = fechaInicio.toLocaleDateString('es-ES', { month: 'short' });
  const mesFin = fechaFin.toLocaleDateString('es-ES', { month: 'short' });
  const año = fechaInicio.getFullYear();
  
  if (fechaInicio.getFullYear() === fechaFin.getFullYear()) {
    return `${mesInicio} - ${mesFin} ${año}`;
  }
  
  return `${mesInicio} ${fechaInicio.getFullYear()} - ${mesFin} ${fechaFin.getFullYear()}`;
};

/**
 * Obtiene el estado de una carrera basado en sus estadísticas
 * @param {object} estadisticas - Estadísticas de la carrera
 * @returns {string} - Estado de la carrera
 */
export const obtenerEstadoCarrera = (estadisticas) => {
  if (!estadisticas) return 'desconocido';
  
  const { estudiantesActivos, egresados } = estadisticas;
  
  if (estudiantesActivos > 100) return 'activa';
  if (estudiantesActivos > 50) return 'moderada';
  if (estudiantesActivos > 20) return 'pequeña';
  return 'nueva';
};

/**
 * Genera un resumen de estadísticas
 * @param {object} estadisticas - Estadísticas de la carrera
 * @returns {string} - Resumen formateado
 */
export const generarResumenEstadisticas = (estadisticas) => {
  if (!estadisticas) return 'No hay estadísticas disponibles';
  
  const { estudiantesActivos, materias, profesores, egresados } = estadisticas;
  
  return `${estudiantesActivos} estudiantes activos, ${materias} materias, ${profesores} profesores y ${egresados} egresados`;
};





