import React, { useState } from 'react';
import './UserTable.css';

const UserTable = ({ users, onUserAction }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const getRoleBadge = (role) => {
    const roleConfig = {
      super_admin: { text: 'Super Admin', class: 'role-super-admin' },
      carrera_admin: { text: 'Admin Carrera', class: 'role-carrera-admin' },
      estudiante: { text: 'Estudiante', class: 'role-estudiante' }
    };
    return roleConfig[role] || { text: role, class: 'role-default' };
  };

  const getStatusBadge = (isVerified) => {
    return isVerified 
      ? { text: 'Verificado', class: 'status-verified' }
      : { text: 'Pendiente', class: 'status-pending' };
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredUsers = users.filter(user => {
    const roleMatch = filterRole === 'all' || user.role === filterRole;
    const statusMatch = filterStatus === 'all' || 
      (filterStatus === 'verified' && user.isVerified) ||
      (filterStatus === 'pending' && !user.isVerified);
    return roleMatch && statusMatch;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (sortField === 'createdAt') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="user-table-container">
      <div className="user-table-header">
        <h2 className="user-table-title">Gestión de Usuarios</h2>
        <div className="user-table-filters">
          <select 
            value={filterRole} 
            onChange={(e) => setFilterRole(e.target.value)}
            className="filter-select"
          >
            <option value="all">Todos los roles</option>
            <option value="super_admin">Super Admin</option>
            <option value="carrera_admin">Admin Carrera</option>
            <option value="estudiante">Estudiante</option>
          </select>
          
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">Todos los estados</option>
            <option value="verified">Verificados</option>
            <option value="pending">Pendientes</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th 
                className="sortable" 
                onClick={() => handleSort('name')}
              >
                Usuario
                <span className={`sort-icon ${sortField === 'name' ? sortDirection : ''}`}>
                  ↕️
                </span>
              </th>
              <th 
                className="sortable" 
                onClick={() => handleSort('email')}
              >
                Email
                <span className={`sort-icon ${sortField === 'email' ? sortDirection : ''}`}>
                  ↕️
                </span>
              </th>
              <th>Rol</th>
              <th>Carrera/Sede</th>
              <th>Estado</th>
              <th 
                className="sortable" 
                onClick={() => handleSort('createdAt')}
              >
                Registro
                <span className={`sort-icon ${sortField === 'createdAt' ? sortDirection : ''}`}>
                  ↕️
                </span>
              </th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => {
              const roleBadge = getRoleBadge(user.role);
              const statusBadge = getStatusBadge(user.isVerified);
              
              return (
                <tr key={user.id} className="user-row">
                  <td className="user-info">
                    <div className="user-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-details">
                      <div className="user-name">{user.name}</div>
                      <div className="user-id">ID: {user.id}</div>
                    </div>
                  </td>
                  <td className="user-email">{user.email}</td>
                  <td>
                    <span className={`role-badge ${roleBadge.class}`}>
                      {roleBadge.text}
                    </span>
                  </td>
                  <td className="user-location">
                    {user.carreraId && (
                      <div className="location-info">
                        <span className="carrera">{user.carreraId}</span>
                        <span className="sede">{user.sedeId}</span>
                      </div>
                    )}
                  </td>
                  <td>
                    <span className={`status-badge ${statusBadge.class}`}>
                      {statusBadge.text}
                    </span>
                  </td>
                  <td className="user-date">{formatDate(user.createdAt)}</td>
                  <td className="user-actions">
                    <button 
                      className="action-btn action-btn--primary"
                      onClick={() => onUserAction('view', user)}
                    >
                      👁️
                    </button>
                    <button 
                      className="action-btn action-btn--secondary"
                      onClick={() => onUserAction('edit', user)}
                    >
                      ✏️
                    </button>
                    {!user.isVerified && (
                      <button 
                        className="action-btn action-btn--success"
                        onClick={() => onUserAction('verify', user)}
                      >
                        ✅
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="table-footer">
        <div className="table-info">
          Mostrando {sortedUsers.length} de {users.length} usuarios
        </div>
      </div>
    </div>
  );
};

export default UserTable;
