# database/fix_carreras_estado.py
import sys
import os

# Agregar el directorio raíz al path de Python
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.config import SessionLocal
from database.models.career import Career

def fix_carreras_estado():
    """Corregir el estado de las carreras"""
    try:
        db = SessionLocal()
        
        # Actualizar todas las carreras que tengan estado None o vacío
        carreras = db.query(Career).filter(
            (Career.estado.is_(None)) | (Career.estado == '')
        ).all()
        
        print(f"🔧 Encontradas {len(carreras)} carreras con estado inválido")
        
        for carrera in carreras:
            carrera.estado = 'active'
            print(f"✅ Actualizando: {carrera.nombre} -> estado: 'active'")
        
        db.commit()
        print(f"\n🎉 ¡Se actualizaron {len(carreras)} carreras!")
        
        # Verificar el resultado
        carreras_activas = db.query(Career).filter(Career.estado == 'active').count()
        print(f"📊 Total de carreras activas: {carreras_activas}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error actualizando carreras: {e}")
        db.rollback()
        return False
    finally:
        db.close()

if __name__ == "__main__":
    print("🔧 Corrigiendo estado de carreras...")
    if fix_carreras_estado():
        print("\n✅ ¡Proceso completado exitosamente!")
    else:
        print("\n❌ Error en el proceso")
