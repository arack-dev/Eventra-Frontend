import axios, { AxiosError } from 'axios';
import {BaseService} from "@/services/BaseService";
import type {UserModel} from "@/models/UserModel";

class AuthService extends BaseService<any> {
    constructor() {
        super('/auth');
        this.setupInterceptors();
    }

    async register(user: any) {
        console.log("Usuario registrado:", user);
        return await this.http.post<any>(`${this.resourcePath()}/register`, user)
            .catch(this.handleError);
    }

    private setupInterceptors() {
        this.http.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.http.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {
                if (error.response && error.response.status === 401) {
                    // Aquí puedes implementar la lógica para renovar el token si expiró
                    // Por ejemplo, puedes llamar a un método para renovar el token y reintentar la solicitud original.
                    // this.refreshTokenAndRetry(error);
                }
                return Promise.reject(error);
            }
        );
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

    // Otros métodos relacionados con la autenticación...
}

export default new AuthService();