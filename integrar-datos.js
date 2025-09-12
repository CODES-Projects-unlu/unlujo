// 🔄 Integrador de Datos JSON para el Chatbot Lujito
// Ejecutar con: node integrar-datos.js

const fs = require('fs');
const path = require('path');

// 📁 Rutas de archivos
const rutas = {
  plantillas: 'plantillas-json',
  knowledgeBase: 'client/src/data/knowledgeBase',
  academic: 'client/src/data/knowledgeBase/academic.js',
  services: 'client/src/data/knowledgeBase/services.js',
  contacts: 'client/src/data/knowledgeBase/contacts.js'
};

// 🎯 Función para integrar materias
function integrarMaterias(archivo) {
  try {
    console.log(`📚 Integrando materias desde: ${archivo}`);
    
    const datos = JSON.parse(fs.readFileSync(archivo, 'utf8'));
    
    // Leer archivo actual
    let contenido = fs.readFileSync(rutas.academic, 'utf8');
    
    // Buscar la sección de materias
    const inicioMaterias = contenido.indexOf('materias: {');
    const finMaterias = contenido.indexOf('},', inicioMaterias) + 2;
    
    if (inicioMaterias === -1) {
      console.log('❌ No se encontró la sección de materias en academic.js');
      return false;
    }
    
    // Generar nuevo contenido de materias
    let nuevoContenido = 'materias: {\n';
    
    for (const año of datos.materias) {
      nuevoContenido += `    ${año.año}: {\n`;
      nuevoContenido += `      ${año.cuatrimestre}: {\n`;
      
      for (const materia of año.materias) {
        nuevoContenido += `        "${materia.codigo}": {\n`;
        nuevoContenido += `          nombre: "${materia.nombre}",\n`;
        nuevoContenido += `          creditos: ${materia.creditos},\n`;
        nuevoContenido += `          horarios: ${JSON.stringify(materia.horarios)},\n`;
        nuevoContenido += `          aula: "${materia.aula}",\n`;
        nuevoContenido += `          profesor: "${materia.profesor}",\n`;
        nuevoContenido += `          modalidad: "${materia.modalidad}",\n`;
        nuevoContenido += `          requisitos: "${materia.requisitos}"\n`;
        nuevoContenido += `        },\n`;
      }
      
      nuevoContenido += `      },\n`;
    }
    
    nuevoContenido += '    },\n';
    
    // Reemplazar contenido
    const nuevoArchivo = contenido.substring(0, inicioMaterias) + 
                        nuevoContenido + 
                        contenido.substring(finMaterias);
    
    // Crear backup
    fs.writeFileSync(rutas.academic + '.backup', contenido);
    
    // Escribir nuevo archivo
    fs.writeFileSync(rutas.academic, nuevoArchivo);
    
    console.log(`✅ Materias integradas exitosamente`);
    return true;
    
  } catch (error) {
    console.log(`❌ Error integrando materias: ${error.message}`);
    return false;
  }
}

// 🏢 Función para integrar centros regionales
function integrarCentros(archivo) {
  try {
    console.log(`🏢 Integrando centros desde: ${archivo}`);
    
    const datos = JSON.parse(fs.readFileSync(archivo, 'utf8'));
    
    // Leer archivo actual
    let contenido = fs.readFileSync(rutas.academic, 'utf8');
    
    // Buscar la sección de centros
    const inicioCentros = contenido.indexOf('centros: {');
    const finCentros = contenido.indexOf('},', inicioCentros) + 2;
    
    if (inicioCentros === -1) {
      console.log('❌ No se encontró la sección de centros en academic.js');
      return false;
    }
    
    // Generar nuevo contenido de centros
    let nuevoContenido = 'centros: {\n';
    
    for (const centro of datos.centros) {
      nuevoContenido += `    ${centro.id}: {\n`;
      nuevoContenido += `      nombre: "${centro.nombre}",\n`;
      nuevoContenido += `      direccion: "${centro.direccion}",\n`;
      nuevoContenido += `      ciudad: "${centro.ciudad}",\n`;
      nuevoContenido += `      provincia: "${centro.provincia}",\n`;
      nuevoContenido += `      telefono: "${centro.telefono}",\n`;
      nuevoContenido += `      email: "${centro.email}",\n`;
      nuevoContenido += `      coordinador: "${centro.coordinador}",\n`;
      nuevoContenido += `      servicios: ${JSON.stringify(centro.servicios)},\n`;
      nuevoContenido += `      carreras: ${JSON.stringify(centro.carreras)}\n`;
      nuevoContenido += `    },\n`;
    }
    
    nuevoContenido += '  },\n';
    
    // Reemplazar contenido
    const nuevoArchivo = contenido.substring(0, inicioCentros) + 
                        nuevoContenido + 
                        contenido.substring(finCentros);
    
    // Crear backup
    fs.writeFileSync(rutas.academic + '.backup', contenido);
    
    // Escribir nuevo archivo
    fs.writeFileSync(rutas.academic, nuevoArchivo);
    
    console.log(`✅ Centros integrados exitosamente`);
    return true;
    
  } catch (error) {
    console.log(`❌ Error integrando centros: ${error.message}`);
    return false;
  }
}

