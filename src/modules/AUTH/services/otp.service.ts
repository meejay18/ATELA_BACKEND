import crypto from 'crypto'

export const otpService = {
  generateOtp: (length = 6): string => {
    const min = Math.pow(10, length - 1)
    const max = Math.pow(10, length) - 1

    return Math.floor(min + Math.random() * (max - min)).toString()
  },

  hashOtp: (otp: string): string => {
    return crypto.createHash('sha256').update(otp).digest('hex')
  },

  verifyOtp: (otp: string, hash: string): boolean => {
    const hashed = crypto.createHash('sha256').update(otp).digest('hex')

    return hashed === hash
  },
}
