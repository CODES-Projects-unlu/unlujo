# 🎓 Guía para Colaborador - Dashboard de Carreras

## 👋 ¡Bienvenido al equipo!

Esta guía te ayudará a trabajar específicamente en el **módulo de carreras** del sistema UNLujo. Es un módulo perfecto para empezar porque es visual, tiene funcionalidad clara y no es demasiado complejo.

---

## 🎯 **¿Qué vas a desarrollar?**

### **Objetivo Principal:**
Crear un dashboard completo para cada carrera que incluya:
- **Información básica** de la carrera
- **Estadísticas** de estudiantes
- **Noticias específicas** de la carrera
- **Enlaces útiles** y recursos
- **Centro de estudiantes** (si existe)

### **Carreras Actuales:**
1. **Licenciatura en Sistemas de Información (LSI)** 💻
2. **Licenciatura en Trabajo Social (LTS)** 🤝  
3. **Licenciatura en Enfermería (LE)** 🏥

---

## 📁 **Estructura del Módulo**

```
client/src/modules/carreras/
├── components/
│   ├── CarreraDetail.js          # ✅ Ya existe - Página de detalle
│   ├── CarreraDashboard.js       # 🆕 Crear - Dashboard principal
│   ├── CarreraStats.js          # 🆕 Crear - Estadísticas
│   ├── CarreraNews.js           # 🆕 Crear - Noticias de la carrera
│   └── CarreraLinks.js          # 🆕 Crear - Enlaces útiles
├── hooks/
│   ├── useCarreraData.js        # 🆕 Crear - Hook para datos
│   └── useCarreraStats.js       # 🆕 Crear - Hook para estadísticas
├── utils/
│   ├── carreraUtils.js          # 🆕 Crear - Utilidades
│   └── constants.js             # 🆕 Crear - Constantes
└── index.js                     # ✅ Ya existe - Exportaciones
```

---

## 🚀 **Tareas Específicas para Empezar**

### **Fase 1: Crear el Dashboard Principal** (Semana 1)

#### **1.1 Crear `CarreraDashboard.js`**
```javascript
// Componente principal que mostrará:
// - Header con información básica
// - Estadísticas principales
// - Noticias recientes
// - Enlaces útiles
// - Centro de estudiantes (si existe)
```

#### **1.2 Crear `CarreraStats.js`**
```javascript
// Componente para mostrar:
// - Número de estudiantes activos
// - Materias disponibles
// - Profesores
// - Años de duración
// - Modalidad (presencial/remota)
```

#### **1.3 Crear `CarreraNews.js`**
```javascript
// Componente para mostrar:
// - Noticias específicas de la carrera
// - Eventos próximos
// - Anuncios importantes
// - Fechas de exámenes
```

### **Fase 2: Crear Hooks y Utilidades** (Semana 2)

#### **2.1 Crear `useCarreraData.js`**
```javascript
// Hook personalizado para:
// - Obtener datos de una carrera específica
// - Manejar estados de carga
// - Gestionar errores
```

#### **2.2 Crear `carreraUtils.js`**
```javascript
// Funciones utilitarias para:
// - Formatear nombres de carreras
// - Obtener colores por carrera
// - Calcular estadísticas
// - Validar datos
```

### **Fase 3: Integración y Mejoras** (Semana 3)

#### **3.1 Integrar con el sistema existente**
- Conectar con la API
- Agregar al routing
- Mejorar responsive design

#### **3.2 Agregar funcionalidades avanzadas**
- Filtros de noticias
- Búsqueda de información
- Enlaces dinámicos

---

## 📋 **Datos de Ejemplo para Trabajar**

### **Estructura de Datos de Carrera:**
```javascript
const carreraEjemplo = {
  id: 1,
  codigo: "LSI",
  nombre: "Licenciatura en Sistemas de Información",
  descripcion: "Carrera orientada al desarrollo de software y sistemas",
  color: "#3B82F6",
  duracion: "5 años",
  modalidad: "Presencial",
  sede: "Luján",
  titulo: "Licenciado en Sistemas de Información",
  estadisticas: {
    estudiantesActivos: 150,
    materias: 25,
    profesores: 12,
    egresados: 45
  },
  noticias: [
    {
      id: 1,
      titulo: "Nueva materia: Inteligencia Artificial",
      contenido: "Se incorpora IA como materia optativa...",
      fecha: "2025-01-15",
      tipo: "academico"
    }
  ],
  enlaces: [
    {
      nombre: "Plan de Estudios",
      url: "/plan-estudios",
      tipo: "academico"
    },
    {
      nombre: "Calendario Académico", 
      url: "/calendario",
      tipo: "academico"
    }
  ]
};
```

