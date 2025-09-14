// Componente para mostrar mensajes de error
import React from 'react';

const ErrorMessage = ({ mensaje, onReintentar, tipo = 'error' }) => {
  const tipos = {
    error: {
      icon: '⚠️',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    warning: {
      icon: '⚠️',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    info: {
      icon: 'ℹ️',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    }
  };

  const config = tipos[tipo] || tipos.error;

  return (
    <div className={`max-w-md mx-auto p-6 rounded-2xl border ${config.bgColor} ${config.borderColor}`}>
      <div className="flex items-center space-x-3 mb-4">
        <span className="text-2xl">{config.icon}</span>
        <h3 className={`text-lg font-semibold ${config.color}`}>
          {tipo === 'error' ? 'Error' : tipo === 'warning' ? 'Advertencia' : 'Información'}
        </h3>
      </div>
      
      <p className={`text-sm ${config.color} mb-4`}>
        {mensaje}
      </p>
      
      {onReintentar && (
        <button
          onClick={onReintentar}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            tipo === 'error'
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : tipo === 'warning'
              ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Reintentar
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
