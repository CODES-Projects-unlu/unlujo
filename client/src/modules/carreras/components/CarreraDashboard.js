// Componente principal del dashboard de carreras
// Este es un ejemplo para que el colaborador pueda empezar a trabajar

import React from 'react';
import { useCarreraData } from '../hooks/useCarreraData';
import { formatCarreraName, getCarreraColor } from '../utils/carreraUtils';
import { LOADING_STATES } from '../constants/carrerasConstants';

const CarreraDashboard = ({ carreraId }) => {
  const { carrera, loading, error, isLoading, isError } = useCarreraData(carreraId);

  // Estado de carga
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando información de la carrera...</p>
        </div>
      </div>
    );
  }

  // Estado de error
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Si no hay carrera
  if (!carrera) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Carrera no encontrada</h2>
          <p className="text-gray-600">La carrera solicitada no existe o no está disponible.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div 
        className="text-white py-16"
        style={{ background: `linear-gradient(135deg, ${getCarreraColor(carrera.codigo)} 0%, ${getCarreraColor(carrera.codigo)}CC 100%)` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {formatCarreraName(carrera.nombre)}
          </h1>
          <p className="text-xl opacity-90 mb-6">
            {carrera.descripcion}
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
              📍 {carrera.sede}
            </span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
              ⏱️ {carrera.duracion}
            </span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
              🎓 {carrera.modalidad}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Estadísticas */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Estadísticas de la Carrera
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {carrera.estadisticas && Object.entries(carrera.estadisticas).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {typeof value === 'number' ? value.toLocaleString() : value}
                      </div>
                      <div className="text-sm text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Noticias */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Noticias Recientes
                </h2>
                <div className="space-y-6">
                  {carrera.noticias && carrera.noticias.length > 0 ? (
                    carrera.noticias.slice(0, 3).map((noticia) => (
                      <div key={noticia.id} className="border-l-4 pl-4" style={{ borderColor: getCarreraColor(carrera.codigo) }}>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <span className="mr-2">📅</span>
                          {new Date(noticia.fecha).toLocaleDateString('es-ES')}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {noticia.titulo}
                        </h3>
                        <p className="text-gray-600">
                          {noticia.contenido}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No hay noticias disponibles para esta carrera.</p>
                  )}
                </div>
              </div>

              {/* Centro de Estudiantes */}
              {carrera.centroEstudiantes && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8 border border-blue-200">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-white text-xl">👥</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Centro de Estudiantes</h2>
                      <p className="text-gray-600">{carrera.centroEstudiantes.nombreCompleto}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">¿Qué es {carrera.centroEstudiantes.nombre}?</h3>
                    <p className="text-gray-700 mb-4">
                      {carrera.centroEstudiantes.nombre} es el centro de estudiantes oficial de {formatCarreraName(carrera.nombre)}. 
                      Representa y potencia a toda la comunidad estudiantil de la carrera.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      {carrera.centroEstudiantes.actividades.map((actividad, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          {actividad}
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href={carrera.centroEstudiantes.contacto?.email || '#'}
                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <span className="mr-2">🌐</span>
                    Contactar Centro de Estudiantes
                  </a>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Información Básica */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Información Básica
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Código</p>
                    <p className="text-gray-900 font-semibold">{carrera.codigo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duración</p>
                    <p className="text-gray-900">{carrera.duracion}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Modalidad</p>
                    <p className="text-gray-900">{carrera.modalidad}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Sede</p>
                    <p className="text-gray-900">{carrera.sede}</p>
                  </div>
                </div>
              </div>

              {/* Enlaces Útiles */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Enlaces Útiles
                </h3>
                <div className="space-y-2">
                  {carrera.enlaces && carrera.enlaces.map((enlace) => (
                    <a
                      key={enlace.id}
                      href={enlace.url}
                      target={enlace.externo ? '_blank' : '_self'}
                      rel={enlace.externo ? 'noopener noreferrer' : ''}
                      className="block text-blue-600 hover:text-blue-800 transition-colors text-left w-full text-left py-2 px-3 rounded-lg hover:bg-blue-50"
                    >
                      <span className="mr-2">🔗</span>
                      {enlace.nombre}
                      {enlace.externo && <span className="ml-1 text-xs">↗</span>}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarreraDashboard;