---

## 🛠️ **Setup Inicial**

### **1. Configurar tu entorno:**
```bash
# 1. Fork del repositorio
# 2. Clonar tu fork
git clone https://github.com/TU-USUARIO/unlujo-pwa.git
cd unlujo-pwa

# 3. Configurar upstream
git remote add upstream https://github.com/usuario-original/unlujo-pwa.git

# 4. Instalar dependencias
npm run setup
```

### **2. Crear tu branch:**
```bash
git checkout -b feature/dashboard-carreras
```

### **3. Ejecutar en desarrollo:**
```bash
# Terminal 1: Servidor
npm run server

# Terminal 2: Cliente  
npm run client
```

---

## 📝 **Convenciones de Código**

### **Naming Convention:**
```javascript
// Componentes: PascalCase
const CarreraDashboard = () => {};

// Archivos: PascalCase
CarreraDashboard.js

// Hooks: camelCase con prefijo 'use'
const useCarreraData = () => {};

// Constantes: UPPER_SNAKE_CASE
const CARRERA_COLORS = {};
```

### **Estructura de Commits:**
```bash
# Formato: tipo(scope): descripción
feat(carreras): agregar componente CarreraDashboard
fix(carreras): corregir responsive en CarreraStats
style(carreras): mejorar diseño de CarreraNews
docs(carreras): actualizar documentación del módulo
```

---

## 🎨 **Diseño y Estilo**

### **Colores por Carrera:**
- **LSI (Sistemas)**: Azul (#3B82F6)
- **LTS (Trabajo Social)**: Verde (#10B981)  
- **LE (Enfermería)**: Rojo (#EF4444)

### **Componentes de Diseño:**
- Usar **Tailwind CSS** para estilos
- Seguir el **diseño existente** del proyecto
- Mantener **consistencia visual**
- Asegurar **responsive design**

### **Iconos:**
- Usar **Lucide React** (ya instalado)
- Iconos apropiados para cada sección
- Mantener **tamaño consistente**

---

## 📋 **Checklist de Desarrollo**

### **Para cada componente:**
- [ ] Componente creado con estructura básica
- [ ] Props tipadas correctamente
- [ ] Estilos con Tailwind CSS
- [ ] Responsive design funcionando
- [ ] Iconos apropiados
- [ ] Manejo de estados de carga
- [ ] Manejo de errores

### **Para cada hook:**
- [ ] Hook creado con lógica clara
- [ ] Estados manejados correctamente
- [ ] Funciones utilitarias incluidas
- [ ] Documentación JSDoc
- [ ] Tests básicos (opcional)

### **Para cada archivo:**
- [ ] Imports organizados
- [ ] Exports correctos
- [ ] Comentarios descriptivos
- [ ] Código limpio y legible

---

## 🆘 **Recursos de Ayuda**

### **Documentación:**
- [React Docs](https://reactjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)

### **Archivos de Referencia:**
- `CarreraDetail.js` - Ejemplo de componente existente
- `client/src/shared/components/` - Componentes compartidos
- `client/src/modules/dashboard/` - Otro módulo de referencia

### **Comandos Útiles:**
```bash
# Ver cambios en tiempo real
npm run client

# Construir para producción
npm run build

# Verificar errores
npm run lint
```

---

## 🎯 **Primera Tarea Específica**

### **Crea tu primer componente:**

**Archivo:** `client/src/modules/carreras/components/CarreraDashboard.js`

**Objetivo:** Crear el dashboard principal que muestre:
1. Header con nombre y descripción de la carrera
2. Tarjetas con estadísticas básicas
3. Lista de noticias recientes
4. Enlaces útiles

**Estructura básica:**
```javascript
import React from 'react';

const CarreraDashboard = ({ carrera }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {carrera.nombre}
          </h1>
          <p className="text-gray-600 mt-2">
            {carrera.descripcion}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Aquí van las tarjetas de estadísticas */}
          {/* Aquí van las noticias */}
          {/* Aquí van los enlaces */}
        </div>
      </div>
    </div>
  );
};

export default CarreraDashboard;
```

---

## 🎉 **¡Empezar a Codear!**

1. **Lee esta guía completa**
2. **Configura tu entorno** siguiendo los pasos
3. **Crea tu primer componente** (CarreraDashboard.js)
4. **Haz commit** de tu progreso
5. **Pregunta** si tienes dudas

### **Recuerda:**
- No te preocupes por hacer todo perfecto al principio
- Es mejor hacer commits pequeños y frecuentes
- Pregunta cuando tengas dudas
- ¡Disfruta aprendiendo!

**¡Bienvenido al equipo y mucha suerte!** 🚀





