import type { ICategory } from '@/models/ICategorie'

export interface IAuctionPatch {
  [key: string]: string | undefined | null | number | ICategory[] | number[]
  name: string | undefined
  description: string | undefined
  startBid: number | string | undefined
  minPitch: number | string | undefined
  categories: ICategory[] | number[] | undefined
  closesAt: string | undefined
}
