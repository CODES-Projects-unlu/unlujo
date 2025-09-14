// Componente para crear nuevos posts
import React, { useState, useRef } from 'react';
import { validarPost, sugerirHashtags, extraerHashtags } from '../utils/socialUtils';
import { CHARACTER_LIMITS, POST_TYPES } from '../constants/socialConstants';

const PostComposer = ({ usuarioActual, onCerrar, onPostCreado }) => {
  const [contenido, setContenido] = useState('');
  const [tipo, setTipo] = useState(POST_TYPES.SOCIAL);
  const [imagen, setImagen] = useState(null);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const textareaRef = useRef(null);

  const validacion = validarPost(contenido);
  const hashtags = extraerHashtags(contenido);
  const sugerencias = sugerirHashtags(contenido, usuarioActual?.carrera);

  const handleContenidoChange = (e) => {
    const nuevoContenido = e.target.value;
    setContenido(nuevoContenido);
    
    // Mostrar sugerencias si hay contenido
    setMostrarSugerencias(nuevoContenido.length > 10);
  };

  const handleTipoChange = (nuevoTipo) => {
    setTipo(nuevoTipo);
  };

  const handleImagenChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      // Validar tamaño y tipo
      if (archivo.size > 5 * 1024 * 1024) {
        alert('La imagen no puede ser mayor a 5MB');
        return;
      }
      
      if (!archivo.type.startsWith('image/')) {
        alert('Solo se permiten archivos de imagen');
        return;
      }
      
      setImagen(archivo);
    }
  };

  const handleEliminarImagen = () => {
    setImagen(null);
  };

  const handleSugerenciaClick = (hashtag) => {
    const nuevoContenido = contenido + ' ' + hashtag;
    setContenido(nuevoContenido);
    setMostrarSugerencias(false);
    textareaRef.current?.focus();
  };

  const handleEnviar = async () => {
    if (!validacion.valido) return;
    
    setEnviando(true);
    try {
      // Simular envío a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const nuevoPost = {
        id: Date.now(),
        autor: usuarioActual,
        contenido: contenido.trim(),
        tipo,
        hashtags,
        fecha: new Date().toISOString(),
        reacciones: { like: 0, useful: 0, important: 0, love: 0, laugh: 0 },
        comentarios: 0,
        compartidos: 0,
        estado: 'published',
        imagen: imagen ? URL.createObjectURL(imagen) : null
      };
      
      console.log('Nuevo post creado:', nuevoPost);
      
      // Limpiar formulario
      setContenido('');
      setTipo(POST_TYPES.SOCIAL);
      setImagen(null);
      
      // Notificar al componente padre
      onPostCreado?.(nuevoPost);
    } catch (error) {
      console.error('Error al crear post:', error);
      alert('Error al crear el post. Inténtalo de nuevo.');
    } finally {
      setEnviando(false);
    }
  };

  const tiposDisponibles = [
    { value: POST_TYPES.SOCIAL, label: 'Social', icon: '👥', color: '#8B5CF6' },
    { value: POST_TYPES.ACADEMICO, label: 'Académico', icon: '📚', color: '#3B82F6' },
    { value: POST_TYPES.EVENTO, label: 'Evento', icon: '🎉', color: '#10B981' },
    { value: POST_TYPES.PROFESIONAL, label: 'Profesional', icon: '💼', color: '#F59E0B' },
    { value: POST_TYPES.RECURSO, label: 'Recurso', icon: '📄', color: '#EF4444' },
    { value: POST_TYPES.DUDA, label: 'Duda', icon: '❓', color: '#06B6D4' }
  ];

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Crear nuevo post</h2>
        <button
          onClick={onCerrar}
          className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Información del usuario */}
      <div className="flex items-center space-x-3 mb-4 sm:mb-6">
        <img
          src={usuarioActual?.foto}
          alt={`${usuarioActual?.nombre} ${usuarioActual?.apellido}`}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="font-medium text-gray-900">
            {usuarioActual?.nombre} {usuarioActual?.apellido}
          </div>
          <div className="text-sm text-gray-500">
            {usuarioActual?.carrera}
          </div>
        </div>
      </div>

      {/* Tipo de post */}
      <div className="mb-3 sm:mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de post
        </label>
        <div className="grid grid-cols-2 gap-2">
          {tiposDisponibles.map((tipoOption) => (
            <button
              key={tipoOption.value}
              onClick={() => handleTipoChange(tipoOption.value)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border-2 transition-colors ${
                tipo === tipoOption.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-lg">{tipoOption.icon}</span>
              <span className="text-sm font-medium">{tipoOption.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contenido del post */}
      <div className="mb-3 sm:mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ¿Qué quieres compartir?
        </label>
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={contenido}
            onChange={handleContenidoChange}
            placeholder="Comparte algo con tu comunidad universitaria..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
            maxLength={CHARACTER_LIMITS.POST_MAX}
          />
          
          {/* Contador de caracteres */}
          <div className="absolute bottom-2 right-2 text-xs text-gray-500">
            <span className={validacion.caracteresRestantes < 20 ? 'text-red-500' : ''}>
              {validacion.caracteresRestantes}
            </span>
            /{CHARACTER_LIMITS.POST_MAX}
          </div>
        </div>

        {/* Sugerencias de hashtags */}
        {mostrarSugerencias && sugerencias.length > 0 && (
          <div className="mt-2 p-3 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 mb-2">Sugerencias de hashtags:</div>
            <div className="flex flex-wrap gap-2">
              {sugerencias.map((hashtag, index) => (
                <button
                  key={index}
                  onClick={() => handleSugerenciaClick(hashtag)}
                  className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded bg-blue-100 hover:bg-blue-200 transition-colors"
                >
                  {hashtag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Hashtags detectados */}
        {hashtags.length > 0 && (
          <div className="mt-2">
            <div className="text-xs text-gray-600 mb-1">Hashtags detectados:</div>
            <div className="flex flex-wrap gap-1">
              {hashtags.map((hashtag, index) => (
                <span
                  key={index}
                  className="text-blue-600 text-sm px-2 py-1 rounded bg-blue-100"
                >
                  {hashtag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Errores de validación */}
        {validacion.errores.length > 0 && (
          <div className="mt-2 text-sm text-red-600">
            {validacion.errores.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
        )}

        {/* Advertencias */}
        {validacion.advertencias.length > 0 && (
          <div className="mt-2 text-sm text-yellow-600">
            {validacion.advertencias.map((advertencia, index) => (
              <div key={index}>{advertencia}</div>
            ))}
          </div>
        )}
      </div>

      {/* Imagen */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imagen (opcional)
        </label>
        {imagen ? (
          <div className="relative">
            <img
              src={URL.createObjectURL(imagen)}
              alt="Vista previa"
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              onClick={handleEliminarImagen}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImagenChange}
              className="hidden"
              id="imagen-input"
            />
            <label
              htmlFor="imagen-input"
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-600">Haz clic para agregar una imagen</span>
            </label>
          </div>
        )}
      </div>

      {/* Botones de acción */}
      <div className="flex items-center justify-end space-x-2 sm:space-x-3">
        <button
          onClick={onCerrar}
          className="px-3 sm:px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm sm:text-base"
        >
          Cancelar
        </button>
        <button
          onClick={handleEnviar}
          disabled={!validacion.valido || enviando}
          className="px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 text-sm sm:text-base"
        >
          {enviando && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          )}
          <span className="text-sm sm:text-base">{enviando ? 'Publicando...' : 'Publicar'}</span>
        </button>
      </div>
    </div>
  );
};

export default PostComposer;
