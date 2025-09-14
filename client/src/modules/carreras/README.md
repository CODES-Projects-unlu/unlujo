# 🎓 Módulo de Carreras - UNLujo PWA

## 📋 Descripción

Este módulo se encarga de la gestión y visualización de información relacionada con las carreras de la Universidad Nacional de Luján. Incluye dashboards, estadísticas, noticias y enlaces útiles para cada carrera.

## 🏗️ Estructura del Módulo

```
carreras/
├── components/           # Componentes React
│   └── CarreraDetail.js # Página de detalle de carrera
├── hooks/               # Hooks personalizados
│   └── useCarreraData.js
├── utils/               # Funciones utilitarias
│   └── carreraUtils.js
├── constants/           # Constantes y configuración
│   └── carrerasConstants.js
├── data/               # Datos mock y funciones de datos
│   └── carrerasData.js
├── index.js            # Exportaciones del módulo
└── README.md           # Este archivo
```

## 🚀 Componentes Disponibles

### **CarreraDetail**
Página de detalle completa de una carrera que incluye:
- Información básica de la carrera
- Estadísticas principales
- Noticias específicas
- Enlaces útiles
- Centro de estudiantes (si existe)

**Uso:**
```jsx
import { CarreraDetail } from '../modules/carreras';

<CarreraDetail carreras={carreras} />
```

## 🎣 Hooks Disponibles

### **useCarreraData(id)**
Hook para obtener datos de una carrera específica.

**Parámetros:**
- `id` (string|number): ID o código de la carrera

**Retorna:**
```javascript
{
  carrera: object,        // Datos de la carrera
  loading: string,        // Estado de carga
  error: string,          // Error si existe
  recargar: function,     // Función para recargar
  isLoading: boolean,     // True si está cargando
  isSuccess: boolean,     // True si fue exitoso
  isError: boolean        // True si hay error
}
```

### **useTodasLasCarreras()**
Hook para obtener todas las carreras disponibles.

### **useCarreraStats(id)**
Hook para obtener estadísticas de una carrera específica.

### **useCarreraNoticias(id)**
Hook para obtener noticias de una carrera específica.

### **useCarreraEnlaces(id)**
Hook para obtener enlaces útiles de una carrera específica.

### **useBuscarCarreras(termino, filtro)**
Hook para buscar y filtrar carreras.

**Parámetros:**
- `termino` (string): Término de búsqueda
- `filtro` (string): Filtro por tipo ('con_centro', 'sin_centro', 'activas')

## 🛠️ Utilidades Disponibles

### **Formateo de Datos**
```javascript
import { formatCarreraName, formatFecha, formatNumero } from '../modules/carreras';

// Formatear nombre de carrera
formatCarreraName("Licenciatura en Sistemas de Información");
// Retorna: "Lic. en Sistemas de Información"

// Formatear fecha
formatFecha("2025-01-15");
// Retorna: "15 de enero de 2025"

// Formatear número
formatNumero(1500);
// Retorna: "1.500"
```

### **Obtener Información de Carrera**
```javascript
import { getCarreraColor, getCarreraIcon } from '../modules/carreras';

// Obtener color de carrera
getCarreraColor("LSI");
// Retorna: "#3B82F6"

// Obtener icono de carrera
getCarreraIcon("LSI");
// Retorna: "Laptop"
```

### **Filtrado y Búsqueda**
```javascript
import { filtrarNoticiasPorTipo, ordenarNoticiasPorFecha } from '../modules/carreras';

// Filtrar noticias por tipo
const noticiasAcademicas = filtrarNoticiasPorTipo(noticias, "academico");

// Ordenar noticias por fecha
const noticiasOrdenadas = ordenarNoticiasPorFecha(noticias);
```

## 📊 Datos Disponibles

