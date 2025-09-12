# 📋 Sistema de Plantillas JSON para Lujito

## 🎯 ¿Qué es esto?

Este sistema permite que los estudiantes **contribuyan con datos** para el chatbot Lujito **sin acceso al código**. Solo necesitan llenar plantillas JSON con información real de UNLu.

## 📁 Archivos Disponibles

| Archivo | Descripción | Asignado a |
|---------|-------------|------------|
| `materias-lsi.json` | Todas las materias de LSI | - |
| `centros-regionales.json` | Sedes y centros de UNLu | - |
| `servicios-universitarios.json` | Biblioteca, deportes, etc. | - |
| `becas-ayudas.json` | Becas disponibles 2025 | - |
| `contactos-secretarias.json` | Secretarías y centros de estudiantes | - |

## 🚀 Cómo Usar

### **Para Estudiantes:**

1. **Descarga** la plantilla que te asignaron
2. **Abre** con un editor de texto (Notepad++, VS Code, etc.)
3. **Llena** con información real de UNLu
4. **Valida** el JSON (usa validador online)
5. **Envía** por email a codes.unlu@gmail.com

### **Para Validar JSON:**
```bash
# Instalar Node.js si no lo tienes
# Luego ejecutar:
node validar-json.js
```

## 📝 Instrucciones por Tipo

### **Materias** (`materias-*.json`)
- ✅ **Completa TODAS** las materias de la carrera
- ✅ **Verifica horarios** en la secretaría
- ✅ **Incluye requisitos** de cada materia
- ✅ **Mantén códigos** exactos (ej: LSI-101)

### **Centros Regionales** (`centros-regionales.json`)
- ✅ **Incluye TODAS** las sedes de UNLu
- ✅ **Verifica direcciones** y teléfonos
- ✅ **Lista servicios** disponibles en cada sede
- ✅ **Incluye carreras** que se dictan

### **Servicios** (`servicios-universitarios.json`)
- ✅ **Horarios actualizados** de cada servicio
- ✅ **Contactos verificados** (teléfono y email)
- ✅ **Servicios específicos** que ofrece cada área
- ✅ **Requisitos** para usar cada servicio

### **Becas** (`becas-ayudas.json`)
- ✅ **Fechas exactas** de apertura y cierre
- ✅ **Requisitos completos** para cada beca
- ✅ **Documentación** necesaria
- ✅ **Contactos** para consultas

### **Contactos** (`contactos-secretarias.json`)
- ✅ **Secretarías** de todas las carreras
- ✅ **Centros de estudiantes** activos
- ✅ **Horarios** de atención
- ✅ **Servicios** que ofrece cada área

## 🔍 Validación de Datos

### **Formato de Fechas:**
```json
"fechaApertura": "2025-03-01"  // ✅ Correcto
"fechaApertura": "01/03/2025"  // ❌ Incorrecto
```

### **Formato de Teléfonos:**
```json
"telefono": "(02323) 420-400 int. 123"  // ✅ Correcto
"telefono": "420-400"                   // ❌ Incorrecto
```

### **Formato de IDs:**
```json
"id": "lsi"                    // ✅ Correcto
"id": "LSI"                    // ❌ Incorrecto
"id": "licenciatura sistemas"  // ❌ Incorrecto
```

## 📊 Estado de Tareas

| Tarea | Archivo | Asignado | Estado | Fecha Límite |
|-------|---------|----------|--------|--------------|
| Materias LSI | `materias-lsi.json` | - | 🔴 Pendiente | - |
| Centros Regionales | `centros-regionales.json` | - | 🔴 Pendiente | - |
| Servicios Biblioteca | `servicios-universitarios.json` | - | 🔴 Pendiente | - |
| Becas 2025 | `becas-ayudas.json` | - | 🔴 Pendiente | - |
| Contactos Secretarías | `contactos-secretarias.json` | - | 🔴 Pendiente | - |

## 🎯 Criterios de Aceptación

### **✅ Aceptado:**
- JSON válido (sin errores de sintaxis)
- Información actualizada (verificada en UNLu)
- Datos completos (no campos vacíos)
- Formato consistente (fechas, teléfonos, etc.)
- Sin errores de tipeo

### **❌ Rechazado:**
- JSON inválido (errores de sintaxis)
- Información desactualizada
- Campos obligatorios vacíos
- Formato incorrecto
- Errores de tipeo evidentes

## 🚀 Proceso de Integración

1. **Estudiante** llena plantilla
2. **Valida** JSON localmente
3. **Envía** por email
4. **Tú validas** con el script
5. **Integras** al chatbot
6. **Pruebas** funcionamiento
7. **Deploy** a producción

## 📞 Contacto

- **Email**: codes.unlu@gmail.com
- **Asunto**: `[Lujito] Datos JSON - [Tipo]`
- **Ejemplo**: `[Lujito] Datos JSON - Materias LSI`

## 🎉 Beneficios

### **Para Ti:**
- ✅ Control total del código
- ✅ Validación previa de datos
- ✅ Escalabilidad fácil
- ✅ Calidad de información

### **Para los Estudiantes:**
- ✅ Contribuyen sin acceso al código
- ✅ Aprenden formato JSON
- ✅ Ayudan a la comunidad
- ✅ Experiencia en recopilación de datos

---

*¡Cada archivo JSON que recibas hace que Lujito sea más útil para todos! 🤖✨*
