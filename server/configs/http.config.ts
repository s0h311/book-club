const cookie = (): string => process.env.AMAZON_COOKIE ?? ''

// { string: string | number }
export const headers = {
  Cookie: cookie(),
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:122.0) Gecko/20100101 Firefox/122.0',
}

/* export const libraryUrl: string = 'https://read.amazon.com/kindle-library/search'
export const highlightUrl = (asin: string): string =>
  `https://read.amazon.com/notebook?asin=${asin}&contentLimitState=&` */

export const libraryUrl: string = 'http://localhost:3000/api/fakeBook'
export const highlightUrl = (asin: string): string => `http://localhost:3000/api/fakeHighlight`
