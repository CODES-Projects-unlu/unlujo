// Componente principal del feed de la red social UNLujo
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSocialFeed } from '../hooks/useSocialFeed';
import PostCard from './PostCard';
import PostComposer from './PostComposer';
import FilterBar from './FilterBar';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { FILTER_OPTIONS, SORT_OPTIONS, LOADING_STATES } from '../constants/socialConstants';

const SocialFeed = ({ usuarioActual, config = {} }) => {
  const [mostrarComposer, setMostrarComposer] = useState(false);
  const [vistaActual, setVistaActual] = useState('comunidad'); // 'comunidad' o 'carrera'
  const [contenidoComposer, setContenidoComposer] = useState('');
  const [tipoPost, setTipoPost] = useState('social'); // Tipo de post seleccionado
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [mostrarEmojis, setMostrarEmojis] = useState(false);
  const [mostrarGifs, setMostrarGifs] = useState(false);
  const {
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
    isLoading,
    isError
  } = useSocialFeed(config);


  const handleNuevoPost = () => {
    setMostrarComposer(true);
  };

  const handleComposerChange = (e) => {
    const valor = e.target.value;
    if (valor.length <= 280) {
      setContenidoComposer(valor);
    }
  };

  const handleComposerKeyDown = (e) => {
    // Publicar con Ctrl+Enter o Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleComposerSubmit();
    }
  };

  const handleImagenChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      // Validar tipo de archivo
      if (!archivo.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido');
        return;
      }
      
      // Validar tamaño (máximo 5MB)
      if (archivo.size > 5 * 1024 * 1024) {
        alert('La imagen debe ser menor a 5MB');
        return;
      }
      
      setImagenSeleccionada(archivo);
    }
  };

  const handleEliminarImagen = () => {
    setImagenSeleccionada(null);
  };

  const handleEmojiClick = () => {
    setMostrarEmojis(!mostrarEmojis);
  };

  const handleEmojiSelect = (emoji) => {
    setContenidoComposer(prev => prev + emoji);
    setMostrarEmojis(false);
  };

  const handleGifSelect = (gifUrl) => {
    setImagenSeleccionada(gifUrl);
    setMostrarGifs(false);
  };

  const handleEliminarGif = () => {
    setImagenSeleccionada(null);
  };

  const handleComposerSubmit = () => {
    if (contenidoComposer.trim() || imagenSeleccionada) {
      // Crear el nuevo post
      const nuevoPost = {
        id: Date.now(), // ID temporal
        autor: {
          id: usuarioActual?.id || 1,
          nombre: usuarioActual?.nombre || 'Usuario',
          apellido: usuarioActual?.apellido || 'Demo',
          carrera: usuarioActual?.carrera || 'LSI',
          foto: usuarioActual?.foto || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
        },
        contenido: contenidoComposer.trim(),
        tipo: tipoPost,
        hashtags: contenidoComposer.match(/#\w+/g) || [],
        fecha: new Date().toISOString(),
        reacciones: {
          like: 0,
          useful: 0,
          important: 0,
          love: 0,
          laugh: 0
        },
        comentarios: 0,
        compartidos: 0,
        estado: 'published',
        imagen: imagenSeleccionada ? (typeof imagenSeleccionada === 'string' ? imagenSeleccionada : URL.createObjectURL(imagenSeleccionada)) : null,
        grupo: null
      };

      // Agregar el post al inicio de la lista
      agregarPost(nuevoPost);
      console.log('Nuevo post creado:', nuevoPost);
      
      // Limpiar el textarea y resetear tipo
      setContenidoComposer('');
      setTipoPost('social');
      setImagenSeleccionada(null);
      setMostrarEmojis(false);
      setMostrarGifs(false);
    }
  };

  const handleCerrarComposer = () => {
    setMostrarComposer(false);
    recargar(); // Recargar el feed después de crear un post
  };

  const handleFiltroChange = (nuevoFiltro) => {
    actualizarFiltros(nuevoFiltro);
  };

  const handleOrdenamientoChange = (nuevoOrdenamiento) => {
    cambiarOrdenamiento(nuevoOrdenamiento);
  };

  const handleCargarMas = () => {
    cargarMasPosts();
  };

  const handleVistaChange = (nuevaVista) => {
    setVistaActual(nuevaVista);
    
    // FUNCIONALIDAD DE PRIVACIDAD POR CARRERA:
    // - "Comunidad": Todos los usuarios pueden ver y escribir posts
    // - "Tu carrera": Solo usuarios de la misma carrera pueden ver y escribir
    if (nuevaVista === 'carrera' && usuarioActual?.carrera) {
      // Filtrar solo posts de la misma carrera del usuario
      actualizarFiltros({ ...filtros, carrera: usuarioActual.carrera });
    } else {
      // Remover filtro de carrera para mostrar todos los posts de la comunidad
      const { carrera, ...otrosFiltros } = filtros;
      actualizarFiltros(otrosFiltros);
    }
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorMessage 
          mensaje={error} 
          onReintentar={recargar}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              UNLujo Community
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Conecta con tu comunidad universitaria
            </p>
          </div>
          
          {/* Switch de navegación */}
          <div className="mt-8">
            <div className="flex bg-white/60 backdrop-blur-sm rounded-2xl p-1.5 w-full shadow-lg border border-white/20">
              <button
                onClick={() => handleVistaChange('comunidad')}
                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-center relative overflow-hidden ${
                  vistaActual === 'comunidad'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                <span className="relative z-10">Comunidad</span>
                {vistaActual === 'comunidad' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 animate-pulse"></div>
                )}
              </button>
              <button
                onClick={() => handleVistaChange('carrera')}
                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-center relative overflow-hidden ${
                  vistaActual === 'carrera'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                <span className="relative z-10">{usuarioActual?.carrera || 'Tu carrera'}</span>
                {vistaActual === 'carrera' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 animate-pulse"></div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full overflow-hidden">
        {/* Contenido principal - Feed */}
        <div className="w-full">
            {/* Composer modal */}
            {mostrarComposer && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <PostComposer
                    usuarioActual={usuarioActual}
                    onCerrar={handleCerrarComposer}
                    onPostCreado={handleCerrarComposer}
                  />
                </div>
              </div>
            )}

            {/* Indicador de vista activa */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="font-medium">
                  {vistaActual === 'comunidad' ? '📢' : '🎓'}
                </span>
                <span>
                  {vistaActual === 'comunidad' 
                    ? 'Viendo todos los posts de la comunidad (todos pueden ver y escribir)' 
                    : `Viendo posts de ${usuarioActual?.carrera || 'tu carrera'} (solo estudiantes de esta carrera)`
                  }
                </span>
              </div>
            </div>


        {/* Área de composición de posts */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 mb-8 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-start space-x-4">
            {/* Avatar del usuario */}
            <Link to={`/perfil/${usuarioActual?.id || 1}`} className="flex-shrink-0 group">
              <div className="relative">
                <img
                  src={usuarioActual?.foto}
                  alt={`${usuarioActual?.nombre} ${usuarioActual?.apellido}`}
                  className="w-14 h-14 rounded-2xl object-cover shadow-lg border-2 border-white group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full border-2 border-white"></div>
              </div>
            </Link>
                
                {/* Área de texto */}
                <div className="flex-1">
                  <textarea
                    placeholder="¿Qué está pasando en la universidad? 🌟"
                    className="w-full text-xl placeholder-gray-400 border-none resize-none focus:outline-none min-h-[80px] bg-transparent text-gray-800"
                    rows="3"
                    value={contenidoComposer}
                    onChange={handleComposerChange}
                    onKeyDown={handleComposerKeyDown}
                  />
                  
                  {/* Vista previa de imagen */}
                  {imagenSeleccionada && (
                    <div className="mt-4 relative">
                      <img
                        src={URL.createObjectURL(imagenSeleccionada)}
                        alt="Vista previa"
                        className="w-full max-w-md h-48 object-cover rounded-lg"
                      />
                      <button
                        onClick={handleEliminarImagen}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* Contador de caracteres y atajos */}
                  {contenidoComposer && (
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-xs text-gray-400">
                        Ctrl+Enter para publicar
                      </div>
                      <div className={`text-sm ${
                        contenidoComposer.length > 260 
                          ? 'text-red-500' 
                          : contenidoComposer.length > 240 
                            ? 'text-yellow-500' 
                            : 'text-gray-500'
                      }`}>
                        {contenidoComposer.length}/280
                      </div>
                    </div>
                  )}

                  {/* Botones de acción simplificados */}
                  <div className="mt-6 space-y-4">
                    {/* Primera línea: Imagen, GIF y Selector */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-4">
                        {/* Botón de imagen */}
                        <label className="group flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-all duration-200 hover:scale-110 cursor-pointer">
                          <div className="p-2 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium hidden sm:block">Imagen</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImagenChange}
                            className="hidden"
                          />
                        </label>
                        
                        {/* Botón de GIF */}
                        <button 
                          onClick={() => setMostrarGifs(!mostrarGifs)}
                          className="group flex items-center space-x-2 text-gray-500 hover:text-purple-500 transition-all duration-200 hover:scale-110"
                        >
                          <div className="p-2 rounded-full bg-gray-100 group-hover:bg-purple-100 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium hidden sm:block">GIF</span>
                        </button>

                        {/* Botón de emoji */}
                        <button 
                          onClick={handleEmojiClick}
                          className="group flex items-center space-x-2 text-gray-500 hover:text-orange-500 transition-all duration-200 hover:scale-110"
                        >
                          <div className="p-2 rounded-full bg-gray-100 group-hover:bg-orange-100 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium hidden sm:block">Emoji</span>
                        </button>
                      </div>
                      
                      {/* Selector de tipo de post */}
                      <div className="flex items-center space-x-2 min-w-0 flex-shrink-0">
                        <label className="text-sm font-medium text-gray-600 hidden sm:block">Tipo:</label>
                        <select 
                          value={tipoPost}
                          onChange={(e) => setTipoPost(e.target.value)}
                          className="px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300 shadow-sm min-w-0"
                        >
                          <option value="social">📱 Social</option>
                          <option value="academico">🎓 Académico</option>
                          <option value="evento">📅 Evento</option>
                          <option value="anuncio">📢 Anuncio</option>
                          <option value="pregunta">❓ Pregunta</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Segunda línea: Botón de publicar */}
                    <div className="flex justify-end">
                      <button
                        onClick={handleComposerSubmit}
                        disabled={!contenidoComposer.trim()}
                        className={`w-full sm:w-auto px-6 sm:px-8 py-3 rounded-2xl font-semibold transition-all duration-300 transform ${
                          contenidoComposer.trim() 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <span className="flex items-center justify-center space-x-2">
                          <span>Postear</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Selector de emojis */}
                  {mostrarEmojis && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="grid grid-cols-8 gap-2">
                        {['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'].map((emoji, index) => (
                          <button
                            key={index}
                            onClick={() => handleEmojiSelect(emoji)}
                            className="text-2xl hover:bg-gray-200 rounded-lg p-2 transition-colors"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Selector de GIFs */}
                  {mostrarGifs && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">GIFs populares</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: 'gif1', url: 'https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif', titulo: 'Celebración' },
                          { id: 'gif2', url: 'https://media.giphy.com/media/26u4lOMA8JKSnL9Uk/giphy.gif', titulo: 'Aplausos' },
                          { id: 'gif3', url: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', titulo: 'Pensando' },
                          { id: 'gif4', url: 'https://media.giphy.com/media/3o6Zt4HU9j8J8J8J8M/giphy.gif', titulo: 'Riendo' },
                          { id: 'gif5', url: 'https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif', titulo: 'Éxito' },
                          { id: 'gif6', url: 'https://media.giphy.com/media/26u4lOMA8JKSnL9Uk/giphy.gif', titulo: 'Bailando' }
                        ].map((gif) => (
                          <button
                            key={gif.id}
                            onClick={() => handleGifSelect(gif.url)}
                            className="relative group rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
                          >
                            <img 
                              src={gif.url} 
                              alt={gif.titulo}
                              className="w-full h-20 object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                              <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                {gif.titulo}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Lista de posts */}
            <div className="space-y-4">
              {loading === LOADING_STATES.LOADING ? (
                <LoadingSpinner mensaje="Cargando posts..." />
              ) : posts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {vistaActual === 'comunidad' 
                      ? 'No hay posts en la comunidad'
                      : `No hay posts de ${usuarioActual?.carrera || 'tu carrera'}`
                    }
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {filtros.busqueda 
                      ? `No se encontraron posts para "${filtros.busqueda}"`
                      : vistaActual === 'comunidad' 
                        ? 'Sé el primero en compartir algo con toda la comunidad universitaria'
                        : `Sé el primero en compartir algo con tus compañeros de ${usuarioActual?.carrera || 'tu carrera'}`
                    }
                  </p>
                  {!filtros.busqueda && (
                    <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3 max-w-md mx-auto mb-6">
                      {vistaActual === 'comunidad' 
                        ? '💡 En "Comunidad" todos los estudiantes pueden ver y escribir posts' 
                        : '💡 En "Tu carrera" solo estudiantes de la misma carrera pueden ver y escribir'
                      }
                    </div>
                  )}
                  <button
                    onClick={handleNuevoPost}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Crear primer post
                  </button>
                </div>
              ) : (
                posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    usuarioActual={usuarioActual}
                    onPostActualizado={recargar}
                  />
                ))
              )}

              {/* Botón cargar más */}
              {hasMore && posts.length > 0 && (
                <div className="text-center py-6">
                  <button
                    onClick={handleCargarMas}
                    disabled={isLoading}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Cargando...' : 'Cargar más posts'}
                  </button>
                </div>
              )}

              {/* Indicador de fin */}
              {!hasMore && posts.length > 0 && (
                <div className="text-center py-6">
                  <p className="text-gray-500 text-sm">
                    Has visto todos los posts disponibles
                  </p>
                </div>
              )}
            </div>
        </div>
      </div>

    </div>
  );
};

export default SocialFeed;
