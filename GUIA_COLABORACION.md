# 🤝 Guía de Colaboración - UNLujo PWA

## 📋 Cómo Colaborar en el Proyecto

### **Para Nuevos Colaboradores**

#### 1. **Fork del Repositorio**
```bash
# 1. Ve a https://github.com/tu-usuario/unlujo-pwa
# 2. Haz clic en "Fork" (esquina superior derecha)
# 3. Clona tu fork localmente
git clone https://github.com/TU-USUARIO/unlujo-pwa.git
cd unlujo-pwa
```

#### 2. **Configurar Upstream**
```bash
# Agregar el repositorio original como upstream
git remote add upstream https://github.com/usuario-original/unlujo-pwa.git
git fetch upstream
```

#### 3. **Crear Branch para tu Módulo**
```bash
# Crear branch específico para tu módulo
git checkout -b feature/modulo-chatbot
# o
git checkout -b feature/modulo-noticias
# o
git checkout -b feature/modulo-dashboard
```

## 🏗️ **Estructura Modular del Proyecto**

```
unlujo-pwa/
├── client/
│   ├── src/
│   │   ├── modules/           # 📁 Módulos específicos
│   │   │   ├── chatbot/       # 🤖 Módulo de Chatbot
│   │   │   ├── noticias/      # 📰 Módulo de Noticias
│   │   │   ├── dashboard/     # 📊 Módulo de Dashboard
│   │   │   ├── carreras/      # 🎓 Módulo de Carreras
│   │   │   └── auth/          # 🔐 Módulo de Autenticación
│   │   ├── shared/            # 🔄 Componentes compartidos
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── utils/
│   │   │   └── constants/
│   │   ├── core/              # ⚙️ Funcionalidad core
│   │   │   ├── App.js
│   │   │   ├── App.css
│   │   │   └── index.js
│   │   └── data/              # 📊 Datos estáticos
│   └── public/
└── server/
```

## 🎯 **Asignación de Módulos**

### **Módulo: Chatbot** 🤖
- **Responsable**: [Nombre del colaborador]
- **Archivos**: `client/src/modules/chatbot/`
- **Componentes**: Chatbot.js, ChatInterface.js, MessageList.js
- **Funcionalidades**: 
  - Interfaz de chat
  - Procesamiento de mensajes
  - Integración con IA

### **Módulo: Noticias** 📰
- **Responsable**: [Nombre del colaborador]
- **Archivos**: `client/src/modules/noticias/`
- **Componentes**: NoticiasPage.js, NoticiasSection.js, NoticiaCard.js
- **Funcionalidades**:
  - Lista de noticias
  - Filtros y búsqueda
  - Detalles de noticia

### **Módulo: Dashboard** 📊
- **Responsable**: [Nombre del colaborador]
- **Archivos**: `client/src/modules/dashboard/`
- **Componentes**: Dashboard.js, StatsCard.js, QuickActions.js
- **Funcionalidades**:
  - Panel principal
  - Estadísticas
  - Acciones rápidas

### **Módulo: Carreras** 🎓
- **Responsable**: [Nombre del colaborador]
- **Archivos**: `client/src/modules/carreras/`
- **Componentes**: CarreraDetail.js, CarreraList.js, CarreraCard.js
- **Funcionalidades**:
  - Lista de carreras
  - Detalles de carrera
  - Filtros por facultad

## 🔄 **Flujo de Trabajo**

### **1. Antes de Empezar**
```bash
# Sincronizar con upstream
git fetch upstream
git checkout main
git merge upstream/main
```

### **2. Trabajar en tu Módulo**
```bash
# Crear/actualizar tu branch
git checkout -b feature/tu-modulo
# Trabajar en tu módulo específico
# Hacer commits descriptivos
git add .
git commit -m "feat(chatbot): agregar interfaz de chat básica"
```

### **3. Antes de Hacer Pull Request**
```bash
# Sincronizar con upstream
git fetch upstream
git merge upstream/main
# Resolver conflictos si los hay
# Hacer push de tu branch
git push origin feature/tu-modulo
```

### **4. Crear Pull Request**
- Ve a tu fork en GitHub
- Clic en "Compare & pull request"
- Describe los cambios realizados
- Asigna reviewers
- Espera aprobación y merge

## 📝 **Convenciones de Código**

### **Naming Convention**
```javascript
// Componentes: PascalCase
const ChatbotInterface = () => {};

// Archivos: camelCase
chatbotInterface.js

// Hooks: camelCase con prefijo 'use'
const useChatbot = () => {};

// Constantes: UPPER_SNAKE_CASE
const CHATBOT_CONFIG = {};
```

### **Estructura de Commits**
```bash
# Formato: tipo(scope): descripción
feat(chatbot): agregar interfaz de chat
fix(noticias): corregir filtro de fechas
docs(readme): actualizar guía de instalación
style(dashboard): mejorar responsive design
refactor(auth): simplificar lógica de login
```

### **Estructura de Archivos por Módulo**
```
modules/chatbot/
├── components/
│   ├── Chatbot.js
│   ├── MessageList.js
│   └── ChatInput.js
├── hooks/
│   └── useChatbot.js
├── utils/
│   └── messageUtils.js
├── constants/
│   └── chatConfig.js
└── index.js
```

## 🚀 **Setup Inicial para Colaboradores**

### **1. Instalar Dependencias**
```bash
# En la raíz del proyecto
npm run setup
# o
npm run install-all
```

### **2. Configurar Variables de Entorno**
```bash
# Crear archivo .env en client/
REACT_APP_API_URL=http://localhost:5000
REACT_APP_CHATBOT_API_KEY=tu_api_key
```

### **3. Ejecutar en Desarrollo**
```bash
# Terminal 1: Servidor
npm run server

# Terminal 2: Cliente
npm run client
```

## 📋 **Checklist para Pull Requests**

- [ ] Código sigue las convenciones establecidas
- [ ] Componentes están en su módulo correspondiente
- [ ] No hay console.logs en producción
- [ ] Responsive design funciona en móvil
- [ ] Tests pasan (si los hay)
- [ ] Documentación actualizada
- [ ] Commits descriptivos y atómicos

## 🆘 **Soporte y Comunicación**

- **Issues**: Usar GitHub Issues para bugs y features
- **Discusiones**: GitHub Discussions para preguntas generales
- **Código**: Comentarios en PR para feedback
- **Urgente**: [Tu método de contacto preferido]

## 📚 **Recursos Útiles**

- [Documentación React](https://reactjs.org/docs)
- [Guía de PWA](https://web.dev/progressive-web-apps/)
- [Convenciones de Git](https://www.conventionalcommits.org/)
- [Guía de Tailwind CSS](https://tailwindcss.com/docs)
