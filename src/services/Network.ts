import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

class Network {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10_000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use(
      this.handleRequest,
      this.handleError,
    );

    this.axiosInstance.interceptors.response.use(
      this.handleResponse,
      this.handleError,
    );
  }

  private handleRequest(
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig {
    return config;
  }

  private handleResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }

  public async get<T>(url: string, params?: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(url, {
        params,
      });
      return response.data;
    } catch (error) {
      throw this.processError(error);
    }
  }

  private processError(error: any): Error {
    if (error.response) {
      return new Error(
        `Error ${error.response.status} - ${error.response.data.message}`,
      );
    } else if (error.request) {
      return new Error('Error: No response received from server');
    } else {
      return new Error(`Error: ${error.message}`);
    }
  }
}

export default Network;
