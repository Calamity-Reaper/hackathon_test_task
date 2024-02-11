import type { AxiosResponse } from 'axios'
import type { ICategory } from '@/models/ICategorie'
import $api from '@/http'

export default class CategoriesService {
  static async getAll(): Promise<AxiosResponse<ICategory[]>> {
    return $api.get<ICategory[]>('/categories')
  }
}
