# database/models/career.py
from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from database.config import Base

class Career(Base):
    __tablename__ = "careers"
    
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255), nullable=False)
    sigla = Column(String(10), nullable=False)
    codigo = Column(String(20))
    descripcion = Column(Text)
    duracion_años = Column(Integer)
    estado = Column(String(20), default='active')
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())