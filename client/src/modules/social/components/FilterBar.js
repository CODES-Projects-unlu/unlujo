// Componente para la barra de filtros del feed social
import React from 'react';
import { FILTER_OPTIONS, SORT_OPTIONS, POST_TYPES } from '../constants/socialConstants';

const FilterBar = ({ filtros, ordenamiento, onFiltroChange, onOrdenamientoChange, usuarioActual }) => {
  const handleFiltroChange = (campo, valor) => {
    onFiltroChange({ [campo]: valor });
  };

  const handleBusquedaChange = (e) => {
    const valor = e.target.value;
    onFiltroChange({ busqueda: valor });
  };

  const limpiarFiltros = () => {
    onFiltroChange({
      tipo: FILTER_OPTIONS.ALL,
      carrera: null,
      busqueda: '',
      fechaDesde: null,
      fechaHasta: null,
      hashtag: null
    });
  };

  const tiposDisponibles = [
    { value: POST_TYPES.ACADEMICO, label: 'Académico', icon: '📚', color: '#3B82F6' },
    { value: POST_TYPES.EVENTO, label: 'Eventos', icon: '🎉', color: '#10B981' },
    { value: POST_TYPES.PROFESIONAL, label: 'Profesional', icon: '💼', color: '#F59E0B' },
    { value: POST_TYPES.SOCIAL, label: 'Social', icon: '👥', color: '#8B5CF6' },
    { value: POST_TYPES.RECURSO, label: 'Recursos', icon: '📄', color: '#EF4444' },
    { value: POST_TYPES.DUDA, label: 'Dudas', icon: '❓', color: '#06B6D4' }
  ];

  const carrerasDisponibles = [
    { value: 'LSI', label: 'Sistemas de Información', color: '#3B82F6' },
    { value: 'LTS', label: 'Trabajo Social', color: '#10B981' },
    { value: 'LE', label: 'Enfermería', color: '#EF4444' }
  ];

  const opcionesOrdenamiento = [
    { value: SORT_OPTIONS.RECENT, label: 'Más recientes', icon: '🕒' },
    { value: SORT_OPTIONS.POPULAR, label: 'Más populares', icon: '🔥' },
    { value: SORT_OPTIONS.OLDEST, label: 'Más antiguos', icon: '📅' }
  ];

  const tieneFiltrosActivos = 
    filtros.tipo !== FILTER_OPTIONS.ALL ||
    filtros.carrera ||
    filtros.busqueda ||
    filtros.fechaDesde ||
    filtros.fechaHasta ||
    filtros.hashtag;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Filtros</h3>
        {tieneFiltrosActivos && (
          <button
            onClick={limpiarFiltros}
            className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Limpiar
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Búsqueda */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buscar
          </label>
          <div className="relative">
            <input
              type="text"
              value={filtros.busqueda}
              onChange={handleBusquedaChange}
              placeholder="Buscar posts, hashtags..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Ordenamiento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ordenar por
          </label>
          <div className="space-y-2">
            {opcionesOrdenamiento.map((opcion) => (
              <button
                key={opcion.value}
                onClick={() => onOrdenamientoChange(opcion.value)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  ordenamiento === opcion.value
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className="text-lg">{opcion.icon}</span>
                <span className="text-sm font-medium">{opcion.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tipo de post */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de post
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleFiltroChange('tipo', FILTER_OPTIONS.ALL)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-left transition-colors ${
                filtros.tipo === FILTER_OPTIONS.ALL
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <span className="text-sm">📋</span>
              <span className="text-xs font-medium">Todos</span>
            </button>
            {tiposDisponibles.map((tipo) => (
              <button
                key={tipo.value}
                onClick={() => handleFiltroChange('tipo', tipo.value)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-left transition-colors ${
                  filtros.tipo === tipo.value
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className="text-sm">{tipo.icon}</span>
                <span className="text-xs font-medium">{tipo.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Carrera */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Carrera
          </label>
          <div className="space-y-2">
            <button
              onClick={() => handleFiltroChange('carrera', null)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                !filtros.carrera
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <span className="text-sm">🎓</span>
              <span className="text-xs font-medium">Todas las carreras</span>
            </button>
            {carrerasDisponibles.map((carrera) => (
              <button
                key={carrera.value}
                onClick={() => handleFiltroChange('carrera', carrera.value)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  filtros.carrera === carrera.value
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: carrera.color }}
                ></div>
                <span className="text-xs font-medium">{carrera.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filtros activos */}
        {tieneFiltrosActivos && (
          <div className="pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600 mb-2">Filtros activos:</div>
            <div className="flex flex-wrap gap-2">
              {filtros.tipo !== FILTER_OPTIONS.ALL && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  {tiposDisponibles.find(t => t.value === filtros.tipo)?.label}
                </span>
              )}
              {filtros.carrera && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  {carrerasDisponibles.find(c => c.value === filtros.carrera)?.label}
                </span>
              )}
              {filtros.busqueda && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                  "{filtros.busqueda}"
                </span>
              )}
            </div>
          </div>
        )}

        {/* Información del usuario */}
        {usuarioActual && (
          <div className="pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600 mb-2">Tu perfil:</div>
            <div className="flex items-center space-x-3">
              <img
                src={usuarioActual.foto}
                alt={`${usuarioActual.nombre} ${usuarioActual.apellido}`}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {usuarioActual.nombre} {usuarioActual.apellido}
                </div>
                <div className="text-xs text-gray-500">
                  {usuarioActual.carrera_nombre || usuarioActual.carrera || `Carrera ID: ${usuarioActual.carrera_id}`}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
