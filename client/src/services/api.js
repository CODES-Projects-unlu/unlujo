// Servicio de API para comunicación con el backend
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://server-iv9mni0by-rizzofs-projects.vercel.app' 
  : 'http://localhost:5000';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Método genérico para hacer requests
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    console.log('🌐 Haciendo petición a:', url);
    console.log('🌐 Método:', options.method || 'GET');
    console.log('🌐 Body:', options.body);
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Agregar token de autenticación si existe
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en la petición');
      }

      return data;
    } catch (error) {
      console.error('Error en API request:', error);
      throw error;
    }
  }

  // Métodos de autenticación
  async login(email, password) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData) {
    console.log('🔍 Enviando datos de registro:', userData);
    console.log('🔍 URL completa:', `${this.baseURL}/api/auth/register`);
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getProfile() {
    return this.request('/api/auth/profile');
  }

  async updateProfile(userData) {
    return this.request('/api/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async uploadProfilePhoto(photoFile) {
    const formData = new FormData();
    formData.append('photo', photoFile);

    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No token found');

    const response = await fetch(`${this.baseURL}/api/auth/profile/photo`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en la petición');
    }

    return data;
  }

  async getCarreras() {
    return this.request('/api/carreras');
  }

  async getDbStatus() {
    return this.request('/api/db-status');
  }

  // Métodos para noticias y otros datos
  async getNoticias() {
    return this.request('/api/noticias');
  }

  async getStats() {
    return this.request('/api/stats');
  }
}

// Crear instancia singleton
const apiService = new ApiService();

export default apiService;
