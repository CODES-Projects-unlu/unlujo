// Plan de estudios oficial de Licenciatura en Sistemas de Información - UNLu
// Resolución H.C.S. N° 260/24

export const materiasLSI = {
  "carrera": "Licenciatura en Sistemas de Información",
  "sigla": "LSI",
  "codigo_carrera": "17.14",
  "descripcion": "Plan de estudios oficial UNLu - Resolución H.C.S. N° 260/24",
  "materias": [
    {
      "año": 1,
      "cuatrimestre": 1,
      "materias": [
        {
          "codigo": "11271",
          "nombre": "Introducción a la Programación",
          "horas_semanales": 6,
          "horas_totales": 96,
          "correlatividad": "--------",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        },
        {
          "codigo": "13014",
          "nombre": "Matemática Básica",
          "horas_semanales": 6,
          "horas_totales": 96,
          "correlatividad": "--------",
          "modalidad_base": "Presencial",
          "nota": "Base para otras materias matemáticas"
        },
        {
          "codigo": "21256",
          "nombre": "Introducción a los Sistemas de Información",
          "horas_semanales": 6,
          "horas_totales": 96,
          "correlatividad": "--------",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        }
      ]
    },
    {
      "año": 1,
      "cuatrimestre": 2,
      "materias": [
        {
          "codigo": "11274",
          "nombre": "Programación Estructurada",
          "horas_semanales": 6,
          "horas_totales": 96,
          "correlatividad": "11271",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        },
        {
          "codigo": "11256",
          "nombre": "Sistemas de Información I",
          "horas_semanales": 6,
          "horas_totales": 96,
          "correlatividad": "21256",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        },
        {
          "codigo": "41407",
          "nombre": "Organización de Computadoras",
          "horas_semanales": 4,
          "horas_totales": 64,
          "correlatividad": "13014",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        },
        {
          "codigo": "13021",
          "nombre": "Álgebra Lineal y Geometría",
          "horas_semanales": 6,
          "horas_totales": 96,
          "correlatividad": "13014",
          "modalidad_base": "Presencial",
          "nota": "Base para matemática computacional"
        }
      ]
    },
    {
      "año": 2,
      "cuatrimestre": 1,
      "materias": [
        {
          "codigo": "11275",
          "nombre": "Estructuras de Datos y Algoritmos I",
          "horas_semanales": 4,
          "horas_totales": 64,
          "correlatividad": "13014, 11274",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        },
        {
          "codigo": "11258",
          "nombre": "Sistemas de Información II",
          "horas_semanales": 4,
          "horas_totales": 64,
          "correlatividad": "11256",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        },
        {
          "codigo": "13022",
          "nombre": "Análisis Matemático I",
          "horas_semanales": 8,
          "horas_totales": 128,
          "correlatividad": "13014",
          "modalidad_base": "Presencial",
          "nota": "Base para análisis matemático II"
        },
        {
          "codigo": "41426",
          "nombre": "Arquitectura de Computadoras",
          "horas_semanales": 6,
          "horas_totales": 96,
          "correlatividad": "11271, 41407",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        }
      ]
    },
    {
      "año": 2,
      "cuatrimestre": 2,
      "materias": [
        {
          "codigo": "11276",
          "nombre": "Programación Orientada a Objetos",
          "horas_semanales": 4,
          "horas_totales": 64,
          "correlatividad": "11275",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        },
        {
          "codigo": "13923",
          "nombre": "Análisis Matemático II",
          "horas_semanales": 8,
          "horas_totales": 128,
          "correlatividad": "13022",
          "modalidad_base": "Presencial",
          "nota": "Base para matemática computacional"
        },
        {
          "codigo": "11259",
          "nombre": "Sistemas de Información III",
          "horas_semanales": 4,
          "horas_totales": 64,
          "correlatividad": "11258",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        },
        {
          "codigo": "11410",
          "nombre": "Sistemas Operativos",
          "horas_semanales": 6,
          "horas_totales": 96,
          "correlatividad": "41426, 11274",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        }
      ]
    },
    {
      "año": 3,
      "cuatrimestre": 1,
      "materias": [
        {
          "codigo": "11083",
          "nombre": "Estadística y Probabilidad",
          "horas_semanales": 6,
          "horas_totales": 96,
          "correlatividad": "19054, 13022",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        },
        {
          "codigo": "14027",
          "nombre": "Fundamentos de Redes de Datos",
          "horas_semanales": 4,
          "horas_totales": 64,
          "correlatividad": "11410",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        },
        {
          "codigo": "11286",
          "nombre": "Programación en Ambiente Web",
          "horas_semanales": 6,
          "horas_totales": 96,
          "correlatividad": "11276, 11410",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        },
        {
          "codigo": "11277",
          "nombre": "Bases de Datos Relacionales",
          "horas_semanales": 6,
          "horas_totales": 96,
          "correlatividad": "11256, 11275, 11410",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        }
      ]
    },
    {
      "año": 3,
      "cuatrimestre": 2,
      "materias": [
        {
          "codigo": "21279",
          "nombre": "Gestión de Soluciones Innovadoras",
          "horas_semanales": 3,
          "horas_totales": 48,
          "correlatividad": "11258",
          "modalidad_base": "Presencial",
          "nota": "Materia integradora"
        },
        {
          "codigo": "11287",
          "nombre": "Seminario de Integración Profesional",
          "horas_semanales": 6,
          "horas_totales": 96,
          "correlatividad": "11259, 11277, 11286",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        }
      ]
    },
    {
      "año": 4,
      "cuatrimestre": 1,
      "materias": [
        {
          "codigo": "11278",
          "nombre": "Bases de Datos Distribuidas",
          "horas_semanales": 6,
          "horas_totales": 96,
          "correlatividad": "14027, 11277",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        },
        {
          "codigo": "14028",
          "nombre": "Matemática Computacional",
          "horas_semanales": 4,
          "horas_totales": 64,
          "correlatividad": "13923, 11083",
          "modalidad_base": "Presencial",
          "nota": "Base para algoritmos avanzados"
        }
      ]
    },
    {
      "año": 4,
      "cuatrimestre": 2,
      "materias": [
        {
          "codigo": "14029",
          "nombre": "Administración de Redes",
          "horas_semanales": 4,
          "horas_totales": 64,
          "correlatividad": "14027, 14028",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        },
        {
          "codigo": "14030",
          "nombre": "Estructuras de Datos y Algoritmos II",
          "horas_semanales": 4,
          "horas_totales": 64,
          "correlatividad": "11275, 14028",
          "modalidad_base": "Presencial",
          "nota": "Algoritmos avanzados"
        },
        {
          "codigo": "14031",
          "nombre": "Teoría de la Computación",
          "horas_semanales": 6,
          "horas_totales": 96,
          "correlatividad": "14028, 11275",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        },
        {
          "codigo": "11260",
          "nombre": "Sistemas de Información IV",
          "horas_semanales": 4,
          "horas_totales": 64,
          "correlatividad": "11259",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        }
      ]
    },
    {
      "año": 5,
      "cuatrimestre": 1,
      "materias": [
        {
          "codigo": "11288",
          "nombre": "Gestión de Datos Masivos",
          "horas_semanales": 4,
          "horas_totales": 64,
          "correlatividad": "11278, 14027, 11083",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        },
        {
          "codigo": "14032",
          "nombre": "Diseño Avanzado de Software",
          "horas_semanales": 4,
          "horas_totales": 64,
          "correlatividad": "14030, 11277",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        },
        {
          "codigo": "41429",
          "nombre": "Sistemas Distribuidos y Programación Paralela",
          "horas_semanales": 6,
          "horas_totales": 96,
          "correlatividad": "14029, 11286",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        },
        {
          "codigo": "14034",
          "nombre": "Modelos de Decisión y Optimización",
          "horas_semanales": 4,
          "horas_totales": 64,
          "correlatividad": "14028, 14030",
          "modalidad_base": "Presencial",
          "nota": "Optimización y toma de decisiones"
        }
      ]
    },
    {
      "año": 5,
      "cuatrimestre": 2,
      "materias": [
        {
          "codigo": "11292",
          "nombre": "Seguridad Informática",
          "horas_semanales": 4,
          "horas_totales": 64,
          "correlatividad": "14029, 11260",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        },
        {
          "codigo": "11289",
          "nombre": "Inteligencia Artificial",
          "horas_semanales": 6,
          "horas_totales": 96,
          "correlatividad": "13021, 11083, 14030",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        },
        {
          "codigo": "14033",
          "nombre": "Bases de Datos Textuales",
          "horas_semanales": 4,
          "horas_totales": 64,
          "correlatividad": "11288",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        },
        {
          "codigo": "21258",
          "nombre": "Gestión de Proyectos",
          "horas_semanales": 4,
          "horas_totales": 64,
          "correlatividad": "21279",
          "modalidad_base": "Presencial",
          "nota": "Actividad académica con certificación de Diplomatura"
        },
        {
          "codigo": "21257",
          "nombre": "Aspectos Profesionales y Sociales",
          "horas_semanales": 3,
          "horas_totales": 48,
          "correlatividad": "21279",
          "modalidad_base": "Presencial",
          "nota": "Formación profesional integral"
        },
        {
          "codigo": "11091",
          "nombre": "Taller de Tesina",
          "horas_semanales": 4,
          "horas_totales": 64,
          "correlatividad": "IX cuatrimestre regular",
          "modalidad_base": "Presencial",
          "nota": "Preparación para tesina de grado"
        }
      ]
    }
  ],
  "competencias_basicas": [
    {
      "codigo": "19054",
      "nombre": "Competencias Básicas en Informática",
      "tipo": "Acreditación",
      "nota": "Debe acreditarse para iniciar el tramo de Licenciatura"
    },
    {
      "codigo": "39553",
      "nombre": "Competencias Básicas en Idioma Inglés",
      "tipo": "Acreditación",
      "nota": "Equivalente a niveles I y II"
    }
  ],
  "taller_introductorio": {
    "codigo": "14026",
    "nombre": "Taller Introductorio de Interpretación de Problemas",
    "horas_semanales": 8,
    "horas_totales": 48,
    "modalidad": "No intensivo (oct-dic) / Intensivo (febrero)",
    "nota": "Se dicta en el segundo cuatrimestre del año anterior al ingreso"
  },
  "actividades_optativas": {
    "horas_requeridas": 150,
    "nota": "Los estudiantes deben cursar actividades optativas hasta completar las 150 horas reloj"
  },
  "practicas_socio_tecnico_culturales": {
    "horas_requeridas": 80,
    "correlatividad": "VI cuatrimestre regular",
    "nota": "Prácticas obligatorias para la licenciatura"
  },
  "tesina_grado": {
    "horas_requeridas": 120,
    "correlatividad": "Todas las actividades académicas",
    "nota": "Trabajo final de grado"
  }
};
