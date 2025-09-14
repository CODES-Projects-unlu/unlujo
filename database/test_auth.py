# database/test_auth.py
import sys
import os

# Agregar el directorio raíz al path de Python
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.user_service import UserService
from database.auth_utils import generate_salt, hash_password, verify_password

def test_auth_functions():
    """Probar las funciones de autenticación"""
    print("🧪 Probando funciones de autenticación...")
    
    # Probar funciones básicas
    print("\n1. Probando generación de salt...")
    salt = generate_salt()
    print(f"✅ Salt generado: {salt[:20]}...")
    
    print("\n2. Probando hash de contraseña...")
    password = "mi_contraseña_segura"
    hashed = hash_password(password, salt)
    print(f"✅ Hash generado: {hashed[:20]}...")
    
    print("\n3. Probando verificación de contraseña...")
    is_valid = verify_password(password, hashed, salt)
    print(f"✅ Contraseña válida: {is_valid}")
    
    is_invalid = verify_password("contraseña_incorrecta", hashed, salt)
    print(f"✅ Contraseña inválida detectada: {not is_invalid}")

def test_user_service():
    """Probar el servicio de usuarios"""
    print("\n🔧 Probando UserService...")
    
    user_service = UserService()
    
    # Datos de prueba
    test_user = {
        'nombre': 'Juan',
        'apellido': 'Pérez',
        'email': 'juan.perez@unlu.edu.ar',
        'dni': '12345678',
        'carrera_id': 1,  # Asumiendo que existe la carrera con ID 1
        'año_ingreso': 2024,
        'password': 'mi_contraseña_segura'
    }
    
    print("\n1. Probando creación de usuario...")
    result = user_service.create_user(test_user)
    print(f"Resultado: {result}")
    
    if result['success']:
        print("\n2. Probando autenticación...")
        auth_result = user_service.authenticate_user(test_user['email'], test_user['password'])
        print(f"Resultado: {auth_result}")
        
        if auth_result['success']:
            print("\n3. Probando verificación de email...")
            verify_result = user_service.verify_email(test_user['email'], result['codigo_verificacion'])
            print(f"Resultado: {verify_result}")
            
            print("\n4. Probando reset de contraseña...")
            reset_request = user_service.request_password_reset(test_user['email'])
            print(f"Resultado: {reset_request}")
            
            if reset_request['success']:
                print("\n5. Probando cambio de contraseña...")
                new_password = 'nueva_contraseña_segura'
                reset_result = user_service.reset_password(reset_request['reset_token'], new_password)
                print(f"Resultado: {reset_result}")
                
                if reset_result['success']:
                    print("\n6. Probando autenticación con nueva contraseña...")
                    new_auth = user_service.authenticate_user(test_user['email'], new_password)
                    print(f"Resultado: {new_auth}")

if __name__ == "__main__":
    print("🚀 Iniciando pruebas de autenticación...")
    
    # Probar funciones básicas
    test_auth_functions()
    
    # Probar servicio de usuarios
    test_user_service()
    
    print("\n�� ¡Pruebas completadas!")