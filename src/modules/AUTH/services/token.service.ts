import jwt from 'jsonwebtoken'
import { env } from '../../../shared/CONFIG/env'
import { JwtPayload } from '../domain/jwt.payload'

export const tokenService = {
  generateAccessToken: (payload: JwtPayload): string => {
    return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
      expiresIn: env.JWT_ACCESS_EXPIRES as jwt.SignOptions['expiresIn'],
    })
  },

  generateRefreshToken: (payload: JwtPayload): string => {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
      expiresIn: env.JWT_REFRESH_EXPIRES as jwt.SignOptions['expiresIn'],
    })
  },

  verifyAccessToken: (token: string): JwtPayload => {
    return jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtPayload
  },

  verifyRefreshToken: (token: string): JwtPayload => {
    return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload
  },
}
