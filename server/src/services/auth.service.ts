import { userRepository } from '@/repositories/users.repository'
import { SignIn } from '@/types/auth.type'
import bcrypt from 'bcrypt'

export class AuthService {
  static async initAdmin() {
    try {
      const count = await userRepository.countUser()
      if (count > 0) return

      const hashPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD as string,
        10,
      )

      await userRepository.initAdmin(hashPassword)
      console.log('Created admin!')
    } catch (error) {
      console.log(error)
    }
  }

  static async signIn({ email, password }: SignIn) {
    try {
      // const user = userRepository.findUserByEmail(email)
      // console.log(user)
      return { message: 'Sign in successfully!' }
    } catch (error) {
      console.log(error)
      return { message: '' }
    }
  }
}
