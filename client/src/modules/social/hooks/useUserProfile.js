import { useState, useEffect, useCallback } from 'react';
import { usuariosData } from '../../../data/usersData';
import { postsData } from '../data/socialData';

export const useUserProfile = (userId, usuarioActual) => {
  const [usuario, setUsuario] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [siguiendo, setSiguiendo] = useState(false);
  const [editandoPerfil, setEditandoPerfil] = useState(false);

  // Datos del perfil editables
  const [perfilData, setPerfilData] = useState({
    nombre: '',
    carrera: '',
    bio: '',
    ubicacion: '',
    sitioWeb: '',
    fechaNacimiento: '',
    fotoPerfil: ''
  });

  const cargarPerfil = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Simular carga de datos
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Buscando usuario con ID:', userId, 'Tipo:', typeof userId);
      console.log('Usuarios disponibles:', usuariosData.map(u => ({ id: u.id, nombre: u.nombre })));
      
      const usuarioEncontrado = usuariosData.find(u => u.id === parseInt(userId));
      
      console.log('Usuario encontrado:', usuarioEncontrado);
      
      if (!usuarioEncontrado) {
        setError('Usuario no encontrado');
        return;
      }

      setUsuario(usuarioEncontrado);
      
      // Configurar datos editables
      setPerfilData({
        nombre: `${usuarioEncontrado.nombre} ${usuarioEncontrado.apellido}`,
        carrera: usuarioEncontrado.carrera,
        bio: usuarioEncontrado.bio || '',
        ubicacion: usuarioEncontrado.ubicacion || 'Luján, Buenos Aires',
        sitioWeb: usuarioEncontrado.sitioWeb || '',
        fechaNacimiento: usuarioEncontrado.fechaNacimiento || '',
        fotoPerfil: usuarioEncontrado.foto
      });
      
      // Cargar posts del usuario
      const postsUsuario = postsData.filter(p => p.autor.id === parseInt(userId));
      setPosts(postsUsuario);
      
      // Simular estado de seguimiento
      setSiguiendo(Math.random() > 0.5);
      
    } catch (err) {
      setError('Error al cargar el perfil');
      console.error('Error cargando perfil:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const handleSeguir = useCallback(async () => {
    try {
      // Aquí se haría la llamada a la API
      setSiguiendo(!siguiendo);
      console.log(siguiendo ? 'Dejando de seguir' : 'Siguiendo', usuario?.nombre);
    } catch (err) {
      console.error('Error al seguir/dejar de seguir:', err);
    }
  }, [siguiendo, usuario]);

  const handleEditarPerfil = useCallback(() => {
    setEditandoPerfil(true);
  }, []);

  const handleGuardarPerfil = useCallback(async () => {
    try {
      // Aquí se guardaría en la base de datos
      console.log('Guardando perfil:', perfilData);
      
      // Simular guardado
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setEditandoPerfil(false);
      // Aquí se actualizaría el usuario local
      
    } catch (err) {
      console.error('Error al guardar perfil:', err);
    }
  }, [perfilData]);

  const handleCancelarEdicion = useCallback(() => {
    if (usuario) {
      setPerfilData({
        nombre: `${usuario.nombre} ${usuario.apellido}`,
        carrera: usuario.carrera,
        bio: usuario.bio || '',
        ubicacion: usuario.ubicacion || 'Luján, Buenos Aires',
        sitioWeb: usuario.sitioWeb || '',
        fechaNacimiento: usuario.fechaNacimiento || '',
        fotoPerfil: usuario.foto
      });
    }
    setEditandoPerfil(false);
  }, [usuario]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setPerfilData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const esMiPerfil = usuarioActual && usuario && usuarioActual.id === usuario.id;

  useEffect(() => {
    cargarPerfil();
  }, [cargarPerfil]);

  return {
    // Estado
    usuario,
    posts,
    loading,
    error,
    siguiendo,
    editandoPerfil,
    perfilData,
    esMiPerfil,
    
    // Acciones
    handleSeguir,
    handleEditarPerfil,
    handleGuardarPerfil,
    handleCancelarEdicion,
    handleInputChange,
    cargarPerfil
  };
};
