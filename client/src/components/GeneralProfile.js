import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit3, Save, X, Plus, Trash2, MapPin, Phone, Mail, Calendar, GraduationCap, Building, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { materiasLSI } from '../data/materiasLSI';

const GeneralProfile = () => {
  const { userId } = useParams();
  const { usuarioActual, carreras, actualizarDatosPerfil, subirFotoPerfil } = useAuth();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editandoPerfil, setEditandoPerfil] = useState(false);
  const [editandoMaterias, setEditandoMaterias] = useState(false);
  const [fotoTemporal, setFotoTemporal] = useState(null);
  const [editandoNombre, setEditandoNombre] = useState(false);
  const [solicitudEnviada, setSolicitudEnviada] = useState(false);
  
  // Datos del perfil editables
  const [perfilData, setPerfilData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    foto: '',
    fechaNacimiento: '',
    dni: '',
    carrera: '',
    añoIngreso: '',
    estadoAcademico: '',
    fechaCreacion: '',
    fechaUltimoAcceso: ''
  });

  // Materias que está cursando
  const [materiasCursando, setMateriasCursando] = useState([]);
  const [nuevaMateria, setNuevaMateria] = useState({
    materiaId: '',
    cuatrimestre: '',
    sede: '',
    comision: '',
    horario: '',
    profesor: ''
  });

  // Opciones para los selects
  const cuatrimestres = ['Primer Cuatrimestre', 'Segundo Cuatrimestre', 'Verano'];
  const sedes = ['Sede Central Luján', 'Sede San Miguel', 'Sede Pilar', 'Sede Virtual'];
  const carrerasOpciones = ['Licenciatura en Sistemas de Información', 'Licenciatura en Turismo Sustentable', 'Licenciatura en Enfermería'];
  
  // Obtener todas las materias de LSI en una lista plana
  const obtenerMateriasLSI = () => {
    const materias = [];
    materiasLSI.materias.forEach(año => {
      año.materias.forEach(materia => {
        materias.push({
          codigo: materia.codigo,
          nombre: materia.nombre,
          nombreCompleto: `${materia.codigo} - ${materia.nombre}`,
          año: año.año,
          cuatrimestre: año.cuatrimestre,
          horasSemanales: materia.horas_semanales,
          horasTotales: materia.horas_totales,
          correlatividad: materia.correlatividad
        });
      });
    });
    return materias.sort((a, b) => a.nombre.localeCompare(b.nombre));
  };
  
  const materiasDisponibles = obtenerMateriasLSI();

  useEffect(() => {
    cargarPerfil();
  }, [usuarioActual, carreras]);

  // Efecto para actualizar perfilData cuando usuarioActual cambie
  useEffect(() => {
    if (usuarioActual && usuarioActual.carrera_nombre) {
      const nombreCarrera = usuarioActual.carrera_nombre;
      console.log('🔄 Actualizando perfilData con carrera:', nombreCarrera);
      console.log('🔄 usuarioActual.carrera_nombre:', usuarioActual.carrera_nombre);
      console.log('🔄 usuarioActual.carrera_id:', usuarioActual.carrera_id);
      setPerfilData(prev => {
        console.log('🔄 perfilData anterior:', prev.carrera);
        const nuevoPerfilData = {
          ...prev,
          carrera: nombreCarrera
        };
        console.log('🔄 perfilData nuevo:', nuevoPerfilData.carrera);
        return nuevoPerfilData;
      });
    }
  }, [usuarioActual?.carrera_nombre]);

  // Limpiar URLs temporales al desmontar el componente
  useEffect(() => {
    return () => {
      if (fotoTemporal) {
        URL.revokeObjectURL(fotoTemporal);
      }
    };
  }, [fotoTemporal]);

  // Función para formatear fecha de nacimiento
  const formatearFecha = (fecha) => {
    if (!fecha) return '';
    const fechaObj = new Date(fecha);
    return fechaObj.toISOString().split('T')[0]; // Formato YYYY-MM-DD para input date
  };

  const cargarPerfil = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Si no hay usuario autenticado, mostrar error
      if (!usuarioActual) {
        setError('No hay usuario autenticado');
        return;
      }

      console.log('🔍 Usuario actual en cargarPerfil:', usuarioActual);
      console.log('🔍 Foto del usuario:', usuarioActual.foto);
      console.log('🔍 Fecha de nacimiento del usuario:', usuarioActual.fecha_nacimiento);

      // Usar el usuario autenticado
      setUsuario(usuarioActual);
      
      // Obtener el nombre de la carrera
      console.log('🔍 Usuario actual completo:', usuarioActual);
      const nombreCarrera = usuarioActual.carrera_nombre || `Carrera ID: ${usuarioActual.carrera_id}`;
      console.log('🔍 Nombre de carrera:', nombreCarrera);
      
      // Configurar datos editables
      const fotoUsuario = usuarioActual.foto || '';
      console.log('🔍 Configurando perfilData con foto:', fotoUsuario);
      
      const fechaNacimientoFormateada = formatearFecha(usuarioActual.fecha_nacimiento);
      console.log('🔍 Fecha de nacimiento formateada:', fechaNacimientoFormateada);

      setPerfilData({
        nombre: usuarioActual.nombre || '',
        apellido: usuarioActual.apellido || '',
        email: usuarioActual.email || '',
        telefono: usuarioActual.telefono || '',
        foto: fotoUsuario,
        fechaNacimiento: fechaNacimientoFormateada,
        dni: usuarioActual.dni || '',
        carrera: nombreCarrera,
        añoIngreso: usuarioActual.año_ingreso || new Date().getFullYear(),
        estadoAcademico: usuarioActual.estado_academico || 'Activo',
        fechaCreacion: usuarioActual.fecha_creacion ? new Date(usuarioActual.fecha_creacion).toLocaleDateString('es-ES') : '',
        fechaUltimoAcceso: usuarioActual.fecha_ultimo_acceso ? new Date(usuarioActual.fecha_ultimo_acceso).toLocaleDateString('es-ES') : ''
      });

      // Cargar materias que está cursando (datos mock por ahora)
      setMateriasCursando([
        {
          id: 1,
          nombre: 'Programación I',
          codigo: 'LSI-001',
          cuatrimestre: 'Primer Cuatrimestre',
          sede: 'Sede Central Luján',
          comision: 'A',
          horario: 'Lunes y Miércoles 18:00-20:00',
          profesor: 'Dr. García'
        },
        {
          id: 2,
          nombre: 'Matemática I',
          codigo: 'LSI-002',
          cuatrimestre: 'Primer Cuatrimestre',
          sede: 'Sede Central Luján',
          comision: 'B',
          horario: 'Martes y Jueves 16:00-18:00',
          profesor: 'Lic. Martínez'
        }
      ]);
      
    } catch (err) {
      setError('Error al cargar el perfil');
      console.error('Error cargando perfil:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPerfilData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido');
        return;
      }
      
      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen debe ser menor a 5MB');
        return;
      }
      
      try {
        // Crear URL temporal para preview
        const urlTemporal = URL.createObjectURL(file);
        setFotoTemporal(urlTemporal);
        
        // Actualizar los datos del perfil localmente
        setPerfilData(prev => ({
          ...prev,
          foto: urlTemporal
        }));

        // Subir la foto al servidor
        const result = await subirFotoPerfil(file);
        
        if (result.success) {
          // Actualizar el estado local con la respuesta del servidor
          setUsuario(result.user);
          
          // Actualizar también perfilData con la nueva foto
          setPerfilData(prev => ({
            ...prev,
            foto: result.user.foto
          }));
          
          // Limpiar foto temporal ya que ahora tenemos la foto real
          if (fotoTemporal) {
            URL.revokeObjectURL(fotoTemporal);
            setFotoTemporal(null);
          }
          
          alert('Foto de perfil actualizada exitosamente');
        } else {
          alert(`Error al subir la foto: ${result.message}`);
          // Revertir cambios locales
          setPerfilData(prev => ({
            ...prev,
            foto: usuario?.foto || ''
          }));
          if (fotoTemporal) {
            URL.revokeObjectURL(fotoTemporal);
            setFotoTemporal(null);
          }
        }
      } catch (error) {
        console.error('Error subiendo foto:', error);
        alert('Error al subir la foto. Inténtalo de nuevo.');
        // Revertir cambios locales
        setPerfilData(prev => ({
          ...prev,
          foto: usuario?.foto || ''
        }));
        if (fotoTemporal) {
          URL.revokeObjectURL(fotoTemporal);
          setFotoTemporal(null);
        }
      }
    }
  };

  const handleEliminarFoto = () => {
    if (fotoTemporal) {
      URL.revokeObjectURL(fotoTemporal);
      setFotoTemporal(null);
    }
    setPerfilData(prev => ({
      ...prev,
      foto: usuario?.foto || ''
    }));
  };

  const handleSolicitarCambioNombre = async () => {
    try {
      // Simular envío de solicitud
      console.log('Enviando solicitud de cambio de nombre:', {
        nombreActual: `${usuarioActual.nombre} ${usuarioActual.apellido}`,
        nombreSolicitado: `${perfilData.nombre} ${perfilData.apellido}`,
        usuarioId: usuarioActual.id,
        fecha: new Date().toISOString()
      });
      
      // Aquí se enviaría la solicitud al backend
      // await enviarSolicitudCambioNombre({
      //   usuarioId: usuario.id,
      //   nombreAnterior: usuario.nombre,
      //   apellidoAnterior: usuario.apellido,
      //   nombreNuevo: perfilData.nombre,
      //   apellidoNuevo: perfilData.apellido,
      //   motivo: 'Corrección de datos personales'
      // });
      
      setSolicitudEnviada(true);
      setEditandoNombre(false);
      
      // Simular respuesta del servidor
      setTimeout(() => {
        setSolicitudEnviada(false);
        alert('Solicitud enviada. Un administrador revisará tu solicitud en las próximas 24-48 horas.');
      }, 1000);
      
    } catch (err) {
      console.error('Error al enviar solicitud:', err);
      alert('Error al enviar la solicitud. Inténtalo de nuevo.');
    }
  };

  const handleCancelarEdicionNombre = () => {
    setPerfilData(prev => ({
      ...prev,
      nombre: usuarioActual.nombre,
      apellido: usuarioActual.apellido
    }));
    setEditandoNombre(false);
  };

  const handleMateriaChange = (e) => {
    const { name, value } = e.target;
    setNuevaMateria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGuardarPerfil = async () => {
    try {
      console.log('🔍 Guardando perfil:', perfilData);
      console.log('🔍 Fecha de nacimiento en perfilData:', perfilData.fechaNacimiento);
      
      // Preparar datos para enviar al backend (solo los campos editables)
      const datosParaActualizar = {
        nombre: perfilData.nombre,
        apellido: perfilData.apellido,
        email: perfilData.email,
        telefono: perfilData.telefono,
        fecha_nacimiento: perfilData.fechaNacimiento || null,
        dni: perfilData.dni,
        estado_academico: perfilData.estadoAcademico
      };
      
      console.log('🔍 Datos para actualizar:', datosParaActualizar);

      // Llamar a la función de actualización del contexto
      const result = await actualizarDatosPerfil(datosParaActualizar);
      
      if (result.success) {
        // Actualizar el estado local con los datos actualizados
        setUsuario(result.user);
        
        setEditandoPerfil(false);

        // Mostrar mensaje de éxito
        alert('Perfil actualizado exitosamente');
      } else {
        // Mostrar errores
        if (result.errors) {
          alert(`Error al actualizar perfil: ${result.errors.join(', ')}`);
        } else {
          alert(`Error al actualizar perfil: ${result.message}`);
        }
      }
    } catch (err) {
      console.error('Error al guardar perfil:', err);
      alert('Error al guardar perfil. Inténtalo de nuevo.');
    }
  };

  const handleCancelarEdicion = () => {
    if (usuarioActual) {
      const nombreCarrera = usuarioActual.carrera_nombre || `Carrera ID: ${usuarioActual.carrera_id}`;

      setPerfilData({
        nombre: usuarioActual.nombre || '',
        apellido: usuarioActual.apellido || '',
        email: usuarioActual.email || '',
        telefono: usuarioActual.telefono || '',
        foto: '',
        fechaNacimiento: formatearFecha(usuarioActual.fecha_nacimiento),
        dni: usuarioActual.dni || '',
        carrera: nombreCarrera,
        añoIngreso: usuarioActual.año_ingreso || new Date().getFullYear(),
        estadoAcademico: usuarioActual.estado_academico || 'Activo',
        fechaCreacion: usuarioActual.fecha_creacion ? new Date(usuarioActual.fecha_creacion).toLocaleDateString('es-ES') : '',
        fechaUltimoAcceso: usuarioActual.fecha_ultimo_acceso ? new Date(usuarioActual.fecha_ultimo_acceso).toLocaleDateString('es-ES') : ''
      });
    }
    
    // Limpiar foto temporal al cancelar
    if (fotoTemporal) {
      URL.revokeObjectURL(fotoTemporal);
      setFotoTemporal(null);
    }
    
    setEditandoPerfil(false);
  };

  const handleAgregarMateria = () => {
    if (nuevaMateria.materiaId) {
      const materiaSeleccionada = materiasDisponibles.find(m => m.codigo === nuevaMateria.materiaId);
      if (materiaSeleccionada) {
        const materia = {
          id: Date.now(),
          codigo: materiaSeleccionada.codigo,
          nombre: materiaSeleccionada.nombre,
          nombreCompleto: materiaSeleccionada.nombreCompleto,
          año: materiaSeleccionada.año,
          cuatrimestreOriginal: materiaSeleccionada.cuatrimestre,
          cuatrimestre: nuevaMateria.cuatrimestre,
          sede: nuevaMateria.sede,
          comision: nuevaMateria.comision,
          horario: nuevaMateria.horario,
          profesor: nuevaMateria.profesor
        };
        setMateriasCursando(prev => [...prev, materia]);
        setNuevaMateria({
          materiaId: '',
          cuatrimestre: '',
          sede: '',
          comision: '',
          horario: '',
          profesor: ''
        });
      }
    }
  };

  const handleEliminarMateria = (id) => {
    setMateriasCursando(prev => prev.filter(m => m.id !== id));
  };

  const esMiPerfil = true; // Siempre es el perfil del usuario autenticado

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Perfil General</h1>
                <p className="text-gray-600">Información personal y académica</p>
              </div>
            </div>
            
            {esMiPerfil && (
              <div className="flex items-center space-x-2">
                <Link
                  to={`/perfil/${usuarioActual.id}`}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Ver Perfil Social
                </Link>
                {!editandoPerfil ? (
                  <button
                    onClick={() => setEditandoPerfil(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Editar Perfil</span>
                  </button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleGuardarPerfil}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Guardar</span>
                    </button>
                    <button
                      onClick={handleCancelarEdicion}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancelar</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Información Personal */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-start space-x-6">
            <div className="relative">
              {(() => {
                const fotoParaMostrar = perfilData.foto || usuarioActual.foto;
                let fotoUrl = '';
                
                if (fotoParaMostrar) {
                  if (fotoParaMostrar.startsWith('data:')) {
                    // Es una imagen base64, usar directamente
                    fotoUrl = fotoParaMostrar;
                  } else if (fotoParaMostrar.startsWith('http')) {
                    fotoUrl = fotoParaMostrar;
                  } else if (fotoParaMostrar.startsWith('/uploads/profiles/')) {
                    // Usar el endpoint de API para servir la imagen
                    const filename = fotoParaMostrar.split('/').pop();
                    fotoUrl = `http://localhost:5000/api/uploads/profiles/${filename}`;
                  } else {
                    fotoUrl = `http://localhost:5000${fotoParaMostrar}`;
                  }
                }
                
                console.log('🔍 Renderizando imagen:', { 
                  fotoParaMostrar, 
                  fotoUrl, 
                  perfilDataFoto: perfilData.foto, 
                  usuarioActualFoto: usuarioActual.foto,
                  tieneFoto: !!fotoParaMostrar,
                  esBase64: fotoParaMostrar?.startsWith('data:')
                });
                
                if (fotoParaMostrar) {
                  return (
                    <div>
                      <img 
                        src={fotoUrl} 
                        alt={`${usuarioActual.nombre} ${usuarioActual.apellido}`}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                        onError={(e) => {
                          console.error('❌ Error cargando imagen:', e);
                          console.error('❌ URL que falló:', fotoUrl);
                          console.error('❌ Elemento img:', e.target);
                        }}
                        onLoad={() => {
                          console.log('✅ Imagen cargada exitosamente:', fotoUrl);
                        }}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl border-4 border-white shadow-lg">
                      {usuarioActual.nombre?.charAt(0)}{usuarioActual.apellido?.charAt(0)}
                    </div>
                  );
                }
              })()}
              {editandoPerfil && (
                <div className="absolute -bottom-2 -right-2 flex space-x-1">
                  <label className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFotoChange}
                      className="hidden"
                    />
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </label>
                  {perfilData.foto && perfilData.foto !== usuario.foto && (
                    <button
                      onClick={handleEliminarFoto}
                      className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                      title="Eliminar foto"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    {esMiPerfil && !editandoNombre && (
                      <button
                        onClick={() => setEditandoNombre(true)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Solicitar cambio
                      </button>
                    )}
                  </div>
                  {editandoNombre ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        name="nombre"
                        value={perfilData.nombre}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: Juan"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSolicitarCambioNombre}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Enviar Solicitud
                        </button>
                        <button
                          onClick={handleCancelarEdicionNombre}
                          className="px-3 py-1 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">
                        ⚠️ Los cambios de nombre requieren aprobación administrativa
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <p className="text-lg font-semibold text-gray-900">{usuarioActual.nombre}</p>
                      {solicitudEnviada && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          Solicitud enviada
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">Apellido</label>
                    {esMiPerfil && !editandoNombre && (
                      <button
                        onClick={() => setEditandoNombre(true)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Solicitar cambio
                      </button>
                    )}
                  </div>
                  {editandoNombre ? (
                    <input
                      type="text"
                      name="apellido"
                      value={perfilData.apellido}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ej: Pérez"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <p className="text-lg font-semibold text-gray-900">{usuarioActual.apellido}</p>
                      {solicitudEnviada && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          Solicitud enviada
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  {editandoPerfil ? (
                    <input
                      type="email"
                      name="email"
                      value={perfilData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">{perfilData.email}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  {editandoPerfil ? (
                    <input
                      type="tel"
                      name="telefono"
                      value={perfilData.telefono}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">{perfilData.telefono || 'No especificado'}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Carrera</label>
                  {editandoPerfil ? (
                    <select
                      name="carrera"
                      value={perfilData.carrera}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Seleccionar carrera</option>
                      {carrerasOpciones.map(carrera => (
                        <option key={carrera} value={carrera}>{carrera}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">{perfilData.carrera}</span>
                      {console.log('🎨 Renderizando carrera:', perfilData.carrera)}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento</label>
                  {editandoPerfil ? (
                    <input
                      type="date"
                      name="fechaNacimiento"
                      value={perfilData.fechaNacimiento}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">{perfilData.fechaNacimiento || 'No especificada'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
                  {editandoPerfil ? (
                    <input
                      type="text"
                      name="dni"
                      value={perfilData.dni}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ej: 12345678"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-900">{perfilData.dni || 'No especificado'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado Académico</label>
                  {editandoPerfil ? (
                    <select
                      name="estadoAcademico"
                      value={perfilData.estadoAcademico}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                      <option value="Egresado">Egresado</option>
                      <option value="Abandonó">Abandonó</option>
                    </select>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        perfilData.estadoAcademico === 'Activo' ? 'bg-green-100 text-green-800' :
                        perfilData.estadoAcademico === 'Egresado' ? 'bg-blue-100 text-blue-800' :
                        perfilData.estadoAcademico === 'Inactivo' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {perfilData.estadoAcademico}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Información de la Cuenta */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Información de la Cuenta</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Creación</label>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-gray-900">{perfilData.fechaCreacion || 'No disponible'}</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Último Acceso</label>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-gray-900">{perfilData.fechaUltimoAcceso || 'No disponible'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Materias que está cursando */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Materias que estoy cursando</h2>
              <p className="text-gray-600">Gestiona las materias del cuatrimestre actual</p>
            </div>
            
            {esMiPerfil && (
              <button
                onClick={() => setEditandoMaterias(!editandoMaterias)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span>{editandoMaterias ? 'Ver Materias' : 'Editar Materias'}</span>
              </button>
            )}
          </div>

          {/* Lista de materias */}
          <div className="space-y-4">
            {materiasCursando.map((materia) => (
              <div key={materia.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{materia.nombreCompleto}</h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Año {materia.año}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{materia.cuatrimestre}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4" />
                        <span>{materia.sede}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>Comisión {materia.comision}</span>
                      </div>
                    </div>
                    
                    {materia.horario && (
                      <p className="text-sm text-gray-500 mt-2">📅 {materia.horario}</p>
                    )}
                    
                    {materia.profesor && (
                      <p className="text-sm text-gray-500">👨‍🏫 {materia.profesor}</p>
                    )}
                  </div>
                  
                  {editandoMaterias && esMiPerfil && (
                    <button
                      onClick={() => handleEliminarMateria(materia.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Formulario para agregar nueva materia */}
          {editandoMaterias && esMiPerfil && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Agregar nueva materia</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Materia</label>
                  <select
                    name="materiaId"
                    value={nuevaMateria.materiaId}
                    onChange={handleMateriaChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Seleccionar materia</option>
                    {materiasDisponibles.map((materia) => (
                      <option key={materia.codigo} value={materia.codigo}>
                        {materia.nombreCompleto}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cuatrimestre</label>
                  <select
                    name="cuatrimestre"
                    value={nuevaMateria.cuatrimestre}
                    onChange={handleMateriaChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Seleccionar cuatrimestre</option>
                    {cuatrimestres.map(cuat => (
                      <option key={cuat} value={cuat}>{cuat}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sede</label>
                  <select
                    name="sede"
                    value={nuevaMateria.sede}
                    onChange={handleMateriaChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Seleccionar sede</option>
                    {sedes.map(sede => (
                      <option key={sede} value={sede}>{sede}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Comisión</label>
                  <input
                    type="text"
                    name="comision"
                    value={nuevaMateria.comision}
                    onChange={handleMateriaChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ej: A, B, C"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Horario</label>
                  <input
                    type="text"
                    name="horario"
                    value={nuevaMateria.horario}
                    onChange={handleMateriaChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ej: Lunes y Miércoles 18:00-20:00"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profesor</label>
                  <input
                    type="text"
                    name="profesor"
                    value={nuevaMateria.profesor}
                    onChange={handleMateriaChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ej: Dr. García"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <button
                  onClick={handleAgregarMateria}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar Materia</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralProfile;
