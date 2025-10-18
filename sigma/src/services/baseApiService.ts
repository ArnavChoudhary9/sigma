import axios, {
  type AxiosInstance,
  type AxiosResponse,
} from "axios";

import { API_CONFIG } from "@/config/api";
import { authService } from "@/services/apiAuthService";

class BaseAPIService {
  protected api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: API_CONFIG.HEADERS,
      withCredentials: true, // Include cookies in requests
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        const originalConfig = error.config;
        const status = error?.response?.status;

        if (status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          
          try {
            await authService.refreshToken();
            return this.api(originalConfig);
          } catch (refreshError) {
            // Refresh failed, handle accordingly
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, params?: Record<string, unknown>): Promise<AxiosResponse<T>> {
    return this.api.get<T>(url, { params });
  }

  async post<T>(url: string, data?: unknown): Promise<AxiosResponse<T>> {
    return this.api.post<T>(url, data);
  }

  async put<T>(url: string, data?: unknown): Promise<AxiosResponse<T>> {
    return this.api.put<T>(url, data);
  }

  async delete<T>(url: string): Promise<AxiosResponse<T>> {
    return this.api.delete<T>(url);
  }
}

export const BaseApiService = new BaseAPIService();
