import React, { useState } from 'react';
import { Send, Users, Target, CheckCircle } from 'lucide-react';
import './PushNotificationGenerator.css';

const PushNotificationGenerator = ({ onSendNotification }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    mensaje: '',
    audiencia: 'todos', // todos, carrera, sede
    carreraId: '',
    sedeId: '',
    urgencia: 'normal', // baja, normal, alta
    programar: false,
    fechaProgramacion: '',
    horaProgramacion: ''
  });

  const [isSending, setIsSending] = useState(false);
  const [lastSent, setLastSent] = useState(null);

  const carreras = [
    { id: 'lsi', nombre: 'Lic. en Sistemas de Información' },
    { id: 'lts', nombre: 'Lic. en Trabajo Social' },
    { id: 'le', nombre: 'Lic. en Enfermería' },
    { id: 'lp', nombre: 'Lic. en Psicología' },
    { id: 'la', nombre: 'Lic. en Administración' }
  ];

  const sedes = [
    { id: 'lujan', nombre: 'Luján' },
    { id: 'san_miguel', nombre: 'San Miguel' },
    { id: 'chivilcoy', nombre: 'Chivilcoy' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.titulo.trim() || !formData.mensaje.trim()) {
      alert('Por favor completa el título y el mensaje');
      return;
    }

    setIsSending(true);
    
    try {
      // Simular envío de notificación
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const notificationData = {
        id: `notif_${Date.now()}`,
        titulo: formData.titulo.trim(),
        mensaje: formData.mensaje.trim(),
        audiencia: formData.audiencia,
        carreraId: formData.carreraId,
        sedeId: formData.sedeId,
        urgencia: formData.urgencia,
        programada: formData.programar,
        fechaProgramacion: formData.programar ? formData.fechaProgramacion : null,
        horaProgramacion: formData.programar ? formData.horaProgramacion : null,
        enviada: !formData.programar,
        fechaEnvio: new Date().toISOString(),
        destinatarios: calcularDestinatarios()
      };

      onSendNotification(notificationData);
      setLastSent(notificationData);
      
      // Resetear formulario
      setFormData({
        titulo: '',
        mensaje: '',
        audiencia: 'todos',
        carreraId: '',
        sedeId: '',
        urgencia: 'normal',
        programar: false,
        fechaProgramacion: '',
        horaProgramacion: ''
      });
      
    } catch (error) {
      console.error('Error enviando notificación:', error);
      alert('Error al enviar la notificación');
    } finally {
      setIsSending(false);
    }
  };

  const calcularDestinatarios = () => {
    switch (formData.audiencia) {
      case 'todos':
        return 'Todos los usuarios (1,200)';
      case 'carrera':
        const carrera = carreras.find(c => c.id === formData.carreraId);
        return `Carrera: ${carrera?.nombre || 'Seleccionar carrera'} (150)`;
      case 'sede':
        const sede = sedes.find(s => s.id === formData.sedeId);
        return `Sede: ${sede?.nombre || 'Seleccionar sede'} (400)`;
      default:
        return 'Todos los usuarios';
    }
  };

  const getUrgenciaInfo = (urgencia) => {
    const urgencias = {
      baja: { color: 'green', icon: '🟢', label: 'Baja' },
      normal: { color: 'blue', icon: '🔵', label: 'Normal' },
      alta: { color: 'red', icon: '🔴', label: 'Alta' }
    };
    return urgencias[urgencia] || urgencias.normal;
  };

  return (
    <div className="push-notification-generator">
      <div className="generator-header">
        <h2>📱 Generador de Notificaciones Push</h2>
        <p>Envía notificaciones push a los usuarios de la aplicación</p>
      </div>

      {lastSent && (
        <div className="success-message">
          <CheckCircle className="success-icon" />
          <div>
            <h4>¡Notificación enviada exitosamente!</h4>
            <p><strong>Título:</strong> {lastSent.titulo}</p>
            <p><strong>Destinatarios:</strong> {lastSent.destinatarios}</p>
            <p><strong>Fecha:</strong> {new Date(lastSent.fechaEnvio).toLocaleString()}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="notification-form">
        <div className="form-section">
          <h3>📝 Contenido de la Notificación</h3>
          
          <div className="form-group">
            <label htmlFor="titulo">Título *</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Título de la notificación"
              maxLength={50}
              required
            />
            <small className="form-help">
              Máximo 50 caracteres ({formData.titulo.length}/50)
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="mensaje">Mensaje *</label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleInputChange}
              className="form-textarea"
              placeholder="Mensaje de la notificación"
              maxLength={200}
              rows={3}
              required
            />
            <small className="form-help">
              Máximo 200 caracteres ({formData.mensaje.length}/200)
            </small>
          </div>
        </div>

        <div className="form-section">
          <h3>🎯 Audiencia</h3>
          
          <div className="audiencia-options">
            <label className="radio-option">
              <input
                type="radio"
                name="audiencia"
                value="todos"
                checked={formData.audiencia === 'todos'}
                onChange={handleInputChange}
              />
              <div className="radio-content">
                <Users className="radio-icon" />
                <div>
                  <strong>Todos los usuarios</strong>
                  <span>1,200 usuarios activos</span>
                </div>
              </div>
            </label>

            <label className="radio-option">
              <input
                type="radio"
                name="audiencia"
                value="carrera"
                checked={formData.audiencia === 'carrera'}
                onChange={handleInputChange}
              />
              <div className="radio-content">
                <Target className="radio-icon" />
                <div>
                  <strong>Por carrera</strong>
                  <span>Usuarios de una carrera específica</span>
                </div>
              </div>
            </label>

            <label className="radio-option">
              <input
                type="radio"
                name="audiencia"
                value="sede"
                checked={formData.audiencia === 'sede'}
                onChange={handleInputChange}
              />
              <div className="radio-content">
                <Target className="radio-icon" />
                <div>
                  <strong>Por sede</strong>
                  <span>Usuarios de una sede específica</span>
                </div>
              </div>
            </label>
          </div>

          {formData.audiencia === 'carrera' && (
            <div className="form-group">
              <label htmlFor="carreraId">Seleccionar Carrera</label>
              <select
                id="carreraId"
                name="carreraId"
                value={formData.carreraId}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Seleccionar carrera</option>
                {carreras.map(carrera => (
                  <option key={carrera.id} value={carrera.id}>
                    {carrera.nombre}
                  </option>
                ))}
              </select>
            </div>
          )}

          {formData.audiencia === 'sede' && (
            <div className="form-group">
              <label htmlFor="sedeId">Seleccionar Sede</label>
              <select
                id="sedeId"
                name="sedeId"
                value={formData.sedeId}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Seleccionar sede</option>
                {sedes.map(sede => (
                  <option key={sede.id} value={sede.id}>
                    {sede.nombre}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="form-section">
          <h3>⚙️ Configuración</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="urgencia">Nivel de Urgencia</label>
              <select
                id="urgencia"
                name="urgencia"
                value={formData.urgencia}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="baja">🟢 Baja - Informativa</option>
                <option value="normal">🔵 Normal - Importante</option>
                <option value="alta">🔴 Alta - Urgente</option>
              </select>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="programar"
                  checked={formData.programar}
                  onChange={handleInputChange}
                />
                <span>Programar envío</span>
              </label>
            </div>
          </div>

          {formData.programar && (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fechaProgramacion">Fecha</label>
                <input
                  type="date"
                  id="fechaProgramacion"
                  name="fechaProgramacion"
                  value={formData.fechaProgramacion}
                  onChange={handleInputChange}
                  className="form-input"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="horaProgramacion">Hora</label>
                <input
                  type="time"
                  id="horaProgramacion"
                  name="horaProgramacion"
                  value={formData.horaProgramacion}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="action-btn action-btn--secondary"
            onClick={() => setFormData({
              titulo: '',
              mensaje: '',
              audiencia: 'todos',
              carreraId: '',
              sedeId: '',
              urgencia: 'normal',
              programar: false,
              fechaProgramacion: '',
              horaProgramacion: ''
            })}
          >
            Limpiar
          </button>
          
          <button
            type="submit"
            className="action-btn action-btn--primary"
            disabled={isSending || !formData.titulo.trim() || !formData.mensaje.trim()}
          >
            {isSending ? (
              <>
                <div className="spinner"></div>
                Enviando...
              </>
            ) : (
              <>
                <Send className="btn-icon" />
                {formData.programar ? 'Programar Notificación' : 'Enviar Ahora'}
              </>
            )}
          </button>
        </div>
      </form>

      <div className="preview-section">
        <h3>👀 Vista Previa</h3>
        <div className="notification-preview">
          <div className="preview-header">
            <div className="preview-app-icon">📱</div>
            <div className="preview-app-info">
              <div className="preview-app-name">Centro de Estudiantes UNLu</div>
              <div className="preview-time">Ahora</div>
            </div>
            <div className={`preview-urgency ${formData.urgencia}`}>
              {getUrgenciaInfo(formData.urgencia).icon}
            </div>
          </div>
          <div className="preview-content">
            <div className="preview-title">{formData.titulo || 'Título de la notificación'}</div>
            <div className="preview-message">{formData.mensaje || 'Mensaje de la notificación'}</div>
          </div>
          <div className="preview-audience">
            📊 {calcularDestinatarios()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PushNotificationGenerator;
