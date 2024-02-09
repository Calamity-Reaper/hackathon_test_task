import { defineStore } from 'pinia'
import type { IUser } from '@/models/IUser'
import AuthService from '@/services/AuthService'
import UsersService from '@/services/UsersService'

interface State {
  user: IUser | null
  isLogin: boolean
}

export const useUserStore = defineStore('user', {
  state: (): State => {
    return {
      isLogin: false,
      user: null
    }
  },
  actions: {
    async getMe() {
      try {
        const userData = await UsersService.getMe()
        this.user = userData.data
      } catch (e) {
        if (typeof e === 'string') {
          throw new Error(e)
        } else {
          console.log(e)
        }
      }
    },
    async login(email: string, password: string) {
      try {
        const response = await AuthService.login(email, password)
        localStorage.setItem('token', response.data.accessToken)
        this.isLogin = true
        await this.getMe()
      } catch (e) {
        if (typeof e === 'string') {
          throw new Error(e)
        } else {
          console.log(e)
        }
      }
    },
    async register(email: string, username: string, password: string) {
      try {
        const response = await AuthService.register(email, username, password)
        localStorage.setItem('token', response.data.accessToken)
        this.isLogin = true
        await this.getMe()
      } catch (e) {
        if (typeof e === 'string') {
          throw new Error(e)
        } else {
          console.log(e)
        }
      }
    },
    async logout() {
      try {
        const response = await AuthService.logout()
        localStorage.removeItem('token')
        this.isLogin = false
        await this.getMe()
      } catch (e) {
        if (typeof e === 'string') {
          throw new Error(e)
        } else {
          console.log(e)
        }
      }
    }
  }
})