// 🏢 Función para integrar servicios
function integrarServicios(archivo) {
  try {
    console.log(`🏢 Integrando servicios desde: ${archivo}`);
    
    const datos = JSON.parse(fs.readFileSync(archivo, 'utf8'));
    
    // Leer archivo actual
    let contenido = fs.readFileSync(rutas.services, 'utf8');
    
    // Buscar la sección de servicios
    const inicioServicios = contenido.indexOf('servicios: {');
    const finServicios = contenido.indexOf('},', inicioServicios) + 2;
    
    if (inicioServicios === -1) {
      console.log('❌ No se encontró la sección de servicios en services.js');
      return false;
    }
    
    // Generar nuevo contenido de servicios
    let nuevoContenido = 'servicios: {\n';
    
    for (const servicio of datos.servicios) {
      nuevoContenido += `    ${servicio.id}: {\n`;
      nuevoContenido += `      nombre: "${servicio.nombre}",\n`;
      nuevoContenido += `      ubicacion: "${servicio.ubicacion}",\n`;
      nuevoContenido += `      horarios: ${JSON.stringify(servicio.horarios)},\n`;
      nuevoContenido += `      servicios: ${JSON.stringify(servicio.servicios)},\n`;
      nuevoContenido += `      contacto: {\n`;
      nuevoContenido += `        telefono: "${servicio.contacto.telefono}",\n`;
      nuevoContenido += `        email: "${servicio.contacto.email}",\n`;
      nuevoContenido += `        responsable: "${servicio.contacto.responsable}"\n`;
      nuevoContenido += `      },\n`;
      nuevoContenido += `      requisitos: ${JSON.stringify(servicio.requisitos || [])}\n`;
      nuevoContenido += `    },\n`;
    }
    
    nuevoContenido += '  },\n';
    
    // Reemplazar contenido
    const nuevoArchivo = contenido.substring(0, inicioServicios) + 
                        nuevoContenido + 
                        contenido.substring(finServicios);
    
    // Crear backup
    fs.writeFileSync(rutas.services + '.backup', contenido);
    
    // Escribir nuevo archivo
    fs.writeFileSync(rutas.services, nuevoArchivo);
    
    console.log(`✅ Servicios integrados exitosamente`);
    return true;
    
  } catch (error) {
    console.log(`❌ Error integrando servicios: ${error.message}`);
    return false;
  }
}

// 💰 Función para integrar becas
function integrarBecas(archivo) {
  try {
    console.log(`💰 Integrando becas desde: ${archivo}`);
    
    const datos = JSON.parse(fs.readFileSync(archivo, 'utf8'));
    
    // Leer archivo actual
    let contenido = fs.readFileSync(rutas.services, 'utf8');
    
    // Buscar la sección de becas
    const inicioBecas = contenido.indexOf('becas: {');
    const finBecas = contenido.indexOf('},', inicioBecas) + 2;
    
    if (inicioBecas === -1) {
      console.log('❌ No se encontró la sección de becas en services.js');
      return false;
    }
    
    // Generar nuevo contenido de becas
    let nuevoContenido = 'becas: {\n';
    
    for (const beca of datos.becas) {
      nuevoContenido += `    ${beca.id}: {\n`;
      nuevoContenido += `      nombre: "${beca.nombre}",\n`;
      nuevoContenido += `      descripcion: "${beca.descripcion}",\n`;
      nuevoContenido += `      requisitos: ${JSON.stringify(beca.requisitos)},\n`;
      nuevoContenido += `      monto: "${beca.monto}",\n`;
      nuevoContenido += `      duracion: "${beca.duracion}",\n`;
      nuevoContenido += `      fechaApertura: "${beca.fechaApertura}",\n`;
      nuevoContenido += `      fechaCierre: "${beca.fechaCierre}",\n`;
      nuevoContenido += `      documentacion: ${JSON.stringify(beca.documentacion || [])},\n`;
      nuevoContenido += `      contacto: {\n`;
      nuevoContenido += `        telefono: "${beca.contacto.telefono}",\n`;
      nuevoContenido += `        email: "${beca.contacto.email}",\n`;
      nuevoContenido += `        oficina: "${beca.contacto.oficina}",\n`;
      nuevoContenido += `        responsable: "${beca.contacto.responsable}"\n`;
      nuevoContenido += `      }\n`;
      nuevoContenido += `    },\n`;
    }
    
    nuevoContenido += '  },\n';
    
    // Reemplazar contenido
    const nuevoArchivo = contenido.substring(0, inicioBecas) + 
                        nuevoContenido + 
                        contenido.substring(finBecas);
    
    // Crear backup
    fs.writeFileSync(rutas.services + '.backup', contenido);
    
    // Escribir nuevo archivo
    fs.writeFileSync(rutas.services, nuevoArchivo);
    
    console.log(`✅ Becas integradas exitosamente`);
    return true;
    
  } catch (error) {
    console.log(`❌ Error integrando becas: ${error.message}`);
    return false;
  }
}

