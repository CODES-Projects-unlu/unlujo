# 🌐 UNLujo Community - Red Social Interna

## 📋 Descripción

UNLujo Community es una red social interna diseñada específicamente para la comunidad estudiantil de la Universidad Nacional de Luján. Permite a los estudiantes compartir experiencias, recursos, eventos y conectarse entre carreras.

## 🎯 Características Principales

### **📝 Mensajes Cortos**
- Máximo **280 caracteres** por post
- Formato similar a Twitter pero adaptado a la universidad
- Hashtags específicos para carreras y temas

### **🎓 Enfoque Universitario**
- **Posts por carrera** - Filtrar contenido por tu carrera
- **Eventos universitarios** - Compartir y descubrir eventos
- **Grupos de estudio** - Crear grupos por materia
- **Recursos académicos** - Compartir apuntes, enlaces útiles

### **👥 Comunidad Cerrada**
- Solo estudiantes de UNLujo
- Verificación por carrera
- Moderación de contenido
- Ambiente seguro y educativo

## 🏗️ Estructura del Módulo

```
social/
├── components/           # Componentes React
│   ├── SocialFeed.js    # Feed principal
│   ├── PostCard.js      # Tarjeta de post individual
│   ├── PostComposer.js  # Composer para crear posts
│   ├── PostDetail.js    # Vista detallada de post
│   ├── UserProfile.js   # Perfil de usuario
│   ├── GroupCard.js     # Tarjeta de grupo
│   └── EventCard.js     # Tarjeta de evento
├── hooks/               # Hooks personalizados
│   ├── useSocialFeed.js # Hook para el feed
│   ├── usePosts.js      # Hook para posts
│   ├── useGroups.js     # Hook para grupos
│   └── useEvents.js     # Hook para eventos
├── utils/               # Funciones utilitarias
│   ├── socialUtils.js   # Utilidades generales
│   ├── postUtils.js     # Utilidades para posts
│   └── validationUtils.js # Validaciones
├── constants/           # Constantes y configuración
│   └── socialConstants.js
├── data/               # Datos mock
│   └── socialData.js
└── index.js            # Exportaciones del módulo
```

## 🚀 Componentes Principales

### **SocialFeed**
Feed principal que muestra todos los posts de la comunidad.

**Características:**
- Lista infinita de posts
- Filtros por carrera, tipo, fecha
- Búsqueda en tiempo real
- Actualización automática

### **PostCard**
Tarjeta individual que muestra un post.

**Características:**
- Información del autor
- Contenido del post
- Reacciones (me gusta, útil, importante)
- Comentarios
- Compartir

### **PostComposer**
Editor para crear nuevos posts.

**Características:**
- Contador de caracteres (280 máximo)
- Sugerencias de hashtags
- Adjuntar imágenes
- Seleccionar tipo de post
- Vista previa

## 🎨 Tipos de Posts

### **📚 Académico**
- Apuntes y resúmenes
- Dudas sobre materias
- Recursos de estudio
- Hashtags: #Apuntes #Resumen #Dudas

### **🎉 Eventos**
- Eventos universitarios
- Fiestas de estudiantes
- Actividades culturales
- Hashtags: #Eventos #Fiesta #Cultural

### **💼 Profesional**
- Oportunidades laborales
- Pasantías
- Networking
- Hashtags: #Trabajo #Pasantia #Networking

### **🤝 Social**
- Conocer gente
- Grupos de estudio
- Actividades recreativas
- Hashtags: #Amigos #Estudio #Recreativo

## 🏷️ Sistema de Hashtags

### **Por Carrera:**
- `#LSI` - Sistemas de Información
- `#LTS` - Trabajo Social
- `#LE` - Enfermería

### **Por Tipo:**
- `#Apuntes` - Recursos académicos
- `#Eventos` - Eventos universitarios
- `#Dudas` - Preguntas académicas
- `#GrupoEstudio` - Grupos de estudio

### **Por Materia:**
- `#Programacion` - Programación
- `#Matematica` - Matemática
- `#Ingles` - Inglés

## 👤 Perfiles de Usuario

### **Información Básica:**
- Nombre y apellido
- Carrera
- Año de cursada
- Foto de perfil
- Bio (máximo 160 caracteres)

### **Estadísticas:**
- Posts publicados
- Seguidores
- Siguiendo
- Puntos de reputación

## 🎯 Funcionalidades Especiales

### **Grupos de Estudio**
- Crear grupos por materia
- Invitar compañeros
- Compartir recursos
- Organizar reuniones

### **Eventos**
- Crear eventos universitarios
- Invitar asistentes
- Compartir detalles
- Recordatorios automáticos

### **Sistema de Reputación**
- Puntos por posts útiles
- Puntos por ayudar a otros
- Niveles de reputación
- Badges especiales

## 📱 Responsive Design

- **Móvil**: Feed vertical, navegación inferior
- **Tablet**: Feed de 2 columnas, sidebar
- **Desktop**: Feed de 3 columnas, sidebar completo

## 🔒 Moderación

### **Contenido Permitido:**
- Temas académicos
- Eventos universitarios
- Recursos de estudio
- Discusiones constructivas

### **Contenido Prohibido:**
- Spam
- Contenido inapropiado
- Acoso
- Información personal sensible

## 🚀 Próximas Funcionalidades

- [ ] Notificaciones push
- [ ] Chat directo
- [ ] Stories (24 horas)
- [ ] Integración con calendario
- [ ] API para móvil nativo

---

**¡Conecta, comparte y aprende con tu comunidad universitaria!** 🎓✨
