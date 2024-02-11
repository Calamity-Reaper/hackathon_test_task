import $api from '@/http'
import type { AxiosResponse } from 'axios'
import type { AuthResponse } from '@/models/response/AuthResponse'

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/login', { email, password })
  }
  static async register(
    email: string,
    username: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/signup', { email, username, password })
  }
  static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/refresh')
  }
  static async logout(): Promise<AxiosResponse<void>> {
    return $api.delete<void>('/auth/logout')
  }
}
