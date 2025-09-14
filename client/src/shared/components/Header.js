import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Sparkles, Settings, Users } from 'lucide-react';
import UserSelector from '../../components/UserSelector';
import { useAuth } from '../../contexts/AuthContext';
import { isSuperAdmin } from '../../data/usersData';

const Header = () => {
  const { usuarioActual } = useAuth();
  const location = useLocation();
  
  // Determinar si estamos en la página principal o en la red social
  const isInSocial = location.pathname === '/social';
  const isInMainPage = location.pathname === '/';
  
  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 md:py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <GraduationCap className="w-5 h-5 md:w-7 md:h-7" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                UNLujo
              </h1>
              <p className="text-xs md:text-sm text-gray-600 font-medium">
                Comunidad Estudiantil
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center text-yellow-500">
                <Sparkles className="w-4 h-4 mr-1" />
                <span className="text-sm font-semibold">2025</span>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 font-medium">En línea</span>
            </div>
            
            {/* Enlace dinámico entre Página Principal y Red Social */}
            <Link 
              to={isInSocial ? "/" : "/social"}
              className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
              title={isInSocial ? "Página Principal" : "UNLujo Community"}
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isInSocial ? "Inicio" : "Social"}
              </span>
            </Link>
            
            {/* Enlace al Super Admin Dashboard - Solo visible para Super Admin */}
            {usuarioActual && isSuperAdmin(usuarioActual) && (
              <Link 
                to="/super-admin"
                className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                title="Super Admin Dashboard"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}
            
            <div className="md:hidden">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Selector de usuarios */}
          <div className="ml-4">
            <UserSelector />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;