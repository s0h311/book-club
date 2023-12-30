type GetError = {
  message: string
  status: number
}

export type GetResponse<T> =
  | {
      data: null
      error: GetError
    }
  | {
      data: T
      error: null
    }

export const DATA_TYPE = {
  HTML: 'HTML',
  JSON: 'JSON',
} as const

export type DataType = keyof typeof DATA_TYPE

export type HTML = string
