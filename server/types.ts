import { User } from '@prisma/client'

export type ApiError = {
  message: string
  type: 'emailAlreadyInUse' | 'invalidCredentials' | 'unknown'
}

export type ApiResponse<T> =
  | {
      data: T
      error: null
    }
  | {
      data: null
      error: ApiError
    }

export type SmartUser =
  | {
      data: Omit<User, 'hashedPassword'>
      logoutFn: () => void
    }
  | {
      data: null
    }
