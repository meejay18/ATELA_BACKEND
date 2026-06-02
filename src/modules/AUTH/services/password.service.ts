import argon2 from 'argon2'

export const passwordService = {
  hash: async (password: string): Promise<string> => {
    return argon2.hash(password)
  },

  compare: async (password: string, hash: string): Promise<boolean> => {
    return argon2.verify(hash, password)
  },
}
