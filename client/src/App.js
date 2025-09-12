import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import NoticiasSection from './components/NoticiasSection';
import NoticiasPage from './components/NoticiasPage';
import CarreraDetail from './components/CarreraDetail';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import { staticCarreras, staticNoticias } from './data/staticData';
import './App.css';

function App() {
  const [carreras, setCarreras] = useState([]);
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar datos iniciales
    const cargarDatos = async () => {
      try {
        console.log('Cargando datos del servidor...');
        
        // En producción, usar datos estáticos
        if (process.env.NODE_ENV === 'production') {
          console.log('Usando datos estáticos para producción');
          setCarreras(staticCarreras);
          setNoticias(staticNoticias);
          setLoading(false);
          return;
        }
        
        // En desarrollo, usar el backend local
        const [carrerasRes, noticiasRes] = await Promise.all([
          fetch('http://localhost:5000/api/carreras'),
          fetch('http://localhost:5000/api/noticias')
        ]);
        
        if (!carrerasRes.ok || !noticiasRes.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        
        const carrerasData = await carrerasRes.json();
        const noticiasData = await noticiasRes.json();
        
        console.log('Datos cargados:', { carreras: carrerasData, noticias: noticiasData });
        
        setCarreras(carrerasData);
        setNoticias(noticiasData);
        setLoading(false);
      } catch (error) {
        console.error('Error cargando datos:', error);
        // Datos de fallback para desarrollo
        const carrerasFallback = [
          {
            id: 1,
            nombre: "Lic. en Sistemas de Información",
            codigo: "LSI",
            descripcion: "Formación integral en tecnologías de la información, desarrollo de software y sistemas computacionales para el mundo digital.",
            color: "#3B82F6",
            icono: "💻",
            noticias: []
          },
          {
            id: 2,
            nombre: "Lic. en Trabajo Social",
            codigo: "LTS",
            descripcion: "Formación profesional para la intervención social, comunitaria y promoción del bienestar social en diversos contextos.",
            color: "#10B981",
            icono: "🤝",
            noticias: []
          },
          {
            id: 3,
            nombre: "Lic. en Enfermería",
            codigo: "LE",
            descripcion: "Formación científica y humanística para el cuidado integral de la salud, promoción y prevención en salud.",
            color: "#EF4444",
            icono: "🏥",
            noticias: []
          }
        ];
        
        const noticiasFallback = [
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
        
        setCarreras(carrerasFallback);
        setNoticias(noticiasFallback);
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Dashboard carreras={carreras} />
                <NoticiasSection noticias={noticias} />
              </>
            } 
          />
          <Route 
            path="/carrera/:id" 
            element={
              <CarreraDetail 
                carreras={carreras} 
              />
            } 
          />
          <Route 
            path="/noticias" 
            element={
              <NoticiasPage 
                noticias={noticias} 
              />
            } 
          />
        </Routes>
        <Chatbot />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
