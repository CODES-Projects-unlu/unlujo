import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Calendar, Eye, Clock, TrendingUp, Star, Globe } from 'lucide-react';

const NoticiasPage = ({ noticias }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [sortBy, setSortBy] = useState('fecha');

  // Categorías disponibles
  const categorias = [
    { id: 'todas', nombre: 'Todas', icono: Globe, color: 'gray' },
    { id: 'institucional', nombre: 'Institucional', icono: TrendingUp, color: 'blue' },
    { id: 'académico', nombre: 'Académico', icono: Star, color: 'green' },
    { id: 'eventos', nombre: 'Eventos', icono: Calendar, color: 'purple' },
    { id: 'salud', nombre: 'Salud', icono: Eye, color: 'red' }
  ];

  // Función para obtener el color de la categoría
  const getCategoryColor = (categoria) => {
    const cat = categorias.find(c => c.id === categoria);
    if (!cat) return 'gray';
    return cat.color;
  };

  // Función para obtener el icono de la categoría
  const getCategoryIcon = (categoria) => {
    const cat = categorias.find(c => c.id === categoria);
    if (!cat) return Globe;
    return cat.icono;
  };

  // Filtrar y ordenar noticias
  const filteredNoticias = useMemo(() => {
    let filtered = noticias.filter(noticia => {
      const matchesSearch = noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           noticia.contenido.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'todas' || noticia.categoria === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'fecha':
          return new Date(b.fecha) - new Date(a.fecha);
        case 'titulo':
          return a.titulo.localeCompare(b.titulo);
        case 'categoria':
          return a.categoria.localeCompare(b.categoria);
        default:
          return 0;
      }
    });

    return filtered;
  }, [noticias, searchTerm, selectedCategory, sortBy]);

  // Formatear fecha
  const formatDate = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver al inicio
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Noticias de la Comunidad
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              {filteredNoticias.length} noticia{filteredNoticias.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar noticias..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Filtro por categoría */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                {categorias.map(categoria => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Ordenar por */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="fecha">Más recientes</option>
                <option value="titulo">A-Z</option>
                <option value="categoria">Por categoría</option>
              </select>
            </div>
          </div>

          {/* Vista rápida de categorías */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              {categorias.map(categoria => {
                const IconComponent = categoria.icono;
                const isActive = selectedCategory === categoria.id;
                return (
                  <button
                    key={categoria.id}
                    onClick={() => setSelectedCategory(categoria.id)}
                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? `bg-${categoria.color}-100 text-${categoria.color}-700 border-2 border-${categoria.color}-300`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {categoria.nombre}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contenido de noticias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNoticias.map((noticia) => {
            const IconComponent = getCategoryIcon(noticia.categoria);
            const categoryColor = getCategoryColor(noticia.categoria);
            
            return (
              <article
                key={noticia.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105"
              >
                {/* Imagen */}
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={noticia.imagen}
                    alt={noticia.titulo}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                    <div className="flex items-center space-x-2">
                      <div className={`px-3 py-1 rounded-full bg-${categoryColor}-100 text-${categoryColor}-700 text-xs font-semibold flex items-center`}>
                        <IconComponent className="w-3 h-3 mr-1" />
                        {noticia.categoria}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(noticia.fecha)}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {noticia.titulo}
                  </h3>
                  
                  <p className="text-gray-600 line-clamp-3 leading-relaxed mb-4">
                    {noticia.contenido}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Lectura rápida</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 font-semibold group-hover:bg-blue-50 px-4 py-2 rounded-full transition-all duration-200">
                      Leer más
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mensaje si no hay resultados */}
        {filteredNoticias.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron noticias
            </h3>
            <p className="text-gray-600 mb-4">
              Intenta ajustar los filtros o términos de búsqueda
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('todas');
              }}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticiasPage;
