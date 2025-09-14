const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { query, testConnection } = require('./database');
const Joi = require('joi');
const { 
  loginSchema, 
  registerSchema, 
  generateToken, 
  hashPassword, 
  verifyPassword, 
  authenticateToken, 
  requireRole 
} = require('./auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de multer para subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads', 'profiles');
    // Crear directorio si no existe
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generar nombre único para el archivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `profile-${req.user.id}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB máximo
  },
  fileFilter: (req, file, cb) => {
    // Solo permitir imágenes
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen'), false);
    }
  }
});

// Middleware de seguridad
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "blob:"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
}));
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://127.0.0.1:3000',
    'https://unlujo.vercel.app',
    'https://unlujo-rizzofs-projects.vercel.app',
    'https://unlujo-git-master-rizzofs-projects.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

// Endpoint específico para servir imágenes de perfil
app.get('/api/uploads/profiles/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, 'uploads', 'profiles', filename);
  
  // Verificar que el archivo existe
  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ error: 'Imagen no encontrada' });
  }
  
  // Configurar headers CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Content-Type', 'image/jpeg');
  
  // Enviar el archivo
  res.sendFile(imagePath);
});

// Servir archivos estáticos (fotos de perfil) con CORS habilitado
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}, express.static(path.join(__dirname, 'uploads')));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de 100 requests por IP
});
app.use(limiter);

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  if (req.path === '/api/auth/register') {
    console.log('🔍 Petición de registro detectada');
  }
  next();
});

// Rutas
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'UNLujo - Comunidad Estudiantil UNLu',
    version: '1.0.0',
    colors: {
      primary: '#3B82F6', // Azul
      secondary: '#F97316', // Naranja
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #F97316 100%)'
    }
  });
});

// Endpoint de prueba
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString(),
    carreras: 'Disponible en /api/carreras',
    noticias: 'Disponible en /api/noticias'
  });
});

// Endpoint de prueba POST
app.post('/api/test-post', (req, res) => {
  console.log('🧪 ENDPOINT DE PRUEBA POST LLAMADO');
  console.log('📝 Datos recibidos:', req.body);
  res.json({ 
    message: 'POST funcionando correctamente',
    data: req.body,
    timestamp: new Date().toISOString()
  });
});

// Endpoint de registro de prueba
app.post('/api/auth/register-test', (req, res) => {
  console.log('🚀 REGISTRO DE PRUEBA LLAMADO');
  console.log('📝 Datos recibidos:', req.body);
  res.json({ 
    success: true,
    message: 'Registro de prueba funcionando',
    data: req.body
  });
});

// Página de inicio del servidor
app.get('/', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>UNLujo - API Server</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #3B82F6 0%, #F97316 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                padding: 0;
                margin: 0;
            }
            
            @media (max-width: 768px) {
                body {
                    align-items: flex-start;
                    padding-top: 1rem;
                }
            }
            
            .container {
                text-align: center;
                max-width: 800px;
                padding: 1rem;
                margin: 1rem;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            }
            
            @media (max-width: 768px) {
                .container {
                    margin: 0.5rem;
                    padding: 1rem;
                    border-radius: 15px;
                }
            }
            
            .logo {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 2rem;
                flex-wrap: wrap;
            }
            
            .logo-icon {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #3B82F6 0%, #F97316 100%);
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 1rem;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            }
            
            .logo-text {
                font-size: 3rem;
                font-weight: bold;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            }
            
            @media (max-width: 768px) {
                .logo {
                    flex-direction: column;
                    margin-bottom: 1.5rem;
                }
                
                .logo-icon {
                    width: 60px;
                    height: 60px;
                    margin-right: 0;
                    margin-bottom: 1rem;
                    font-size: 1.5rem;
                }
                
                .logo-text {
                    font-size: 2rem;
                }
            }
            
            @media (max-width: 480px) {
                .logo-text {
                    font-size: 1.5rem;
                }
                
                .logo-icon {
                    width: 50px;
                    height: 50px;
                    font-size: 1.2rem;
                }
            }
            
            .logo-text .un {
                color: #60A5FA;
            }
            
            .logo-text .lu {
                background: linear-gradient(45deg, #60A5FA, #FB923C);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .logo-text .jo {
                color: #FB923C;
            }
            
            h1 {
                font-size: 2.5rem;
                margin-bottom: 1rem;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            }
            
            .subtitle {
                font-size: 1.2rem;
                margin-bottom: 2rem;
                opacity: 0.9;
            }
            
            @media (max-width: 768px) {
                h1 {
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                }
                
                .subtitle {
                    font-size: 1rem;
                    margin-bottom: 1.5rem;
                }
            }
            
            @media (max-width: 480px) {
                h1 {
                    font-size: 1.5rem;
                }
                
                .subtitle {
                    font-size: 0.9rem;
                }
            }
            
            .status {
                background: rgba(255, 255, 255, 0.2);
                padding: 1rem;
                border-radius: 10px;
                margin: 2rem 0;
                border-left: 4px solid #10B981;
            }
            
            .endpoints {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1rem;
                margin: 2rem 0;
            }
            
            .endpoint {
                background: rgba(255, 255, 255, 0.1);
                padding: 1.5rem;
                border-radius: 15px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            @media (max-width: 768px) {
                .endpoints {
                    grid-template-columns: 1fr;
                    gap: 0.75rem;
                    margin: 1.5rem 0;
                }
                
                .endpoint {
                    padding: 1rem;
                    border-radius: 10px;
                }
            }
            
            @media (max-width: 480px) {
                .endpoints {
                    margin: 1rem 0;
                }
                
                .endpoint {
                    padding: 0.75rem;
                }
            }
            
            .endpoint:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            }
            
            .endpoint h3 {
                color: #FBBF24;
                margin-bottom: 0.5rem;
                font-size: 1.1rem;
            }
            
            .endpoint p {
                font-size: 0.9rem;
                opacity: 0.8;
                margin-bottom: 0.5rem;
            }
            
            @media (max-width: 768px) {
                .endpoint h3 {
                    font-size: 1rem;
                }
                
                .endpoint p {
                    font-size: 0.8rem;
                }
            }
            
            @media (max-width: 480px) {
                .endpoint h3 {
                    font-size: 0.9rem;
                }
                
                .endpoint p {
                    font-size: 0.75rem;
                }
            }
            
            .method {
                display: inline-block;
                padding: 0.25rem 0.75rem;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: bold;
                margin-right: 0.5rem;
            }
            
            @media (max-width: 480px) {
                .method {
                    font-size: 0.7rem;
                    padding: 0.2rem 0.5rem;
                }
            }
            
            .get { background: #10B981; }
            .post { background: #F59E0B; }
            
            .footer {
                margin-top: 2rem;
                padding-top: 2rem;
                border-top: 1px solid rgba(255, 255, 255, 0.2);
                opacity: 0.8;
            }
            
            @media (max-width: 768px) {
                .footer {
                    margin-top: 1.5rem;
                    padding-top: 1.5rem;
                    font-size: 0.9rem;
                }
            }
            
            @media (max-width: 480px) {
                .footer {
                    margin-top: 1rem;
                    padding-top: 1rem;
                    font-size: 0.8rem;
                }
            }
            
            .pulse {
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }
            
            .floating {
                animation: floating 3s ease-in-out infinite;
            }
            
            @keyframes floating {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
            
            .glow {
                animation: glow 2s ease-in-out infinite alternate;
            }
            
            @keyframes glow {
                from { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
                to { box-shadow: 0 0 30px rgba(249, 115, 22, 0.5); }
            }
            
            .color-demo {
                display: flex;
                justify-content: center;
                gap: 1rem;
                margin: 1rem 0;
                flex-wrap: wrap;
            }
            
            .color-box {
                width: 40px;
                height: 40px;
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                transition: transform 0.3s ease;
            }
            
            .color-box:hover {
                transform: scale(1.1);
            }
            
            .gradient-demo {
                width: 100%;
                height: 20px;
                background: linear-gradient(135deg, #3B82F6 0%, #F97316 100%);
                border-radius: 10px;
                margin: 1rem 0;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            }
            
            @media (max-width: 768px) {
                .color-demo {
                    gap: 0.75rem;
                    margin: 0.75rem 0;
                }
                
                .color-box {
                    width: 35px;
                    height: 35px;
                }
                
                .gradient-demo {
                    height: 15px;
                    margin: 0.75rem 0;
                }
            }
            
            @media (max-width: 480px) {
                .color-demo {
                    gap: 0.5rem;
                    margin: 0.5rem 0;
                }
                
                .color-box {
                    width: 30px;
                    height: 30px;
                }
                
                .gradient-demo {
                    height: 12px;
                    margin: 0.5rem 0;
                }
            }
            
            /* Mejoras adicionales para móviles */
            @media (max-width: 768px) {
                .status {
                    padding: 0.75rem;
                    margin: 1rem 0;
                }
                
                .status h3 {
                    font-size: 1rem;
                }
                
                .status p {
                    font-size: 0.85rem;
                }
            }
            
            @media (max-width: 480px) {
                .status {
                    padding: 0.5rem;
                    margin: 0.75rem 0;
                }
                
                .status h3 {
                    font-size: 0.9rem;
                }
                
                .status p {
                    font-size: 0.8rem;
                }
            }
            
            /* Mejorar la experiencia táctil */
            .endpoint {
                cursor: pointer;
                -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1);
            }
            
            .color-box {
                -webkit-tap-highlight-color: transparent;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">
                <div class="logo-icon floating">
                    🎓
                </div>
                <div class="logo-text">
                    <span class="un">Un</span><span class="lu">Lu</span><span class="jo">jo</span>
                </div>
            </div>
            
            <h1>API Server</h1>
            <p class="subtitle">Comunidad Estudiantil UNLu</p>
            
            <div class="color-demo">
                <div class="color-box" style="background: #3B82F6;" title="Azul UNLujo"></div>
                <div class="color-box" style="background: #F97316;" title="Naranja UNLujo"></div>
                <div class="color-box" style="background: linear-gradient(135deg, #3B82F6 0%, #F97316 100%);" title="Gradiente UNLujo"></div>
            </div>
            
            <div class="gradient-demo"></div>
            
            <div class="status glow">
                <h3>🟢 Servidor Activo</h3>
                <p>Puerto: ${process.env.PORT || 5000}</p>
                <p>Entorno: ${process.env.NODE_ENV || 'development'}</p>
            </div>
            
            <div class="endpoints">
                <div class="endpoint">
                    <h3>📊 Estado del Servidor</h3>
                    <p><span class="method get">GET</span>/api/health</p>
                    <p>Información del servidor y estado</p>
                </div>
                
                <div class="endpoint">
                    <h3>📰 Noticias</h3>
                    <p><span class="method get">GET</span>/api/noticias</p>
                    <p>Obtener noticias generales</p>
                </div>
                
                <div class="endpoint">
                    <h3>🎓 Carreras</h3>
                    <p><span class="method get">GET</span>/api/carreras</p>
                    <p>Información de las 3 carreras</p>
                </div>
                
                <div class="endpoint">
                    <h3>🤖 Chatbot</h3>
                    <p><span class="method post">POST</span>/api/chatbot</p>
                    <p>Interactuar con Lujito</p>
                </div>
                
                <div class="endpoint">
                    <h3>🎨 Branding</h3>
                    <p><span class="method get">GET</span>/api/branding</p>
                    <p>Paleta de colores y identidad</p>
                </div>
                
                <div class="endpoint">
                    <h3>📈 Estadísticas</h3>
                    <p><span class="method get">GET</span>/api/stats</p>
                    <p>Métricas del servidor</p>
                </div>
            </div>
            
            <div class="footer">
                <p>Desarrollado con ❤️ para la Comunidad Estudiantil UNLu</p>
                <p>Universidad Nacional de Luján</p>
            </div>
        </div>
    </body>
    </html>
  `;
  res.send(html);
});

