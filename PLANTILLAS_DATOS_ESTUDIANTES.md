# 📋 Plantillas de Datos para Estudiantes

## 🎯 ¿Cómo Funciona?

Los estudiantes **NO tienen acceso** al código, pero pueden **preparar datos** en formato JSON que luego se integran al chatbot.

## 📝 Proceso de Colaboración

1. **Tú asignas** una tarea específica (ej: "Materias de LSI")
2. **Estudiante descarga** la plantilla correspondiente
3. **Llena** con información real de UNLu
4. **Te envía** el archivo JSON completo
5. **Tú integras** los datos al chatbot

---

## 🎓 Plantilla 1: Materias por Carrera

### **Archivo**: `materias-lsi.json`

```json
{
  "carrera": "Licenciatura en Sistemas de Información",
  "sigla": "LSI",
  "materias": [
    {
      "año": 1,
      "cuatrimestre": 1,
      "materias": [
        {
          "codigo": "LSI-101",
          "nombre": "Introducción a la Programación",
          "creditos": 6,
          "horarios": [
            "Lunes 18:00-22:00",
            "Miércoles 18:00-22:00"
          ],
          "aula": "Lab. de Sistemas 1",
          "profesor": "Dr. Juan Pérez",
          "modalidad": "Presencial",
          "requisitos": "Ninguno"
        },
        {
          "codigo": "LSI-102",
          "nombre": "Matemática I",
          "creditos": 6,
          "horarios": [
            "Martes 18:00-22:00",
            "Jueves 18:00-22:00"
          ],
          "aula": "Aula 15",
          "profesor": "Lic. María González",
          "modalidad": "Presencial",
          "requisitos": "Ninguno"
        }
      ]
    },
    {
      "año": 1,
      "cuatrimestre": 2,
      "materias": [
        {
          "codigo": "LSI-103",
          "nombre": "Programación Orientada a Objetos",
          "creditos": 6,
          "horarios": [
            "Lunes 18:00-22:00",
            "Miércoles 18:00-22:00"
          ],
          "aula": "Lab. de Sistemas 1",
          "profesor": "Dr. Juan Pérez",
          "modalidad": "Presencial",
          "requisitos": "LSI-101"
        }
      ]
    }
  ]
}
```

### **Instrucciones para el Estudiante:**
- Completa **TODAS** las materias de tu carrera
- Incluye **horarios reales** (verifica en la secretaría)
- Agrega **requisitos** de cada materia
- Mantén el **formato exacto** del JSON

---

## 🏢 Plantilla 2: Centros Regionales

### **Archivo**: `centros-regionales.json`

```json
{
  "centros": [
    {
      "id": "lujan",
      "nombre": "Sede Central Luján",
      "direccion": "Ruta 5 y Avenida Constitución",
      "codigo_postal": "6700",
      "ciudad": "Luján",
      "provincia": "Buenos Aires",
      "telefono": "(02323) 420-400",
      "email": "info@unlu.edu.ar",
      "coordinador": "Dr. Carlos Mendoza",
      "servicios": [
        "Rectorado",
        "Secretaría Académica",
        "Biblioteca Central",
        "Área de Deportes",
        "Bienestar Estudiantil"
      ],
      "carreras": [
        "Licenciatura en Sistemas de Información",
        "Licenciatura en Enfermería",
        "Profesorado en Educación Física"
      ]
    },
    {
      "id": "san_miguel",
      "nombre": "Centro Regional San Miguel",
      "direccion": "Av. Roca 850",
      "codigo_postal": "1663",
      "ciudad": "San Miguel",
      "provincia": "Buenos Aires",
      "telefono": "(011) 4664-1234",
      "email": "sanmiguel@unlu.edu.ar",
      "coordinador": "Lic. Ana Rodríguez",
      "servicios": [
        "Secretaría Académica",
        "Biblioteca",
        "Área de Deportes"
      ],
      "carreras": [
        "Tecnicatura en Administración",
        "Profesorado en Matemática"
      ]
    }
  ]
}
```

### **Instrucciones para el Estudiante:**
- Incluye **todas las sedes** de UNLu
- Verifica **direcciones y teléfonos**
- Lista **servicios disponibles** en cada sede
- Incluye **carreras** que se dictan en cada centro

---

## 📚 Plantilla 3: Servicios Universitarios

### **Archivo**: `servicios-universitarios.json`