### **Estructura de Carrera**
```javascript
{
  id: 1,
  codigo: "LSI",
  nombre: "Licenciatura en Sistemas de Información",
  descripcion: "Carrera orientada al desarrollo de software...",
  color: "#3B82F6",
  duracion: "5 años",
  modalidad: "Presencial",
  sede: "Luján",
  titulo: "Licenciado en Sistemas de Información",
  estadisticas: {
    estudiantesActivos: 150,
    materias: 25,
    profesores: 12,
    egresados: 45,
    promedioEdad: 22,
    porcentajeMujeres: 35
  },
  noticias: [...],
  enlaces: [...],
  materias: [...],
  centroEstudiantes: {...}
}
```

### **Carreras Disponibles**
1. **LSI** - Licenciatura en Sistemas de Información
2. **LTS** - Licenciatura en Trabajo Social
3. **LE** - Licenciatura en Enfermería

## 🎨 Constantes de Diseño

### **Colores por Carrera**
```javascript
import { CARRERA_COLORS } from '../modules/carreras';

const colores = {
  LSI: '#3B82F6', // Azul
  LTS: '#10B981', // Verde
  LE: '#EF4444'   // Rojo
};
```

### **Configuración de Estadísticas**
```javascript
import { ESTADISTICAS_CONFIG } from '../modules/carreras';

const config = {
  estudiantesActivos: {
    label: 'Estudiantes Activos',
    icon: 'Users',
    color: 'blue'
  },
  // ... más configuraciones
};
```

## 🔧 Configuración

### **Variables de Entorno**
```bash
# .env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_CARRERAS_ENDPOINT=/api/carreras
```

### **Dependencias Requeridas**
- React 18+
- React Router DOM
- Lucide React (iconos)
- Tailwind CSS (estilos)

## 📱 Responsive Design

El módulo está diseñado para funcionar en:
- **Móviles**: 320px - 768px
- **Tablets**: 768px - 1024px
- **Desktop**: 1024px+

## 🧪 Testing

### **Ejecutar Tests**
```bash
npm test
```

### **Tests Disponibles**
- Tests de utilidades
- Tests de hooks
- Tests de componentes

## 🚀 Desarrollo

### **Agregar Nueva Carrera**
1. Agregar datos en `carrerasData.js`
2. Actualizar constantes en `carrerasConstants.js`
3. Agregar icono en `CarreraDetail.js`

### **Agregar Nueva Funcionalidad**
1. Crear componente en `components/`
2. Crear hook en `hooks/` si es necesario
3. Agregar utilidades en `utils/`
4. Actualizar `index.js` con las exportaciones

## 📚 Ejemplos de Uso

### **Dashboard Básico**
```jsx
import React from 'react';
import { useCarreraData, CarreraDetail } from '../modules/carreras';

const DashboardCarrera = ({ carreraId }) => {
  const { carrera, isLoading, error } = useCarreraData(carreraId);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!carrera) return <div>Carrera no encontrada</div>;

  return <CarreraDetail carreras={[carrera]} />;
};
```

### **Lista de Carreras**
```jsx
import React from 'react';
import { useTodasLasCarreras } from '../modules/carreras';

const ListaCarreras = () => {
  const { carreras, isLoading } = useTodasLasCarreras();

  if (isLoading) return <div>Cargando carreras...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {carreras.map(carrera => (
        <div key={carrera.id} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold">{carrera.nombre}</h3>
          <p className="text-gray-600">{carrera.descripcion}</p>
        </div>
      ))}
    </div>
  );
};
```

## 🆘 Soporte

### **Problemas Comunes**
1. **Error de importación**: Verificar que el módulo esté exportado en `index.js`
2. **Datos no cargan**: Verificar que el hook esté configurado correctamente
3. **Estilos no aplican**: Verificar que Tailwind CSS esté configurado

### **Recursos de Ayuda**
- [Documentación React](https://reactjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)

## 📝 Changelog

### **v1.0.0** (Enero 2025)
- ✅ Módulo inicial creado
- ✅ Componente CarreraDetail
- ✅ Hooks personalizados
- ✅ Utilidades básicas
- ✅ Datos mock
- ✅ Constantes de diseño

## 🤝 Contribución

Para contribuir a este módulo:
1. Leer la guía de colaboración
2. Crear branch para tu feature
3. Seguir las convenciones de código
4. Crear Pull Request

---

**¡Disfruta desarrollando el módulo de carreras!** 🎓✨





