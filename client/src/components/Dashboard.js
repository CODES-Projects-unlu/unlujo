import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, Heart, Laptop, GraduationCap, Sparkles, Globe, Trophy, Lightbulb, Star, Zap } from 'lucide-react';
import Carousel from './Carousel';

const Dashboard = ({ carreras }) => {
  const getIcon = (carrera, isMobile = false) => {
    const size = isMobile ? "w-12 h-12" : "w-16 h-16 md:w-20 md:h-20";
    switch (carrera.codigo) {
      case 'LSI':
        return <Laptop className={size} />;
      case 'LTS':
        return <Heart className={size} />;
      case 'LE':
        return <BookOpen className={size} />;
      default:
        return <GraduationCap className={size} />;
    }
  };

  const formatCarreraName = (nombre) => {
    return nombre.replace(/Licenciatura en/g, 'Lic. en');
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="mr-4">
                <GraduationCap className="w-16 h-16 md:w-20 md:h-20 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="text-lg md:text-xl lg:text-2xl text-gray-600 font-medium">
                  Conectando, informando y apoyando a todos los estudiantes de la Universidad Nacional de Luján
                </p>
              </div>
            </div>
            <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              ¡Bienvenidos al 2025! Una nueva era de innovación, tecnología y comunidad estudiantil. 
              Descubre las últimas noticias, explora nuestras carreras y conecta con tu comunidad.
            </p>
            <div className="flex items-center justify-center mt-6 space-x-4">
              <div className="flex items-center text-yellow-500">
                <Star className="w-5 h-5 mr-1" />
                <span className="text-sm font-semibold">2025</span>
              </div>
              <div className="flex items-center text-green-500">
                <Zap className="w-5 h-5 mr-1" />
                <span className="text-sm font-semibold">Innovación</span>
              </div>
              <div className="flex items-center text-blue-500">
                <Globe className="w-5 h-5 mr-1" />
                <span className="text-sm font-semibold">Comunidad</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carreras Section */}
      <div className="py-12 md:py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-yellow-500 mr-3" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Nuestras Carreras
              </h2>
              <Sparkles className="w-8 h-8 text-yellow-500 ml-3" />
            </div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Explora las tres carreras de nuestra comunidad y mantente informado sobre las últimas novedades
            </p>
          </div>

          {/* Vista móvil - Grid */}
          <div className="block md:hidden">
            <div className="grid grid-cols-1 gap-4">
              {carreras.map((carrera) => (
                <Link
                  key={carrera.id}
                  to={`/carrera/${carrera.id}`}
                  className="group block"
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 group-hover:scale-105 group-hover:bg-white border border-white/30">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="text-blue-600">
                        {getIcon(carrera, true)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                            {formatCarreraName(carrera.nombre)}
                          </h3>
                          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider bg-gradient-to-r from-gray-100 to-gray-200 px-2 py-1 rounded-full">
                            {carrera.codigo}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                          {carrera.descripcion}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center text-gray-500">
                        <Users className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">Comunidad activa</span>
                      </div>
                      <div className="flex items-center text-blue-600 group-hover:text-blue-800">
                        <span className="text-sm font-semibold">Ver más</span>
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Vista desktop - Carrusel */}
          <div className="hidden md:block">
            <Carousel
              items={carreras}
              renderItem={(carrera) => (
                <Link
                  to={`/carrera/${carrera.id}`}
                  className="group block h-full"
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 h-80 p-6 flex flex-col justify-between group-hover:scale-105 group-hover:bg-white border border-white/30">
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-blue-600">
                        {getIcon(carrera)}
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-500 uppercase tracking-wider bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
                          {carrera.codigo}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                          {formatCarreraName(carrera.nombre)}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                          {carrera.descripcion}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center text-gray-500">
                          <Users className="w-4 h-4 mr-1" />
                          <span className="text-sm font-semibold">Comunidad activa</span>
                        </div>
                        <div className="flex items-center text-white bg-gradient-to-r from-blue-500 to-purple-500 group-hover:from-blue-600 group-hover:to-purple-600 px-4 py-2 rounded-full transition-all duration-300 shadow-lg group-hover:shadow-xl">
                          <span className="text-sm font-bold">Explorar</span>
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;