# 🤖 Guía de Colaboración para el Chatbot Lujito

## 👥 Para Estudiantes Colaboradores

¡Hola! Si estás aquí es porque quieres ayudar a mejorar el chatbot Lujito, nuestro asistente virtual de UNLu. Esta guía te explicará cómo agregar y mantener la información que el chatbot necesita para ayudar a tus compañeros.

---

## 📋 ¿Qué es Lujito?

Lujito es el chatbot de la comunidad estudiantil UNLu que ayuda con:
- **Información académica**: Carreras, materias, horarios
- **Servicios universitarios**: Biblioteca, deportes, becas
- **Contactos**: Secretarías, centros de estudiantes
- **Trámites**: Certificados, constancias, equivalencias

---

## 🗂️ Estructura de Archivos

La información se organiza en estos archivos:

```
client/src/data/knowledgeBase/
├── academic.js      # Datos académicos (carreras, materias, horarios)
├── services.js      # Servicios (biblioteca, deportes, becas)
├── contacts.js      # Contactos y ubicaciones
└── index.js         # Funciones de búsqueda y contexto
```

---

## 📝 Cómo Agregar Información

### 1. **Datos Académicos** (`academic.js`)

#### Agregar una nueva carrera:
```javascript
{
  id: "nueva_carrera",
  nombre: "Nombre Completo de la Carrera",
  sigla: "SIGLA",
  duracion: "X años",
  modalidad: "Presencial/Remota/Híbrida",
  sede: "Luján/San Miguel/Chivilcoy",
  titulo: "Título que otorga",
  requisitos: [
    "Título secundario completo",
    "Examen de ingreso",
    "Documentación específica"
  ],
  perfil: "Descripción breve del perfil profesional",
  fechasImportantes: [
    {
      evento: "Inscripciones 2025",
      fecha: "2025-02-01",
      fechaFin: "2025-02-15",
      descripcion: "Período de inscripción"
    }
  ]
}
```

#### Agregar materias:
```javascript
materias: [
  {
    año: 1,
    cuatrimestre: 1,
    materias: [
      {
        codigo: "SIGLA-101",
        nombre: "Nombre de la Materia",
        creditos: 6,
        horarios: ["Lunes 18:00-22:00", "Miércoles 18:00-22:00"],
        aula: "Aula/Lab específica",
        profesor: "Nombre del Profesor"
      }
    ]
  }
]
```

### 2. **Servicios Universitarios** (`services.js`)

#### Agregar un nuevo servicio:
```javascript
nuevoServicio: {
  nombre: "Nombre del Servicio",
  ubicacion: "Edificio y piso",
  horarios: {
    lunes_viernes: "08:00-16:00",
    sabados: "08:00-12:00",
    domingos: "Cerrado"
  },
  servicios: [
    "Lista de servicios que ofrece",
    "Otro servicio",
    "Etc."
  ],
  contacto: {
    telefono: "(02323) 420-400 int. XXX",
    email: "servicio@unlu.edu.ar",
    responsable: "Nombre del Responsable"
  }
}
```

#### Agregar una nueva beca:
```javascript
{
  id: "beca_nueva",
  nombre: "Nombre de la Beca",
  descripcion: "Descripción breve",
  requisitos: [
    "Requisito 1",
    "Requisito 2"
  ],
  monto: "Monto o descripción",
  duracion: "Duración de la beca",
  fechaApertura: "2025-03-01",
  fechaCierre: "2025-03-31",
  documentacion: [
    "Documento 1",
    "Documento 2"
  ],
  contacto: {
    telefono: "(02323) 420-400 int. XXX",
    email: "becas@unlu.edu.ar",
    oficina: "Oficina responsable"
  }
}
```

### 3. **Contactos** (`contacts.js`)

#### Agregar secretaría académica:
```javascript
{
  carrera: "Nombre de la Carrera",
  ubicacion: "Edificio y piso",
  telefono: "(02323) 420-400 int. XXX",
  email: "secretaria.carrera@unlu.edu.ar",
  responsable: "Nombre del Responsable",
  horarios: "Lunes a Viernes 08:00-16:00"
}
```

#### Agregar centro de estudiantes:
```javascript
{
  nombre: "Nombre del Centro",
  carrera: "Carrera que representa",
  ubicacion: "Edificio y piso",
  telefono: "(02323) 420-400 int. XXX",
  email: "centro@unlu.edu.ar",
  presidente: "Nombre del Presidente",
  horarios: "Lunes a Viernes 18:00-22:00"
}
```

---

## 🔍 Cómo Buscar y Actualizar Información

### 1. **Verificar Información Existente**
Antes de agregar algo nuevo, revisa si ya existe:
- Busca en el archivo correspondiente
- Usa Ctrl+F para buscar palabras clave
- Verifica que no esté duplicada

