// Utilidades para formateo de datos en el Super Admin Dashboard

export const formatDate = (dateString, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  
  return new Date(dateString).toLocaleDateString('es-AR', {
    ...defaultOptions,
    ...options
  });
};

export const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString('es-AR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatTimeAgo = (timestamp) => {
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

export const formatNumber = (number, options = {}) => {
  const defaultOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };
  
  return new Intl.NumberFormat('es-AR', {
    ...defaultOptions,
    ...options
  }).format(number);
};

export const formatPercentage = (value, decimals = 1) => {
  return `${value.toFixed(decimals)}%`;
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatRole = (role) => {
  const roleMap = {
    super_admin: 'Super Admin',
    carrera_admin: 'Admin Carrera',
    estudiante: 'Estudiante'
  };
  
  return roleMap[role] || role;
};

export const formatStatus = (isVerified) => {
  return isVerified ? 'Verificado' : 'Pendiente';
};

export const formatConfidence = (confidence) => {
  if (confidence >= 90) return { text: 'Alta confianza', class: 'high' };
  if (confidence >= 70) return { text: 'Confianza media', class: 'medium' };
  return { text: 'Baja confianza', class: 'low' };
};

export const formatCarrera = (carreraId) => {
  const carreras = {
    'LSI': 'Lic. en Sistemas de Información',
    'LTS': 'Lic. en Trabajo Social',
    'LE': 'Lic. en Enfermería'
  };
  
  return carreras[carreraId] || carreraId;
};

export const formatSede = (sedeId) => {
  const sedes = {
    'lujan': 'Luján',
    'san_miguel': 'San Miguel',
    'chivilcoy': 'Chivilcoy'
  };
  
  return sedes[sedeId] || sedeId;
};

export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const truncateText = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const formatEmail = (email) => {
  return email.toLowerCase().trim();
};

export const formatPhoneNumber = (phone) => {
  // Formato argentino: +54 9 11 1234-5678
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+54 9 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

export const formatDNI = (dni) => {
  const cleaned = dni.replace(/\D/g, '');
  if (cleaned.length >= 7) {
    return cleaned.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
  }
  return dni;
};

export const formatLegajo = (legajo) => {
  return legajo.toString().padStart(6, '0');
};

export const formatCurrency = (amount, currency = 'ARS') => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

export const formatDuration = (minutes) => {
  if (minutes < 60) return `${minutes} min`;
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}min`;
};

export const formatRelativeTime = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Hoy';
  if (diffInDays === 1) return 'Ayer';
  if (diffInDays < 7) return `Hace ${diffInDays} días`;
  if (diffInDays < 30) return `Hace ${Math.floor(diffInDays / 7)} semanas`;
  if (diffInDays < 365) return `Hace ${Math.floor(diffInDays / 30)} meses`;
  return `Hace ${Math.floor(diffInDays / 365)} años`;
};
