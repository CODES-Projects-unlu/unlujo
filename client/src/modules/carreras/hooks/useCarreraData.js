// Hook personalizado para manejar datos de carreras
import { useState, useEffect, useCallback } from 'react';
import { carrerasData, getCarreraById, getCarreraByCodigo } from '../data/carrerasData';
import { LOADING_STATES, ERROR_MESSAGES } from '../constants/carrerasConstants';

/**
 * Hook para obtener datos de una carrera específica
 * @param {string|number} id - ID o código de la carrera
 * @returns {object} - Estado y datos de la carrera
 */
export const useCarreraData = (id) => {
  const [carrera, setCarrera] = useState(null);
  const [loading, setLoading] = useState(LOADING_STATES.IDLE);
  const [error, setError] = useState(null);

  const cargarCarrera = useCallback(async (carreraId) => {
    try {
      setLoading(LOADING_STATES.LOADING);
      setError(null);

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));

      let carreraEncontrada = null;
      
      // Intentar buscar por ID numérico
      if (!isNaN(carreraId)) {
        carreraEncontrada = getCarreraById(parseInt(carreraId));
      } else {
        // Buscar por código
        carreraEncontrada = getCarreraByCodigo(carreraId);
      }

      if (carreraEncontrada) {
        setCarrera(carreraEncontrada);
        setLoading(LOADING_STATES.SUCCESS);
      } else {
        setError(ERROR_MESSAGES.CARRERA_NOT_FOUND);
        setLoading(LOADING_STATES.ERROR);
      }
    } catch (err) {
      setError(ERROR_MESSAGES.DATA_LOADING_ERROR);
      setLoading(LOADING_STATES.ERROR);
    }
  }, []);

  useEffect(() => {
    if (id) {
      cargarCarrera(id);
    }
  }, [id, cargarCarrera]);

  const recargar = useCallback(() => {
    if (id) {
      cargarCarrera(id);
    }
  }, [id, cargarCarrera]);

  return {
    carrera,
    loading,
    error,
    recargar,
    isLoading: loading === LOADING_STATES.LOADING,
    isSuccess: loading === LOADING_STATES.SUCCESS,
    isError: loading === LOADING_STATES.ERROR
  };
};

/**
 * Hook para obtener todas las carreras
 * @returns {object} - Estado y datos de todas las carreras
 */
export const useTodasLasCarreras = () => {
  const [carreras, setCarreras] = useState([]);
  const [loading, setLoading] = useState(LOADING_STATES.IDLE);
  const [error, setError] = useState(null);

  const cargarCarreras = useCallback(async () => {
    try {
      setLoading(LOADING_STATES.LOADING);
      setError(null);

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 300));

      setCarreras(carrerasData);
      setLoading(LOADING_STATES.SUCCESS);
    } catch (err) {
      setError(ERROR_MESSAGES.DATA_LOADING_ERROR);
      setLoading(LOADING_STATES.ERROR);
    }
  }, []);

  useEffect(() => {
    cargarCarreras();
  }, [cargarCarreras]);

  const recargar = useCallback(() => {
    cargarCarreras();
  }, [cargarCarreras]);

  return {
    carreras,
    loading,
    error,
    recargar,
    isLoading: loading === LOADING_STATES.LOADING,
    isSuccess: loading === LOADING_STATES.SUCCESS,
    isError: loading === LOADING_STATES.ERROR
  };
};

/**
 * Hook para obtener estadísticas de una carrera
 * @param {string|number} id - ID o código de la carrera
 * @returns {object} - Estado y estadísticas de la carrera
 */
export const useCarreraStats = (id) => {
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(LOADING_STATES.IDLE);
  const [error, setError] = useState(null);

  const cargarEstadisticas = useCallback(async (carreraId) => {
    try {
      setLoading(LOADING_STATES.LOADING);
      setError(null);

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 400));

      let carreraEncontrada = null;
      
      if (!isNaN(carreraId)) {
        carreraEncontrada = getCarreraById(parseInt(carreraId));
      } else {
        carreraEncontrada = getCarreraByCodigo(carreraId);
      }

      if (carreraEncontrada && carreraEncontrada.estadisticas) {
        setEstadisticas(carreraEncontrada.estadisticas);
        setLoading(LOADING_STATES.SUCCESS);
      } else {
        setError('No se encontraron estadísticas para esta carrera');
        setLoading(LOADING_STATES.ERROR);
      }
    } catch (err) {
      setError(ERROR_MESSAGES.DATA_LOADING_ERROR);
      setLoading(LOADING_STATES.ERROR);
    }
  }, []);

  useEffect(() => {
    if (id) {
      cargarEstadisticas(id);
    }
  }, [id, cargarEstadisticas]);

  const recargar = useCallback(() => {
    if (id) {
      cargarEstadisticas(id);
    }
  }, [id, cargarEstadisticas]);

  return {
    estadisticas,
    loading,
    error,
    recargar,
    isLoading: loading === LOADING_STATES.LOADING,
    isSuccess: loading === LOADING_STATES.SUCCESS,
    isError: loading === LOADING_STATES.ERROR
  };
};

/**
 * Hook para obtener noticias de una carrera
 * @param {string|number} id - ID o código de la carrera
 * @returns {object} - Estado y noticias de la carrera
 */
