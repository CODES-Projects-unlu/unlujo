const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

// Configuración JWT
const JWT_SECRET = process.env.JWT_SECRET || 'unlujo_secret_key_2024';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// Esquemas de validación
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'El email debe tener un formato válido',
    'any.required': 'El email es requerido'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'La contraseña debe tener al menos 6 caracteres',
    'any.required': 'La contraseña es requerida'
  })
});

const registerSchema = Joi.object({
  nombre: Joi.string().min(2).max(100).required().messages({
    'string.min': 'El nombre debe tener al menos 2 caracteres',
    'string.max': 'El nombre no puede tener más de 100 caracteres',
    'any.required': 'El nombre es requerido'
  }),
  apellido: Joi.string().min(2).max(100).required().messages({
    'string.min': 'El apellido debe tener al menos 2 caracteres',
    'string.max': 'El apellido no puede tener más de 100 caracteres',
    'any.required': 'El apellido es requerido'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'El email debe tener un formato válido',
    'any.required': 'El email es requerido'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'La contraseña debe tener al menos 6 caracteres',
    'any.required': 'La contraseña es requerida'
  }),
  telefono: Joi.string().pattern(/^[0-9+\-\s()]+$/).optional().messages({
    'string.pattern.base': 'El teléfono debe contener solo números, espacios, guiones y paréntesis'
  }),
  dni: Joi.string().pattern(/^[0-9]{7,8}$/).required().messages({
    'string.pattern.base': 'El DNI debe tener entre 7 y 8 dígitos',
    'any.required': 'El DNI es requerido'
  }),
  carrera_id: Joi.number().integer().positive().required().messages({
    'number.base': 'El ID de carrera debe ser un número',
    'number.integer': 'El ID de carrera debe ser un número entero',
    'number.positive': 'El ID de carrera debe ser un número positivo',
    'any.required': 'El ID de carrera es requerido'
  }),
  anio_ingreso: Joi.number().integer().min(2000).max(new Date().getFullYear() + 1).required().messages({
    'number.base': 'El año de ingreso debe ser un número',
    'number.integer': 'El año de ingreso debe ser un número entero',
    'number.min': 'El año de ingreso debe ser mayor a 2000',
    'number.max': 'El año de ingreso no puede ser mayor al año actual + 1',
    'any.required': 'El año de ingreso es requerido'
  })
});

// Función para generar JWT
const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    rol: user.rol,
    carrera_id: user.carrera_id
  };
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Función para verificar JWT
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
};

// Función para hashear contraseña
const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

// Función para verificar contraseña
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token de acceso requerido' 
    });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ 
      success: false, 
      message: 'Token inválido o expirado' 
    });
  }
};

// Middleware para verificar roles
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuario no autenticado' 
      });
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({ 
        success: false, 
        message: 'No tienes permisos para acceder a este recurso' 
      });
    }

    next();
  };
};

module.exports = {
  loginSchema,
  registerSchema,
  generateToken,
  verifyToken,
  hashPassword,
  verifyPassword,
  authenticateToken,
  requireRole
};
