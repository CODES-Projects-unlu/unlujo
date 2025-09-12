# 📁 Plantilla para Nuevo Módulo

## Estructura de Archivos

```
modules/nuevo-modulo/
├── components/          # Componentes específicos del módulo
│   ├── ComponentePrincipal.js
│   ├── ComponenteSecundario.js
│   └── index.js
├── hooks/              # Hooks personalizados
│   ├── useNuevoModulo.js
│   └── index.js
├── utils/              # Utilidades y helpers
│   ├── moduloUtils.js
│   └── index.js
├── constants/          # Constantes del módulo
│   ├── moduloConfig.js
│   └── index.js
├── styles/             # Estilos específicos (opcional)
│   └── modulo.css
└── index.js           # Punto de entrada del módulo
```

## Archivo index.js del Módulo

```javascript
// Módulo [Nombre] - UNLujo PWA
// Responsable: [Nombre del colaborador]
// Descripción: [Descripción del módulo]

// Componentes
export { default as ComponentePrincipal } from './components/ComponentePrincipal';
export { default as ComponenteSecundario } from './components/ComponenteSecundario';

// Hooks
export { useNuevoModulo } from './hooks/useNuevoModulo';

// Utilidades
export { utilidad1, utilidad2 } from './utils/moduloUtils';

// Constantes
export { CONFIG } from './constants/moduloConfig';
```

## Convenciones de Naming

- **Componentes**: PascalCase (ej: `MiComponente.js`)
- **Hooks**: camelCase con prefijo 'use' (ej: `useMiHook.js`)
- **Utilidades**: camelCase (ej: `miUtilidad.js`)
- **Constantes**: UPPER_SNAKE_CASE (ej: `MI_CONSTANTE`)

## Ejemplo de Componente

```javascript
import React from 'react';

const MiComponente = ({ prop1, prop2 }) => {
  return (
    <div className="mi-componente">
      <h2>{prop1}</h2>
      <p>{prop2}</p>
    </div>
  );
};

export default MiComponente;
```

## Ejemplo de Hook

```javascript
import { useState, useEffect } from 'react';

const useMiHook = (parametro) => {
  const [estado, setEstado] = useState(null);
  
  useEffect(() => {
    // Lógica del hook
  }, [parametro]);
  
  return { estado, setEstado };
};

export { useMiHook };
```

## Ejemplo de Utilidad

```javascript
// utils/miUtilidad.js
export const formatearDatos = (datos) => {
  return datos.map(item => ({
    ...item,
    formateado: true
  }));
};

export const validarInput = (input) => {
  return input && input.length > 0;
};
```

## Ejemplo de Constantes

```javascript
// constants/miConfig.js
export const CONFIG = {
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  TIMEOUT: 5000,
  RETRY_ATTEMPTS: 3
};

export const ESTADOS = {
  CARGANDO: 'cargando',
  EXITOSO: 'exitoso',
  ERROR: 'error'
};
```
