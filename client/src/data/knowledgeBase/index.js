// Base de conocimiento consolidada para el chatbot Lujito
import { academicData } from './academic';
import { servicesData } from './services';
import { contactsData } from './contacts';

export const knowledgeBase = {
  academic: academicData,
  services: servicesData,
  contacts: contactsData
};

// Función para construir contexto dinámico
export const buildContextFromKnowledgeBase = () => {
  let context = "";
  
  // Información académica
  context += "CARRERAS DISPONIBLES EN UNLu:\n";
  knowledgeBase.academic.carreras.forEach(carrera => {
    context += `- ${carrera.nombre} (${carrera.sigla}): ${carrera.duracion}\n`;
    context += `  Sede: ${carrera.sede}\n`;
    context += `  Modalidad: ${carrera.modalidad}\n`;
  });
  
  // Servicios principales
  context += "\nSERVICIOS PRINCIPALES:\n";
  context += `- Biblioteca: ${knowledgeBase.services.biblioteca.horarios.lunes_viernes}\n`;
  context += `- Deportes: ${knowledgeBase.services.deportes.horarios}\n`;
  context += `- Bienestar Estudiantil: ${knowledgeBase.services.bienestarEstudiantil.horarios}\n`;
  
  // Contactos importantes
  context += "\nCONTACTOS IMPORTANTES:\n";
  context += `- Rectorado: ${knowledgeBase.contacts.rectorado.telefono}\n`;
  context += `- Información General: ${knowledgeBase.contacts.ubicacion.telefono}\n`;
  
  // Ubicación
  context += "\nUBICACIÓN:\n";
  context += `- Dirección: ${knowledgeBase.contacts.ubicacion.direccion}\n`;
  context += `- Web: ${knowledgeBase.contacts.ubicacion.web}\n`;
  
  return context;
};

// Función para buscar información específica
export const searchKnowledgeBase = (query) => {
  const lowerQuery = query.toLowerCase();
  const results = [];
  
  // Buscar en carreras
  knowledgeBase.academic.carreras.forEach(carrera => {
    if (carrera.nombre.toLowerCase().includes(lowerQuery) || 
        carrera.sigla.toLowerCase().includes(lowerQuery)) {
      results.push({
        tipo: 'carrera',
        data: carrera
      });
    }
  });
  
  // Buscar en servicios
  if (lowerQuery.includes('biblioteca')) {
    results.push({
      tipo: 'servicio',
      data: knowledgeBase.services.biblioteca
    });
  }
  
  if (lowerQuery.includes('deporte') || lowerQuery.includes('deportes')) {
    results.push({
      tipo: 'servicio',
      data: knowledgeBase.services.deportes
    });
  }
  
  if (lowerQuery.includes('beca') || lowerQuery.includes('becas')) {
    results.push({
      tipo: 'servicio',
      data: knowledgeBase.services.becas
    });
  }
  
  // Buscar en contactos
  knowledgeBase.contacts.secretariasAcademicas.forEach(secretaria => {
    if (secretaria.carrera.toLowerCase().includes(lowerQuery)) {
      results.push({
        tipo: 'contacto',
        data: secretaria
      });
    }
  });
  
  return results;
};

// Función para obtener respuesta contextual
export const getContextualResponse = (query) => {
  const searchResults = searchKnowledgeBase(query);
  
  if (searchResults.length === 0) {
    return null; // No se encontró información específica
  }
  
  const result = searchResults[0];
  
  switch (result.tipo) {
    case 'carrera':
      return `🎓 ${result.data.nombre} (${result.data.sigla})\n` +
             `📅 Duración: ${result.data.duracion}\n` +
             `📍 Sede: ${result.data.sede}\n` +
             `📞 Contacto: ${knowledgeBase.contacts.secretariasAcademicas.find(s => s.carrera === result.data.nombre)?.telefono || 'No disponible'}`;
    
    case 'servicio':
      if (result.data.nombre) {
        return `🏢 ${result.data.nombre}\n` +
               `📞 Teléfono: ${result.data.contacto?.telefono || result.data.telefono}\n` +
               `📧 Email: ${result.data.contacto?.email || result.data.email}\n` +
               `🕒 Horarios: ${result.data.horarios?.lunes_viernes || result.data.horarios}`;
      }
      break;
    
    case 'contacto':
      return `📞 ${result.data.carrera}\n` +
             `📍 Ubicación: ${result.data.ubicacion}\n` +
             `📞 Teléfono: ${result.data.telefono}\n` +
             `📧 Email: ${result.data.email}\n` +
             `👤 Responsable: ${result.data.responsable}`;
  }
  
  return null;
};
