import { useState, useEffect } from 'react';
import { mockUsers, mockStats, mockPendingCertificates, mockRecentActivity, mockNews } from '../../../data/mockData';

export const useSuperAdminData = () => {
  const [data, setData] = useState({
    users: [],
    stats: mockStats,
    pendingCertificates: [],
    recentActivity: [],
    news: [],
    loading: true,
    error: null
  });

  const [filters, setFilters] = useState({
    userRole: 'all',
    userStatus: 'all',
    dateRange: 'all'
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setData(prev => ({ ...prev, loading: true, error: null }));
        
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setData({
          users: mockUsers,
          stats: mockStats,
          pendingCertificates: mockPendingCertificates,
          recentActivity: mockRecentActivity,
          news: mockNews,
          loading: false,
          error: null
        });
      } catch (error) {
        setData(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
      }
    };

    loadData();
  }, []);

  const updateUser = (userId, updates) => {
    setData(prev => ({
      ...prev,
      users: prev.users.map(user => 
        user.id === userId ? { ...user, ...updates } : user
      )
    }));
  };

  const verifyUser = (userId) => {
    updateUser(userId, { isVerified: true });
    setData(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        verifiedUsers: prev.stats.verifiedUsers + 1,
        pendingVerification: prev.stats.pendingVerification - 1
      }
    }));
  };

  const approveCertificate = (certificateId) => {
    const certificate = data.pendingCertificates.find(cert => cert.id === certificateId);
    if (certificate) {
      // Verificar usuario asociado
      verifyUser(certificate.userId);
      
      // Remover certificado de pendientes
      setData(prev => ({
        ...prev,
        pendingCertificates: prev.pendingCertificates.filter(cert => cert.id !== certificateId)
      }));
    }
  };

  const rejectCertificate = (certificateId) => {
    setData(prev => ({
      ...prev,
      pendingCertificates: prev.pendingCertificates.filter(cert => cert.id !== certificateId)
    }));
  };

  const createNews = (newsData) => {
    const newNews = {
      id: `news_${Date.now()}`,
      ...newsData,
      autorId: 'admin_001', // Super Admin por defecto
      autorNombre: 'María González',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setData(prev => ({
      ...prev,
      news: [newNews, ...prev.news]
    }));
  };

  const updateNews = (newsId, updates) => {
    setData(prev => ({
      ...prev,
      news: prev.news.map(news => 
        news.id === newsId 
          ? { ...news, ...updates, updatedAt: new Date().toISOString() }
          : news
      )
    }));
  };

  const deleteNews = (newsId) => {
    setData(prev => ({
      ...prev,
      news: prev.news.filter(news => news.id !== newsId)
    }));
  };

  const toggleNewsStatus = (newsId) => {
    setData(prev => ({
      ...prev,
      news: prev.news.map(news => 
        news.id === newsId 
          ? { ...news, activa: !news.activa, updatedAt: new Date().toISOString() }
          : news
      )
    }));
  };

  const filteredUsers = data.users.filter(user => {
    const roleMatch = filters.userRole === 'all' || user.role === filters.userRole;
    const statusMatch = filters.userStatus === 'all' || 
      (filters.userStatus === 'verified' && user.isVerified) ||
      (filters.userStatus === 'pending' && !user.isVerified);
    
    return roleMatch && statusMatch;
  });

  const filteredActivity = data.recentActivity.filter(activity => {
    if (filters.dateRange === 'all') return true;
    
    const activityDate = new Date(activity.timestamp);
    const now = new Date();
    const daysDiff = Math.floor((now - activityDate) / (1000 * 60 * 60 * 24));
    
    switch (filters.dateRange) {
      case 'today':
        return daysDiff === 0;
      case 'week':
        return daysDiff <= 7;
      case 'month':
        return daysDiff <= 30;
      default:
        return true;
    }
  });

  return {
    ...data,
    filteredUsers,
    filteredActivity,
    filters,
    setFilters,
    updateUser,
    verifyUser,
    approveCertificate,
    rejectCertificate,
    createNews,
    updateNews,
    deleteNews,
    toggleNewsStatus
  };
};
