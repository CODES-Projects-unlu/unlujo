# database/test_user_insert.py
import sys
import os

# Agregar el directorio raíz al path de Python
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.config import SessionLocal
from database.models.user import User
from database.models.career import Career
from database.auth_utils import hash_password
import secrets

def test_user_insert():
    """Probar la inserción de un usuario"""
    try:
        db = SessionLocal()
        
        # Verificar que existe la carrera
        carrera = db.query(Career).filter(Career.id == 1, Career.estado == 'active').first()
        if not carrera:
            print("❌ No se encontró la carrera con ID 1 y estado 'active'")
            return False
        
        print(f"✅ Carrera encontrada: {carrera.nombre} (ID: {carrera.id})")
        
        # Generar salt y hash de contraseña
        salt = secrets.token_hex(32)
        password_hash = hash_password("123456", salt)
        
        # Crear usuario de prueba
        user_data = {
            "nombre": "María",
            "apellido": "González", 
            "email": "maria.gonzalez@test.com",
            "telefono": "1234567890",
            "dni": "87654321",
            "carrera_id": 1,
            "año_ingreso": 2024,
            "password_hash": password_hash,
            "salt": salt,
            "rol": "estudiante",
            "estado": "Activo",
            "email_verificado": False
        }
        
        print("🔧 Intentando crear usuario...")
        print(f"   Nombre: {user_data['nombre']} {user_data['apellido']}")
        print(f"   Email: {user_data['email']}")
        print(f"   DNI: {user_data['dni']}")
        print(f"   Carrera ID: {user_data['carrera_id']}")
        print(f"   Año ingreso: {user_data['año_ingreso']}")
        
        new_user = User(**user_data)
        db.add(new_user)
        db.commit()
        
        print("✅ ¡Usuario creado exitosamente!")
        print(f"   ID del usuario: {new_user.id}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error creando usuario: {e}")
        print(f"   Tipo de error: {type(e).__name__}")
        import traceback
        traceback.print_exc()
        db.rollback()
        return False
    finally:
        db.close()

if __name__ == "__main__":
    print("🧪 Probando inserción de usuario...")
    if test_user_insert():
        print("\n✅ ¡Prueba exitosa!")
    else:
        print("\n❌ Error en la prueba")
