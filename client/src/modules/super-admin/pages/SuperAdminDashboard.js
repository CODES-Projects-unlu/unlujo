import React, { useState, useEffect } from 'react';
import StatsCards from '../components/StatsCards';
import UserTable from '../components/UserTable';
import PendingCertificates from '../components/PendingCertificates';
import RecentActivity from '../components/RecentActivity';
import NewsManagement from '../components/NewsManagement';
import PushNotificationGenerator from '../components/PushNotificationGenerator';
import NotificationHistory from '../components/NotificationHistory';
import { mockUsers, mockStats, mockPendingCertificates, mockRecentActivity, mockNews, mockNotifications } from '../../../data/mockData';
import './SuperAdminDashboard.css';

const SuperAdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(mockStats);
  const [pendingCertificates, setPendingCertificates] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [news, setNews] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simular carga de datos
    const loadData = async () => {
      setLoading(true);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUsers(mockUsers);
      setPendingCertificates(mockPendingCertificates);
      setRecentActivity(mockRecentActivity);
      setNews(mockNews);
      setNotifications(mockNotifications);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleUserAction = (action, user) => {
    console.log(`Acción ${action} en usuario:`, user);
    
    switch (action) {
      case 'view':
        // Mostrar detalles del usuario
        alert(`Ver detalles de ${user.name}`);
        break;
      case 'edit':
        // Editar usuario
        alert(`Editar usuario ${user.name}`);
        break;
      case 'verify':
        // Verificar usuario
        setUsers(prevUsers => 
          prevUsers.map(u => 
            u.id === user.id ? { ...u, isVerified: true } : u
          )
        );
        setStats(prevStats => ({
          ...prevStats,
          verifiedUsers: prevStats.verifiedUsers + 1,
          pendingVerification: prevStats.pendingVerification - 1
        }));
        break;
      default:
        break;
    }
  };

  const handleCertificateAction = (action, certificate) => {
    console.log(`Acción ${action} en certificado:`, certificate);
    
    switch (action) {
      case 'approve':
        // Aprobar certificado
        setPendingCertificates(prev => 
          prev.filter(cert => cert.id !== certificate.id)
        );
        setUsers(prevUsers => 
          prevUsers.map(u => 
            u.id === certificate.userId ? { ...u, isVerified: true } : u
          )
        );
        setStats(prevStats => ({
          ...prevStats,
          verifiedUsers: prevStats.verifiedUsers + 1,
          pendingVerification: prevStats.pendingVerification - 1
        }));
        break;
      case 'review':
        // Revisar certificado
        alert(`Revisar certificado de ${certificate.userName}`);
        break;
      case 'reject':
        // Rechazar certificado
        setPendingCertificates(prev => 
          prev.filter(cert => cert.id !== certificate.id)
        );
        break;
      default:
        break;
    }
  };

  const handleNewsAction = (action, newsData) => {
    console.log(`Acción ${action} en noticia:`, newsData);
    
    switch (action) {
      case 'create':
        const newNews = {
          id: `news_${Date.now()}`,
          ...newsData,
          autorId: 'admin_001',
          autorNombre: 'María González',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setNews(prev => [newNews, ...prev]);
        break;
      case 'update':
        setNews(prev => 
          prev.map(news => 
            news.id === newsData.id 
              ? { ...news, ...newsData, updatedAt: new Date().toISOString() }
              : news
          )
        );
        break;
      case 'delete':
        setNews(prev => prev.filter(news => news.id !== newsData.id));
        break;
      case 'toggle':
        setNews(prev => 
          prev.map(news => 
            news.id === newsData.id 
              ? { ...news, activa: !news.activa, updatedAt: new Date().toISOString() }
              : news
          )
        );
        break;
      default:
        break;
    }
  };

  const handleNotificationAction = (notificationData) => {
    console.log('Enviando notificación:', notificationData);
    setNotifications(prev => [notificationData, ...prev]);
  };

  const tabs = [
    { id: 'overview', label: 'Resumen General', icon: '📊' },
    { id: 'users', label: 'Gestión de Usuarios', icon: '👥' },
    { id: 'news', label: 'Gestión de Noticias', icon: '📰' },
    { id: 'notifications', label: 'Notificaciones Push', icon: '📱' },
    { id: 'certificates', label: 'Certificados', icon: '📄' },
    { id: 'activity', label: 'Actividad', icon: '📝' }
  ];

  if (loading) {
    return (
      <div className="super-admin-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        <h2>Cargando Dashboard del Super Admin...</h2>
        <p>Preparando datos del sistema</p>
      </div>
    );
  }

  return (
    <div className="super-admin-dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Dashboard del Super Admin</h1>
          <p>Gestión integral del sistema UNLujo</p>
        </div>
        <div className="dashboard-actions">
          <button className="action-btn action-btn--primary">
            📊 Generar Reporte
          </button>
          <button className="action-btn action-btn--secondary">
            ⚙️ Configuración
          </button>
        </div>
      </div>

      <div className="dashboard-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'tab-btn--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <StatsCards stats={stats} />
            
            <div className="overview-grid">
              <div className="overview-section">
                <h3>Usuarios Recientes</h3>
                <div className="recent-users">
                  {users.slice(0, 5).map(user => (
                    <div key={user.id} className="recent-user">
                      <div className="user-avatar">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="user-info">
                        <div className="user-name">{user.name}</div>
                        <div className="user-role">{user.role}</div>
                      </div>
                      <div className={`user-status ${user.isVerified ? 'verified' : 'pending'}`}>
                        {user.isVerified ? '✅' : '⏳'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overview-section">
                <h3>Certificados Pendientes</h3>
                <div className="pending-summary">
                  <div className="pending-count">
                    {pendingCertificates.length} certificados
                  </div>
                  <div className="pending-actions">
                    <button 
                      className="action-btn action-btn--small"
                      onClick={() => setActiveTab('certificates')}
                    >
                      Ver Todos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-tab">
            <UserTable 
              users={users} 
              onUserAction={handleUserAction}
            />
          </div>
        )}

                {activeTab === 'news' && (
                  <div className="news-tab">
                    <NewsManagement
                      news={news}
                      onNewsAction={handleNewsAction}
                    />
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="notifications-tab">
                    <div className="notifications-container">
                      <PushNotificationGenerator
                        onSendNotification={handleNotificationAction}
                      />
                    </div>
                    <div className="notifications-history">
                      <NotificationHistory
                        notifications={notifications}
                        onNotificationAction={handleNotificationAction}
                      />
                    </div>
                  </div>
                )}

        {activeTab === 'certificates' && (
          <div className="certificates-tab">
            <PendingCertificates 
              certificates={pendingCertificates}
              onCertificateAction={handleCertificateAction}
            />
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="activity-tab">
            <RecentActivity activities={recentActivity} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
