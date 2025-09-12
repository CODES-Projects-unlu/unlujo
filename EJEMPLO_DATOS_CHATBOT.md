# 📝 Ejemplo de Datos para el Chatbot

## 🎯 Guía Rápida para Agregar Información

### **Pregunta**: "¿Qué carreras hay en UNLu?"

**Respuesta actual del chatbot**: Básica
**Respuesta mejorada**: Con información detallada

---

## 📚 Ejemplo 1: Agregar una Carrera

### **Archivo**: `client/src/data/knowledgeBase/academic.js`

**Antes** (información básica):
```javascript
// Solo nombre y sigla
```

**Después** (información completa):
```javascript
{
  id: "lsi",
  nombre: "Licenciatura en Sistemas de Información",
  sigla: "LSI",
  duracion: "5 años",
  modalidad: "Presencial",
  sede: "Luján",
  titulo: "Licenciado en Sistemas de Información",
  requisitos: [
    "Título secundario completo",
    "Examen de ingreso (Matemática y Lógica)",
    "Documentación completa"
  ],
  perfil: "Formación integral en desarrollo de software y gestión de sistemas informáticos",
  fechasImportantes: [
    {
      evento: "Inscripciones 2025",
      fecha: "2025-02-01",
      fechaFin: "2025-02-15",
      descripcion: "Inscripción a materias del primer cuatrimestre"
    }
  ]
}
```

**Resultado**: El chatbot puede responder preguntas como:
- "¿Cuánto dura LSI?"
- "¿Qué requisitos necesito para LSI?"
- "¿Cuándo son las inscripciones?"

---

## 🏢 Ejemplo 2: Agregar un Servicio

### **Pregunta**: "¿Cuáles son los horarios de la biblioteca?"

**Archivo**: `client/src/data/knowledgeBase/services.js`

```javascript
biblioteca: {
  nombre: "Biblioteca Central",
  ubicacion: "Edificio Central, Planta Baja",
  horarios: {
    lunes_viernes: "08:00-22:00",
    sabados: "08:00-18:00",
    domingos: "14:00-20:00"
  },
  servicios: [
    "Préstamo de libros (hasta 3 libros por 15 días)",
    "Sala de estudio individual y grupal",
    "Acceso a bases de datos académicas",
    "Fotocopias e impresiones"
  ],
  contacto: {
    telefono: "(02323) 420-400 int. 123",
    email: "biblioteca@unlu.edu.ar"
  }
}
```

**Resultado**: El chatbot responde:
- "📚 Biblioteca Central: Lunes a Viernes 08:00-22:00. Tel: (02323) 420-400 int. 123"

---

## 📞 Ejemplo 3: Agregar Contactos

### **Pregunta**: "¿Dónde está la secretaría de LSI?"

**Archivo**: `client/src/data/knowledgeBase/contacts.js`

```javascript
{
  carrera: "Sistemas de Información",
  ubicacion: "Edificio de Sistemas, 1er piso",
  telefono: "(02323) 420-400 int. 201",
  email: "secretaria.sistemas@unlu.edu.ar",
  responsable: "Lic. Patricia López",
  horarios: "Lunes a Viernes 08:00-16:00"
}
```

**Resultado**: El chatbot responde:
- "📞 Sistemas de Información - Edificio de Sistemas, 1er piso. Tel: (02323) 420-400 int. 201"

---

## 💰 Ejemplo 4: Agregar Becas

### **Pregunta**: "¿Qué becas puedo solicitar?"

**Archivo**: `client/src/data/knowledgeBase/services.js`

```javascript
{
  id: "beca_interna",
  nombre: "Becas Estudiantiles Internas",
  descripcion: "Ayuda económica para estudiantes regulares",
  requisitos: [
    "Ser estudiante regular de la universidad",
    "Rendir al menos 2 materias por año",
    "Situación socioeconómica desfavorable"
  ],
  monto: "Variable según situación (entre $15.000 y $50.000)",
  fechaApertura: "2025-03-01",
  fechaCierre: "2025-03-31",
  contacto: {
    telefono: "(02323) 420-400 int. 456",
    email: "becas@unlu.edu.ar"
  }
}
```

**Resultado**: El chatbot responde:
- "💰 Becas Estudiantiles Internas: $15.000-$50.000. Inscripciones: 1-31 marzo. Tel: (02323) 420-400 int. 456"

---

## 🎯 Cómo Probar tu Cambio

### 1. **Abre el chatbot** en la aplicación
### 2. **Haz una pregunta** relacionada a tu cambio
### 3. **Verifica** que la respuesta sea correcta y completa

### **Preguntas de Prueba**:
- "¿Qué carreras hay en UNLu?"
- "¿Cuáles son los horarios de la biblioteca?"
- "¿Dónde está la secretaría de [tu carrera]?"
- "¿Qué becas puedo solicitar?"
- "¿Cuándo son las inscripciones?"

---

## 📋 Checklist Rápido

Antes de enviar tu cambio:

- [ ] **Información correcta**: Verificada con fuentes oficiales
- [ ] **Formato correcto**: Fechas en YYYY-MM-DD
- [ ] **Estructura correcta**: Sigue el ejemplo existente
- [ ] **Sin duplicados**: No hay información repetida
- [ ] **Probado**: El chatbot responde correctamente

---

## 🚀 Pasos para Contribuir

1. **Fork** el repositorio en GitHub
2. **Clona** tu fork localmente
3. **Crea** una rama: `git checkout -b mi-cambio`
4. **Edita** el archivo correspondiente
5. **Prueba** localmente con `npm start`
6. **Commit**: `git commit -m "Agregar información de [área]"`
7. **Push**: `git push origin mi-cambio`
8. **Crea** Pull Request en GitHub

---

## ❓ ¿Necesitas Ayuda?

- **Discord**: Canal #chatbot-colaboracion
- **GitHub**: Crea un issue
- **Email**: codes.unlu@gmail.com

---

*¡Cada aporte hace que Lujito sea más útil para todos! 🤖✨*
