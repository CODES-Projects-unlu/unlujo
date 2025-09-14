# database/insert_carreras.py
import sys
import os

# Agregar el directorio raíz al path de Python
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.config import SessionLocal
from database.models.career import Career

def insert_carreras():
    """Insertar carreras de prueba en la base de datos"""
    try:
        db = SessionLocal()
        
        # Verificar si ya existen carreras
        existing_careers = db.query(Career).count()
        if existing_careers > 0:
            print(f"✅ Ya existen {existing_careers} carreras en la base de datos")
            return True
        
        # Datos de carreras de prueba
        carreras_data = [
            {
                "nombre": "Licenciatura en Sistemas de Información",
                "sigla": "LSI",
                "codigo": "17.14",
                "descripcion": "Formación integral en tecnologías de la información, desarrollo de software y sistemas computacionales para el mundo digital.",
                "duracion_años": 5,
                "estado": "active"
            },
            {
                "nombre": "Licenciatura en Trabajo Social",
                "sigla": "LTS", 
                "codigo": "18.14",
                "descripcion": "Formación profesional para la intervención social, comunitaria y promoción del bienestar social en diversos contextos.",
                "duracion_años": 5,
                "estado": "active"
            },
            {
                "nombre": "Licenciatura en Enfermería",
                "sigla": "LE",
                "codigo": "19.14", 
                "descripcion": "Formación científica y humanística para el cuidado integral de la salud, promoción y prevención en salud.",
                "duracion_años": 5,
                "estado": "active"
            },
            {
                "nombre": "Licenciatura en Administración",
                "sigla": "LA",
                "codigo": "20.14",
                "descripcion": "Formación en gestión empresarial, administración pública y desarrollo de habilidades directivas.",
                "duracion_años": 5,
                "estado": "active"
            },
            {
                "nombre": "Licenciatura en Psicología",
                "sigla": "LP",
                "codigo": "21.14",
                "descripcion": "Formación en el estudio científico del comportamiento humano y los procesos mentales.",
                "duracion_años": 5,
                "estado": "active"
            }
        ]
        
        # Insertar carreras
        for carrera_data in carreras_data:
            carrera = Career(**carrera_data)
            db.add(carrera)
            print(f"✅ Agregando: {carrera_data['nombre']} ({carrera_data['sigla']})")
        
        db.commit()
        print(f"\n🎉 ¡Se insertaron {len(carreras_data)} carreras exitosamente!")
        
        # Verificar las carreras insertadas
        carreras = db.query(Career).all()
        print(f"\n📋 Carreras disponibles:")
        for carrera in carreras:
            print(f"  - ID: {carrera.id} | {carrera.nombre} ({carrera.sigla})")
        
        return True
        
    except Exception as e:
        print(f"❌ Error insertando carreras: {e}")
        db.rollback()
        return False
    finally:
        db.close()

if __name__ == "__main__":
    print("🎓 Insertando carreras de prueba...")
    if insert_carreras():
        print("\n✅ ¡Proceso completado exitosamente!")
    else:
        print("\n❌ Error en el proceso")
