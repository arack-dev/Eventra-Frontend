import { ApiBaseService } from '@/app/shared/services/ApiBaseService'

interface AuthResponse {
  token: string;
}

class AuthService extends ApiBaseService<any> {
  constructor() {
    super('/auth')
  }

  async register(user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    typeId: number;
  }) {
    try {
      const response = await this.http.post<AuthResponse>(`${this.resourcePath()}/register`, user);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Error al registrar usuario.');
    }
  }
  async login(credentials: {
    email: string;
    password: string
  }) {
    try {
      const response = await this.http.post<AuthResponse>(`${this.resourcePath()}/login`, credentials);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error('Error al iniciar sesión.');
    }
  }

  // Ejemplo de método para renovar el token
  // async refreshTokenAndRetry(error: AxiosError) {
  //     const newToken = await this.refreshToken(); // Implementa la lógica para renovar el token
  //     if (newToken) {
  //         // Reintentar la solicitud original con el nuevo token
  //         error.config.headers.Authorization = `Bearer ${newToken}`;
  //         return axios.request(error.config);
  //     } else {
  //         // Manejar el caso en el que no se pueda renovar el token
  //         return Promise.reject(error);
  //     }
  // }
}

export default new AuthService