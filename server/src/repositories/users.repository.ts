import { CHECK_USER, COUNT_USERS, INSERT_USER } from '@/queries/users.query'
import { config } from 'dotenv'
config()
import { query } from '@/configs/database.config'
import { CheckUserRes } from '@/types/auth.type'

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

  async findUserByEmail(email: string) {
    const res = (await query(CHECK_USER, [email])) as CheckUserRes[]
    return res[0]
  }
}

const userRepository = new UserRepository()

export { userRepository }
