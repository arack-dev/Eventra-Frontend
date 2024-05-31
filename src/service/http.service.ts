import axios from 'axios';

const http = axios.create({
    baseURL: "https://my-json-server.typicode.com/arack-api/website/",
});

export class HttpService {
    static async get(endpoint, cancelToken) {
        try {
            const response = await http.get(endpoint, { cancelToken });
            return response.data;
        } catch (error) {
            console.log('Error en la solicitud GET:', error);
            throw error;
        }
    }

    static async post(endpoint, data, cancelToken) {
        try {
            const response = await http.post(endpoint, data, { cancelToken });
            return response.data;
        } catch (error) {
            console.log('Error en la solicitud POST:', error);
            throw error;
        }
    }

    static async put(endpoint, data, cancelToken) {
        try {
            const response = await http.put(endpoint, data, { cancelToken });
            return response.data;
        } catch (error) {
            console.log('Error en la solicitud PUT:', error);
            throw error;
        }
    }

    static async delete(endpoint, cancelToken) {
        try {
            const response = await http.delete(endpoint, { cancelToken });
            return response.data;
        } catch (error) {
            console.log('Error en la solicitud DELETE:', error);
            throw error;
        }
    }
}