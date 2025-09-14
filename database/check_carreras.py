# database/check_carreras.py
import sys
import os

# Agregar el directorio raíz al path de Python
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.config import SessionLocal
from database.models.career import Career

def check_carreras():
    """Verificar las carreras en la base de datos"""
    try:
        db = SessionLocal()
        
        carreras = db.query(Career).all()
        print(f"📋 Total de carreras: {len(carreras)}")
        print("\n🔍 Detalles de las carreras:")
        
        for carrera in carreras:
            print(f"\n  ID: {carrera.id}")
            print(f"  Nombre: {carrera.nombre}")
            print(f"  Sigla: {carrera.sigla}")
            print(f"  Código: {carrera.codigo}")
            print(f"  Estado: '{carrera.estado}'")
            print(f"  Duración: {carrera.duracion_años} años")
            print(f"  Fecha creación: {carrera.fecha_creacion}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error verificando carreras: {e}")
        return False
    finally:
        db.close()

if __name__ == "__main__":
    print("🔍 Verificando carreras en la base de datos...")
    check_carreras()
