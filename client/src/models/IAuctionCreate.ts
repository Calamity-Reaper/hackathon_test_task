import type { ICategory } from '@/models/ICategorie'

export interface IAuctionCreate {
  name: string
  description: string
  startBid: number | string
  minPitch: number | string
  categories: ICategory[] | number[]
  closesAt: string
}
