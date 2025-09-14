# database/models/chatbot_conversation.py
from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, Float, ForeignKey
from sqlalchemy.sql import func
from database.config import Base

class ChatbotConversation(Base):
    __tablename__ = "chatbot_conversations"
    
    # Información de la conversación
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey('users.id'), nullable=True)  # Opcional, puede ser anónimo
    session_id = Column(String(100), nullable=False)  # ID de sesión para agrupar mensajes
    mensaje_usuario = Column(Text, nullable=False)
    respuesta_chatbot = Column(Text, nullable=False)
    intencion_detectada = Column(String(50))  # consulta, queja, sugerencia, etc.
    confianza_respuesta = Column(Integer)  # Nivel de confianza 0-100
    fuente_respuesta = Column(String(50))  # knowledge_base, fallback, etc.
    
    # Información de contexto
    carrera_usuario = Column(String(100))  # Carrera del usuario (si está logueado)
    tema = Column(String(50))  # académico, administrativo, social, etc.
    sentimiento = Column(String(20))  # positivo, negativo, neutro
    palabras_clave = Column(Text)  # Palabras clave extraídas del mensaje
    
    # Metadatos
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    tiempo_respuesta = Column(Integer)  # Tiempo en milisegundos
    calificacion_usuario = Column(Integer)  # Calificación 1-5
    fue_util = Column(Boolean, default=None)  # NULL = no evaluado, True/False = evaluado
    necesita_revision = Column(Boolean, default=False)  # Si necesita revisión manual