export const useCarreraNoticias = (id) => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(LOADING_STATES.IDLE);
  const [error, setError] = useState(null);

  const cargarNoticias = useCallback(async (carreraId) => {
    try {
      setLoading(LOADING_STATES.LOADING);
      setError(null);

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 300));

      let carreraEncontrada = null;
      
      if (!isNaN(carreraId)) {
        carreraEncontrada = getCarreraById(parseInt(carreraId));
      } else {
        carreraEncontrada = getCarreraByCodigo(carreraId);
      }

      if (carreraEncontrada && carreraEncontrada.noticias) {
        setNoticias(carreraEncontrada.noticias);
        setLoading(LOADING_STATES.SUCCESS);
      } else {
        setNoticias([]);
        setLoading(LOADING_STATES.SUCCESS);
      }
    } catch (err) {
      setError(ERROR_MESSAGES.DATA_LOADING_ERROR);
      setLoading(LOADING_STATES.ERROR);
    }
  }, []);

  useEffect(() => {
    if (id) {
      cargarNoticias(id);
    }
  }, [id, cargarNoticias]);

  const recargar = useCallback(() => {
    if (id) {
      cargarNoticias(id);
    }
  }, [id, cargarNoticias]);

  return {
    noticias,
    loading,
    error,
    recargar,
    isLoading: loading === LOADING_STATES.LOADING,
    isSuccess: loading === LOADING_STATES.SUCCESS,
    isError: loading === LOADING_STATES.ERROR
  };
};

/**
 * Hook para obtener enlaces de una carrera
 * @param {string|number} id - ID o código de la carrera
 * @returns {object} - Estado y enlaces de la carrera
 */
export const useCarreraEnlaces = (id) => {
  const [enlaces, setEnlaces] = useState([]);
  const [loading, setLoading] = useState(LOADING_STATES.IDLE);
  const [error, setError] = useState(null);

  const cargarEnlaces = useCallback(async (carreraId) => {
    try {
      setLoading(LOADING_STATES.LOADING);
      setError(null);

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 200));

      let carreraEncontrada = null;
      
      if (!isNaN(carreraId)) {
        carreraEncontrada = getCarreraById(parseInt(carreraId));
      } else {
        carreraEncontrada = getCarreraByCodigo(carreraId);
      }

      if (carreraEncontrada && carreraEncontrada.enlaces) {
        setEnlaces(carreraEncontrada.enlaces);
        setLoading(LOADING_STATES.SUCCESS);
      } else {
        setEnlaces([]);
        setLoading(LOADING_STATES.SUCCESS);
      }
    } catch (err) {
      setError(ERROR_MESSAGES.DATA_LOADING_ERROR);
      setLoading(LOADING_STATES.ERROR);
    }
  }, []);

  useEffect(() => {
    if (id) {
      cargarEnlaces(id);
    }
  }, [id, cargarEnlaces]);

  const recargar = useCallback(() => {
    if (id) {
      cargarEnlaces(id);
    }
  }, [id, cargarEnlaces]);

  return {
    enlaces,
    loading,
    error,
    recargar,
    isLoading: loading === LOADING_STATES.LOADING,
    isSuccess: loading === LOADING_STATES.SUCCESS,
    isError: loading === LOADING_STATES.ERROR
  };
};

/**
 * Hook para filtrar y buscar carreras
 * @param {string} termino - Término de búsqueda
 * @param {string} filtro - Filtro por tipo
 * @returns {object} - Estado y carreras filtradas
 */
export const useBuscarCarreras = (termino = '', filtro = '') => {
  const [carreras, setCarreras] = useState([]);
  const [loading, setLoading] = useState(LOADING_STATES.IDLE);
  const [error, setError] = useState(null);

  const buscarCarreras = useCallback(async (terminoBusqueda, filtroBusqueda) => {
    try {
      setLoading(LOADING_STATES.LOADING);
      setError(null);

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 200));

      let carrerasFiltradas = [...carrerasData];

      // Filtrar por término de búsqueda
      if (terminoBusqueda) {
        carrerasFiltradas = carrerasFiltradas.filter(carrera =>
          carrera.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
          carrera.descripcion.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
          carrera.codigo.toLowerCase().includes(terminoBusqueda.toLowerCase())
        );
      }

      // Filtrar por tipo
      if (filtroBusqueda) {
        carrerasFiltradas = carrerasFiltradas.filter(carrera => {
          switch (filtroBusqueda) {
            case 'con_centro':
              return carrera.centroEstudiantes !== null;
            case 'sin_centro':
              return carrera.centroEstudiantes === null;
            case 'activas':
              return carrera.estadisticas?.estudiantesActivos > 50;
            default:
              return true;
          }
        });
      }

      setCarreras(carrerasFiltradas);
      setLoading(LOADING_STATES.SUCCESS);
    } catch (err) {
      setError(ERROR_MESSAGES.DATA_LOADING_ERROR);
      setLoading(LOADING_STATES.ERROR);
    }
  }, []);

  useEffect(() => {
    buscarCarreras(termino, filtro);
  }, [termino, filtro, buscarCarreras]);

  const recargar = useCallback(() => {
    buscarCarreras(termino, filtro);
  }, [termino, filtro, buscarCarreras]);

  return {
    carreras,
    loading,
    error,
    recargar,
    isLoading: loading === LOADING_STATES.LOADING,
    isSuccess: loading === LOADING_STATES.SUCCESS,
    isError: loading === LOADING_STATES.ERROR
  };
};





