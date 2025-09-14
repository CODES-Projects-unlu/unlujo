# database/create_tables_ordered.py
import sys
import os

# Agregar el directorio raíz al path de Python
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import create_engine, text
from database.config import engine, Base
from database.models.career import Career
from database.models.subject import Subject
from database.models.user import User
from database.models.chatbot_conversation import ChatbotConversation

def create_tables_ordered():
    """Crear tablas en el orden correcto"""
    try:
        # Crear tabla careers primero (sin dependencias)
        Career.__table__.create(engine, checkfirst=True)
        print("✅ Tabla 'careers' creada")
        
        # Crear tabla subjects (depende de careers)
        Subject.__table__.create(engine, checkfirst=True)
        print("✅ Tabla 'subjects' creada")
        
        # Crear tabla users (depende de careers)
        User.__table__.create(engine, checkfirst=True)
        print("✅ Tabla 'users' creada")
        
        # Crear tabla chatbot_conversations (depende de users)
        ChatbotConversation.__table__.create(engine, checkfirst=True)
        print("✅ Tabla 'chatbot_conversations' creada")
        
        return True
    except Exception as e:
        print(f"❌ Error creando tablas: {e}")
        return False

def verify_tables():
    """Verificar que todas las tablas existan"""
    try:
        with engine.connect() as connection:
            tables_to_check = ['careers', 'subjects', 'users', 'chatbot_conversations']
            
            for table_name in tables_to_check:
                result = connection.execute(text(f"SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '{table_name}'"))
                if result.fetchone():
                    print(f"✅ Tabla '{table_name}' existe!")
                else:
                    print(f"❌ Tabla '{table_name}' no encontrada!")
                    return False
            
            return True
    except Exception as e:
        print(f"❌ Error verificando tablas: {e}")
        return False

if __name__ == "__main__":
    print("🔧 Creando tablas en orden correcto...")
    
    if create_tables_ordered():
        print("\n🔍 Verificando tablas...")
        if verify_tables():
            print("\n🎉 ¡Todas las tablas creadas correctamente!")
        else:
            print("\n❌ Error en la verificación")
    else:
        print("\n❌ Error creando las tablas")