// Rutas de noticias
app.get('/api/noticias', (req, res) => {
  console.log('📰 Solicitud de noticias recibida');
  const noticias = [
    {
      id: 1,
      titulo: "Elecciones Generales UNLu 2025",
      contenido: "El Consejo Superior convocó a elecciones generales de la Universidad para el día 12 de noviembre de 2025 para elegir fórmulas de candidatos/as a Rector/a y Vicerrector/a.",
      fecha: "2025-01-15",
      categoria: "institucional",
      imagen: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop&crop=center"
    },
    {
      id: 2,
      titulo: "Becas Estudiantiles Internas 2026",
      contenido: "Hasta el 12 de octubre próximo se encuentra abierta la inscripción de aspirantes a Becas Estudiantiles Internas 2026.",
      fecha: "2025-01-12",
      categoria: "académico",
      imagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&crop=center"
    },
    {
      id: 3,
      titulo: "Workshop SIED III en la UNLu",
      contenido: "La UNLu será sede del Workshop SIED III sobre 'Debates, perspectivas y desafíos de los modelos de gestión en los sistemas institucionales de educación a distancia'.",
      fecha: "2025-01-10",
      categoria: "académico",
      imagen: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop&crop=center"
    },
    {
      id: 4,
      titulo: "2° Encuentro por los Derechos de los Niños",
      contenido: "Se realizará en la UNLu el 18 y 19 de septiembre el Segundo Encuentro Regional por los Derechos de los Niños, Niñas y Adolescentes.",
      fecha: "2025-01-08",
      categoria: "eventos",
      imagen: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop&crop=center"
    },
    {
      id: 5,
      titulo: "Encuesta de factores de riesgo",
      contenido: "El miércoles 24 de septiembre se realizará la actividad extracurricular 'Encuesta y medición de factores de riesgo de la población de la Universidad Nacional de Luján'.",
      fecha: "2025-01-05",
      categoria: "salud",
      imagen: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop&crop=center"
    },
    {
      id: 6,
      titulo: "Cursos de posgrado disponibles",
      contenido: "Se encuentran abiertas las inscripciones al Curso de Posgrado 'Abordaje integral de la discapacidad' a cargo de la Esp. Marcela Bel.",
      fecha: "2025-01-03",
      categoria: "académico",
      imagen: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop&crop=center"
    }
  ];
  res.json(noticias);
});

