import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUserRole, isSuperAdmin, isAdminCarrera } from '../data/usersData';

const UserSelector = () => {
  const { usuarioActual, cerrarSesion } = useAuth();
  const [mostrarSelector, setMostrarSelector] = useState(false);

  const handleCerrarSesion = () => {
    cerrarSesion();
    setMostrarSelector(false);
  };

  if (!usuarioActual) {
    return null;
  }

  return (
    <div className="relative">
      {/* Botón del usuario actual */}
      <button
        onClick={() => setMostrarSelector(!mostrarSelector)}
        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
          {usuarioActual.nombre?.charAt(0)}{usuarioActual.apellido?.charAt(0)}
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-semibold text-gray-900">
            {usuarioActual.nombre} {usuarioActual.apellido}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">{usuarioActual.carrera_nombre || `Carrera ID: ${usuarioActual.carrera_id}`}</span>
            {isSuperAdmin(usuarioActual) && (
              <span className="px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">
                SUPER ADMIN
              </span>
            )}
            {isAdminCarrera(usuarioActual) && (
              <span className="px-2 py-0.5 text-xs font-bold text-white bg-blue-500 rounded-full">
                ADMIN
              </span>
            )}
          </div>
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${
            mostrarSelector ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown del selector */}
      {mostrarSelector && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          {/* Usuario actual */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                {usuarioActual.nombre?.charAt(0)}{usuarioActual.apellido?.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">
                  {usuarioActual.nombre} {usuarioActual.apellido}
                </div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm text-gray-600">{usuarioActual.carrera_nombre || `Carrera ID: ${usuarioActual.carrera_id}`}</span>
                  {isSuperAdmin(usuarioActual) && (
                    <span className="px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">
                      SUPER ADMIN
                    </span>
                  )}
                  {isAdminCarrera(usuarioActual) && (
                    <span className="px-2 py-0.5 text-xs font-bold text-white bg-blue-500 rounded-full">
                      ADMIN
                    </span>
                  )}
                </div>
                <div className="text-xs text-green-600 font-medium">● En línea</div>
              </div>
            </div>
          </div>

          {/* Enlaces a perfiles */}
          <div className="p-2 border-t border-gray-200 space-y-1">
            <Link
              to={`/perfil-general/${usuarioActual.id}`}
              onClick={() => setMostrarSelector(false)}
              className="w-full flex items-center space-x-3 p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-medium">Perfil General</span>
            </Link>
            
            <Link
              to={`/perfil/${usuarioActual.id}`}
              onClick={() => setMostrarSelector(false)}
              className="w-full flex items-center space-x-3 p-3 text-purple-600 hover:bg-purple-50 rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="font-medium">Perfil Social</span>
            </Link>
          </div>

          {/* Información adicional */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-center text-sm text-gray-500 mb-3">
              Para cambiar de usuario, cierra sesión y vuelve a iniciar
            </div>
          </div>

          {/* Botón de cerrar sesión */}
          <div className="p-2 border-t border-gray-200">
            <button
              onClick={handleCerrarSesion}
              className="w-full flex items-center space-x-3 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}

      {/* Overlay para cerrar el dropdown */}
      {mostrarSelector && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setMostrarSelector(false)}
        />
      )}
    </div>
  );
};

export default UserSelector;
