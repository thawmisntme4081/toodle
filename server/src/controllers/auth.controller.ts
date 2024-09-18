import { AuthService } from '@/services/auth.service'
import { SignIn } from '@/types/auth.type'
import { Request, Response, NextFunction } from 'express'

class AuthController {
  async signIn(req: Request, res: Response) {
    try {
      const authService = new AuthService()
      const result = await authService.signIn(req.body)

      return res.status(200).json({ token: result })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error!' })
    }
  }
}

const authController = new AuthController()

export { authController }
