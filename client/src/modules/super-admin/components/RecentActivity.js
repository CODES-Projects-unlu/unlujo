import React from 'react';
import './RecentActivity.css';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      user_registered: '👤',
      news_published: '📰',
      user_verified: '✅',
      certificate_uploaded: '📄',
      user_updated: '✏️',
      system_alert: '⚠️',
      admin_action: '⚙️'
    };
    return icons[type] || '📝';
  };

  const getActivityColor = (type) => {
    const colors = {
      user_registered: 'blue',
      news_published: 'green',
      user_verified: 'emerald',
      certificate_uploaded: 'orange',
      user_updated: 'purple',
      system_alert: 'red',
      admin_action: 'gray'
    };
    return colors[type] || 'gray';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Hace un momento';
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Hace ${diffInHours}h`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Hace ${diffInDays}d`;
    
    return activityTime.toLocaleDateString('es-AR', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="recent-activity">
      <div className="recent-activity-header">
        <h2 className="recent-activity-title">Actividad Reciente</h2>
        <div className="recent-activity-count">
          {activities.length} actividades
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="no-activity">
          <div className="no-activity-icon">📝</div>
          <h3>No hay actividad reciente</h3>
          <p>Las actividades del sistema aparecerán aquí</p>
        </div>
      ) : (
        <div className="activity-list">
          {activities.map((activity, index) => {
            const icon = getActivityIcon(activity.type);
            const color = getActivityColor(activity.type);
            
            return (
              <div key={activity.id} className={`activity-item activity-item--${color}`}>
                <div className="activity-timeline">
                  <div className="activity-icon">
                    <span className="activity-emoji">{icon}</span>
                  </div>
                  {index < activities.length - 1 && (
                    <div className="activity-line"></div>
                  )}
                </div>
                
                <div className="activity-content">
                  <div className="activity-message">
                    {activity.message}
                  </div>
                  <div className="activity-meta">
                    <span className="activity-time">
                      {formatTime(activity.timestamp)}
                    </span>
                    <span className="activity-ago">
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
