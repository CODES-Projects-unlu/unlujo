import React, { useState } from 'react';
import './NewsManagement.css';

const NewsManagement = ({ news, onNewsAction }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
    categoria: 'general',
    imagen: '',
    fecha: new Date().toISOString().split('T')[0],
    fechaCaducidad: '',
    destacada: false,
    activa: true
  });

  const [filters, setFilters] = useState({
    categoria: 'all',
    estado: 'all',
    expiradas: 'hide',
    search: ''
  });

  const categorias = [
    { value: 'general', label: 'General', color: 'blue' },
    { value: 'institucional', label: 'Institucional', color: 'purple' },
    { value: 'academico', label: 'Académico', color: 'green' },
    { value: 'eventos', label: 'Eventos', color: 'orange' },
    { value: 'salud', label: 'Salud', color: 'red' },
    { value: 'deportes', label: 'Deportes', color: 'indigo' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingNews) {
      onNewsAction('update', { ...editingNews, ...formData });
    } else {
      onNewsAction('create', formData);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      titulo: '',
      contenido: '',
      categoria: 'general',
      imagen: '',
      fecha: new Date().toISOString().split('T')[0],
      fechaCaducidad: '',
      destacada: false,
      activa: true
    });
    setEditingNews(null);
    setShowForm(false);
  };

  const handleEdit = (newsItem) => {
    setEditingNews(newsItem);
    setFormData({
      titulo: newsItem.titulo,
      contenido: newsItem.contenido,
      categoria: newsItem.categoria,
      imagen: newsItem.imagen || '',
      fecha: newsItem.fecha,
      fechaCaducidad: newsItem.fechaCaducidad || '',
      destacada: newsItem.destacada || false,
      activa: newsItem.activa !== false
    });
    setShowForm(true);
  };

  const handleDelete = (newsItem) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar la noticia "${newsItem.titulo}"?`)) {
      onNewsAction('delete', newsItem);
    }
  };

  const handleToggleStatus = (newsItem) => {
    onNewsAction('toggle', newsItem);
  };

  const isExpired = (item) => {
    return item.fechaCaducidad && new Date(item.fechaCaducidad) <= new Date();
  };

  const filteredNews = news.filter(item => {
    const categoriaMatch = filters.categoria === 'all' || item.categoria === filters.categoria;
    const estadoMatch = filters.estado === 'all' || 
      (filters.estado === 'active' && item.activa !== false) ||
      (filters.estado === 'inactive' && item.activa === false);
    const searchMatch = filters.search === '' || 
      item.titulo.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.contenido.toLowerCase().includes(filters.search.toLowerCase());
    
    // Filtrar noticias expiradas según el filtro
    const expiredMatch = filters.expiradas === 'all' || 
      (filters.expiradas === 'hide' && !isExpired(item)) ||
      (filters.expiradas === 'show' && isExpired(item));
    
    return categoriaMatch && estadoMatch && searchMatch && expiredMatch;
  });

  const getCategoriaInfo = (categoria) => {
    return categorias.find(cat => cat.value === categoria) || 
           { value: categoria, label: categoria, color: 'gray' };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="news-management">
      <div className="news-management-header">
        <div className="news-management-title">
          <h2>Gestión de Noticias</h2>
          <p>Administra todas las noticias del sistema</p>
        </div>
        <div className="news-management-actions">
          <button 
            className="action-btn action-btn--primary"
            onClick={() => setShowForm(true)}
          >
            ➕ Nueva Noticia
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="news-filters">
        <div className="filter-group">
          <label>Categoría:</label>
          <select 
            value={filters.categoria} 
            onChange={(e) => setFilters(prev => ({ ...prev, categoria: e.target.value }))}
            className="filter-select"
          >
            <option value="all">Todas las categorías</option>
            {categorias.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label>Estado:</label>
          <select 
            value={filters.estado} 
            onChange={(e) => setFilters(prev => ({ ...prev, estado: e.target.value }))}
            className="filter-select"
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activas</option>
            <option value="inactive">Inactivas</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Expiradas:</label>
          <select 
            value={filters.expiradas} 
            onChange={(e) => setFilters(prev => ({ ...prev, expiradas: e.target.value }))}
            className="filter-select"
          >
            <option value="hide">Ocultar expiradas</option>
            <option value="show">Solo expiradas</option>
            <option value="all">Mostrar todas</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Buscar:</label>
          <input
            type="text"
            placeholder="Buscar en título o contenido..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="filter-input"
          />
        </div>
      </div>

      {/* Formulario de Creación/Edición */}
      {showForm && (
        <div className="news-form-overlay">
          <div className="news-form-container">
            <div className="news-form-header">
              <h3>{editingNews ? 'Editar Noticia' : 'Nueva Noticia'}</h3>
              <button 
                className="close-btn"
                onClick={resetForm}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="news-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="titulo">Título *</label>
                  <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="Título de la noticia"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="categoria">Categoría *</label>
                  <select
                    id="categoria"
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleInputChange}
                    required
                    className="form-select"
                  >
                    {categorias.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="contenido">Contenido *</label>
                <textarea
                  id="contenido"
                  name="contenido"
                  value={formData.contenido}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  className="form-textarea"
                  placeholder="Contenido de la noticia"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="imagen">URL de Imagen</label>
                  <input
                    type="url"
                    id="imagen"
                    name="imagen"
                    value={formData.imagen}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="fecha">Fecha de Publicación</label>
                  <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fechaCaducidad">Fecha de Caducidad (Opcional)</label>
                  <input
                    type="date"
                    id="fechaCaducidad"
                    name="fechaCaducidad"
                    value={formData.fechaCaducidad}
                    onChange={handleInputChange}
                    className="form-input"
                    min={formData.fecha}
                  />
                  <small className="form-help">
                    Si se especifica, la noticia desaparecerá automáticamente después de esta fecha
                  </small>
                </div>
                
                <div className="form-group">
                  {/* Espacio vacío para mantener el layout */}
                </div>
              </div>
              
              <div className="form-checkboxes">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="destacada"
                    checked={formData.destacada}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  Noticia destacada
                </label>
                
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="activa"
                    checked={formData.activa}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  Noticia activa
                </label>
              </div>
              
              <div className="form-actions">
                <button type="button" onClick={resetForm} className="action-btn action-btn--secondary">
                  Cancelar
                </button>
                <button type="submit" className="action-btn action-btn--primary">
                  {editingNews ? 'Actualizar' : 'Crear'} Noticia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista de Noticias */}
      <div className="news-list">
        {filteredNews.length === 0 ? (
          <div className="no-news">
            <div className="no-news-icon">📰</div>
            <h3>No hay noticias</h3>
            <p>No se encontraron noticias con los filtros aplicados</p>
          </div>
        ) : (
          <div className="news-grid">
            {filteredNews.map(newsItem => {
              const categoriaInfo = getCategoriaInfo(newsItem.categoria);
              const expired = isExpired(newsItem);
              
              return (
                <div key={newsItem.id} className={`news-card ${!newsItem.activa ? 'news-card--inactive' : ''} ${expired ? 'news-card--expired' : ''}`}>
                  <div className="news-card-header">
                    <div className="news-card-meta">
                      <span className={`categoria-badge categoria-${categoriaInfo.color}`}>
                        {categoriaInfo.label}
                      </span>
                      {newsItem.destacada && (
                        <span className="destacada-badge">⭐ Destacada</span>
                      )}
                      {expired && (
                        <span className="expired-badge">⏰ Expirada</span>
                      )}
                    </div>
                    <div className="news-card-actions">
                      <button 
                        className="action-btn action-btn--small"
                        onClick={() => handleEdit(newsItem)}
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button 
                        className="action-btn action-btn--small"
                        onClick={() => handleToggleStatus(newsItem)}
                        title={newsItem.activa ? 'Desactivar' : 'Activar'}
                      >
                        {newsItem.activa ? '👁️' : '👁️‍🗨️'}
                      </button>
                      <button 
                        className="action-btn action-btn--small action-btn--danger"
                        onClick={() => handleDelete(newsItem)}
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  
                  {newsItem.imagen && (
                    <div className="news-card-image">
                      <img src={newsItem.imagen} alt={newsItem.titulo} />
                    </div>
                  )}
                  
                  <div className="news-card-content">
                    <h4 className="news-card-title">{newsItem.titulo}</h4>
                    <p className="news-card-excerpt">
                      {newsItem.contenido.length > 150 
                        ? `${newsItem.contenido.substring(0, 150)}...` 
                        : newsItem.contenido
                      }
                    </p>
                    <div className="news-card-footer">
                      <div className="news-card-dates">
                        <span className="news-card-date">
                          📅 {formatDate(newsItem.fecha)}
                        </span>
                        {newsItem.fechaCaducidad && (
                          <span className="news-card-expiry">
                            ⏰ Expira: {formatDate(newsItem.fechaCaducidad)}
                          </span>
                        )}
                      </div>
                      <span className={`news-card-status ${newsItem.activa ? 'active' : 'inactive'}`}>
                        {newsItem.activa ? 'Activa' : 'Inactiva'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsManagement;