// Rutas de carreras
app.get('/api/carreras', (req, res) => {
  console.log('🎓 Solicitud de carreras recibida');
  const carreras = [
    {
      id: 1,
      nombre: "Lic. en Sistemas de Información",
      codigo: "LSI",
      descripcion: "Formación integral en tecnologías de la información, desarrollo de software y sistemas computacionales para el mundo digital.",
      color: "#3B82F6",
      icono: "💻",
      noticias: [
        {
          id: 1,
          titulo: "Nuevo laboratorio de programación",
          contenido: "Se inauguró el nuevo laboratorio con equipos de última generación.",
          fecha: "2024-01-12"
        }
      ]
    },
    {
      id: 2,
      nombre: "Lic. en Trabajo Social",
      codigo: "LTS",
      descripcion: "Formación profesional para la intervención social, comunitaria y promoción del bienestar social en diversos contextos.",
      color: "#10B981",
      icono: "🤝",
      noticias: [
        {
          id: 2,
          titulo: "Práctica profesional en barrios",
          contenido: "Inicio de las prácticas profesionales en diferentes barrios de la ciudad.",
          fecha: "2024-01-14"
        }
      ]
    },
    {
      id: 3,
      nombre: "Lic. en Enfermería",
      codigo: "LE",
      descripcion: "Formación científica y humanística para el cuidado integral de la salud, promoción y prevención en salud.",
      color: "#EF4444",
      icono: "🏥",
      noticias: [
        {
          id: 3,
          titulo: "Simulacros de emergencia médica",
          contenido: "Próximos simulacros de emergencia en el hospital escuela.",
          fecha: "2024-01-16"
        }
      ]
    }
  ];
  res.json(carreras);
});

