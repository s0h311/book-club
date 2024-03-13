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
