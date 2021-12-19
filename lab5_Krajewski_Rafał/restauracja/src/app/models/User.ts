export class User{
    email: string
    role: number
    uid?: any

    constructor(email: string, role: number, uid?: any) {
        this.email = email
        this.role = role
        this.uid = uid
    }
  }