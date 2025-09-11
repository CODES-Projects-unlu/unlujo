import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Github, Linkedin, Mail, ExternalLink, GraduationCap, Users, BookOpen, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Versión móvil compacta */}
        <div className="md:hidden">
          {/* Logo y descripción compacta */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  UNLujo
                </h3>
                <p className="text-xs text-gray-300">Comunidad Estudiantil</p>
              </div>
            </div>
            <p className="text-xs text-gray-300 mb-4">
              Conectando estudiantes de la UNLu
            </p>
            <div className="flex justify-center space-x-3">
              <a
                href="https://github.com/rizzofs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/federico-rizzo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:federico.rizzo@unlu.edu.ar"
                className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Enlaces en grid compacto */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="text-sm font-semibold mb-2 text-blue-400">Enlaces</h4>
              <ul className="space-y-1 text-xs">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link to="/noticias" className="text-gray-300 hover:text-white transition-colors">
                    Noticias
                  </Link>
                </li>
                <li>
                  <a
                    href="https://www.unlu.edu.ar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    UNLu Oficial
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2 text-purple-400">Carreras</h4>
              <ul className="space-y-1 text-xs">
                <li>
                  <Link to="/carrera/1" className="text-gray-300 hover:text-white transition-colors">
                    LSI
                  </Link>
                </li>
                <li>
                  <Link to="/carrera/2" className="text-gray-300 hover:text-white transition-colors">
                    LTS
                  </Link>
                </li>
                <li>
                  <Link to="/carrera/3" className="text-gray-300 hover:text-white transition-colors">
                    LE
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright y créditos compactos */}
          <div className="text-center text-xs text-gray-400 space-y-2">
            <div>© {currentYear} UNLujo - Comunidad Estudiantil UNLu</div>
            <div className="flex items-center justify-center">
              <span className="mr-1">Desarrollado con</span>
              <Heart className="w-3 h-3 text-red-500 mx-1" />
              <span className="mr-1">por</span>
              <a
                href="https://rizzofs.github.io/Mi-Porfolio2/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                Federico Rizzo
              </a>
            </div>
          </div>
        </div>

        {/* Versión desktop completa */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Logo y descripción */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    UNLujo
                  </h3>
                  <p className="text-sm text-gray-300">Comunidad Estudiantil</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Conectando, informando y apoyando a todos los estudiantes de la Universidad Nacional de Luján. 
                Una plataforma creada para fortalecer la comunidad estudiantil.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/rizzofs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/federico-rizzo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:federico.rizzo@unlu.edu.ar"
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Enlaces rápidos */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">Enlaces Rápidos</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link to="/noticias" className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Noticias
                  </Link>
                </li>
                <li>
                  <a
                    href="https://www.unlu.edu.ar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    UNLu Oficial
                  </a>
                </li>
                <li>
                  <a
                    href="https://codes-unlu.github.io/Web-Codes/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    CODES++
                  </a>
                </li>
              </ul>
            </div>

            {/* Carreras */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-purple-400">Carreras</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/carrera/1" className="text-gray-300 hover:text-white transition-colors">
                    Lic. en Sistemas de Información
                  </Link>
                </li>
                <li>
                  <Link to="/carrera/2" className="text-gray-300 hover:text-white transition-colors">
                    Lic. en Trabajo Social
                  </Link>
                </li>
                <li>
                  <Link to="/carrera/3" className="text-gray-300 hover:text-white transition-colors">
                    Lic. en Enfermería
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Línea divisoria */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Copyright */}
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © {currentYear} UNLujo - Comunidad Estudiantil UNLu. Todos los derechos reservados.
              </div>

              {/* Desarrollado por */}
              <div className="flex items-center text-sm text-gray-400">
                <span className="mr-2">Desarrollado con</span>
                <Heart className="w-4 h-4 text-red-500 mx-1" />
                <span className="mr-2">por</span>
                <a
                  href="https://rizzofs.github.io/Mi-Porfolio2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors flex items-center"
                >
                  Federico Rizzo
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
