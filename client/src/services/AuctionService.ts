import $api from '@/http'
import type { AxiosResponse } from 'axios'
import type { IAuction } from '@/models/IAuction'
import type { IBid } from '@/models/IBid'

export default class AuctionService {
  static async create(data: FormData): Promise<AxiosResponse<IAuction>> {
    return $api.post<IAuction>('/lots', data)
  }
  static async getAll(): Promise<AxiosResponse<IAuction[]>> {
    return $api.get<IAuction[]>(`/lots`)
  }
  static async getById(id: string): Promise<AxiosResponse<IAuction>> {
    return $api.get<IAuction>(`/lots/${id}`)
  }
  static async postBid(lotId: string, amount: number): Promise<AxiosResponse<void>> {
    return $api.post<void>(`/bids`, { lotId, amount })
  }
  static async lotBids(lotId: string): Promise<AxiosResponse<IBid[]>> {
    return $api.get<IBid[]>(`/lots/${lotId}/bids`)
  }
  static async deleteLot(lotId: string): Promise<AxiosResponse<void>> {
    return $api.delete<void>(`/lots/${lotId}`)
  }
  static async patchLot(lotId: string, data: FormData): Promise<AxiosResponse<IAuction>> {
    return $api.patch<IAuction>(`/lots/${lotId}`, data)
  }
}
