import type { AxiosResponse } from 'axios'
import type { IUser } from '@/models/IUser'
import $api from '@/http'

export default class UsersService {
  static async getMe(): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>('/users/me')
  }
  static async patchMe(
    username?: string,
    password?: string,
    email?: string
  ): Promise<AxiosResponse<void>> {
    return $api.patch<void>('/users/me', { username, password, email })
  }
  static async deleteMe(): Promise<AxiosResponse<void>> {
    return $api.delete<void>('/users/me')
  }
  static async postMeAvatar(img?: File): Promise<AxiosResponse<void>> {
    return $api.post<void>('/users/me/avatar', { img })
  }
  static async deleteMeAvatar(): Promise<AxiosResponse<void>> {
    return $api.delete<void>('/users/me/avatar')
  }
  static async deleteUserById(id: string): Promise<AxiosResponse<void>> {
    return $api.delete<void>(`/users/${id}`)
  }
  static async deleteUserAvatarById(id: string): Promise<AxiosResponse<void>> {
    return $api.delete<void>(`/users/${id}/avatar`)
  }
}
