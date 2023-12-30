export default defineEventHandler(async (_event): Promise<unknown> => {
  return {
    itemsList: [
      {
        asin: 'B011A2XCZ6',
        webReaderUrl: 'https://read.amazon.com/?asin=B011A2XCZ6',
        productUrl: 'https://m.media-amazon.com/images/I/41nxd-6E68L._SY400_.jpg',
        title:
          'TED Talks: The official TED guide to public speaking: Tips and tricks for giving unforgettable speeches and presentations',
        percentageRead: 0,
        authors: ['Anderson, Chris:'],
        resourceType: 'EBOOK',
        originType: 'PURCHASE',
        mangaOrComicAsin: false,
      },
      {
        asin: 'B07YF3TM2C',
        webReaderUrl: 'https://read.amazon.com/?asin=B07YF3TM2C',
        productUrl: 'https://m.media-amazon.com/images/I/41UejLw3KPL._SY400_.jpg',
        title: 'Konsum - Warum wir kaufen, was wir nicht brauchen (German Edition)',
        percentageRead: 0,
        authors: ['Tillessen, Carl:'],
        resourceType: 'EBOOK',
        originType: 'KINDLE_UNLIMITED',
        mangaOrComicAsin: false,
      },
    ],
    libraryType: 'BOOKS',
    sortType: 'RECENCY',
  }
})
