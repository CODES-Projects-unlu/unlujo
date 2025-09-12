import React from 'react';
import './StatsCards.css';

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Usuarios',
      value: stats.totalUsers,
      icon: '👥',
      color: 'blue',
      change: `+${stats.growthRate}%`,
      changeType: 'positive'
    },
    {
      title: 'Usuarios Verificados',
      value: stats.verifiedUsers,
      icon: '✅',
      color: 'green',
      change: `${stats.verificationRate}%`,
      changeType: 'positive'
    },
    {
      title: 'Pendientes Verificación',
      value: stats.pendingVerification,
      icon: '⏳',
      color: 'orange',
      change: 'Requiere atención',
      changeType: 'warning'
    },
    {
      title: 'Usuarios Activos',
      value: stats.activeUsers,
      icon: '🟢',
      color: 'purple',
      change: `${stats.engagementRate}%`,
      changeType: 'positive'
    },
    {
      title: 'Noticias Publicadas',
      value: stats.totalNews,
      icon: '📰',
      color: 'indigo',
      change: `${stats.activeNews} activas`,
      changeType: 'positive'
    },
    {
      title: 'Noticias Inactivas',
      value: stats.inactiveNews,
      icon: '📝',
      color: 'gray',
      change: 'Requiere revisión',
      changeType: 'warning'
    }
  ];

  return (
    <div className="stats-cards">
      {cards.map((card, index) => (
        <div key={index} className={`stats-card stats-card--${card.color}`}>
          <div className="stats-card__header">
            <div className="stats-card__icon">
              <span className="stats-card__emoji">{card.icon}</span>
            </div>
            <div className="stats-card__change">
              <span className={`stats-card__change-text stats-card__change-text--${card.changeType}`}>
                {card.change}
              </span>
            </div>
          </div>
          <div className="stats-card__content">
            <h3 className="stats-card__title">{card.title}</h3>
            <div className="stats-card__value">{card.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
