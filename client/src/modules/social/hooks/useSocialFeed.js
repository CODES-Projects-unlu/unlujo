// Hooks personalizados para el módulo de red social UNLujo
import { useState, useEffect, useCallback } from 'react';
import { postsData, usuariosData, getPostsByCarrera, getPostsByTipo, buscarPosts, getPostsPopulares } from '../data/socialData';
import { filtrarPosts, ordenarPorPopularidad } from '../utils/socialUtils';
import { LOADING_STATES, FILTER_OPTIONS, SORT_OPTIONS } from '../constants/socialConstants';

/**
 * Hook para manejar el feed principal de la red social
 * @param {object} config - Configuración del feed
 * @returns {object} - Estado y funciones del feed
 */
export const useSocialFeed = (config = {}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(LOADING_STATES.IDLE);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({
    tipo: config.tipo || FILTER_OPTIONS.ALL,
    carrera: config.carrera || null,
    busqueda: '',
    fechaDesde: null,
    fechaHasta: null,
    hashtag: null
  });
  const [ordenamiento, setOrdenamiento] = useState(config.ordenamiento || SORT_OPTIONS.RECENT);
  const [pagina, setPagina] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const cargarPosts = useCallback(async (filtrosActuales, ordenamientoActual, paginaActual) => {
    try {
      setLoading(LOADING_STATES.LOADING);
      setError(null);

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));

      let postsFiltrados = [...postsData];

      // Aplicar filtros
      postsFiltrados = filtrarPosts(postsFiltrados, filtrosActuales);

      // Aplicar ordenamiento
      switch (ordenamientoActual) {
        case SORT_OPTIONS.RECENT:
          postsFiltrados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
          break;
        case SORT_OPTIONS.POPULAR:
          postsFiltrados = ordenarPorPopularidad(postsFiltrados);
          break;
        case SORT_OPTIONS.OLDEST:
          postsFiltrados.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
          break;
        default:
          postsFiltrados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      }

      // Paginación
      const postsPorPagina = 20;
      const inicio = (paginaActual - 1) * postsPorPagina;
      const fin = inicio + postsPorPagina;
      const postsPagina = postsFiltrados.slice(inicio, fin);

      setPosts(prevPosts => 
        paginaActual === 1 ? postsPagina : [...prevPosts, ...postsPagina]
      );
      setHasMore(fin < postsFiltrados.length);
      setLoading(LOADING_STATES.SUCCESS);
    } catch (err) {
      setError('Error al cargar los posts');
      setLoading(LOADING_STATES.ERROR);
    }
  }, []);

  useEffect(() => {
    cargarPosts(filtros, ordenamiento, 1);
    setPagina(1);
  }, [filtros, ordenamiento, cargarPosts]);

  const actualizarFiltros = useCallback((nuevosFiltros) => {
    setFiltros(prev => ({ ...prev, ...nuevosFiltros }));
  }, []);

  const cambiarOrdenamiento = useCallback((nuevoOrdenamiento) => {
    setOrdenamiento(nuevoOrdenamiento);
  }, []);

  const cargarMasPosts = useCallback(() => {
    if (!loading && hasMore) {
      const nuevaPagina = pagina + 1;
      setPagina(nuevaPagina);
      cargarPosts(filtros, ordenamiento, nuevaPagina);
    }
  }, [loading, hasMore, pagina, filtros, ordenamiento, cargarPosts]);

  const recargar = useCallback(() => {
    cargarPosts(filtros, ordenamiento, 1);
    setPagina(1);
  }, [filtros, ordenamiento, cargarPosts]);

  const agregarPost = useCallback((nuevoPost) => {
    setPosts(prevPosts => [nuevoPost, ...prevPosts]);
  }, []);

  return {
    posts,
    loading,
    error,
    filtros,
    ordenamiento,
    hasMore,
    actualizarFiltros,
    cambiarOrdenamiento,
    cargarMasPosts,
    recargar,
    agregarPost,
    isLoading: loading === LOADING_STATES.LOADING,
    isSuccess: loading === LOADING_STATES.SUCCESS,
    isError: loading === LOADING_STATES.ERROR
  };
};

/**
 * Hook para manejar posts individuales
 * @param {number} postId - ID del post
 * @returns {object} - Estado y funciones del post
 */
export const usePost = (postId) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(LOADING_STATES.IDLE);
  const [error, setError] = useState(null);

  const cargarPost = useCallback(async (id) => {
    try {
      setLoading(LOADING_STATES.LOADING);
      setError(null);

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 300));

      const postEncontrado = postsData.find(p => p.id === parseInt(id));
      
      if (postEncontrado) {
        setPost(postEncontrado);
        setLoading(LOADING_STATES.SUCCESS);
      } else {
        setError('Post no encontrado');
        setLoading(LOADING_STATES.ERROR);
      }
    } catch (err) {
      setError('Error al cargar el post');
      setLoading(LOADING_STATES.ERROR);
    }
  }, []);

  useEffect(() => {
    if (postId) {
      cargarPost(postId);
    }
  }, [postId, cargarPost]);

  const actualizarPost = useCallback((nuevosDatos) => {
    setPost(prev => prev ? { ...prev, ...nuevosDatos } : null);
  }, []);

  const agregarReaccion = useCallback((tipoReaccion) => {
    if (post) {
      const nuevasReacciones = { ...post.reacciones };
      nuevasReacciones[tipoReaccion] = (nuevasReacciones[tipoReaccion] || 0) + 1;
      actualizarPost({ reacciones: nuevasReacciones });
    }
  }, [post, actualizarPost]);

  const quitarReaccion = useCallback((tipoReaccion) => {
    if (post) {
      const nuevasReacciones = { ...post.reacciones };
      if (nuevasReacciones[tipoReaccion] > 0) {
        nuevasReacciones[tipoReaccion] = nuevasReacciones[tipoReaccion] - 1;
        actualizarPost({ reacciones: nuevasReacciones });
      }
    }
  }, [post, actualizarPost]);

  return {
    post,
    loading,
    error,
    actualizarPost,
    agregarReaccion,
    quitarReaccion,
    recargar: () => cargarPost(postId),
    isLoading: loading === LOADING_STATES.LOADING,
    isSuccess: loading === LOADING_STATES.SUCCESS,
    isError: loading === LOADING_STATES.ERROR
  };
};

