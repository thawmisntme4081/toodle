import { config } from 'dotenv'
config()
import { query } from '@/configs/database.config'
import { CheckUserRes } from '@/types/auth.type'
import { USERS_ROLES } from '@/enums/userRoles.enum'

class UserRepository {
  async countUser() {
    const countUserQuery = 'SELECT COUNT(*) FROM users'
    const res = await query(countUserQuery)
    const [{ count }] = res as any[]

    return count as number
  }

  async initAdmin(password: string) {
    const insertAdminQuery =
      'INSERT INTO users (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, $5)'
    await query(insertAdminQuery, [
      null,
      'Admin',
      process.env.ADMIN_EMAIL,
      password,
      USERS_ROLES.ADMIN,
    ])
  }

  async findUserByEmail(email: string) {
    const findUserByEmailQuery =
      'SELECT id, password, role FROM users WHERE email = $1'
    const res = (await query(findUserByEmailQuery, [email])) as CheckUserRes[]
    return res[0]
  }
}

const userRepository = new UserRepository()

export { userRepository }
