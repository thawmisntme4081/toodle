import { AuthService } from '@/services/auth.service'
import { Request, Response, NextFunction } from 'express'

class AuthController {
  signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await AuthService.signIn(req.body)
      res.send('Ahiih')
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }
}

const authController = new AuthController()

export { authController }
