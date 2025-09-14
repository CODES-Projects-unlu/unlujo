# database/test_connection.py
import sys
import os

# Agregar el directorio raíz al path de Python
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import create_engine, text
from database.config import engine, Base
from database.models.career import Career
from database.models.subject import Subject
from database.models.user import User
from database.models.chatbot_conversation import ChatbotConversation  # Nueva importación

def test_connection():
    """Probar la conexión a la base de datos"""
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            print("✅ Conexión exitosa a PostgreSQL!")
            return True
    except Exception as e:
        print(f"❌ Error de conexión: {e}")
        return False

def create_tables():
    """Crear todas las tablas definidas en los modelos"""
    try:
        Base.metadata.create_all(bind=engine)
        print("✅ Tablas creadas exitosamente!")
        return True
    except Exception as e:
        print(f"❌ Error creando tablas: {e}")
        return False

def test_tables():
    """Probar las tablas creadas"""
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
    print(" Probando conexión a la base de datos...")
    
    # Paso 1: Probar conexión
    if test_connection():
        print("\n Creando tablas...")
        
        # Paso 2: Crear tablas
        if create_tables():
            print("\n🔍 Verificando tablas...")
            
            # Paso 3: Verificar tablas
            if test_tables():
                print("\n🎉 ¡Todas las tablas se crearon correctamente!")
            else:
                print("\n❌ Error en la verificación de las tablas")
        else:
            print("\n❌ Error creando las tablas")
    else:
        print("\n❌ Error de conexión. Revisa la configuración.")