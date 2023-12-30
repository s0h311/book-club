import { headers } from '../configs/http.config'
import { DATA_TYPE, type DataType, type GetResponse } from '../types/httpClient.type'

type HttpClientConfigs = {
  url: string
  enableLogging?: boolean
  callOrigin: string
  dataType: DataType
}

export async function get<T>({
  url,
  enableLogging = true,
  callOrigin,
  dataType,
}: HttpClientConfigs): Promise<GetResponse<T>> {
  const response: Response = await fetch(url, {
    method: 'GET',
    headers,
  })

  const status: number = response.status

  if (enableLogging) {
    console.info(`[${callOrigin}] ${url} - ${status}`)
  }

  if (status >= 400) {
    console.error(`[${callOrigin}] status: ${status}`)
    return {
      data: null,
      error: {
        message: '',
        status,
      },
    }
  }

  let data: T = '' as T

  if (dataType === DATA_TYPE.HTML) {
    data = (await response.text()) as T
  }

  if (dataType === DATA_TYPE.JSON) {
    data = await response.json()
  }

  return {
    data,
    error: null,
  }
}
