# 🧠 Base de Conocimiento del Chatbot Lujito

Esta carpeta contiene toda la información que el chatbot Lujito usa para responder a los estudiantes de UNLu.

## 📁 Estructura de Archivos

```
knowledgeBase/
├── academic.js      # Datos académicos (carreras, materias, horarios)
├── services.js      # Servicios universitarios (biblioteca, deportes, becas)
├── contacts.js      # Contactos y ubicaciones
├── template.js      # Template para agregar nueva información
└── index.js         # Funciones de búsqueda y contexto
```

## 🎯 ¿Cómo Funciona?

1. **Los estudiantes hacen preguntas** al chatbot
2. **El chatbot busca** en esta base de conocimiento
3. **Responde** con información específica de UNLu

## 📝 ¿Cómo Agregar Información?

### **Paso 1**: Identifica el archivo correcto
- **Carreras, materias, horarios** → `academic.js`
- **Biblioteca, deportes, becas** → `services.js`
- **Secretarías, centros, contactos** → `contacts.js`

### **Paso 2**: Sigue la estructura existente
- Copia un ejemplo similar
- Reemplaza con tu información
- Mantén el formato correcto

### **Paso 3**: Prueba tu cambio
```bash
npm start
# Abre el chatbot y prueba preguntas relacionadas
```

## 🔍 Ejemplos de Preguntas que Responde

### **Carreras**
- "¿Qué carreras hay en UNLu?"
- "¿Cuánto dura LSI?"
- "¿Qué requisitos necesito para Enfermería?"

### **Servicios**
- "¿Cuáles son los horarios de la biblioteca?"
- "¿Qué becas puedo solicitar?"
- "¿Dónde está el área de deportes?"

### **Contactos**
- "¿Dónde está la secretaría de LSI?"
- "¿Cuál es el teléfono de CODES++?"
- "¿Cómo contacto a Bienestar Estudiantil?"

## 📋 Formato de Datos

### **Fechas**: Siempre en formato `YYYY-MM-DD`
```javascript
fecha: "2025-03-15" // ✅ Correcto
fecha: "15/03/2025" // ❌ Incorrecto
```

### **Teléfonos**: Con código de área y extensión
```javascript
telefono: "(02323) 420-400 int. 123" // ✅ Correcto
telefono: "420-400" // ❌ Incorrecto
```

### **IDs**: En minúsculas, sin espacios
```javascript
id: "lsi" // ✅ Correcto
id: "LSI" // ❌ Incorrecto
id: "licenciatura en sistemas" // ❌ Incorrecto
```

## 🚀 Proceso de Colaboración

1. **Fork** el repositorio
2. **Crea** una rama: `git checkout -b mi-cambio`
3. **Edita** el archivo correspondiente
4. **Prueba** localmente
5. **Commit**: `git commit -m "Agregar información de [área]"`
6. **Push**: `git push origin mi-cambio`
7. **Crea** Pull Request

## ❓ ¿Necesitas Ayuda?

- **Discord**: Canal #chatbot-colaboracion
- **GitHub**: Crea un issue
- **Email**: codes.unlu@gmail.com

## 📊 Estado Actual

- ✅ **Carreras**: 3 carreras completas
- ✅ **Servicios**: Biblioteca, deportes, becas
- ✅ **Contactos**: Secretarías y centros de estudiantes
- 🔄 **En progreso**: Eventos y actividades

## 🎯 Próximos Pasos

- [ ] Agregar más carreras
- [ ] Completar información de materias
- [ ] Agregar eventos próximos
- [ ] Incluir trámites administrativos
- [ ] Agregar información de sedes

---

*¡Cada aporte hace que Lujito sea más útil para la comunidad UNLu! 🤖✨*
