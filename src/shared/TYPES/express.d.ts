import { JwtPayload } from '../../modules/AUTH/domain/jwt.payload'

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

export {}
