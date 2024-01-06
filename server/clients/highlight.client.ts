import { highlightUrl } from '../configs/http.config'
import { get } from './http.client'
import { highlightPageRegex, highlightRegex } from '../configs/regex.config'
import type { Highlight } from '../../types/highlight.type'
import { DATA_TYPE, type GetResponse, type HTML } from '../../types/httpClient.type'

export async function findAllHighlights(asin: string): Promise<Highlight[]> {
  const html: GetResponse<HTML> = await get<HTML>({
    url: highlightUrl(asin),
    callOrigin: 'findAllHighlights',
    dataType: DATA_TYPE.HTML,
  })

  if (html.error) {
    // TODO handle error
    return []
  }

  /*   fs.writeFile('./temp/highlights.html', html.data, (err) => {
    if (err) {
      // TODO handle error
    }
  }) */

  const highlightsMatch: RegExpMatchArray[] = [...html.data.matchAll(highlightRegex)]
  const hightlightsPageMatch: RegExpMatchArray[] = [...html.data.matchAll(highlightPageRegex)]

  const highlights: Highlight[] = []

  highlightsMatch.forEach((highlightMatch, index) => {
    const pageMatch: RegExpMatchArray = hightlightsPageMatch[index]

    if (!pageMatch) {
      console.error('[findAllHighlights] pageMatch is undefined')
    }

    const pageString: string = pageMatch ? pageMatch[2] : '0'
    const page: number = parseInt(pageString)

    highlights.push({
      text: highlightMatch[1],
      page,
    })
  })

  return highlights
}
