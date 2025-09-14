# database/models/subject.py
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from database.config import Base

class Subject(Base):
    __tablename__ = "subjects"
    
    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(String(10), nullable=False, unique=True)
    nombre = Column(String(255), nullable=False)
    año = Column(Integer, nullable=False)
    cuatrimestre = Column(String(50), nullable=False)  # "Primer Cuatrimestre", "Segundo Cuatrimestre"
    horas_semanales = Column(Integer)
    horas_totales = Column(Integer)
    correlatividad = Column(Text)  # JSON string con códigos de materias correlativas
    modalidad = Column(String(20), default='Presencial')  # "Presencial", "Virtual", "Mixta"
    carrera_id = Column(Integer, ForeignKey('careers.id'), nullable=False)
    estado = Column(String(20), default='Activa')  # "Activa", "Inactiva"
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_baja = Column(DateTime(timezone=True), nullable=True)  # NULL si está activa