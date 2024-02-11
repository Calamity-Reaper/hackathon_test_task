export interface IAuction {
  id: string
  name: string
  description: string
  sellerId: string
  startBid: number
  minPitch: number
  lastBid: number | null
  state: string
  images: string[]
  categories: string[]
}
