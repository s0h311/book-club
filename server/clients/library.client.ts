import { libraryUrl } from '../configs/http.config'
import { get } from './http.client'
import type { Book, BookResponse } from '../../types/book.type'
import { DATA_TYPE, type GetResponse } from '../../types/httpClient.type'
import * as fs from 'node:fs/promises'

export async function findAllBooks(): Promise<Book[]> {
  const bookReponse: GetResponse<BookResponse> = await get<BookResponse>({
    url: libraryUrl,
    callOrigin: 'findAllBooks',
    dataType: DATA_TYPE.JSON,
  })

  if (bookReponse.error) {
    // TODO handle error
    return []
  }

  /* try {
    await fs.writeFile('./temp/books.json', JSON.stringify(bookReponse.data, null, 2))
  } catch (e) {
    console.error(e)
  } */

  const books: Book[] = bookReponse.data.itemsList.map((book, index) => ({
    asin: book.asin,
    title: book.title,
    highlights: [],
    cover: `image${index}.png`,
  }))

  return books
}
