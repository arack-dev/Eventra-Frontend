import axios, {AxiosError} from 'axios';

export class BaseService<T> {
    protected basePath = import.meta.env.VITE_APP_API_BASE_URL;
    protected http= axios.create({
        baseURL: this.basePath,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    protected readonly resourceEndpoint: string;

    constructor(resourceEndpoint: string) {
        this.resourceEndpoint = resourceEndpoint;
    }

    protected resourcePath() {
        return `${(this.basePath)}${this.resourceEndpoint}`;
    }

    protected handleError(error: AxiosError) {
        if (error.response) {
            console.error(`Backend returned code ${error.response.status}, body was: ${error.response.data}`);
        } else if (error.request) {
            console.error(`No response received: ${error.request}`);
        } else {
            console.error(`Error: ${error.message}`);
        }
        return Promise.reject(new Error("Something happened with the request, please try again later."));
    };

    async create(item: T) {
        return await this.http.post<T>(this.resourcePath(), item)
            .catch(this.handleError)
    }

    async delete(id: string | number) {
        return await this.http.delete<void>(`${this.resourcePath()}/${id}`)
            .catch(this.handleError);
    }

    async update(id: string | number, item: T) {
        return await this.http.put<T>(`${this.resourcePath()}/${id}`, item)
            .catch(this.handleError);
    }

    async getAll() {
        return await this.http.get<T[]>(this.resourcePath())
            .catch(this.handleError);
    }
}