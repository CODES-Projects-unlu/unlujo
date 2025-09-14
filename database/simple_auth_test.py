# database/simple_auth_test.py
import sys
import os

# Agregar el directorio raíz al path de Python
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.user_service import UserService
from database.config import engine
from sqlalchemy import text

def test_simple_auth():
    """Prueba simple de autenticación"""
    print("�� Prueba simple de autenticación...")
    
    # Verificar que la tabla careers tiene datos
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT id, nombre FROM careers LIMIT 1;"))
            career = result.fetchone()
            if career:
                print(f"✅ Carrera encontrada: ID={career[0]}, Nombre={career[1]}")
                carrera_id = career[0]
            else:
                print("❌ No hay carreras en la base de datos")
                return False
    except Exception as e:
        print(f"❌ Error consultando carreras: {e}")
        return False
    
    # Probar creación de usuario
    user_service = UserService()
    
    test_user = {
        'nombre': 'Juan',
        'apellido': 'Pérez',
        'email': 'juan.perez@unlu.edu.ar',
        'dni': '12345678',
        'carrera_id': carrera_id,  # Usar el ID real de la carrera
        'año_ingreso': 2024,
        'password': 'mi_contraseña_segura'
    }
    
    print(f"\n🔧 Creando usuario con carrera_id={carrera_id}...")
    result = user_service.create_user(test_user)
    print(f"Resultado: {result}")
    
    if result['success']:
        print("\n🎉 ¡Usuario creado exitosamente!")
        
        # Probar autenticación
        print("\n🔐 Probando autenticación...")
        auth_result = user_service.authenticate_user(test_user['email'], test_user['password'])
        print(f"Resultado: {auth_result}")
        
        if auth_result['success']:
            print("�� ¡Autenticación exitosa!")
        else:
            print("❌ Error en autenticación")
    else:
        print("❌ Error creando usuario")

if __name__ == "__main__":
    test_simple_auth()