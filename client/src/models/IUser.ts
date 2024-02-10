export interface IUser {
  [key: string]: string | undefined | null | string[]
  id: string
  username: string
  email: string
  avatar: string | null
  roles: string[]
}

export interface IPatchData {
  [key: string]: string | undefined
  email?: string
  password?: string
  username?: string
}
