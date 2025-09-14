// Componente para mostrar una tarjeta de post individual
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatFechaPost, calcularTotalReacciones, getColorTipoPost } from '../utils/socialUtils';
import { REACTION_CONFIG } from '../constants/socialConstants';

const PostCard = ({ post, usuarioActual, onPostActualizado }) => {
  const [mostrarComentarios, setMostrarComentarios] = useState(false);
  const [reaccionando, setReaccionando] = useState(false);

  if (!post) return null;

  const handleReaccion = async (tipoReaccion) => {
    if (reaccionando) return;
    
    setReaccionando(true);
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Aquí iría la lógica real de reacción
      console.log(`Reacción ${tipoReaccion} en post ${post.id}`);
      
      // Actualizar el post localmente
      onPostActualizado?.();
    } catch (error) {
      console.error('Error al reaccionar:', error);
    } finally {
      setReaccionando(false);
    }
  };

  const handleCompartir = async () => {
    // Verificar si Web Share API está disponible y es seguro (HTTPS)
    const isSecureContext = window.isSecureContext || window.location.protocol === 'https:';
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    console.log('Debug compartir:', {
      hasNavigatorShare: !!navigator.share,
      isSecureContext,
      isMobile,
      userAgent: navigator.userAgent
    });

    try {
      // Intentar usar Web Share API si está disponible y es seguro
      if (navigator.share && isSecureContext) {
        console.log('Intentando usar Web Share API...');
        await navigator.share({
          title: `Post de ${post.autor.nombre} - UNLujo Community`,
          text: post.contenido,
          url: window.location.href
        });
        console.log('Web Share API exitoso');
        return;
      } else {
        console.log('Web Share API no disponible:', {
          hasNavigatorShare: !!navigator.share,
          isSecureContext,
          reason: !navigator.share ? 'No navigator.share' : 'No HTTPS'
        });
      }
    } catch (error) {
      console.log('Web Share API error:', error);
    }

    // Fallback: Intentar copiar al portapapeles
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(`${post.contenido}\n\n- ${post.autor.nombre} en UNLujo Community`);
        
        // Mensaje diferente según el contexto
        if (isMobile && !isSecureContext) {
          alert('📱 Post copiado. Para compartir en apps, abre la página en HTTPS (https://...)');
        } else if (isMobile) {
          alert('📱 Post copiado. Pega en WhatsApp, Instagram, etc. para compartir');
        } else {
          alert('💻 Post copiado al portapapeles');
        }
        return;
      }
    } catch (error) {
      console.log('Clipboard API no disponible:', error);
    }

    // Fallback final: Crear un input temporal para copiar
    try {
      const textArea = document.createElement('textarea');
      textArea.value = `${post.contenido}\n\n- ${post.autor.nombre} en UNLujo Community`;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        alert('✅ Post copiado al portapapeles');
      } else {
        alert('❌ No se pudo copiar el post. Intenta seleccionar el texto manualmente.');
      }
    } catch (error) {
      console.error('Error al copiar:', error);
      alert('❌ Error al compartir el post');
    }
  };

  const totalReacciones = calcularTotalReacciones(post.reacciones);
  const colorTipo = getColorTipoPost(post.tipo);

  // Función para limpiar el contenido removiendo hashtags del texto principal
  const limpiarContenido = (contenido, hashtags) => {
    if (!hashtags || hashtags.length === 0) return contenido;
    
    let contenidoLimpio = contenido;
    hashtags.forEach(hashtag => {
      // Remover el hashtag del contenido si está presente
      const regex = new RegExp(`\\s*${hashtag.replace('#', '\\#')}\\s*`, 'g');
      contenidoLimpio = contenidoLimpio.replace(regex, ' ');
    });
    
    // Limpiar espacios múltiples
    return contenidoLimpio.replace(/\s+/g, ' ').trim();
  };

  const contenidoLimpio = limpiarContenido(post.contenido, post.hashtags);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
      {/* Header del post */}
      <div className="p-6 sm:p-8 pb-6">
        <div className="flex items-start space-x-4">
          {/* Avatar mejorado */}
          <Link to={`/perfil/${post.autor.id}`} className="flex-shrink-0 relative group">
            <img
              src={post.autor.foto}
              alt={`${post.autor.nombre} ${post.autor.apellido}`}
              className="w-14 h-14 rounded-2xl object-cover shadow-lg border-2 border-white group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full border-2 border-white"></div>
          </Link>

          {/* Información del autor */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3">
              <Link 
                to={`/perfil/${post.autor.id}`}
                className="text-lg font-bold text-gray-900 truncate hover:text-blue-600 transition-colors duration-200"
              >
                {post.autor.nombre} {post.autor.apellido}
              </Link>
              <span className="px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
                {post.autor.carrera}
              </span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-500">
                {formatFechaPost(post.fecha)}
              </span>
            </div>
            
            {/* Tipo de post */}
            <div className="mt-1">
              <span
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: `${colorTipo}20`,
                  color: colorTipo
                }}
              >
                {post.tipo.charAt(0).toUpperCase() + post.tipo.slice(1)}
              </span>
            </div>
          </div>

          {/* Menú de opciones */}
          <div className="flex-shrink-0">
            <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
              <span className="sr-only">Opciones</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Contenido del post */}
      <div className="px-6 sm:px-8 pb-6">
        <div className="text-gray-900 whitespace-pre-wrap text-lg leading-relaxed">
          {contenidoLimpio}
        </div>

        {/* Hashtags mejorados */}
        {post.hashtags && post.hashtags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.hashtags.map((hashtag, index) => (
              <span
                key={index}
                className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm font-medium bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-full transition-colors"
              >
                {hashtag}
              </span>
            ))}
          </div>
        )}

        {/* Imagen del post */}
        {post.imagen && (
          <div className="mt-4">
            <img
              src={post.imagen}
              alt="Imagen del post"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}
      </div>


      {/* Acciones mejoradas */}
      <div className="px-6 sm:px-8 py-4 border-t border-gray-100/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          {/* Reacciones */}
          <div className="flex items-center flex-wrap gap-1 sm:gap-2">
            {Object.entries(REACTION_CONFIG).map(([tipo, config]) => {
              const cantidad = post.reacciones[tipo] || 0;
              if (cantidad === 0) return null;

              const iconos = {
                like: '❤️',
                useful: '👍',
                important: '⭐',
                love: '💖',
                laugh: '😂'
              };

              return (
                <button
                  key={tipo}
                  onClick={() => handleReaccion(tipo)}
                  disabled={reaccionando}
                  className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 hover:scale-105"
                  style={{ color: config.color }}
                >
                  <span className="text-sm sm:text-lg">{iconos[tipo] || '👍'}</span>
                  <span className="text-xs sm:text-sm font-semibold">{cantidad}</span>
                </button>
              );
            })}
          </div>

          {/* Acciones principales */}
          <div className="flex items-center justify-between sm:justify-end space-x-4 sm:space-x-6">
            {/* Comentarios */}
            <button
              onClick={() => setMostrarComentarios(!mostrarComentarios)}
              className="group flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-all duration-200 hover:scale-105"
            >
              <div className="p-2 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="text-sm font-semibold">{post.comentarios || 0}</span>
            </button>

            {/* Compartir */}
            <button
              onClick={handleCompartir}
              className="group flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-all duration-200 hover:scale-105"
            >
              <div className="p-2 rounded-full bg-gray-100 group-hover:bg-green-100 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </div>
              <span className="text-sm font-semibold">{post.compartidos || 0}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comentarios */}
      {mostrarComentarios && (
        <div className="px-4 sm:px-6 py-4 border-t border-gray-100 bg-gray-50">
          <div className="space-y-3">
            {/* Aquí irían los comentarios */}
            <div className="text-center text-gray-500 text-sm">
              Los comentarios se cargarán aquí
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
