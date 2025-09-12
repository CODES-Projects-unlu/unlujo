// Utilidades de validación para el Super Admin Dashboard

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateDNI = (dni) => {
  const dniRegex = /^\d{7,8}$/;
  return dniRegex.test(dni.replace(/\D/g, ''));
};

export const validateLegajo = (legajo) => {
  const legajoRegex = /^\d{6,8}$/;
  return legajoRegex.test(legajo.toString());
};

export const validatePhone = (phone) => {
  const phoneRegex = /^(\+54\s?)?(9\s?)?\d{2}\s?\d{4}\s?\d{4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateName = (name) => {
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
  return nameRegex.test(name.trim());
};

export const validatePassword = (password) => {
  // Mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validateCarrera = (carreraId) => {
  const validCarreras = ['LSI', 'LTS', 'LE'];
  return validCarreras.includes(carreraId);
};

export const validateSede = (sedeId) => {
  const validSedes = ['lujan', 'san_miguel', 'chivilcoy'];
  return validSedes.includes(sedeId);
};

export const validateRole = (role) => {
  const validRoles = ['super_admin', 'carrera_admin', 'estudiante'];
  return validRoles.includes(role);
};

export const validateCertificateData = (extractedData) => {
  const requiredFields = ['nombre', 'dni', 'legajo', 'carrera', 'cicloLectivo'];
  
  for (const field of requiredFields) {
    if (!extractedData[field] || extractedData[field].trim() === '') {
      return {
        isValid: false,
        error: `Campo requerido faltante: ${field}`
      };
    }
  }
  
  // Validar formato de DNI
  if (!validateDNI(extractedData.dni)) {
    return {
      isValid: false,
      error: 'Formato de DNI inválido'
    };
  }
  
  // Validar formato de legajo
  if (!validateLegajo(extractedData.legajo)) {
    return {
      isValid: false,
      error: 'Formato de legajo inválido'
    };
  }
  
  // Validar carrera
  const carreraMatch = extractedData.carrera.match(/LIC\.EN\s+(\w+)/i);
  if (!carreraMatch) {
    return {
      isValid: false,
      error: 'Carrera no reconocida en el certificado'
    };
  }
  
  return {
    isValid: true,
    error: null
  };
};

export const validateUserData = (userData) => {
  const errors = {};
  
  if (!validateName(userData.name)) {
    errors.name = 'Nombre inválido (2-50 caracteres, solo letras)';
  }
  
  if (!validateEmail(userData.email)) {
    errors.email = 'Email inválido';
  }
  
  if (!validateRole(userData.role)) {
    errors.role = 'Rol inválido';
  }
  
  if (userData.carreraId && !validateCarrera(userData.carreraId)) {
    errors.carreraId = 'Carrera inválida';
  }
  
  if (userData.sedeId && !validateSede(userData.sedeId)) {
    errors.sedeId = 'Sede inválida';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateNotificationSettings = (settings) => {
  const validKeys = ['general', 'carrera', 'sede', 'materias', 'eventos', 'recordatorios'];
  const errors = {};
  
  for (const key of validKeys) {
    if (typeof settings[key] !== 'boolean') {
      errors[key] = 'Configuración de notificación inválida';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateMateriaData = (materiaData) => {
  const errors = {};
  
  if (!materiaData.nombre || materiaData.nombre.trim().length < 3) {
    errors.nombre = 'Nombre de materia inválido (mínimo 3 caracteres)';
  }
  
  if (!materiaData.comision || !/^[A-Z]$/.test(materiaData.comision)) {
    errors.comision = 'Comisión inválida (debe ser una letra mayúscula)';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) {
    return {
      isValid: false,
      error: 'Fechas de inicio y fin son requeridas'
    };
  }
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();
  
  if (start > now) {
    return {
      isValid: false,
      error: 'La fecha de inicio no puede ser futura'
    };
  }
  
  if (end > now) {
    return {
      isValid: false,
      error: 'La fecha de fin no puede ser futura'
    };
  }
  
  if (start > end) {
    return {
      isValid: false,
      error: 'La fecha de inicio no puede ser posterior a la fecha de fin'
    };
  }
  
  const diffInDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));
  if (diffInDays > 365) {
    return {
      isValid: false,
      error: 'El rango de fechas no puede ser mayor a 1 año'
    };
  }
  
  return {
    isValid: true,
    error: null
  };
};

export const validateSearchQuery = (query) => {
  if (!query || query.trim().length < 2) {
    return {
      isValid: false,
      error: 'La búsqueda debe tener al menos 2 caracteres'
    };
  }
  
  if (query.length > 100) {
    return {
      isValid: false,
      error: 'La búsqueda no puede tener más de 100 caracteres'
    };
  }
  
  return {
    isValid: true,
    error: null
  };
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remover caracteres HTML básicos
    .replace(/\s+/g, ' '); // Normalizar espacios
};

export const validateFileUpload = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB por defecto
    allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'],
    required = false
  } = options;
  
  if (!file && required) {
    return {
      isValid: false,
      error: 'Archivo requerido'
    };
  }
  
  if (!file) {
    return {
      isValid: true,
      error: null
    };
  }
  
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `El archivo es demasiado grande. Máximo ${formatFileSize(maxSize)}`
    };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `Tipo de archivo no permitido. Tipos permitidos: ${allowedTypes.join(', ')}`
    };
  }
  
  return {
    isValid: true,
    error: null
  };
};

// Función auxiliar para formatear tamaño de archivo
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