```json
{
  "servicios": [
    {
      "id": "biblioteca",
      "nombre": "Biblioteca Central",
      "ubicacion": "Edificio Central, Planta Baja",
      "horarios": {
        "lunes_viernes": "08:00-22:00",
        "sabados": "08:00-18:00",
        "domingos": "14:00-20:00"
      },
      "servicios": [
        "Préstamo de libros (hasta 3 libros por 15 días)",
        "Sala de estudio individual y grupal",
        "Acceso a bases de datos académicas",
        "Fotocopias e impresiones",
        "WiFi gratuito"
      ],
      "contacto": {
        "telefono": "(02323) 420-400 int. 123",
        "email": "biblioteca@unlu.edu.ar",
        "responsable": "Lic. Patricia López"
      },
      "requisitos": [
        "Carnet de estudiante",
        "DNI"
      ]
    },
    {
      "id": "deportes",
      "nombre": "Área de Deportes",
      "ubicacion": "Polideportivo, Campus Central",
      "horarios": {
        "lunes_viernes": "07:00-22:00",
        "sabados": "08:00-20:00",
        "domingos": "08:00-18:00"
      },
      "servicios": [
        "Fútbol 11 y 7",
        "Básquet",
        "Vóley",
        "Tenis",
        "Natación",
        "Gimnasio"
      ],
      "contacto": {
        "telefono": "(02323) 420-400 int. 456",
        "email": "deportes@unlu.edu.ar",
        "responsable": "Prof. Roberto Silva"
      },
      "requisitos": [
        "Carnet de estudiante",
        "Certificado médico",
        "Inscripción previa"
      ]
    }
  ]
}
```

---

## 💰 Plantilla 4: Becas y Ayudas

### **Archivo**: `becas-ayudas.json`

```json
{
  "becas": [
    {
      "id": "beca_interna",
      "nombre": "Becas Estudiantiles Internas",
      "descripcion": "Ayuda económica para estudiantes regulares",
      "requisitos": [
        "Ser estudiante regular de la universidad",
        "Rendir al menos 2 materias por año",
        "Situación socioeconómica desfavorable",
        "No tener otra beca activa"
      ],
      "monto": "Variable según situación (entre $15.000 y $50.000)",
      "duracion": "Anual (renovable)",
      "fechaApertura": "2025-03-01",
      "fechaCierre": "2025-03-31",
      "documentacion": [
        "Formulario de solicitud",
        "Constancia de alumno regular",
        "Comprobantes de ingresos familiares",
        "DNI y fotocopia",
        "Certificado de domicilio"
      ],
      "contacto": {
        "telefono": "(02323) 420-400 int. 456",
        "email": "becas@unlu.edu.ar",
        "oficina": "Bienestar Estudiantil",
        "responsable": "Lic. Carmen Díaz"
      }
    }
  ]
}
```

---

## 📞 Plantilla 5: Contactos y Secretarías

### **Archivo**: `contactos-secretarias.json`

```json
{
  "secretarias": [
    {
      "carrera": "Sistemas de Información",
      "ubicacion": "Edificio de Sistemas, 1er piso",
      "telefono": "(02323) 420-400 int. 201",
      "email": "secretaria.sistemas@unlu.edu.ar",
      "responsable": "Lic. Patricia López",
      "horarios": "Lunes a Viernes 08:00-16:00",
      "servicios": [
        "Inscripción a materias",
        "Constancias de alumno regular",
        "Certificados analíticos",
        "Equivalencias",
        "Consultas académicas"
      ]
    }
  ],
  "centros_estudiantes": [
    {
      "nombre": "CODES++",
      "carrera": "Sistemas de Información",
      "ubicacion": "Edificio de Sistemas, Planta Baja",
      "telefono": "(02323) 420-400 int. 301",
      "email": "codes@unlu.edu.ar",
      "presidente": "Juan Estudiante",
      "horarios": "Lunes a Viernes 18:00-22:00",
      "actividades": [
        "Tutorías de programación",
        "Charlas técnicas",
        "Eventos de networking",
        "Apoyo estudiantil"
      ]
    }
  ]
}
```

---

## 🎯 Cómo Asignar Tareas

### **Ejemplo de Tarea:**
```
📋 TAREA: Materias de LSI
👤 Asignado a: [Nombre del Estudiante]
📅 Fecha límite: 15 de febrero
📝 Descripción: Necesitamos todas las materias de LSI con códigos, horarios y profesores
📁 Archivo: materias-lsi.json
✅ Entregar: Por email a codes.unlu@gmail.com
```

### **Checklist de Validación:**
- [ ] **Formato JSON válido** (usar validador online)
- [ ] **Información actualizada** (verificar en secretaría)
- [ ] **Datos completos** (no dejar campos vacíos)
- [ ] **Formato consistente** (fechas, teléfonos, etc.)
- [ ] **Sin errores de tipeo**

---

## 🚀 Ventajas de este Sistema

### **Para Ti:**
- ✅ **Control total** del código
- ✅ **Validación previa** de datos
- ✅ **Escalabilidad** fácil
- ✅ **Calidad** de información

### **Para los Estudiantes:**
- ✅ **Contribuyen** sin acceso al código
- ✅ **Aprenden** formato JSON
- ✅ **Ayudan** a la comunidad
- ✅ **Experiencia** en recopilación de datos

---

## 📊 Estado de Tareas

| Tarea | Asignado | Estado | Fecha Límite |
|-------|----------|--------|--------------|
| Materias LSI | - | Pendiente | - |
| Centros Regionales | - | Pendiente | - |
| Servicios Biblioteca | - | Pendiente | - |
| Becas 2025 | - | Pendiente | - |
| Contactos Secretarías | - | Pendiente | - |

---

*¡Cada archivo JSON que recibas hace que Lujito sea más útil para todos! 🤖✨*
