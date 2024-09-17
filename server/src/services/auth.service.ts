import { SignIn } from '@/types/auth.type'

class AuthService {
  static async login({ email, password }: SignIn) {}
}

const authService = new AuthService()
export { authService }
