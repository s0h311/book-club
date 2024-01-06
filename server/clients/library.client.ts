import { libraryUrl } from '../configs/http.config'
import { get } from './http.client'
import type { Book, BookResponse } from '../../types/book.type'
import { DATA_TYPE, type GetResponse } from '../../types/httpClient.type'
import fs from 'fs'

export async function findAllBooks(): Promise<Book[]> {
  const bookReponse: GetResponse<BookResponse> = await get<BookResponse>({
    url: libraryUrl,
    callOrigin: 'findAllHighlights',
    dataType: DATA_TYPE.JSON,
  })

  if (bookReponse.error) {
    // TODO handle error
    return []
  }

  /*   fs.writeFile('./temp/books.json', JSON.stringify(bookReponse.data, null, 2), (err) => {
    if (err) {
      // TODO handle error
    }
  }) */

  const books: Book[] = bookReponse.data.itemsList.map((book, index) => ({
    asin: book.asin,
    title: book.title,
    highlights: [],
    cover: `image${index}.png`,
  }))

  return books
}
