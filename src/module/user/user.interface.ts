export interface IUser {
  name: {
    first: string
    last: string
  }
  age: number
  email: string
  photo?: string | null
  role: 'user' | 'admin'
  userStatus: 'active' | 'inactive'
}