### 2. **Actualizar Información**
Si encuentras información desactualizada:
- Cambia solo los datos que necesitan actualización
- Mantén la estructura original
- Agrega comentarios si es necesario

### 3. **Formato de Fechas**
Usa siempre el formato: `"YYYY-MM-DD"`
Ejemplo: `"2025-03-15"`

---

## 📋 Checklist de Verificación

Antes de enviar tus cambios, verifica:

### ✅ **Datos Académicos**
- [ ] Nombre completo y correcto de la carrera
- [ ] Sigla en mayúsculas
- [ ] Duración correcta
- [ ] Modalidad especificada
- [ ] Sede correcta
- [ ] Requisitos actualizados
- [ ] Fechas en formato correcto

### ✅ **Servicios**
- [ ] Nombre del servicio correcto
- [ ] Ubicación específica
- [ ] Horarios actualizados
- [ ] Contacto verificado
- [ ] Servicios listados correctamente

### ✅ **Contactos**
- [ ] Teléfono con extensión correcta
- [ ] Email verificado
- [ ] Responsable actualizado
- [ ] Horarios correctos

---

## 🚀 Proceso de Colaboración

### 1. **Fork del Repositorio**
```bash
# En GitHub, haz fork del repositorio
# Luego clona tu fork localmente
git clone https://github.com/TU_USUARIO/unlujo.git
cd unlujo
```

### 2. **Crear Rama para tu Cambio**
```bash
git checkout -b feature/actualizar-datos-chatbot
```

### 3. **Hacer Cambios**
- Edita los archivos correspondientes
- Sigue la estructura existente
- Verifica con el checklist

### 4. **Probar Localmente**
```bash
cd client
npm start
```
- Abre el chatbot
- Prueba las preguntas relacionadas a tu cambio
- Verifica que las respuestas sean correctas

### 5. **Commit y Push**
```bash
git add .
git commit -m "feat: Actualizar [descripción de tu cambio]"
git push origin feature/actualizar-datos-chatbot
```

### 6. **Crear Pull Request**
- Ve a GitHub
- Crea un Pull Request
- Describe qué cambiaste y por qué
- Menciona a los revisores

---

## 📞 Fuentes de Información Confiable

### **Oficiales de UNLu**
- **Sitio web**: www.unlu.edu.ar
- **Secretarías académicas**: Por carrera
- **Centros de estudiantes**: Por carrera
- **Área de Bienestar**: Para becas y servicios

### **Contactos Útiles**
- **Información general**: (02323) 420-400
- **Rectorado**: rectorado@unlu.edu.ar
- **Bienestar Estudiantil**: bienestar@unlu.edu.ar

---

## 🎯 Tipos de Información Prioritaria

### **Alta Prioridad** 🔴
- Fechas de inscripciones
- Horarios de cursada
- Contactos de secretarías
- Requisitos de ingreso
- Información de becas

### **Media Prioridad** 🟡
- Eventos próximos
- Servicios de biblioteca
- Actividades deportivas
- Trámites administrativos

### **Baja Prioridad** 🟢
- Información histórica
- Datos de contacto secundarios
- Servicios opcionales

---

## ❓ Preguntas Frecuentes

### **¿Puedo agregar información de mi carrera aunque no sea la oficial?**
Sí, pero siempre verifica con la secretaría académica antes de publicar.

### **¿Qué hago si encuentro información incorrecta?**
Actualízala directamente, pero menciona el cambio en tu Pull Request.

### **¿Puedo agregar eventos que no son oficiales de UNLu?**
Solo eventos relacionados con la universidad o sus estudiantes.

### **¿Cómo sé si mi información está actualizada?**
Verifica siempre con las fuentes oficiales antes de agregar.

---

## 🛠️ Herramientas Útiles

### **Editores Recomendados**
- **VS Code**: Con extensión de JavaScript
- **Sublime Text**: Con syntax highlighting
- **Atom**: Con paquetes de JavaScript

### **Validación de Datos**
- **Fechas**: Usa formato ISO (YYYY-MM-DD)
- **Teléfonos**: Incluye código de área y extensión
- **Emails**: Verifica que existan

---

## 📈 Métricas de Éxito

Tu colaboración será exitosa si:
- ✅ El chatbot responde correctamente a preguntas sobre tu área
- ✅ La información está actualizada y es precisa
- ✅ Otros estudiantes pueden encontrar lo que buscan
- ✅ Los datos siguen la estructura establecida

---

## 🎉 ¡Gracias por Colaborar!

Cada aporte que hagas ayuda a que Lujito sea más útil para toda la comunidad estudiantil UNLu. Tu trabajo hace que la información sea más accesible y actualizada para todos.

**¿Dudas?** Pregunta en el canal de Discord o crea un issue en GitHub.

**¡Vamos a hacer que Lujito sea el mejor asistente virtual de UNLu!** 🤖✨

---

*Última actualización: Enero 2025*
