# database/models/user.py
from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey
from sqlalchemy.sql import func
from database.config import Base

class User(Base):
    __tablename__ = "users"
    
    # Información personal
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    apellido = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    telefono = Column(String(20))
    foto = Column(String(500))  # URL de la foto de perfil
    fecha_nacimiento = Column(DateTime)
    dni = Column(String(20), unique=True)
    
    # Información académica
    carrera_id = Column(Integer, ForeignKey('careers.id'), nullable=False)
    año_ingreso = Column(Integer, nullable=False)
    estado_academico = Column(String(20), default='Activo')  # "Activo", "Inactivo", "Egresado", "Abandonó"
    
    # Información de la cuenta
    rol = Column(String(20), nullable=False)  # "super_admin", "admin_carrera", "estudiante"
    estado = Column(String(20), default='Activo')  # "Activo", "Inactivo", "Suspendido"
    
    # Autenticación y seguridad
    username = Column(String(50), unique=True)  # Opcional, puede ser email
    password_hash = Column(String(255), nullable=False)
    salt = Column(String(255), nullable=False)
    intentos_fallidos = Column(Integer, default=0)
    bloqueado_hasta = Column(DateTime, nullable=True)
    token_reset_password = Column(String(255), nullable=True)
    fecha_expiracion_token = Column(DateTime, nullable=True)
    
    # Verificación de email
    email_verificado = Column(Boolean, default=False)
    codigo_verificacion = Column(String(10), nullable=True)
    fecha_verificacion_email = Column(DateTime, nullable=True)
    
    # Timestamps
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_ultimo_acceso = Column(DateTime, nullable=True)
    fecha_baja = Column(DateTime, nullable=True)  # Baja lógica