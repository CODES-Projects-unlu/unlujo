import React from 'react';
import './PendingCertificates.css';

const PendingCertificates = ({ certificates, onCertificateAction }) => {
  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'high';
    if (confidence >= 70) return 'medium';
    return 'low';
  };

  const getConfidenceText = (confidence) => {
    if (confidence >= 90) return 'Alta confianza';
    if (confidence >= 70) return 'Confianza media';
    return 'Baja confianza';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="pending-certificates">
      <div className="pending-certificates-header">
        <h2 className="pending-certificates-title">
          Certificados Pendientes de Verificación
        </h2>
        <div className="pending-certificates-count">
          {certificates.length} pendientes
        </div>
      </div>

      {certificates.length === 0 ? (
        <div className="no-certificates">
          <div className="no-certificates-icon">✅</div>
          <h3>No hay certificados pendientes</h3>
          <p>Todos los certificados han sido procesados</p>
        </div>
      ) : (
        <div className="certificates-list">
          {certificates.map((cert) => (
            <div key={cert.id} className="certificate-card">
              <div className="certificate-header">
                <div className="certificate-user">
                  <div className="certificate-avatar">
                    {cert.userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="certificate-user-info">
                    <h4 className="certificate-user-name">{cert.userName}</h4>
                    <p className="certificate-user-email">{cert.userEmail}</p>
                  </div>
                </div>
                <div className="certificate-meta">
                  <span className="certificate-date">
                    {formatDate(cert.uploadedAt)}
                  </span>
                  <span className={`confidence-badge confidence-${getConfidenceColor(cert.confidence)}`}>
                    {cert.confidence}% - {getConfidenceText(cert.confidence)}
                  </span>
                </div>
              </div>

              <div className="certificate-content">
                <div className="certificate-details">
                  <div className="detail-row">
                    <span className="detail-label">Carrera:</span>
                    <span className="detail-value">{cert.carreraId}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Sede:</span>
                    <span className="detail-value">{cert.sedeId}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Estado:</span>
                    <span className="detail-value status-pending">Pendiente</span>
                  </div>
                </div>

                {cert.extractedData && (
                  <div className="extracted-data">
                    <h5>Datos Extraídos del Certificado:</h5>
                    <div className="extracted-grid">
                      <div className="extracted-item">
                        <span className="extracted-label">Nombre:</span>
                        <span className="extracted-value">{cert.extractedData.nombre}</span>
                      </div>
                      <div className="extracted-item">
                        <span className="extracted-label">DNI:</span>
                        <span className="extracted-value">{cert.extractedData.dni}</span>
                      </div>
                      <div className="extracted-item">
                        <span className="extracted-label">Legajo:</span>
                        <span className="extracted-value">{cert.extractedData.legajo}</span>
                      </div>
                      <div className="extracted-item">
                        <span className="extracted-label">Carrera:</span>
                        <span className="extracted-value">{cert.extractedData.carrera}</span>
                      </div>
                      <div className="extracted-item">
                        <span className="extracted-label">Ciclo Lectivo:</span>
                        <span className="extracted-value">{cert.extractedData.cicloLectivo}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="certificate-actions">
                <button 
                  className="action-btn action-btn--success"
                  onClick={() => onCertificateAction('approve', cert)}
                >
                  ✅ Aprobar
                </button>
                <button 
                  className="action-btn action-btn--warning"
                  onClick={() => onCertificateAction('review', cert)}
                >
                  🔍 Revisar
                </button>
                <button 
                  className="action-btn action-btn--danger"
                  onClick={() => onCertificateAction('reject', cert)}
                >
                  ❌ Rechazar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingCertificates;
