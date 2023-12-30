import { findAllHighlights } from '../clients/highlight.client'
import { findAllBooks } from '../clients/library.client'
import { Book } from '../types/book.type'
import { Highlight } from '../types/highlight.type'
import fs from 'fs'

type HighlightResponse =
  | {
      data: Book[]
      error: null
    }
  | {
      data: null
      error: Error
    }

export default defineEventHandler(async (_event): Promise<HighlightResponse> => {
  const books: Book[] = await findAllBooks()

  for (const book of books) {
    const highlights: Highlight[] = await findAllHighlights(book.asin)
    book.highlights = highlights
  }

  /* fs.writeFile('./temp/result.json', JSON.stringify(books, null, 2), (err) => {
    if (err) {
      // TODO handle error
    }
  }) */

  return {
    data: books,
    error: null,
  }
})
