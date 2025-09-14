import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserProfile } from '../hooks/useUserProfile';
import { PROFILE_TAB_CONFIG, PROFILE_LOADING_STATES } from '../constants/profileConstants';
import { isSuperAdmin, isAdminCarrera, getUserRole } from '../../../data/usersData';

const UserProfile = ({ usuarioActual }) => {
  const { userId } = useParams();
  const [tabActiva, setTabActiva] = useState('posts');
  
  const {
    usuario,
    posts,
    loading,
    error,
    siguiendo,
    editandoPerfil,
    perfilData,
    esMiPerfil,
    handleSeguir,
    handleEditarPerfil,
    handleGuardarPerfil,
    handleCancelarEdicion,
    handleInputChange
  } = useUserProfile(userId, usuarioActual);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (error || !usuario) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Usuario no encontrado</h1>
          <p className="text-gray-600">El perfil que buscas no existe o ha sido eliminado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header del perfil */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            {/* Foto de perfil */}
            <div className="relative">
              <img
                src={usuario.foto}
                alt={`${usuario.nombre} ${usuario.apellido}`}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              {usuario.estado === 'active' && (
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>

            {/* Información del usuario */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {usuario.nombre} {usuario.apellido}
                  </h1>
                  <div className="flex items-center space-x-4 text-gray-600 mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                      {usuario.carrera}
                    </span>
                    {isSuperAdmin(usuario) && (
                      <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-bold">
                        SUPER ADMIN
                      </span>
                    )}
                    {isAdminCarrera(usuario) && (
                      <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-bold">
                        ADMIN
                      </span>
                    )}
                    {usuario.ubicacion && (
                      <span className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{usuario.ubicacion}</span>
                      </span>
                    )}
                  </div>
                  {usuario.bio && (
                    <p className="text-gray-700 mb-3 max-w-md">{usuario.bio}</p>
                  )}
                </div>

                {/* Botones de acción */}
                <div className="flex space-x-3">
                  {esMiPerfil ? (
                    <button
                      onClick={handleEditarPerfil}
                      className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Editar Perfil
                    </button>
                  ) : (
                    <button
                      onClick={handleSeguir}
                      className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                        siguiendo
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                      }`}
                    >
                      {siguiendo ? 'Siguiendo' : 'Seguir'}
                    </button>
                  )}
                </div>
              </div>

              {/* Estadísticas */}
              <div className="flex space-x-6 mt-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{usuario.posts || posts.length}</div>
                  <div className="text-sm text-gray-600">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{usuario.seguidores || 0}</div>
                  <div className="text-sm text-gray-600">Seguidores</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{usuario.siguiendo || 0}</div>
                  <div className="text-sm text-gray-600">Siguiendo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pestañas */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-1.5 shadow-lg border border-white/20 mb-6">
          <div className="flex space-x-1">
            {PROFILE_TAB_CONFIG.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTabActiva(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  tabActiva === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Contenido de las pestañas */}
        <div className="space-y-4">
          {tabActiva === 'posts' && (
            <div className="space-y-4">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post.id} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <img
                        src={post.autor.fotoPerfil}
                        alt={post.autor.nombre}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-bold text-gray-900">{post.autor.nombre} {post.autor.apellido}</h3>
                          <span className="text-gray-500 text-sm">@{post.autor.nombre.toLowerCase().replace(' ', '')}</span>
                          <span className="text-gray-400">·</span>
                          <span className="text-gray-500 text-sm">{post.fecha}</span>
                        </div>
                        <p className="text-gray-800 mb-3">{post.contenido}</p>
                        {post.imagen && (
                          <img
                            src={post.imagen}
                            alt="Post"
                            className="w-full max-w-md h-48 object-cover rounded-lg mb-3"
                          />
                        )}
                        <div className="flex items-center space-x-6 text-gray-500">
                          <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                            <span>💬</span>
                            <span>{post.comentarios || 0}</span>
                          </button>
                          <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
                            <span>🔄</span>
                            <span>{post.compartidos || 0}</span>
                          </button>
                          <button className="flex items-center space-x-2 hover:text-red-500 transition-colors">
                            <span>❤️</span>
                            <span>{Object.values(post.reacciones).reduce((a, b) => a + b, 0)}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No hay posts aún</h3>
                  <p className="text-gray-600">
                    {esMiPerfil ? 'Comienza a compartir tus ideas' : 'Este usuario aún no ha publicado nada'}
                  </p>
                </div>
              )}
            </div>
          )}

          {tabActiva === 'seguidores' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Seguidores</h3>
              <p className="text-gray-600">Próximamente: Lista de seguidores</p>
            </div>
          )}

          {tabActiva === 'siguiendo' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👤</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Siguiendo</h3>
              <p className="text-gray-600">Próximamente: Lista de usuarios seguidos</p>
            </div>
          )}

          {tabActiva === 'fotos' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Fotos</h3>
              <p className="text-gray-600">Próximamente: Galería de fotos</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de edición de perfil */}
      {editandoPerfil && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Editar Perfil</h2>
                <button
                  onClick={handleCancelarEdicion}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={perfilData.nombre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Carrera</label>
                  <input
                    type="text"
                    name="carrera"
                    value={perfilData.carrera}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Biografía</label>
                  <textarea
                    name="bio"
                    value={perfilData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Cuéntanos sobre ti..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
                  <input
                    type="text"
                    name="ubicacion"
                    value={perfilData.ubicacion}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ciudad, País"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sitio Web</label>
                  <input
                    type="url"
                    name="sitioWeb"
                    value={perfilData.sitioWeb}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleCancelarEdicion}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleGuardarPerfil}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
