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
  getters: {
    getCurrentAuction(state): IAuction {
      return state.currentAuction
    }
  },
  actions: {
    async createAuction(data: FormData): Promise<string | undefined> {
      try {
        const auctionData = await AuctionService.create(data)
        return auctionData.data.id
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(e.response?.data.message)
        } else {
          console.log(e)
        }
      }
    },
    async patchAuction(id: string, data: FormData) {
      try {
        const auctionData = (await AuctionService.patchLot(id, data)).data
        this.currentAuction = auctionData
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
    },
    async getById(id: string) {
      try {
        const auctionData = await AuctionService.getById(id)
        this.currentAuction = auctionData.data
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(e.response?.data.message)
        } else {
          console.log(e)
        }
      }
    },
    async getAllLots() {
      try {
        const auctionsData = await AuctionService.getAll()
        this.auctions = auctionsData.data
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
