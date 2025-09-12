// 🔍 Validador de JSONs para el Chatbot Lujito
// Ejecutar con: node validar-json.js

const fs = require('fs');
const path = require('path');

// 📋 Esquemas de validación
const esquemas = {
  materias: {
    required: ['carrera', 'sigla', 'materias'],
    materias: {
      required: ['año', 'cuatrimestre', 'materias'],
      materia: {
        required: ['codigo', 'nombre', 'creditos', 'horarios', 'aula', 'profesor', 'modalidad', 'requisitos']
      }
    }
  },
  centros: {
    required: ['centros'],
    centro: {
      required: ['id', 'nombre', 'direccion', 'ciudad', 'provincia', 'telefono', 'email', 'servicios', 'carreras']
    }
  },
  servicios: {
    required: ['servicios'],
    servicio: {
      required: ['id', 'nombre', 'ubicacion', 'horarios', 'servicios', 'contacto']
    }
  },
  becas: {
    required: ['becas'],
    beca: {
      required: ['id', 'nombre', 'descripcion', 'requisitos', 'monto', 'fechaApertura', 'fechaCierre', 'contacto']
    }
  },
  contactos: {
    required: ['secretarias', 'centros_estudiantes'],
    secretaria: {
      required: ['carrera', 'ubicacion', 'telefono', 'email', 'responsable', 'horarios', 'servicios']
    },
    centro: {
      required: ['nombre', 'carrera', 'ubicacion', 'telefono', 'email', 'presidente', 'horarios', 'actividades']
    }
  }
};

// 🎯 Función para validar JSON
function validarJSON(archivo, tipo) {
  try {
    console.log(`\n🔍 Validando: ${archivo}`);
    
    // Leer archivo
    const contenido = fs.readFileSync(archivo, 'utf8');
    const datos = JSON.parse(contenido);
    
    // Validar estructura básica
    const esquema = esquemas[tipo];
    if (!esquema) {
      console.log(`❌ Tipo de esquema no reconocido: ${tipo}`);
      return false;
    }
    
    // Validar campos requeridos
    for (const campo of esquema.required) {
      if (!datos[campo]) {
        console.log(`❌ Campo requerido faltante: ${campo}`);
        return false;
      }
    }
    
    // Validar según tipo
    let valido = true;
    
    if (tipo === 'materias') {
      valido = validarMaterias(datos);
    } else if (tipo === 'centros') {
      valido = validarCentros(datos);
    } else if (tipo === 'servicios') {
      valido = validarServicios(datos);
    } else if (tipo === 'becas') {
      valido = validarBecas(datos);
    } else if (tipo === 'contactos') {
      valido = validarContactos(datos);
    }
    
    if (valido) {
      console.log(`✅ ${archivo} - VÁLIDO`);
    } else {
      console.log(`❌ ${archivo} - ERRORES ENCONTRADOS`);
    }
    
    return valido;
    
  } catch (error) {
    console.log(`❌ Error al procesar ${archivo}: ${error.message}`);
    return false;
  }
}

// 📚 Validar materias
function validarMaterias(datos) {
  let valido = true;
  
  for (const año of datos.materias) {
    if (!año.año || !año.cuatrimestre || !Array.isArray(año.materias)) {
      console.log(`❌ Estructura de año incorrecta`);
      valido = false;
      continue;
    }
    
    for (const materia of año.materias) {
      const campos = ['codigo', 'nombre', 'creditos', 'horarios', 'aula', 'profesor', 'modalidad', 'requisitos'];
      for (const campo of campos) {
        if (!materia[campo]) {
          console.log(`❌ Materia ${materia.codigo || 'sin código'}: campo ${campo} faltante`);
          valido = false;
        }
      }
      
      // Validar formato de créditos
      if (materia.creditos && typeof materia.creditos !== 'number') {
        console.log(`❌ Materia ${materia.codigo}: créditos debe ser número`);
        valido = false;
      }
      
      // Validar horarios
      if (materia.horarios && !Array.isArray(materia.horarios)) {
        console.log(`❌ Materia ${materia.codigo}: horarios debe ser array`);
        valido = false;
      }
    }
  }
  
  return valido;
}

// 🏢 Validar centros
function validarCentros(datos) {
  let valido = true;
  
  for (const centro of datos.centros) {
    const campos = ['id', 'nombre', 'direccion', 'ciudad', 'provincia', 'telefono', 'email', 'servicios', 'carreras'];
    for (const campo of campos) {
      if (!centro[campo]) {
        console.log(`❌ Centro ${centro.nombre || 'sin nombre'}: campo ${campo} faltante`);
        valido = false;
      }
    }
    
    // Validar arrays
    if (centro.servicios && !Array.isArray(centro.servicios)) {
      console.log(`❌ Centro ${centro.nombre}: servicios debe ser array`);
      valido = false;
    }
    
    if (centro.carreras && !Array.isArray(centro.carreras)) {
      console.log(`❌ Centro ${centro.nombre}: carreras debe ser array`);
      valido = false;
    }
  }
  
  return valido;
}

