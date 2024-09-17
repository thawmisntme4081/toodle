import { Request, Response, NextFunction } from 'express'

class AuthController {
  signIn = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)

    res.send('Sign In')
  }
}

const authController = new AuthController()

export { authController }
