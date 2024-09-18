import { userRepository } from '@/repositories/users.repository'
import { SignIn } from '@/types/auth.type'
import { Authentication } from '@/utils/Authentication.util'

export class AuthService {
  static async initAdmin() {
    try {
      const count = await userRepository.countUser()
      if (count > 0) return

      const hashPassword = await Authentication.hashPassword(
        process.env.ADMIN_PASSWORD as string,
      )

      await userRepository.initAdmin(hashPassword)
      console.log('Created admin!')
    } catch (error) {
      console.log(error)
    }
  }

  async signIn({ email, password }: SignIn) {
    const user = await userRepository.findUserByEmail(email)
    if (!user) throw new Error('Bad credentials')

    const compare = await Authentication.comparePassword(
      password,
      user.password,
    )

    if (!compare) throw new Error('Bad credentials')

    return Authentication.generateToken({ id: user.id, role: user.role })
  }
}
