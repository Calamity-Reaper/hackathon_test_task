import { defineStore } from 'pinia'
import type { IAuction } from '@/models/IAuction'
import { AxiosError } from 'axios'
import AuctionService from '@/services/AuctionService'
import type { ICategory } from '@/models/ICategorie'
import CategoriesService from '@/services/CategoriesService'
interface State {
  auctions: IAuction[]
  currentAuction: IAuction
  categories: ICategory[]
}

export const useAuctionsStore = defineStore('auctions', {
  state: (): State => {
    return {
      auctions: [],
      currentAuction: {} as IAuction,
      categories: []
    }
  },
  actions: {
    async createAuction(data: FormData) {
      try {
        const auctionData = await AuctionService.create(data)
        this.currentAuction = auctionData.data
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(e.response?.data.message)
        } else {
          console.log(e)
        }
      }
    },
    async getAllCategories() {
      try {
        const categories = await CategoriesService.getAll()
        this.categories = [...categories.data]
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(e.response?.data.message)
        } else {
          console.log(e)
        }
      }
    }
  }
})
