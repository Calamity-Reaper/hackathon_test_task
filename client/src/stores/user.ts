import { defineStore } from 'pinia'
import type { IPatchData, IUser } from '@/models/IUser'
import AuthService from '@/services/AuthService'
import UsersService from '@/services/UsersService'
import { AxiosError } from 'axios'

interface State {
  user: IUser
  isLogin: boolean
}

export const useUserStore = defineStore('user', {
  state: (): State => {
    return {
      isLogin: false,
      user: {} as IUser
    }
  },
  actions: {
    async getMe() {
      try {
        const userData = await UsersService.getMe()
        this.user = userData.data
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(e.response?.data.message)
        } else {
          console.log(e)
        }
      }
    },
    async login(email: string, password: string) {
      try {
        const response = await AuthService.login(email, password)
        localStorage.setItem('token', response.data.accessToken)
        this.user = response.data.user
        this.isLogin = true
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(e.response?.data.message)
        } else {
          console.log(e)
        }
      }
    },
    async register(email: string, username: string, password: string) {
      try {
        const response = await AuthService.register(email, username, password)
        localStorage.setItem('token', response.data.accessToken)
        this.user = response.data.user
        this.isLogin = true
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(e.response?.data.message)
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
        this.user = {} as IUser
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(e.response?.data.message)
        } else {
          console.log(e)
        }
      }
    },
    async refresh() {
      try {
        const response = await AuthService.refresh()
        localStorage.setItem('token', response.data.accessToken)
        this.user = response.data.user
        this.isLogin = true
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(e.response?.data.message)
        } else {
          console.log(e)
        }
      }
    },
    async patchMe(patchData: IPatchData) {
      try {
        const response = await UsersService.patchMe(patchData)
        for (const key in patchData) {
          if (patchData[key] && key !== 'password') {
            this.user[key] = patchData[key]
          }
        }
      } catch (e) {
        if (e instanceof AxiosError) {
          throw new Error(e.response?.data.message)
        } else {
          console.log(e)
        }
      }
    },
    async postMeAvatar(avatar: FormData) {
      try {
        const response = await UsersService.postMeAvatar(avatar)
        this.user.avatar = response.data as unknown as string
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
