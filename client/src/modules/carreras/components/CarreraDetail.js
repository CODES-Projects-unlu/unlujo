import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, BookOpen, Heart, Laptop, ExternalLink, Globe } from 'lucide-react';

const CarreraDetail = ({ carreras }) => {
  const { id } = useParams();
  const carrera = carreras.find(c => c.id === parseInt(id));

  if (!carrera) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Carrera no encontrada</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const getIcon = (codigo) => {
    switch (codigo) {
      case 'LSI':
        return <Laptop className="w-12 h-12" />;
      case 'LTS':
        return <Users className="w-12 h-12" />;
      case 'LE':
        return <Heart className="w-12 h-12" />;
      default:
        return <BookOpen className="w-12 h-12" />;
    }
  };

  const formatCarreraName = (nombre) => {
    return nombre.replace(/Licenciatura en/g, 'Lic. en');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div 
        className="text-white py-16"
        style={{ background: `linear-gradient(135deg, ${carrera.color} 0%, ${carrera.color}CC 100%)` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-white hover:text-gray-200 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver al inicio
          </Link>
          
          <div className="flex items-center">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mr-6">
              {getIcon(carrera.codigo)}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {formatCarreraName(carrera.nombre)}
              </h1>
              <p className="text-xl opacity-90">
                {carrera.descripcion}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Información de la Carrera
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Código de Carrera</h3>
                    <p className="text-gray-600">{carrera.codigo}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Descripción</h3>
                    <p className="text-gray-600">{carrera.descripcion}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Duración</h3>
                    <p className="text-gray-600">5 años (10 semestres)</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Título</h3>
                    <p className="text-gray-600">{formatCarreraName(carrera.nombre)}</p>
                  </div>
                </div>
              </div>

              {/* Centro de Estudiantes - Solo para LSI */}
              {carrera.codigo === 'LSI' && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8 border border-blue-200">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Centro de Estudiantes</h2>
                      <p className="text-gray-600">CODES++ - Centro Organizado de Estudiantes de Sistemas</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">¿Qué es CODES++?</h3>
                    <p className="text-gray-700 mb-4">
                      CODES++ es el centro de estudiantes oficial de la Lic. en Sistemas de Información. 
                      Representa y potencia a toda la comunidad estudiantil de la carrera.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        Sorteos y eventos
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        Recursos académicos
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        Grupos de estudio
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        Hackathons
                      </div>
                    </div>
                  </div>

                  <a
                    href="https://codes-unlu.github.io/Web-Codes/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Globe className="w-5 h-5 mr-2" />
                    Visitar Web de CODES++
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                  
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Se abrirá en una nueva pestaña
                  </p>
                </div>
              )}

              {/* Noticias de la Carrera */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Noticias de {formatCarreraName(carrera.nombre)}
                </h2>
                <div className="space-y-6">
                  {carrera.noticias && carrera.noticias.length > 0 ? (
                    carrera.noticias.map((noticia) => (
                      <div key={noticia.id} className="border-l-4 pl-4" style={{ borderColor: carrera.color }}>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Calendar className="w-4 h-4 mr-1" />
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
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Contacto
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">centroestudiantes@unlujo.edu.ar</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Teléfono</p>
                    <p className="text-gray-900">(011) 1234-5678</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Horarios</p>
                    <p className="text-gray-900">Lunes a Viernes 8:00 - 18:00</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Enlaces Útiles
                </h3>
                <div className="space-y-2">
                  <button className="block text-blue-600 hover:text-blue-800 transition-colors text-left w-full text-left">
                    Plan de Estudios
                  </button>
                  <button className="block text-blue-600 hover:text-blue-800 transition-colors text-left w-full text-left">
                    Calendario Académico
                  </button>
                  <button className="block text-blue-600 hover:text-blue-800 transition-colors text-left w-full text-left">
                    Reglamento Estudiantil
                  </button>
                  <button className="block text-blue-600 hover:text-blue-800 transition-colors text-left w-full text-left">
                    Biblioteca Virtual
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarreraDetail;
