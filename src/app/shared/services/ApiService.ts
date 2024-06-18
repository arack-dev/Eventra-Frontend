import axios, { type AxiosInstance, AxiosError } from 'axios';

interface AuthResponse {
  token: string;
}

class ApiService {
  private static instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  static setupInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
          // Handle token refresh logic here if needed
        }
        return Promise.reject(error);
      }
    );
  }

  static async login(credentials: {
    email: string;
    password: string
  }) {
    try {
      const response = await this.instance.post<AuthResponse>('/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error('Error al iniciar sesión.');
    }
  }

  static async register(user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    typeId: number;
  }) {
    try {
      const response = await this.instance.post<AuthResponse>('/auth/register', user);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Error al registrar usuario.');
    }
  }

  // Other API methods...
}

// Setup interceptors
ApiService.setupInterceptors();

export default ApiService;
