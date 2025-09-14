// Módulo Carreras - UNLujo PWA
// Responsable: [Nombre del colaborador]
// Descripción: Módulo para gestión de carreras y facultades

// Componentes
export { default as CarreraDetail } from './components/CarreraDetail';

// Hooks
export {
  useCarreraData,
  useTodasLasCarreras,
  useCarreraStats,
  useCarreraNoticias,
  useCarreraEnlaces,
  useBuscarCarreras
} from './hooks/useCarreraData';

// Utilidades
export {
  formatCarreraName,
  getCarreraColor,
  getCarreraIcon,
  formatFecha,
  formatFechaRelativa,
  calcularPorcentaje,
  formatNumero,
  getEstadisticaConfig,
  validarCarreraExiste,
  filtrarNoticiasPorTipo,
  ordenarNoticiasPorFecha,
  filtrarEnlacesPorTipo,
  generarId,
  esEnlaceExterno,
  obtenerDominio,
  formatTelefono,
  validarEmail,
  obtenerIniciales,
  calcularEdadPromedio,
  calcularPorcentajeMujeres,
  formatPeriodo,
  obtenerEstadoCarrera,
  generarResumenEstadisticas
} from './utils/carreraUtils';

// Constantes
export {
  CARRERA_COLORS,
  CARRERA_ICONS,
  TIPOS_NOTICIAS,
  PRIORIDADES_NOTICIAS,
  TIPOS_ENLACES,
  ESTADISTICAS_CONFIG,
  ENLACE_ICONS,
  COLORES_ESTADISTICAS,
  COLORES_TEXTO_ESTADISTICAS,
  COLORES_FONDO_ESTADISTICAS,
  BREAKPOINTS,
  ANIMATIONS,
  TRANSITIONS,
  SHADOWS,
  BORDER_RADIUS,
  SPACING,
  TEXT_SIZES,
  FONT_WEIGHTS,
  TEXT_COLORS,
  BACKGROUND_COLORS,
  LOADING_STATES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES
} from './constants/carrerasConstants';

// Datos
export {
  carrerasData,
  getCarreraById,
  getCarreraByCodigo,
  getAllCarreras,
  getCarrerasConCentro,
  getNoticiasByCarrera,
  getEnlacesByCarrera,
  getEstadisticasByCarrera
} from './data/carrerasData';
