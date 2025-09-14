import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [carreras, setCarreras] = useState([]);

  // Cargar usuario desde localStorage al inicializar
  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const usuarioGuardado = localStorage.getItem('usuarioActual');
        
        if (token && usuarioGuardado) {
          // Verificar si el token sigue siendo válido
          try {
            const response = await apiService.getProfile();
            if (response.success) {
              setUsuarioActual(response.user);
              setIsAuthenticated(true);
            } else {
              // Token inválido, limpiar datos
              localStorage.removeItem('authToken');
              localStorage.removeItem('usuarioActual');
              setUsuarioActual(null);
              setIsAuthenticated(false);
            }
          } catch (error) {
            // Token inválido o error de conexión
            localStorage.removeItem('authToken');
            localStorage.removeItem('usuarioActual');
            setUsuarioActual(null);
            setIsAuthenticated(false);
          }
        } else {
          setUsuarioActual(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error cargando usuario:', error);
        setUsuarioActual(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    cargarUsuario();
  }, []);

  // Cargar carreras al inicializar
  useEffect(() => {
    const cargarCarreras = async () => {
      try {
        const response = await apiService.getCarreras();
        setCarreras(response);
      } catch (error) {
        console.error('Error cargando carreras:', error);
        // Usar datos de fallback si hay error
        setCarreras([
          { id: 1, nombre: 'Lic. en Sistemas de Información', sigla: 'LSI' },
          { id: 2, nombre: 'Lic. en Trabajo Social', sigla: 'LTS' },
          { id: 3, nombre: 'Lic. en Enfermería', sigla: 'LE' }
        ]);
      }
    };

    cargarCarreras();
  }, []);

  const iniciarSesion = async (email, password) => {
    try {
      setLoading(true);
      const response = await apiService.login(email, password);
      
      if (response.success) {
        // Guardar token y datos del usuario
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('usuarioActual', JSON.stringify(response.user));
        
        setUsuarioActual(response.user);
        setIsAuthenticated(true);
        
        return { success: true, message: response.message };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, message: error.message || 'Error de conexión' };
    } finally {
      setLoading(false);
    }
  };

  const registrarUsuario = async (userData) => {
    try {
      setLoading(true);
      const response = await apiService.register(userData);
      
      if (response.success) {
        return { success: true, message: response.message, user: response.user };
      } else {
        return { success: false, message: response.message, errors: response.errors };
      }
    } catch (error) {
      console.error('Error en registro:', error);
      return { success: false, message: error.message || 'Error de conexión' };
    } finally {
      setLoading(false);
    }
  };

  const cerrarSesion = () => {
    setUsuarioActual(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('usuarioActual');
  };

  const actualizarPerfil = async () => {
    try {
      const response = await apiService.getProfile();
      if (response.success) {
        setUsuarioActual(response.user);
        localStorage.setItem('usuarioActual', JSON.stringify(response.user));
        return { success: true, user: response.user };
      }
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      return { success: false, message: error.message };
    }
  };

  const actualizarDatosPerfil = async (userData) => {
    try {
      setLoading(true);
      const response = await apiService.updateProfile(userData);
      
      if (response.success) {
        setUsuarioActual(response.user);
        localStorage.setItem('usuarioActual', JSON.stringify(response.user));
        return { success: true, message: response.message, user: response.user };
      } else {
        return { success: false, message: response.message, errors: response.errors };
      }
    } catch (error) {
      console.error('Error actualizando datos del perfil:', error);
      return { success: false, message: error.message || 'Error de conexión' };
    } finally {
      setLoading(false);
    }
  };

  const subirFotoPerfil = async (photoFile) => {
    try {
      setLoading(true);
      const response = await apiService.uploadProfilePhoto(photoFile);
      
      if (response.success) {
        setUsuarioActual(response.user);
        localStorage.setItem('usuarioActual', JSON.stringify(response.user));
        return { success: true, message: response.message, user: response.user };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Error subiendo foto de perfil:', error);
      return { success: false, message: error.message || 'Error de conexión' };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    usuarioActual,
    loading,
    isAuthenticated,
    carreras,
    iniciarSesion,
    registrarUsuario,
    cerrarSesion,
    actualizarPerfil,
    actualizarDatosPerfil,
    subirFotoPerfil
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
