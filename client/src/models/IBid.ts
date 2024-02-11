export interface IBid {
  id: string
  userId: string
  lotId: string
  amount: number
  createdAt: Date
  user: {
    username: string
    avatar: string | null
  }
}
