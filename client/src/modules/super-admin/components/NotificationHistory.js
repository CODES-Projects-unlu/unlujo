import React, { useState } from 'react';
import { Eye, MousePointer, Users, Calendar, Filter } from 'lucide-react';
import './NotificationHistory.css';

const NotificationHistory = ({ notifications, onNotificationAction }) => {
  const [filters, setFilters] = useState({
    audiencia: 'all',
    urgencia: 'all',
    fecha: 'all',
    search: ''
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUrgenciaInfo = (urgencia) => {
    const urgencias = {
      baja: { color: 'green', icon: '🟢', label: 'Baja' },
      normal: { color: 'blue', icon: '🔵', label: 'Normal' },
      alta: { color: 'red', icon: '🔴', label: 'Alta' }
    };
    return urgencias[urgencia] || urgencias.normal;
  };

  const getAudienciaInfo = (audiencia) => {
    const audiencias = {
      todos: { icon: '👥', label: 'Todos los usuarios' },
      carrera: { icon: '🎓', label: 'Por carrera' },
      sede: { icon: '🏢', label: 'Por sede' }
    };
    return audiencias[audiencia] || audiencias.todos;
  };

  const filteredNotifications = notifications.filter(notif => {
    const audienciaMatch = filters.audiencia === 'all' || notif.audiencia === filters.audiencia;
    const urgenciaMatch = filters.urgencia === 'all' || notif.urgencia === filters.urgencia;
    const searchMatch = filters.search === '' || 
      notif.titulo.toLowerCase().includes(filters.search.toLowerCase()) ||
      notif.mensaje.toLowerCase().includes(filters.search.toLowerCase());
    
    let fechaMatch = true;
    if (filters.fecha !== 'all') {
      const notifDate = new Date(notif.fechaEnvio);
      const now = new Date();
      const daysDiff = Math.floor((now - notifDate) / (1000 * 60 * 60 * 24));
      
      switch (filters.fecha) {
        case 'today':
          fechaMatch = daysDiff === 0;
          break;
        case 'week':
          fechaMatch = daysDiff <= 7;
          break;
        case 'month':
          fechaMatch = daysDiff <= 30;
          break;
        default:
          fechaMatch = true;
      }
    }
    
    return audienciaMatch && urgenciaMatch && searchMatch && fechaMatch;
  });

  const calculateEngagement = (notif) => {
    const totalDestinatarios = parseInt(notif.destinatarios.match(/\d+/)?.[0] || 0);
    const leida = notif.leida || 0;
    const clickeada = notif.clickeada || 0;
    
    const readRate = totalDestinatarios > 0 ? (leida / totalDestinatarios * 100).toFixed(1) : 0;
    const clickRate = leida > 0 ? (clickeada / leida * 100).toFixed(1) : 0;
    
    return { readRate, clickRate };
  };

  return (
    <div className="notification-history">
      <div className="history-header">
        <h2>📱 Historial de Notificaciones</h2>
        <p>Gestiona y revisa las notificaciones push enviadas</p>
      </div>

      <div className="history-filters">
        <div className="filter-group">
          <label>Audiencia:</label>
          <select 
            value={filters.audiencia} 
            onChange={(e) => setFilters(prev => ({ ...prev, audiencia: e.target.value }))}
            className="filter-select"
          >
            <option value="all">Todas las audiencias</option>
            <option value="todos">Todos los usuarios</option>
            <option value="carrera">Por carrera</option>
            <option value="sede">Por sede</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Urgencia:</label>
          <select 
            value={filters.urgencia} 
            onChange={(e) => setFilters(prev => ({ ...prev, urgencia: e.target.value }))}
            className="filter-select"
          >
            <option value="all">Todas las urgencias</option>
            <option value="baja">Baja</option>
            <option value="normal">Normal</option>
            <option value="alta">Alta</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Fecha:</label>
          <select 
            value={filters.fecha} 
            onChange={(e) => setFilters(prev => ({ ...prev, fecha: e.target.value }))}
            className="filter-select"
          >
            <option value="all">Todas las fechas</option>
            <option value="today">Hoy</option>
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Buscar:</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="filter-input"
            placeholder="Buscar en títulos y mensajes..."
          />
        </div>
      </div>

      <div className="history-stats">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{notifications.length}</div>
            <div className="stat-label">Total Enviadas</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👁️</div>
          <div className="stat-content">
            <div className="stat-value">
              {notifications.reduce((acc, notif) => acc + (notif.leida || 0), 0).toLocaleString()}
            </div>
            <div className="stat-label">Total Leídas</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🖱️</div>
          <div className="stat-content">
            <div className="stat-value">
              {notifications.reduce((acc, notif) => acc + (notif.clickeada || 0), 0).toLocaleString()}
            </div>
            <div className="stat-label">Total Clickeadas</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-value">
              {notifications.length > 0 
                ? (notifications.reduce((acc, notif) => {
                    const total = parseInt(notif.destinatarios.match(/\d+/)?.[0] || 0);
                    const leida = notif.leida || 0;
                    return acc + (total > 0 ? leida / total : 0);
                  }, 0) / notifications.length * 100).toFixed(1)
                : 0}%
            </div>
            <div className="stat-label">Promedio Lectura</div>
          </div>
        </div>
      </div>

      <div className="notifications-list">
        {filteredNotifications.length === 0 ? (
          <div className="empty-state">
            <Filter className="empty-icon" />
            <h3>No hay notificaciones</h3>
            <p>No se encontraron notificaciones con los filtros aplicados</p>
          </div>
        ) : (
          filteredNotifications.map(notif => {
            const urgenciaInfo = getUrgenciaInfo(notif.urgencia);
            const audienciaInfo = getAudienciaInfo(notif.audiencia);
            const engagement = calculateEngagement(notif);
            
            return (
              <div key={notif.id} className="notification-item">
                <div className="notification-header">
                  <div className="notification-meta">
                    <div className="notification-title">{notif.titulo}</div>
                    <div className="notification-badges">
                      <span className={`urgency-badge urgency-${notif.urgencia}`}>
                        {urgenciaInfo.icon} {urgenciaInfo.label}
                      </span>
                      <span className="audience-badge">
                        {audienciaInfo.icon} {audienciaInfo.label}
                      </span>
                    </div>
                  </div>
                  <div className="notification-date">
                    {formatDate(notif.fechaEnvio)}
                  </div>
                </div>
                
                <div className="notification-content">
                  <p className="notification-message">{notif.mensaje}</p>
                  <div className="notification-destinatarios">
                    <Users className="dest-icon" />
                    <span>{notif.destinatarios}</span>
                  </div>
                </div>
                
                <div className="notification-engagement">
                  <div className="engagement-metric">
                    <Eye className="metric-icon" />
                    <div className="metric-content">
                      <div className="metric-value">{notif.leida || 0}</div>
                      <div className="metric-label">Leídas</div>
                      <div className="metric-rate">{engagement.readRate}%</div>
                    </div>
                  </div>
                  
                  <div className="engagement-metric">
                    <MousePointer className="metric-icon" />
                    <div className="metric-content">
                      <div className="metric-value">{notif.clickeada || 0}</div>
                      <div className="metric-label">Clickeadas</div>
                      <div className="metric-rate">{engagement.clickRate}%</div>
                    </div>
                  </div>
                  
                  <div className="engagement-metric">
                    <Calendar className="metric-icon" />
                    <div className="metric-content">
                      <div className="metric-value">
                        {notif.programada ? 'Programada' : 'Enviada'}
                      </div>
                      <div className="metric-label">Estado</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default NotificationHistory;
