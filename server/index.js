const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware de seguridad
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de 100 requests por IP
});
app.use(limiter);

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
      total: 6,
      active: 6,
      lastUpdated: new Date().toISOString()
    },
    features: [
      "PWA Support",
      "Real-time Chatbot",
      "Responsive Design", 
      "Auto-scroll Chat",
      "Quick Replies",
      "University Branding"
    ]
  });
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
