import type { AxiosResponse } from 'axios'
import type { IPatchData, IUser } from '@/models/IUser'
import $api from '@/http'

export default class UsersService {
  static async getUser(id: string): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>(`/users/${id}`)
  }
  static async getMe(): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>('/users/me')
  }
  static async patchMe(patchData: IPatchData): Promise<AxiosResponse<void>> {
    return $api.patch<void>('/users/me', patchData)
  }
  static async deleteMe(): Promise<AxiosResponse<void>> {
    return $api.delete<void>('/users/me')
  }
  static async postMeAvatar(img: FormData): Promise<AxiosResponse<void>> {
    return $api.post<void>('/users/me/avatar', img)
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
