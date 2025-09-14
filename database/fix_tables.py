# database/fix_tables.py
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

def drop_all_tables():
    """Eliminar todas las tablas existentes"""
    try:
        with engine.connect() as connection:
            # Eliminar tablas en orden inverso (por las foreign keys)
            tables_to_drop = ['chatbot_conversations', 'users', 'subjects', 'careers']
            
            for table in tables_to_drop:
                connection.execute(text(f"DROP TABLE IF EXISTS {table} CASCADE;"))
                print(f"🗑️ Tabla '{table}' eliminada")
            
            connection.commit()
            return True
    except Exception as e:
        print(f"❌ Error eliminando tablas: {e}")
        return False

def create_tables_in_order():
    """Crear tablas en el orden correcto"""
    try:
        # 1. Crear tabla careers (sin dependencias)
        Career.__table__.create(engine, checkfirst=True)
        print("✅ Tabla 'careers' creada")
        
        # 2. Crear tabla subjects (depende de careers)
        Subject.__table__.create(engine, checkfirst=True)
        print("✅ Tabla 'subjects' creada")
        
        # 3. Crear tabla users (depende de careers)
        User.__table__.create(engine, checkfirst=True)
        print("✅ Tabla 'users' creada")
        
        # 4. Crear tabla chatbot_conversations (depende de users)
        ChatbotConversation.__table__.create(engine, checkfirst=True)
        print("✅ Tabla 'chatbot_conversations' creada")
        
        return True
    except Exception as e:
        print(f"❌ Error creando tablas: {e}")
        return False

def insert_sample_data():
    """Insertar datos de muestra"""
    try:
        with engine.connect() as connection:
            # Insertar carrera de muestra
            connection.execute(text("""
                INSERT INTO careers (nombre, sigla, codigo, descripcion, duracion_años)
                VALUES ('Licenciatura en Sistemas de Información', 'LSI', '17.14', 'Plan de estudios oficial UNLu', 5)
                ON CONFLICT DO NOTHING;
            """))
            connection.commit()
            print("✅ Carrera de muestra insertada")
            
            return True
    except Exception as e:
        print(f"❌ Error insertando datos: {e}")
        return False

if __name__ == "__main__":
    print("�� Solucionando problema de foreign keys...")
    
    # Paso 1: Eliminar tablas existentes
    print("\n1. Eliminando tablas existentes...")
    if drop_all_tables():
        print("✅ Tablas eliminadas correctamente")
        
        # Paso 2: Crear tablas en orden
        print("\n2. Creando tablas en orden correcto...")
        if create_tables_in_order():
            print("✅ Tablas creadas correctamente")
            
            # Paso 3: Insertar datos de muestra
            print("\n3. Insertando datos de muestra...")
            if insert_sample_data():
                print("✅ Datos insertados correctamente")
                print("\n🎉 ¡Problema solucionado! Ahora puedes probar la autenticación.")
            else:
                print("❌ Error insertando datos")
        else:
            print("❌ Error creando tablas")
    else:
        print("❌ Error eliminando tablas")