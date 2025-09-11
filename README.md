# UNLujo - PWA

Una aplicación web progresiva (PWA) desarrollada con React y Node.js para la Comunidad Estudiantil de la Universidad Nacional de Luján.

## 🚀 Características

- **Dashboard Principal**: Vista general con noticias y acceso a las carreras
- **3 Carreras Disponibles**:
  - Licenciatura en Sistemas de Información
  - Licenciatura en Trabajo Social  
  - Licenciatura en Enfermería
- **Chatbot Integrado**: Asistente virtual para consultas de la comunidad
- **Diseño Responsivo**: Optimizado para móviles y desktop
- **PWA**: Instalable como aplicación nativa
- **Noticias**: Sección de noticias generales y por carrera
- **Conexión Estudiantil**: Espacio para conectar con compañeros de las diferentes carreras

## 🛠️ Tecnologías Utilizadas

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Lucide React (iconos)
- Axios

### Backend
- Node.js
- Express
- CORS
- Helmet (seguridad)
- Express Rate Limit

## 📦 Instalación

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd centro-estudiantes-unlujo
```

2. **Instalar dependencias**
```bash
npm run install-all
```

3. **Configurar variables de entorno**
```bash
# En la carpeta server, crear archivo .env
cd server
echo "PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/centro-estudiantes" > .env
```

4. **Ejecutar la aplicación**
```bash
# Desde la raíz del proyecto
npm run dev
```

Esto iniciará tanto el servidor backend (puerto 5000) como el frontend (puerto 3000).

## 🚀 Uso

1. **Acceder a la aplicación**: Abrir http://localhost:3000 en el navegador
2. **Navegar por las carreras**: Hacer clic en las tarjetas de carreras para ver detalles
3. **Usar el chatbot**: Hacer clic en el botón flotante en la esquina inferior derecha
4. **Leer noticias**: Scroll hacia abajo para ver la sección de noticias

## 📱 Instalación como PWA

1. Abrir la aplicación en Chrome/Edge
2. Hacer clic en el ícono de "Instalar" en la barra de direcciones
3. Confirmar la instalación
4. La aplicación se instalará como una app nativa

## 🏗️ Estructura del Proyecto

```
centro-estudiantes-unlujo/
├── client/                 # Aplicación React
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── sw.js          # Service Worker
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                # Backend Node.js
│   ├── index.js
│   └── package.json
└── package.json          # Scripts principales
```

## 🔧 Scripts Disponibles

- `npm run dev`: Ejecuta frontend y backend en modo desarrollo
- `npm run client`: Solo frontend
- `npm run server`: Solo backend
- `npm run build`: Construye la aplicación para producción
- `npm run install-all`: Instala todas las dependencias

## 🎨 Personalización

### Colores de las Carreras
Los colores se pueden modificar en `server/index.js` en la sección de carreras:
- LSI: Azul (#3B82F6)
- LTS: Verde (#10B981)  
- LE: Rojo (#EF4444)

### Noticias
Las noticias se pueden agregar/modificar en `server/index.js` en la ruta `/api/noticias`.

## 🤖 Chatbot

El chatbot incluye respuestas predefinidas para:
- Saludos
- Horarios de atención
- Información de carreras
- Datos de contacto

Se puede expandir agregando más respuestas en `server/index.js`.

## 📄 Licencia

MIT License - Ver archivo LICENSE para más detalles.

## 👥 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📞 Contacto

Centro de Estudiantes UNLuJo
- Email: centroestudiantes@unlujo.edu.ar
- Teléfono: (011) 1234-5678
