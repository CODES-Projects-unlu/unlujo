// Componente de loading spinner
import React from 'react';

const LoadingSpinner = ({ mensaje = 'Cargando...', tamaño = 'md' }) => {
  const tamaños = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${tamaños[tamaño] || tamaños.md} mb-4`}></div>
      <p className="text-gray-600 text-sm">{mensaje}</p>
    </div>
  );
};

export default LoadingSpinner;
