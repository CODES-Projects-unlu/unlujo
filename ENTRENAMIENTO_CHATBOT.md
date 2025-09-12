# 🤖 Guía de Entrenamiento del Chatbot Lujito

## 📋 Índice
1. [Introducción](#introducción)
2. [Configuración Inicial](#configuración-inicial)
3. [Fuentes de Datos](#fuentes-de-datos)
4. [Estructura de Datos](#estructura-de-datos)
5. [Implementación](#implementación)
6. [Mantenimiento](#mantenimiento)
7. [Testing y Validación](#testing-y-validación)

---

## 🎯 Introducción

Lujito es el asistente virtual de la comunidad estudiantil UNLu. Para que sea realmente útil, necesita estar entrenado con datos reales, actualizados y precisos sobre la universidad.

### 🎯 Objetivos del Entrenamiento
- **Información Académica**: Carreras, materias, horarios, fechas importantes
- **Servicios Universitarios**: Biblioteca, laboratorios, becas, trámites
- **Vida Estudiantil**: Eventos, actividades, centros de estudiantes
- **Información Administrativa**: Contactos, ubicaciones, procedimientos

---

## ⚙️ Configuración Inicial

### 1. **API Key de Gemini**
```bash
# En Vercel, configurar la variable de entorno:
REACT_APP_GEMINI_API_KEY=tu_api_key_aqui
```

### 2. **Estructura de Base de Conocimiento**
```
client/src/data/
├── knowledgeBase/
│   ├── academic.js          # Datos académicos
│   ├── services.js          # Servicios universitarios
│   ├── events.js            # Eventos y actividades
│   ├── contacts.js          # Contactos y ubicaciones
│   └── procedures.js        # Procedimientos y trámites
```

---

## 📚 Fuentes de Datos

### 🎓 **Datos Académicos**
- **Carreras disponibles**: LSI, Trabajo Social, Enfermería, etc.
- **Plan de estudios**: Materias por año y cuatrimestre
- **Horarios de cursada**: Por carrera y materia
- **Fechas importantes**: Inscripciones, exámenes, vacaciones
- **Requisitos de ingreso**: Documentación, exámenes

### 🏢 **Servicios Universitarios**
- **Biblioteca**: Horarios, servicios, catálogo
- **Laboratorios**: Disponibilidad, equipamiento, reservas
- **Becas**: Tipos, requisitos, fechas de postulación
- **Trámites**: Certificados, constancias, equivalencias
- **Deportes**: Actividades, horarios, instalaciones

### 📅 **Eventos y Actividades**
- **Eventos académicos**: Conferencias, workshops, seminarios
- **Actividades culturales**: Muestras, conciertos, exposiciones
- **Deportes**: Torneos, competencias, actividades recreativas
- **Centros de estudiantes**: Actividades, elecciones, servicios

### 📞 **Contactos y Ubicaciones**
- **Secretarías**: Por carrera y departamento
- **Administración**: Rectorado, decanatos, direcciones
- **Servicios**: Biblioteca, deportes, bienestar estudiantil
- **Ubicaciones**: Aulas, laboratorios, oficinas

---

## 🗂️ Estructura de Datos

### **Archivo: `academic.js`**
```javascript
export const academicData = {
  carreras: [
    {
      id: "lsi",
      nombre: "Licenciatura en Sistemas de Información",
      duracion: "5 años",
      modalidad: "Presencial",
      sede: "Luján",
      requisitos: [
        "Título secundario",
        "Examen de ingreso",
        "Documentación completa"
      ],
      materias: [
        {
          año: 1,
          cuatrimestre: 1,
          materias: [
            {
              codigo: "LSI-101",
              nombre: "Introducción a la Programación",
              creditos: 6,
              horarios: ["Lunes 18:00-22:00", "Miércoles 18:00-22:00"]
            }
          ]
        }
      ],
      fechasImportantes: [
        {
          evento: "Inscripciones 2025",
          fecha: "2025-02-01",
          descripcion: "Inscripción a materias del primer cuatrimestre"
        }
      ]
    }
  ],
  
  horarios: {
    "lsi": {
      "LSI-101": {
        dias: ["Lunes", "Miércoles"],
        horario: "18:00-22:00",
        aula: "Lab. 1",
        profesor: "Dr. Juan Pérez"
      }
    }
  }
};
```

### **Archivo: `services.js`**
```javascript
export const servicesData = {
  biblioteca: {
    horarios: {
      lunes_viernes: "08:00-22:00",
      sabados: "08:00-18:00",
      domingos: "14:00-20:00"
    },
    servicios: [
      "Préstamo de libros",
      "Sala de estudio",
      "Acceso a bases de datos",
      "Fotocopias"
    ],
    contacto: {
      telefono: "(02323) 420-400 int. 123",
      email: "biblioteca@unlu.edu.ar"
    }
  },
  
  becas: [
    {
      nombre: "Becas Estudiantiles Internas",
      descripcion: "Ayuda económica para estudiantes regulares",
      requisitos: [
        "Ser estudiante regular",
        "Rendir al menos 2 materias por año",
        "Situación socioeconómica desfavorable"
      ],
      monto: "Variable según situación",
      fechaApertura: "2025-03-01",
      fechaCierre: "2025-03-31"
    }
  ]
};
```

### **Archivo: `events.js`**
```javascript
export const eventsData = {
  proximos: [
    {
      id: "evento_001",
      titulo: "Workshop de Inteligencia Artificial",
      fecha: "2025-02-15",
      hora: "18:00",
      lugar: "Aula Magna",
      descripcion: "Charla sobre IA aplicada a la educación",
      organizador: "Carrera LSI",
      publico: "Estudiantes y docentes"
    }
  ],
  
  recurrentes: [
    {
      nombre: "Torneo de Fútbol Inter-carreras",
      frecuencia: "Anual",
      epoca: "Marzo-Abril",
      descripcion: "Competencia deportiva entre carreras"
    }
  ]
};
```

---

## 🔧 Implementación

### 1. **Crear Base de Conocimiento**
```javascript
// client/src/data/knowledgeBase/index.js
import { academicData } from './academic';
import { servicesData } from './services';
import { eventsData } from './events';
import { contactsData } from './contacts';
import { proceduresData } from './procedures';

export const knowledgeBase = {
  academic: academicData,
  services: servicesData,
  events: eventsData,
  contacts: contactsData,
  procedures: proceduresData
};
```

### 2. **Modificar el Chatbot**
```javascript
// En Chatbot.js, modificar getGeminiResponse
const getGeminiResponse = async (message) => {
  try {
    if (!process.env.REACT_APP_GEMINI_API_KEY) {
      return getFallbackResponse(message);
    }
    
    // Construir contexto con datos reales
    const context = buildContextFromKnowledgeBase();
    
    const prompt = `Eres Lujito, asistente virtual de UNLu.
    
CONTEXTO ACTUALIZADO:
${context}

INSTRUCCIONES:
- Responde basándote en la información real de UNLu
- Si no tienes la información, di "No tengo esa información actualizada"
- Mantén respuestas cortas y útiles
- Usa datos específicos cuando los tengas

Pregunta: ${message}`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    return getFallbackResponse(message);
  }
};
```

### 3. **Función de Contexto**
```javascript
const buildContextFromKnowledgeBase = () => {
  let context = "";
  
  // Agregar información académica
  context += "CARRERAS DISPONIBLES:\n";
  knowledgeBase.academic.carreras.forEach(carrera => {
    context += `- ${carrera.nombre} (${carrera.duracion})\n`;
  });
  
  // Agregar servicios
  context += "\nSERVICIOS:\n";
  context += `Biblioteca: ${knowledgeBase.services.biblioteca.horarios.lunes_viernes}\n`;
  
  // Agregar eventos próximos
  context += "\nPRÓXIMOS EVENTOS:\n";
  knowledgeBase.events.proximos.forEach(evento => {
    context += `- ${evento.titulo} (${evento.fecha})\n`;
  });
  
  return context;
};
```

---

## 🔄 Mantenimiento

### **Actualización Regular**
1. **Semanal**: Eventos y actividades
2. **Mensual**: Horarios y fechas importantes
3. **Cuatrimestral**: Planes de estudio y materias
4. **Anual**: Requisitos de ingreso y procedimientos

### **Proceso de Actualización**
```javascript
// Script de actualización automática
const updateKnowledgeBase = async () => {
  try {
    // Obtener datos actualizados de APIs o archivos
    const newData = await fetchUpdatedData();
    
    // Validar datos
    const validatedData = validateData(newData);
    
    // Actualizar base de conocimiento
    await updateKnowledgeBaseFiles(validatedData);
    
    // Notificar a administradores
    notifyAdmins('Base de conocimiento actualizada');
  } catch (error) {
    console.error('Error actualizando base de conocimiento:', error);
  }
};
```

---

## 🧪 Testing y Validación

### **Preguntas de Prueba**
```javascript
const testQuestions = [
  "¿Qué carreras hay en UNLu?",
  "¿Cuáles son los horarios de la biblioteca?",
  "¿Cuándo son las inscripciones?",
  "¿Dónde está la secretaría de LSI?",
  "¿Qué becas puedo solicitar?",
  "¿Hay eventos esta semana?",
  "¿Cómo hago un certificado de alumno regular?",
  "¿Cuáles son los requisitos para ingresar a LSI?"
];
```

### **Métricas de Calidad**
- **Precisión**: % de respuestas correctas
- **Relevancia**: % de respuestas útiles
- **Completitud**: % de preguntas respondidas
- **Tiempo de respuesta**: Latencia promedio

---

## 📊 Dashboard de Monitoreo

### **Métricas del Chatbot**
```javascript
const chatbotMetrics = {
  totalMessages: 0,
  successfulResponses: 0,
  fallbackResponses: 0,
  averageResponseTime: 0,
  mostAskedQuestions: [],
  userSatisfaction: 0
};
```

### **Preguntas Frecuentes**
- Implementar sistema de FAQ automático
- Identificar patrones en las consultas
- Mejorar respuestas basándose en feedback

---

## 🚀 Próximos Pasos

### **Fase 1: Datos Básicos** (1-2 semanas)
- [ ] Recopilar información académica básica
- [ ] Implementar estructura de base de conocimiento
- [ ] Crear respuestas de fallback mejoradas

### **Fase 2: Integración** (2-3 semanas)
- [ ] Conectar con APIs de UNLu (si existen)
- [ ] Implementar sistema de actualización automática
- [ ] Crear dashboard de monitoreo

### **Fase 3: Optimización** (1-2 semanas)
- [ ] Implementar machine learning para respuestas
- [ ] Crear sistema de feedback de usuarios
- [ ] Optimizar rendimiento y precisión

---

## 📞 Contactos para Datos

### **Fuentes Oficiales**
- **Secretaría Académica**: academic@unlu.edu.ar
- **Biblioteca**: biblioteca@unlu.edu.ar
- **Bienestar Estudiantil**: bienestar@unlu.edu.ar
- **Deportes**: deportes@unlu.edu.ar

### **Centros de Estudiantes**
- **CODES++ (LSI)**: codes.unlu@gmail.com
- **Centro de Trabajo Social**: cts.unlu@gmail.com
- **Centro de Enfermería**: ce.unlu@gmail.com

---

## 📝 Notas Importantes

1. **Privacidad**: No almacenar datos personales de usuarios
2. **Precisión**: Verificar información antes de publicar
3. **Actualización**: Mantener datos actualizados regularmente
4. **Backup**: Hacer respaldos de la base de conocimiento
5. **Testing**: Probar cambios en ambiente de desarrollo

---

*Esta guía te ayudará a crear un chatbot realmente útil para la comunidad estudiantil UNLu. ¡Lujito será el mejor asistente virtual! 🤖✨*
