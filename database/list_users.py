# database/list_users.py
import sys
import os

# Agregar el directorio raíz al path de Python
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.config import SessionLocal
from database.models.user import User
from database.models.career import Career

def list_users():
    """Listar todos los usuarios registrados"""
    try:
        db = SessionLocal()
        
        # Obtener usuarios con información de carrera
        users = db.query(User, Career).join(Career, User.carrera_id == Career.id).all()
        
        print(f"👥 Total de usuarios registrados: {len(users)}")
        print("\n📋 Lista de usuarios:")
        print("-" * 80)
        
        for user, career in users:
            print(f"ID: {user.id}")
            print(f"Nombre: {user.nombre} {user.apellido}")
            print(f"Email: {user.email}")
            print(f"DNI: {user.dni}")
            print(f"Carrera: {career.nombre} ({career.sigla})")
            print(f"Año ingreso: {user.año_ingreso}")
            print(f"Rol: {user.rol}")
            print(f"Estado: {user.estado}")
            print(f"Email verificado: {'Sí' if user.email_verificado else 'No'}")
            print(f"Fecha registro: {user.fecha_creacion}")
            print("-" * 80)
        
        return True
        
    except Exception as e:
        print(f"❌ Error listando usuarios: {e}")
        return False
    finally:
        db.close()

if __name__ == "__main__":
    print("👥 Listando usuarios registrados...")
    list_users()
