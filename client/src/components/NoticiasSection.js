import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Sparkles, Zap, GraduationCap, Trophy, Lightbulb, Eye } from 'lucide-react';
import Carousel from './Carousel';

const NoticiasSection = ({ noticias }) => {
  const getCategoryIcon = (categoria) => {
    switch (categoria) {
      case 'general':
        return <Sparkles className="w-4 h-4" />;
      case 'tecnología':
        return <Zap className="w-4 h-4" />;
      case 'académico':
        return <GraduationCap className="w-4 h-4" />;
      case 'eventos':
        return <Trophy className="w-4 h-4" />;
      default:
        return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (categoria) => {
    switch (categoria) {
      case 'general':
        return 'from-blue-500 to-cyan-500';
      case 'tecnología':
        return 'from-purple-500 to-pink-500';
      case 'académico':
        return 'from-green-500 to-emerald-500';
      case 'eventos':
        return 'from-orange-500 to-red-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="py-12 md:py-20 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Trophy className="w-8 h-8 text-orange-500 mr-3" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Noticias de la Comunidad
            </h2>
            <Trophy className="w-8 h-8 text-orange-500 ml-3" />
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Información relevante para toda la comunidad estudiantil UNLu
          </p>
        </div>

        <Carousel
          items={noticias}
          itemsPerView={{ mobile: 1, desktop: 3 }}
          renderItem={(noticia) => (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-lg md:shadow-2xl hover:shadow-xl md:hover:shadow-3xl transition-all duration-300 md:duration-500 overflow-hidden group hover:scale-105 border border-white/30 h-80 md:h-96 flex flex-col">
              <div className="h-32 md:h-48 relative overflow-hidden flex-shrink-0">
                <img 
                  src={noticia.imagen} 
                  alt={noticia.titulo}
                  className="w-full h-full object-cover transition-transform duration-300 md:duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(noticia.categoria)} flex items-center justify-center hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="text-white text-4xl md:text-6xl relative z-10">
                    {getCategoryIcon(noticia.categoria)}
                  </div>
                </div>
                <div className="absolute top-2 md:top-4 left-2 md:left-4 flex items-center text-white/90 bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full">
                  {getCategoryIcon(noticia.categoria)}
                  <span className="ml-1 md:ml-2 text-xs md:text-sm font-semibold capitalize">{noticia.categoria}</span>
                </div>
                <div className="absolute top-2 md:top-4 right-2 md:right-4 flex items-center text-white/90 bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full">
                  <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  <span className="text-xs md:text-sm font-semibold">{new Date(noticia.fecha).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="p-4 md:p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {noticia.titulo}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 line-clamp-2 md:line-clamp-3 leading-relaxed">
                    {noticia.contenido}
                  </p>
                </div>
                <button className="flex items-center text-blue-600 hover:text-blue-800 font-semibold group-hover:bg-blue-50 px-3 md:px-4 py-1 md:py-2 rounded-full transition-all duration-200 self-start mt-3">
                  <span className="text-sm md:text-base">Leer más</span>
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}
        />

        {/* Botón Ver todas las noticias */}
        <div className="text-center mt-8">
          <Link
            to="/noticias"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Eye className="w-5 h-5 mr-2" />
            Ver todas las noticias
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoticiasSection;