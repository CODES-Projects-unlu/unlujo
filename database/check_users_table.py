import psycopg2
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.config import SessionLocal

def check_users_table():
    try:
        # Conectar usando SQLAlchemy
        from sqlalchemy import text
        db = SessionLocal()
        
        # Verificar estructura de la tabla users
        result = db.execute(text("""
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns 
            WHERE table_name = 'users' 
            ORDER BY ordinal_position
        """))
        
        print("🔍 Estructura de la tabla 'users':")
        print("=" * 60)
        for row in result:
            print(f"  {row[0]}: {row[1]} {'(NULL)' if row[2] == 'YES' else '(NOT NULL)'} {f'DEFAULT: {row[3]}' if row[3] else ''}")
        
        # Verificar si existe la columna fecha_actualizacion
        result2 = db.execute(text("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'users' AND column_name = 'fecha_actualizacion'
        """))
        
        fecha_actualizacion_exists = result2.fetchone() is not None
        print(f"\n📅 Columna 'fecha_actualizacion' existe: {fecha_actualizacion_exists}")
        
        if not fecha_actualizacion_exists:
            print("⚠️  La columna 'fecha_actualizacion' no existe. Necesitamos crearla.")
            
            # Crear la columna
            db.execute(text("""
                ALTER TABLE users 
                ADD COLUMN fecha_actualizacion TIMESTAMP DEFAULT NOW()
            """))
            db.commit()
            print("✅ Columna 'fecha_actualizacion' creada exitosamente.")
        
        db.close()
        
    except Exception as e:
        print(f"❌ Error verificando tabla users: {e}")

if __name__ == "__main__":
    check_users_table()
