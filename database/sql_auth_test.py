# database/sql_auth_test.py
import sys
import os

# Agregar el directorio raíz al path de Python
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.config import engine
from database.auth_utils import generate_salt, hash_password, verify_password
from sqlalchemy import text
from datetime import datetime

def test_sql_auth():
    """Probar autenticación usando SQL directo"""
    print(" Prueba de autenticación con SQL directo...")
    
    try:
        with engine.connect() as connection:
            # Verificar que la tabla careers tiene datos
            result = connection.execute(text("SELECT id, nombre FROM careers LIMIT 1;"))
            career = result.fetchone()
            if career:
                print(f"✅ Carrera encontrada: ID={career[0]}, Nombre={career[1]}")
                carrera_id = career[0]
            else:
                print("❌ No hay carreras en la base de datos")
                return False
            
            # Verificar si el usuario ya existe
            result = connection.execute(text("SELECT id FROM users WHERE email = 'juan.perez@unlu.edu.ar';"))
            existing_user = result.fetchone()
            
            if existing_user:
                print("✅ Usuario ya existe, eliminando...")
                connection.execute(text("DELETE FROM users WHERE email = 'juan.perez@unlu.edu.ar';"))
                connection.commit()
            
            # Crear usuario con SQL directo
            print("\n🔧 Creando usuario con SQL directo...")
            
            # Generar salt y hash
            salt = generate_salt()
            password_hash = hash_password('mi_contraseña_segura', salt)
            
            # Insertar usuario
            connection.execute(text("""
                INSERT INTO users (
                    nombre, apellido, email, dni, carrera_id, año_ingreso, 
                    password_hash, salt, rol, email_verificado
                ) VALUES (
                    :nombre, :apellido, :email, :dni, :carrera_id, :año_ingreso,
                    :password_hash, :salt, :rol, :email_verificado
                );
            """), {
                'nombre': 'Juan',
                'apellido': 'Pérez',
                'email': 'juan.perez@unlu.edu.ar',
                'dni': '12345678',
                'carrera_id': carrera_id,
                'año_ingreso': 2024,
                'password_hash': password_hash,
                'salt': salt,
                'rol': 'estudiante',
                'email_verificado': False
            })
            connection.commit()
            print("✅ Usuario creado exitosamente")
            
            # Probar autenticación
            print("\n🔐 Probando autenticación...")
            result = connection.execute(text("""
                SELECT id, nombre, apellido, email, password_hash, salt, rol, carrera_id
                FROM users WHERE email = 'juan.perez@unlu.edu.ar';
            """))
            user = result.fetchone()
            
            if user:
                print(f"✅ Usuario encontrado: {user[1]} {user[2]}")
                
                # Verificar contraseña
                if verify_password('mi_contraseña_segura', user[4], user[5]):
                    print("✅ Contraseña verificada correctamente")
                    print(f"✅ Rol: {user[6]}")
                    print(f"✅ Carrera ID: {user[7]}")
                    print("\n🎉 ¡Autenticación exitosa!")
                else:
                    print("❌ Contraseña incorrecta")
            else:
                print("❌ Usuario no encontrado")
            
            return True
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    test_sql_auth()