/**
 * Hook para manejar la búsqueda de posts
 * @param {string} termino - Término de búsqueda
 * @returns {object} - Estado y funciones de búsqueda
 */
export const useBuscarPosts = (termino = '') => {
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(LOADING_STATES.IDLE);
  const [error, setError] = useState(null);

  const buscar = useCallback(async (terminoBusqueda) => {
    if (!terminoBusqueda.trim()) {
      setResultados([]);
      return;
    }

    try {
      setLoading(LOADING_STATES.LOADING);
      setError(null);

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 300));

      const resultadosEncontrados = buscarPosts(terminoBusqueda);
      setResultados(resultadosEncontrados);
      setLoading(LOADING_STATES.SUCCESS);
    } catch (err) {
      setError('Error en la búsqueda');
      setLoading(LOADING_STATES.ERROR);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      buscar(termino);
    }, 500); // Debounce

    return () => clearTimeout(timeoutId);
  }, [termino, buscar]);

  return {
    resultados,
    loading,
    error,
    buscar,
    isLoading: loading === LOADING_STATES.LOADING,
    isSuccess: loading === LOADING_STATES.SUCCESS,
    isError: loading === LOADING_STATES.ERROR
  };
};

/**
 * Hook para manejar posts por carrera
 * @param {string} carrera - Código de la carrera
 * @returns {object} - Estado y funciones de posts por carrera
 */
export const usePostsPorCarrera = (carrera) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(LOADING_STATES.IDLE);
  const [error, setError] = useState(null);

  const cargarPosts = useCallback(async (carreraCodigo) => {
    if (!carreraCodigo) {
      setPosts([]);
      return;
    }

    try {
      setLoading(LOADING_STATES.LOADING);
      setError(null);

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 400));

      const postsCarrera = getPostsByCarrera(carreraCodigo);
      setPosts(postsCarrera);
      setLoading(LOADING_STATES.SUCCESS);
    } catch (err) {
      setError('Error al cargar los posts de la carrera');
      setLoading(LOADING_STATES.ERROR);
    }
  }, []);

  useEffect(() => {
    cargarPosts(carrera);
  }, [carrera, cargarPosts]);

  return {
    posts,
    loading,
    error,
    recargar: () => cargarPosts(carrera),
    isLoading: loading === LOADING_STATES.LOADING,
    isSuccess: loading === LOADING_STATES.SUCCESS,
    isError: loading === LOADING_STATES.ERROR
  };
};

/**
 * Hook para manejar posts por tipo
 * @param {string} tipo - Tipo de post
 * @returns {object} - Estado y funciones de posts por tipo
 */
export const usePostsPorTipo = (tipo) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(LOADING_STATES.IDLE);
  const [error, setError] = useState(null);

  const cargarPosts = useCallback(async (tipoPost) => {
    if (!tipoPost) {
      setPosts([]);
      return;
    }

    try {
      setLoading(LOADING_STATES.LOADING);
      setError(null);

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 400));

      const postsTipo = getPostsByTipo(tipoPost);
      setPosts(postsTipo);
      setLoading(LOADING_STATES.SUCCESS);
    } catch (err) {
      setError('Error al cargar los posts del tipo');
      setLoading(LOADING_STATES.ERROR);
    }
  }, []);

  useEffect(() => {
    cargarPosts(tipo);
  }, [tipo, cargarPosts]);

  return {
    posts,
    loading,
    error,
    recargar: () => cargarPosts(tipo),
    isLoading: loading === LOADING_STATES.LOADING,
    isSuccess: loading === LOADING_STATES.SUCCESS,
    isError: loading === LOADING_STATES.ERROR
  };
};

/**
 * Hook para manejar posts populares
 * @returns {object} - Estado y funciones de posts populares
 */
export const usePostsPopulares = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(LOADING_STATES.IDLE);
  const [error, setError] = useState(null);

  const cargarPosts = useCallback(async () => {
    try {
      setLoading(LOADING_STATES.LOADING);
      setError(null);

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 400));

      const postsPopulares = getPostsPopulares();
      setPosts(postsPopulares);
      setLoading(LOADING_STATES.SUCCESS);
    } catch (err) {
      setError('Error al cargar los posts populares');
      setLoading(LOADING_STATES.ERROR);
    }
  }, []);

  useEffect(() => {
    cargarPosts();
  }, [cargarPosts]);

  return {
    posts,
    loading,
    error,
    recargar: cargarPosts,
    isLoading: loading === LOADING_STATES.LOADING,
    isSuccess: loading === LOADING_STATES.SUCCESS,
    isError: loading === LOADING_STATES.ERROR
  };
};
