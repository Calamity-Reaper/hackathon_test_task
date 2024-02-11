export interface IAuctionCreate {
  name: string
  description: string
  startBid: number | string
  minPitch: number | string
  categories: string[]
  closesAt: string
}
