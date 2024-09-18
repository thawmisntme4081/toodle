import { query } from '@/configs/database.config'
import { CHECK_USER, COUNT_USERS, INSERT_USER } from '@/queries/users.query'

class UserRepository {
  async countUser() {
    const res = await query(COUNT_USERS)
    const [{ count }] = res as any[]

    return count as number
  }

  async initAdmin(password: string) {
    await query(INSERT_USER, [
      null,
      'Admin',
      process.env.ADMIN_EMAIL,
      password,
      'admin',
    ])
  }

  // async findUserByEmail(email: string) {
  //   return await query(CHECK_USER, [email])
  // }
}

const userRepository = new UserRepository()

export { userRepository }
