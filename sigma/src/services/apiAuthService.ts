import axios, { type AxiosInstance } from "axios";
import { API_CONFIG, ENDPOINTS } from "@/config/api";

import { BaseApiService } from "@/services/baseApiService";
import { type User } from "@/models/User";

class AuthService {
  private refreshClient: AxiosInstance;
  private isRefreshing: boolean = false;
  private refreshPromise: Promise<void> | null = null;

  constructor() {
    this.refreshClient = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: API_CONFIG.HEADERS,
      withCredentials: true, // Include cookies in requests
    });
  }

  async login(username: string, password: string): Promise<User> {
    const res = await BaseApiService.post(ENDPOINTS.AUTH.LOGIN, {
      username,
      password,
    });
    return (res.data as { user: User }).user;
  }

  async logout(): Promise<void> {
    await BaseApiService.post(ENDPOINTS.AUTH.LOGOUT);
  }

  async signup(username: string, email: string, password: string): Promise<User> {
    const res = await BaseApiService.post(ENDPOINTS.AUTH.SIGNUP, {
      username,
      email,
      password,
    });
    return (res.data as { user: User }).user;
  }

  async getCurrentUser(): Promise<User> {
    const res = await BaseApiService.get(ENDPOINTS.AUTH.CURRENT_USER);
    return (res.data as { user: User }).user;
  }

  async refreshToken(): Promise<void> {
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;
    this.refreshPromise = this.refreshClient
      .post(ENDPOINTS.AUTH.REFRESH)
      .then(() => {})
      .catch((error) => {
        // Handle refresh failure (redirect to login, etc.)
        throw error;
      })
      .finally(() => {
        this.isRefreshing = false;
        this.refreshPromise = null;
      });

    return this.refreshPromise;
  }

  isTokenRefreshing(): boolean {
    return this.isRefreshing;
  }
}

export const authService = new AuthService();