// Ruta para el chatbot (placeholder)
app.post('/api/chatbot', (req, res) => {
  const { mensaje } = req.body;
  
  // Respuestas robóticas del chatbot
  const respuestas = {
    
    'hola': '🤖 ¡Saludos! Lujito aquí, tu robot asistente. ¿Cómo puedo ayudarte hoy?',
    'horarios': '🤖 Analizando base de datos... Los horarios de atención son de lunes a viernes de 8:00 a 18:00 hs.',
    'carreras': '🤖 Procesando información... Tenemos 3 carreras: Lic. en Sistemas de Información, Lic. en Trabajo Social y Lic. en Enfermería.',
    'contacto': '🤖 Consultando directorio... Puedes contactarnos por email: comunidad@unlujo.edu.ar o por teléfono: (011) 1234-5678',
    'comunidad': '🤖 Accediendo a información de comunidad... Somos UNLujo, una comunidad estudiantil que busca conectar, informar y apoyar a todos los estudiantes de la UNLu.',
    'unlu': '🤖 Procesando datos institucionales... La Universidad Nacional de Luján es nuestra casa de estudios donde desarrollamos nuestras carreras.',
    'unlujo': '🤖 ¡Sí! UNLujo es nuestra comunidad estudiantil de la Universidad Nacional de Luján. ¡Bienvenido!',
    'lujito': '🤖 ¡Ese soy yo! Lujito, tu robot asistente de UNLujo. ¿En qué puedo asistirte?',
    'ayuda': '🤖 Sistema de ayuda activado. Puedo ayudarte con información sobre horarios, carreras, contacto y más. ¡Usa los botones de abajo o escribe tu pregunta!',
    'robot': '🤖 ¡Sí! Soy Lujito, tu robot asistente. Estoy programado para ayudarte con cualquier consulta sobre UNLujo. ¿En qué puedo asistirte?'
  };

  const respuesta = respuestas[mensaje.toLowerCase()] || 
    '🤖 Procesando consulta... Aunque no tengo esa información específica en mi base de datos, puedo ayudarte con información sobre carreras, noticias o eventos. ¿Hay algo más en lo que pueda asistirte?';

  res.json({ respuesta });
});

