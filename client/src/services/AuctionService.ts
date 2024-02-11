import $api from '@/http'
import type { AxiosResponse } from 'axios'
import type { IAuction } from '@/models/IAuction'

export default class AuctionService {
  static async create(data: FormData): Promise<AxiosResponse<IAuction>> {
    return $api.post<IAuction>('/lots', data)
  }
}
