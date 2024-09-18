import { PayloadToken } from '@/types/auth.type'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class Authentication {
  static async hashPassword(password: string) {
    return await bcrypt.hash(password, 10)
  }

  static async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash)
  }

  static generateToken(payload: PayloadToken) {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })
  }
}