// Ruta para información de colores y branding
app.get('/api/branding', (req, res) => {
  res.json({
    name: "UNLujo",
    description: "Comunidad Estudiantil UNLu",
    university: "Universidad Nacional de Luján",
    colors: {
      primary: {
        name: "Azul UNLujo",
        hex: "#3B82F6",
        rgb: "59, 130, 246",
        usage: "Color principal, elementos destacados"
      },
      secondary: {
        name: "Naranja UNLujo", 
        hex: "#F97316",
        rgb: "249, 115, 22",
        usage: "Acentos, botones, elementos interactivos"
      },
      gradient: {
        name: "Gradiente UNLujo",
        css: "linear-gradient(135deg, #3B82F6 0%, #F97316 100%)",
        usage: "Fondos, logos, elementos decorativos"
      },
      variations: {
        lightBlue: "#60A5FA",
        lightOrange: "#FB923C",
        darkBlue: "#1D4ED8",
        darkOrange: "#EA580C"
      }
    },
    typography: {
      primary: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      weights: ["400", "500", "600", "700", "800"]
    },
    logo: {
      concept: "Logo universitario con gradiente azul-naranja",
      elements: ["Un (Azul)", "Lu (Gradiente)", "Jo (Naranja)"],
      icon: "🎓 (Gorro de graduación)"
    }
  });
});

// Ruta para estadísticas del servidor
app.get('/api/stats', (req, res) => {
  res.json({
    server: {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      platform: process.platform,
      nodeVersion: process.version
    },
    endpoints: {
      total: 10,
      active: 10,
      lastUpdated: new Date().toISOString()
    },
    features: [
      "PWA Support",
      "Real-time Chatbot",
      "Responsive Design", 
      "Auto-scroll Chat",
      "Quick Replies",
      "University Branding",
      "User Authentication",
      "Database Integration"
    ]
  });
});

// =====================================================
// ENDPOINTS DE AUTENTICACIÓN
// =====================================================

// Endpoint de registro de usuario
app.post('/api/auth/register', async (req, res) => {
  console.log('🚀 ENDPOINT DE REGISTRO LLAMADO');
  console.log('📝 Registro recibido:', req.body);
  console.log('📝 Headers:', req.headers);
  console.log('📝 Content-Type:', req.get('Content-Type'));
  try {
    
    // Validar datos de entrada
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      console.log('❌ Errores de validación:', error.details);
      return res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: error.details.map(detail => detail.message)
      });
    }

    const { nombre, apellido, email, password, telefono, dni, carrera_id, anio_ingreso } = value;

    // Verificar si el email ya existe
    const existingEmail = await query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );
    
    if (existingEmail.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'El email ya está registrado'
      });
    }

    // Verificar si el DNI ya existe
    const existingDni = await query(
      'SELECT id FROM users WHERE dni = $1',
      [dni]
    );
    
    if (existingDni.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'El DNI ya está registrado'
      });
    }

    // Verificar que la carrera existe
    const carrera = await query(
      'SELECT id, nombre FROM careers WHERE id = $1 AND estado = $2',
      [carrera_id, 'active']
    );
    
    if (carrera.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'La carrera seleccionada no existe o no está activa'
      });
    }

    // Generar salt para la contraseña
    const salt = require('crypto').randomBytes(32).toString('hex');
    const passwordHash = await hashPassword(password, salt);

    // Crear usuario
    const result = await query(
      `INSERT INTO users (nombre, apellido, email, telefono, dni, carrera_id, año_ingreso, password_hash, salt, rol, estado, email_verificado)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING id, nombre, apellido, email, rol, carrera_id, email_verificado, fecha_creacion`,
      [nombre, apellido, email, telefono, dni, carrera_id, anio_ingreso, passwordHash, salt, 'estudiante', 'Activo', false]
    );

    const newUser = result.rows[0];

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      user: {
        id: newUser.id,
        nombre: newUser.nombre,
        apellido: newUser.apellido,
        email: newUser.email,
        rol: newUser.rol,
        carrera_id: newUser.carrera_id,
        email_verificado: newUser.email_verificado,
        fecha_creacion: newUser.fecha_creacion
      }
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
  console.log('🏁 FIN DEL ENDPOINT DE REGISTRO');
});