// 📞 Función para integrar contactos
function integrarContactos(archivo) {
  try {
    console.log(`📞 Integrando contactos desde: ${archivo}`);
    
    const datos = JSON.parse(fs.readFileSync(archivo, 'utf8'));
    
    // Leer archivo actual
    let contenido = fs.readFileSync(rutas.contacts, 'utf8');
    
    // Buscar la sección de secretarías
    const inicioSecretarias = contenido.indexOf('secretarias: {');
    const finSecretarias = contenido.indexOf('},', inicioSecretarias) + 2;
    
    if (inicioSecretarias === -1) {
      console.log('❌ No se encontró la sección de secretarías en contacts.js');
      return false;
    }
    
    // Generar nuevo contenido de secretarías
    let nuevoContenido = 'secretarias: {\n';
    
    for (const secretaria of datos.secretarias) {
      const id = secretaria.carrera.toLowerCase().replace(/\s+/g, '_');
      nuevoContenido += `    ${id}: {\n`;
      nuevoContenido += `      carrera: "${secretaria.carrera}",\n`;
      nuevoContenido += `      ubicacion: "${secretaria.ubicacion}",\n`;
      nuevoContenido += `      telefono: "${secretaria.telefono}",\n`;
      nuevoContenido += `      email: "${secretaria.email}",\n`;
      nuevoContenido += `      responsable: "${secretaria.responsable}",\n`;
      nuevoContenido += `      horarios: "${secretaria.horarios}",\n`;
      nuevoContenido += `      servicios: ${JSON.stringify(secretaria.servicios)}\n`;
      nuevoContenido += `    },\n`;
    }
    
    nuevoContenido += '  },\n';
    
    // Reemplazar contenido
    const nuevoArchivo = contenido.substring(0, inicioSecretarias) + 
                        nuevoContenido + 
                        contenido.substring(finSecretarias);
    
    // Crear backup
    fs.writeFileSync(rutas.contacts + '.backup', contenido);
    
    // Escribir nuevo archivo
    fs.writeFileSync(rutas.contacts, nuevoArchivo);
    
    console.log(`✅ Contactos integrados exitosamente`);
    return true;
    
  } catch (error) {
    console.log(`❌ Error integrando contactos: ${error.message}`);
    return false;
  }
}

// 🚀 Función principal
function main() {
  console.log('🔄 INTEGRADOR DE DATOS JSON PARA LUJITO');
  console.log('========================================');
  
  const archivos = [
    { archivo: 'plantillas-json/materias-lsi.json', tipo: 'materias', funcion: integrarMaterias },
    { archivo: 'plantillas-json/centros-regionales.json', tipo: 'centros', funcion: integrarCentros },
    { archivo: 'plantillas-json/servicios-universitarios.json', tipo: 'servicios', funcion: integrarServicios },
    { archivo: 'plantillas-json/becas-ayudas.json', tipo: 'becas', funcion: integrarBecas },
    { archivo: 'plantillas-json/contactos-secretarias.json', tipo: 'contactos', funcion: integrarContactos }
  ];
  
  let totalIntegrados = 0;
  let totalArchivos = archivos.length;
  
  for (const { archivo, tipo, funcion } of archivos) {
    if (fs.existsSync(archivo)) {
      console.log(`\n🔍 Procesando: ${archivo}`);
      if (funcion(archivo)) {
        totalIntegrados++;
      }
    } else {
      console.log(`⚠️  Archivo no encontrado: ${archivo}`);
    }
  }
  
  console.log('\n📊 RESUMEN');
  console.log('==========');
  console.log(`✅ Archivos integrados: ${totalIntegrados}/${totalArchivos}`);
  
  if (totalIntegrados > 0) {
    console.log('\n🎉 ¡Datos integrados exitosamente!');
    console.log('💡 Recuerda probar el chatbot localmente antes de hacer deploy');
  } else {
    console.log('⚠️  No se integraron datos. Revisa los archivos JSON.');
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = { 
  integrarMaterias, 
  integrarCentros, 
  integrarServicios, 
  integrarBecas, 
  integrarContactos 
};
