# 🚀 Inicio Rápido - UNLujo

## ✅ Instalación Completada

La aplicación PWA de UNLujo ya está configurada y lista para usar.

## 🎯 Cómo ejecutar la aplicación

### Opción 1: Ejecutar ambos servidores por separado (Recomendado)

**Terminal 1 - Servidor Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Cliente React:**
```bash
cd client
npm start
```

### Opción 2: Usar el script de Windows
```bash
npm run start-dev
```

## 🌐 Acceder a la aplicación

- **Frontend (React)**: http://localhost:3000
- **Backend (API)**: http://localhost:5000

## 📱 Funcionalidades disponibles

✅ **Dashboard principal** con noticias generales
✅ **3 Carreras de la comunidad**:
   - Licenciatura en Sistemas de Información (💻)
   - Licenciatura en Trabajo Social (🤝)
   - Licenciatura en Enfermería (🏥)
✅ **Chatbot funcional** (botón flotante)
✅ **PWA** - Instalable como app nativa
✅ **Diseño responsivo** para móviles
✅ **Conexión estudiantil** entre carreras

## 🔧 Comandos útiles

```bash
# Instalar todas las dependencias
npm run setup

# Solo backend
npm run server

# Solo frontend  
npm run client

# Construir para producción
npm run build
```

## 📱 Instalar como PWA

1. Abrir http://localhost:3000 en Chrome/Edge
2. Hacer clic en el ícono de "Instalar" en la barra de direcciones
3. Confirmar la instalación
4. ¡Listo! La app se instalará como aplicación nativa

## 🎨 Personalización

- **Colores de carreras**: Editar en `server/index.js`
- **Noticias**: Agregar en `server/index.js` en la ruta `/api/noticias`
- **Chatbot**: Expandir respuestas en `server/index.js` en la ruta `/api/chatbot`

¡La aplicación UNLujo está lista para usar! 🎉