// 🏢 Validar servicios
function validarServicios(datos) {
  let valido = true;
  
  for (const servicio of datos.servicios) {
    const campos = ['id', 'nombre', 'ubicacion', 'horarios', 'servicios', 'contacto'];
    for (const campo of campos) {
      if (!servicio[campo]) {
        console.log(`❌ Servicio ${servicio.nombre || 'sin nombre'}: campo ${campo} faltante`);
        valido = false;
      }
    }
    
    // Validar contacto
    if (servicio.contacto) {
      const camposContacto = ['telefono', 'email'];
      for (const campo of camposContacto) {
        if (!servicio.contacto[campo]) {
          console.log(`❌ Servicio ${servicio.nombre}: contacto.${campo} faltante`);
          valido = false;
        }
      }
    }
  }
  
  return valido;
}

// 💰 Validar becas
function validarBecas(datos) {
  let valido = true;
  
  for (const beca of datos.becas) {
    const campos = ['id', 'nombre', 'descripcion', 'requisitos', 'monto', 'fechaApertura', 'fechaCierre', 'contacto'];
    for (const campo of campos) {
      if (!beca[campo]) {
        console.log(`❌ Beca ${beca.nombre || 'sin nombre'}: campo ${campo} faltante`);
        valido = false;
      }
    }
    
    // Validar fechas
    if (beca.fechaApertura && !validarFecha(beca.fechaApertura)) {
      console.log(`❌ Beca ${beca.nombre}: fechaApertura formato incorrecto (YYYY-MM-DD)`);
      valido = false;
    }
    
    if (beca.fechaCierre && !validarFecha(beca.fechaCierre)) {
      console.log(`❌ Beca ${beca.nombre}: fechaCierre formato incorrecto (YYYY-MM-DD)`);
      valido = false;
    }
  }
  
  return valido;
}

// 📞 Validar contactos
function validarContactos(datos) {
  let valido = true;
  
  // Validar secretarías
  if (datos.secretarias) {
    for (const secretaria of datos.secretarias) {
      const campos = ['carrera', 'ubicacion', 'telefono', 'email', 'responsable', 'horarios', 'servicios'];
      for (const campo of campos) {
        if (!secretaria[campo]) {
          console.log(`❌ Secretaría ${secretaria.carrera || 'sin carrera'}: campo ${campo} faltante`);
          valido = false;
        }
      }
    }
  }
  
  // Validar centros de estudiantes
  if (datos.centros_estudiantes) {
    for (const centro of datos.centros_estudiantes) {
      const campos = ['nombre', 'carrera', 'ubicacion', 'telefono', 'email', 'presidente', 'horarios', 'actividades'];
      for (const campo of campos) {
        if (!centro[campo]) {
          console.log(`❌ Centro ${centro.nombre || 'sin nombre'}: campo ${campo} faltante`);
          valido = false;
        }
      }
    }
  }
  
  return valido;
}

// 📅 Validar formato de fecha
function validarFecha(fecha) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(fecha);
}

// 🚀 Función principal
function main() {
  console.log('🔍 VALIDADOR DE JSONs PARA LUJITO');
  console.log('=====================================');
  
  const archivos = [
    { archivo: 'plantillas-json/materias-lsi.json', tipo: 'materias' },
    { archivo: 'plantillas-json/centros-regionales.json', tipo: 'centros' },
    { archivo: 'plantillas-json/servicios-universitarios.json', tipo: 'servicios' },
    { archivo: 'plantillas-json/becas-ayudas.json', tipo: 'becas' },
    { archivo: 'plantillas-json/contactos-secretarias.json', tipo: 'contactos' }
  ];
  
  let totalValidos = 0;
  let totalArchivos = archivos.length;
  
  for (const { archivo, tipo } of archivos) {
    if (fs.existsSync(archivo)) {
      if (validarJSON(archivo, tipo)) {
        totalValidos++;
      }
    } else {
      console.log(`⚠️  Archivo no encontrado: ${archivo}`);
    }
  }
  
  console.log('\n📊 RESUMEN');
  console.log('==========');
  console.log(`✅ Archivos válidos: ${totalValidos}/${totalArchivos}`);
  
  if (totalValidos === totalArchivos) {
    console.log('🎉 ¡Todos los archivos son válidos!');
  } else {
    console.log('⚠️  Algunos archivos tienen errores. Revisa los mensajes anteriores.');
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = { validarJSON, validarMaterias, validarCentros, validarServicios, validarBecas, validarContactos };
