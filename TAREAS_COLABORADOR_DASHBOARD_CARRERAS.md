# 📋 Tareas Específicas - Dashboard de Carreras

## 👋 ¡Hola! Bienvenido al equipo

Esta es tu lista de tareas específicas para trabajar en el **módulo de carreras**. Cada tarea está diseñada para que puedas aprender gradualmente y contribuir al proyecto.

---

## 🎯 **TAREA 1: Configurar tu entorno** (Día 1)

### **Objetivo:** Tener todo listo para empezar a desarrollar

### **Pasos:**
1. **Fork del repositorio**
   - Ve a GitHub y haz fork del proyecto
   - Clona tu fork localmente

2. **Configurar upstream**
   ```bash
   git remote add upstream https://github.com/usuario-original/unlujo-pwa.git
   git fetch upstream
   ```

3. **Instalar dependencias**
   ```bash
   npm run setup
   ```

4. **Crear tu branch**
   ```bash
   git checkout -b feature/dashboard-carreras
   ```

5. **Ejecutar en desarrollo**
   ```bash
   # Terminal 1
   npm run server
   
   # Terminal 2
   npm run client
   ```

### **✅ Criterio de éxito:**
- El proyecto se ejecuta sin errores
- Puedes ver la aplicación en http://localhost:3000
- Tu branch está creado y configurado

---

## 🎯 **TAREA 2: Crear componente CarreraStats** (Días 2-3)

### **Objetivo:** Crear un componente que muestre estadísticas de una carrera

### **Archivo a crear:** `client/src/modules/carreras/components/CarreraStats.js`

### **Funcionalidades requeridas:**
- Mostrar estadísticas en tarjetas
- Usar colores de la carrera
- Responsive design
- Iconos apropiados

### **Estructura sugerida:**
```jsx
import React from 'react';
import { useCarreraStats } from '../hooks/useCarreraData';
import { getCarreraColor } from '../utils/carreraUtils';

const CarreraStats = ({ carreraId }) => {
  const { estadisticas, isLoading, error } = useCarreraStats(carreraId);

  // Tu código aquí...
};

export default CarreraStats;
```

### **Datos a mostrar:**
- Estudiantes activos
- Número de materias
- Profesores
- Egresados
- Edad promedio
- Porcentaje de mujeres

### **✅ Criterio de éxito:**
- Componente se renderiza correctamente
- Muestra todas las estadísticas
- Diseño responsive funciona
- Usa los colores de la carrera

---

## 🎯 **TAREA 3: Crear componente CarreraNews** (Días 4-5)

### **Objetivo:** Crear un componente que muestre noticias de una carrera

### **Archivo a crear:** `client/src/modules/carreras/components/CarreraNews.js`

### **Funcionalidades requeridas:**
- Lista de noticias
- Fechas formateadas
- Filtros por tipo
- Ordenamiento por fecha
- Responsive design

### **Estructura sugerida:**
```jsx
import React, { useState } from 'react';
import { useCarreraNoticias } from '../hooks/useCarreraData';
import { filtrarNoticiasPorTipo, ordenarNoticiasPorFecha } from '../utils/carreraUtils';

const CarreraNews = ({ carreraId }) => {
  const { noticias, isLoading, error } = useCarreraNoticias(carreraId);
  const [filtro, setFiltro] = useState('');

  // Tu código aquí...
};

export default CarreraNews;
```

### **Funcionalidades adicionales:**
- Botón para mostrar más noticias
- Filtro por tipo de noticia
- Búsqueda por título
- Indicador de prioridad

### **✅ Criterio de éxito:**
- Muestra noticias correctamente
- Filtros funcionan
- Fechas están formateadas
- Diseño es atractivo

---

## 🎯 **TAREA 4: Crear componente CarreraLinks** (Días 6-7)

### **Objetivo:** Crear un componente que muestre enlaces útiles de una carrera

### **Archivo a crear:** `client/src/modules/carreras/components/CarreraLinks.js`

### **Funcionalidades requeridas:**
- Lista de enlaces
- Iconos apropiados
- Enlaces externos e internos
- Agrupación por tipo

### **Estructura sugerida:**
```jsx
import React from 'react';
import { useCarreraEnlaces } from '../hooks/useCarreraData';
import { esEnlaceExterno } from '../utils/carreraUtils';

const CarreraLinks = ({ carreraId }) => {
  const { enlaces, isLoading, error } = useCarreraEnlaces(carreraId);

  // Tu código aquí...
};

export default CarreraLinks;
```

### **Funcionalidades adicionales:**
- Agrupar enlaces por tipo
- Indicar si es enlace externo
- Tooltip con descripción
- Botón de copiar enlace

