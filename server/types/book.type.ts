import type { Highlight } from './highlight.type'

export type BookResponse = {
  itemsList: Item[]
  libraryType: 'BOOKS' | (string & {})
  sortType: 'RECENCY' | (string & {})
}

type Item = {
  asin: string
  webReaderUrl: string
  productUrl: string
  title: string
  percentageRead: number
  authors: string[]
  resourceType: 'EBOOK' | (string & {})
  originType: 'KINDLE_UNLIMITED' | 'PURCHASE' | (string & {})
  mangaOrComicAsin: boolean
}

export type Book = {
  asin: string
  title: string
  highlights: Highlight[]
}
