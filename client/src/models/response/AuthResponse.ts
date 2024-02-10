import type { IUser } from '@/models/IUser'

export interface AuthResponse {
  accessToken: string
  user: IUser
}