### **✅ Criterio de éxito:**
- Enlaces funcionan correctamente
- Iconos son apropiados
- Enlaces externos se abren en nueva pestaña
- Diseño es consistente

---

## 🎯 **TAREA 5: Mejorar CarreraDashboard** (Días 8-9)

### **Objetivo:** Integrar todos los componentes en el dashboard principal

### **Archivo a modificar:** `client/src/modules/carreras/components/CarreraDashboard.js`

### **Mejoras requeridas:**
- Integrar CarreraStats
- Integrar CarreraNews
- Integrar CarreraLinks
- Mejorar el diseño general
- Agregar animaciones

### **Estructura sugerida:**
```jsx
import React from 'react';
import { useCarreraData } from '../hooks/useCarreraData';
import CarreraStats from './CarreraStats';
import CarreraNews from './CarreraNews';
import CarreraLinks from './CarreraLinks';

const CarreraDashboard = ({ carreraId }) => {
  const { carrera, isLoading, error } = useCarreraData(carreraId);

  // Tu código aquí...
};

export default CarreraDashboard;
```

### **Funcionalidades adicionales:**
- Loading states mejorados
- Error handling
- Animaciones de entrada
- Transiciones suaves

### **✅ Criterio de éxito:**
- Todos los componentes están integrados
- El diseño es coherente
- Las animaciones funcionan
- El código está limpio

---

## 🎯 **TAREA 6: Agregar funcionalidades avanzadas** (Días 10-12)

### **Objetivo:** Agregar funcionalidades que hagan el dashboard más interactivo

### **Funcionalidades sugeridas:**
1. **Búsqueda de noticias**
   - Campo de búsqueda
   - Filtro por fecha
   - Filtro por tipo

2. **Estadísticas interactivas**
   - Gráficos simples
   - Comparación con otras carreras
   - Tendencias

3. **Enlaces personalizados**
   - Agregar enlace favorito
   - Historial de enlaces visitados
   - Recomendaciones

4. **Responsive mejorado**
   - Menú móvil
   - Cards adaptativas
   - Touch gestures

### **✅ Criterio de éxito:**
- Funcionalidades funcionan correctamente
- Código está bien documentado
- Tests básicos pasan
- Performance es buena

---

## 🎯 **TAREA 7: Testing y documentación** (Días 13-14)

### **Objetivo:** Asegurar que todo funcione correctamente

### **Tareas:**
1. **Testing manual**
   - Probar en diferentes navegadores
   - Probar en diferentes tamaños de pantalla
   - Probar con diferentes datos

2. **Documentación**
   - Comentar el código
   - Actualizar README
   - Crear ejemplos de uso

3. **Optimización**
   - Revisar performance
   - Optimizar imágenes
   - Minificar CSS

### **✅ Criterio de éxito:**
- Todo funciona en diferentes entornos
- Código está bien documentado
- Performance es óptima

---

## 🎯 **TAREA 8: Integración final** (Día 15)

### **Objetivo:** Integrar tu trabajo con el proyecto principal

### **Pasos:**
1. **Commit final**
   ```bash
   git add .
   git commit -m "feat(carreras): completar dashboard de carreras"
   git push origin feature/dashboard-carreras
   ```

2. **Crear Pull Request**
   - Ve a GitHub
   - Crea Pull Request
   - Describe todos los cambios
   - Asigna reviewers

3. **Revisión y merge**
   - Responde a los comentarios
   - Haz los cambios necesarios
   - Espera la aprobación

### **✅ Criterio de éxito:**
- Pull Request está creado
- Código pasa la revisión
- Cambios están integrados

---

## 📚 **Recursos de Ayuda**

### **Documentación:**
- [React Docs](https://reactjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)

### **Archivos de referencia:**
- `CarreraDetail.js` - Componente existente
- `carrerasData.js` - Datos de ejemplo
- `carreraUtils.js` - Funciones utilitarias

### **Comandos útiles:**
```bash
# Ver cambios en tiempo real
npm run client

# Construir para producción
npm run build

# Verificar errores
npm run lint
```

---

## 🆘 **Soporte**

### **Si tienes dudas:**
1. Revisa la documentación
2. Busca en los archivos de referencia
3. Pregunta en el canal de Discord
4. Crea un issue en GitHub

### **Horarios de soporte:**
- **Lunes a Viernes**: 9:00 - 18:00
- **Sábados**: 10:00 - 14:00
- **Domingos**: Solo emergencias

---

## 🎉 **¡Éxito!**

Al completar todas estas tareas habrás:
- ✅ Aprendido React y Tailwind CSS
- ✅ Creado componentes reutilizables
- ✅ Implementado hooks personalizados
- ✅ Trabajado con datos y APIs
- ✅ Contribuido al proyecto principal

**¡Mucha suerte y disfruta aprendiendo!** 🚀





