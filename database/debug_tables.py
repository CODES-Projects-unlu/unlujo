# database/debug_tables.py
import sys
import os

# Agregar el directorio raíz al path de Python
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.config import engine
from sqlalchemy import text

def debug_tables():
    """Verificar el estado actual de las tablas"""
    try:
        with engine.connect() as connection:
            # Verificar qué tablas existen
            result = connection.execute(text("""
                SELECT table_name, table_schema
                FROM information_schema.tables 
                WHERE table_schema = 'public'
                ORDER BY table_name;
            """))
            
            tables = result.fetchall()
            print("�� Tablas existentes:")
            print("-" * 50)
            for table in tables:
                print(f"✅ {table[1]}.{table[0]}")
            
            if not tables:
                print("❌ No hay tablas en la base de datos")
                return False
            
            # Verificar estructura de la tabla careers
            print("\n🔍 Estructura de la tabla 'careers':")
            result = connection.execute(text("""
                SELECT column_name, data_type, is_nullable
                FROM information_schema.columns 
                WHERE table_name = 'careers' AND table_schema = 'public'
                ORDER BY ordinal_position;
            """))
            
            for col in result.fetchall():
                print(f"  - {col[0]}: {col[1]} ({'NULL' if col[2] == 'YES' else 'NOT NULL'})")
            
            # Verificar si hay datos en careers
            result = connection.execute(text("SELECT COUNT(*) FROM careers;"))
            count = result.fetchone()[0]
            print(f"\n📊 Tabla 'careers' tiene {count} registros")
            
            if count == 0:
                print("⚠️ La tabla careers está vacía, vamos a insertar datos de prueba")
                connection.execute(text("""
                    INSERT INTO careers (nombre, sigla, codigo, descripcion, duracion_años)
                    VALUES ('Licenciatura en Sistemas de Información', 'LSI', '17.14', 'Plan de estudios oficial UNLu', 5);
                """))
                connection.commit()
                print("✅ Carrera de prueba insertada")
            
            return True
            
    except Exception as e:
        print(f"❌ Error verificando tablas: {e}")
        return False

if __name__ == "__main__":
    debug_tables()