// Endpoint de login
app.post('/api/auth/login', async (req, res) => {
  try {
    console.log('🔐 Login recibido:', req.body);
    
    // Validar datos de entrada
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: error.details.map(detail => detail.message)
      });
    }

    const { email, password } = value;

    // Buscar usuario por email
    const result = await query(
      `SELECT u.*, c.nombre as carrera_nombre, c.sigla as carrera_sigla
       FROM users u 
       JOIN careers c ON u.carrera_id = c.id 
       WHERE u.email = $1 AND u.estado = $2`,
      [email, 'Activo']
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales incorrectas'
      });
    }

    const user = result.rows[0];

    // Verificar contraseña
    const isValidPassword = await verifyPassword(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales incorrectas'
      });
    }

    // Verificar si la cuenta está bloqueada
    if (user.bloqueado_hasta && new Date(user.bloqueado_hasta) > new Date()) {
      return res.status(423).json({
        success: false,
        message: 'Cuenta bloqueada temporalmente por intentos fallidos'
      });
    }

    // Generar token JWT
    const token = generateToken(user);

    // Actualizar último acceso
    await query(
      'UPDATE users SET fecha_ultimo_acceso = NOW() WHERE id = $1',
      [user.id]
    );

    // Resetear intentos fallidos si existían
    if (user.intentos_fallidos > 0) {
      await query(
        'UPDATE users SET intentos_fallidos = 0, bloqueado_hasta = NULL WHERE id = $1',
        [user.id]
      );
    }

    res.json({
      success: true,
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol: user.rol,
        carrera_id: user.carrera_id,
        carrera_nombre: user.carrera_nombre,
        carrera_sigla: user.carrera_sigla,
        email_verificado: user.email_verificado,
        foto: user.foto
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// Endpoint para obtener perfil del usuario autenticado
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const result = await query(
      `SELECT u.*, c.nombre as carrera_nombre, c.sigla as carrera_sigla
       FROM users u 
       JOIN careers c ON u.carrera_id = c.id 
       WHERE u.id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    const user = result.rows[0];

    res.json({
      success: true,
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        telefono: user.telefono,
        foto: user.foto,
        dni: user.dni,
        rol: user.rol,
        carrera_id: user.carrera_id,
        carrera_nombre: user.carrera_nombre,
        carrera_sigla: user.carrera_sigla,
        año_ingreso: user.año_ingreso,
        estado_academico: user.estado_academico,
        email_verificado: user.email_verificado,
        fecha_creacion: user.fecha_creacion,
        fecha_nacimiento: user.fecha_nacimiento,
        fecha_ultimo_acceso: user.fecha_ultimo_acceso
      }
    });

  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// Endpoint para actualizar perfil del usuario
app.put('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    console.log('📝 Actualización de perfil recibida:', req.body);
    console.log('📝 Fecha de nacimiento recibida:', req.body.fecha_nacimiento);
    
    // Validar datos de entrada
    const updateSchema = Joi.object({
      nombre: Joi.string().min(2).max(100).optional().messages({
        'string.min': 'El nombre debe tener al menos 2 caracteres',
        'string.max': 'El nombre no puede tener más de 100 caracteres'
      }),
      apellido: Joi.string().min(2).max(100).optional().messages({
        'string.min': 'El apellido debe tener al menos 2 caracteres',
        'string.max': 'El apellido no puede tener más de 100 caracteres'
      }),
      email: Joi.string().email().optional().messages({
        'string.email': 'El email debe tener un formato válido'
      }),
      telefono: Joi.string().pattern(/^[0-9+\-\s()]+$/).optional().allow('').messages({
        'string.pattern.base': 'El teléfono debe contener solo números, espacios, guiones y paréntesis'
      }),
      fecha_nacimiento: Joi.string().optional().allow('', null).messages({
        'string.base': 'La fecha de nacimiento debe ser una cadena de texto'
      }),
      dni: Joi.string().pattern(/^[0-9]{7,8}$/).optional().allow('').messages({
        'string.pattern.base': 'El DNI debe tener entre 7 y 8 dígitos'
      }),
      estado_academico: Joi.string().valid('Activo', 'Inactivo', 'Egresado', 'Abandonó').optional().messages({
        'any.only': 'El estado académico debe ser uno de: Activo, Inactivo, Egresado, Abandonó'
      })
    });

    const { error, value } = updateSchema.validate(req.body);
    if (error) {
      console.log('❌ Errores de validación:', error.details);
      console.log('❌ Datos que fallaron la validación:', req.body);
      return res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: error.details.map(detail => detail.message)
      });
    }

    const { nombre, apellido, email, telefono, fecha_nacimiento, dni, estado_academico } = value;
    
    console.log('📝 Datos extraídos después de validación:');
    console.log('📝 - fecha_nacimiento:', fecha_nacimiento);
    console.log('📝 - dni:', dni);
    console.log('📝 - estado_academico:', estado_academico);

    // Verificar si el email ya existe en otro usuario
    if (email) {
      const existingEmail = await query(
        'SELECT id FROM users WHERE email = $1 AND id != $2',
        [email, req.user.id]
      );

      if (existingEmail.rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'El email ya está registrado por otro usuario'
        });
      }
    }

    // Verificar si el DNI ya existe en otro usuario
    if (dni && dni.trim() !== '') {
      const existingDni = await query(
        'SELECT id FROM users WHERE dni = $1 AND id != $2',
        [dni, req.user.id]
      );

      if (existingDni.rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'El DNI ya está registrado por otro usuario'
        });
      }
    }

    // Construir la consulta de actualización dinámicamente
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (nombre !== undefined) {
      updates.push(`nombre = $${paramCount}`);
      values.push(nombre);
      paramCount++;
    }

    if (apellido !== undefined) {
      updates.push(`apellido = $${paramCount}`);
      values.push(apellido);
      paramCount++;
    }

    if (email !== undefined) {
      updates.push(`email = $${paramCount}`);
      values.push(email);
      paramCount++;
    }

    if (telefono !== undefined) {
      updates.push(`telefono = $${paramCount}`);
      values.push(telefono);
      paramCount++;
    }

    if (fecha_nacimiento !== undefined && fecha_nacimiento !== null && fecha_nacimiento !== '') {
      console.log('📝 Agregando fecha_nacimiento a la actualización:', fecha_nacimiento);
      updates.push(`fecha_nacimiento = $${paramCount}`);
      // Convertir string a Date si es necesario
      const fechaParaBD = fecha_nacimiento instanceof Date ? fecha_nacimiento : new Date(fecha_nacimiento);
      values.push(fechaParaBD);
      paramCount++;
    }

    if (dni !== undefined) {
      updates.push(`dni = $${paramCount}`);
      values.push(dni);
      paramCount++;
    }

    if (estado_academico !== undefined) {
      updates.push(`estado_academico = $${paramCount}`);
      values.push(estado_academico);
      paramCount++;
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No hay datos para actualizar'
      });
    }

    // Agregar ID del usuario
    values.push(req.user.id);

    const queryText = `
      UPDATE users 
      SET ${updates.join(', ')} 
      WHERE id = $${paramCount}
      RETURNING id, nombre, apellido, email, telefono, dni, carrera_id, año_ingreso, rol, estado_academico, email_verificado, fecha_creacion, fecha_nacimiento, fecha_ultimo_acceso
    `;

    console.log('📝 Consulta SQL final:', queryText);
    console.log('📝 Valores para la consulta:', values);

    const result = await query(queryText, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    const updatedUser = result.rows[0];

    // Obtener información de la carrera
    const carreraResult = await query(
      'SELECT nombre, sigla FROM careers WHERE id = $1',
      [updatedUser.carrera_id]
    );

    res.json({
      success: true,
      message: 'Perfil actualizado exitosamente',
      user: {
        id: updatedUser.id,
        nombre: updatedUser.nombre,
        apellido: updatedUser.apellido,
        email: updatedUser.email,
        telefono: updatedUser.telefono,
        dni: updatedUser.dni,
        rol: updatedUser.rol,
        carrera_id: updatedUser.carrera_id,
        carrera_nombre: carreraResult.rows[0]?.nombre || 'Carrera no encontrada',
        carrera_sigla: carreraResult.rows[0]?.sigla || '',
        año_ingreso: updatedUser.año_ingreso,
        estado_academico: updatedUser.estado_academico,
        email_verificado: updatedUser.email_verificado,
        fecha_creacion: updatedUser.fecha_creacion,
        fecha_nacimiento: updatedUser.fecha_nacimiento,
        fecha_ultimo_acceso: updatedUser.fecha_ultimo_acceso
      }
    });

  } catch (error) {
    console.error('❌ Error actualizando perfil:', error);
    console.error('❌ Stack trace:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Endpoint para subir foto de perfil
app.post('/api/auth/profile/photo', authenticateToken, upload.single('photo'), async (req, res) => {
  try {
    console.log('📸 Subida de foto de perfil recibida');
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No se proporcionó ningún archivo'
      });
    }

    // Leer la imagen y convertir a base64
    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString('base64');
    const mimeType = req.file.mimetype;
    const photoDataUrl = `data:${mimeType};base64,${base64Image}`;
    
    // Eliminar el archivo físico ya que no lo necesitamos
    fs.unlinkSync(req.file.path);
    
    // Actualizar la base de datos con la imagen en base64
    const result = await query(
      'UPDATE users SET foto = $1 WHERE id = $2 RETURNING id, nombre, apellido, email, telefono, dni, carrera_id, año_ingreso, rol, estado_academico, email_verificado, fecha_creacion, foto',
      [photoDataUrl, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    const updatedUser = result.rows[0];

    // Obtener información de la carrera
    const carreraResult = await query(
      'SELECT nombre, sigla FROM careers WHERE id = $1',
      [updatedUser.carrera_id]
    );

    res.json({
      success: true,
      message: 'Foto de perfil actualizada exitosamente',
      user: {
        id: updatedUser.id,
        nombre: updatedUser.nombre,
        apellido: updatedUser.apellido,
        email: updatedUser.email,
        telefono: updatedUser.telefono,
        dni: updatedUser.dni,
        rol: updatedUser.rol,
        carrera_id: updatedUser.carrera_id,
        carrera_nombre: carreraResult.rows[0]?.nombre || 'Carrera no encontrada',
        carrera_sigla: carreraResult.rows[0]?.sigla || '',
        año_ingreso: updatedUser.año_ingreso,
        estado_academico: updatedUser.estado_academico,
        email_verificado: updatedUser.email_verificado,
        fecha_creacion: updatedUser.fecha_creacion,
        foto: updatedUser.foto
      }
    });

  } catch (error) {
    console.error('Error subiendo foto de perfil:', error);
    
    // Si hay un error, eliminar el archivo subido
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error eliminando archivo:', unlinkError);
      }
    }
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// Endpoint para obtener carreras disponibles
app.get('/api/carreras', async (req, res) => {
  try {
    const result = await query(
      'SELECT id, nombre, sigla, codigo, descripcion, duracion_años FROM careers WHERE estado = $1 ORDER BY nombre',
      ['active']
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error obteniendo carreras:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// Endpoint de prueba de conexión a la base de datos
app.get('/api/db-status', async (req, res) => {
  try {
    const isConnected = await testConnection();
    res.json({
      success: true,
      connected: isConnected,
      message: isConnected ? 'Conexión a la base de datos exitosa' : 'Error de conexión a la base de datos'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      connected: false,
      message: 'Error de conexión a la base de datos',
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`
🚀 UNLujo API Server iniciado!
📍 Puerto: ${PORT}
🌐 URL: http://localhost:${PORT}
🎨 Paleta: Azul (#3B82F6) → Naranja (#F97316)
🎓 Comunidad Estudiantil UNLu
  `);
});
