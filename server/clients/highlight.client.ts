import { highlightUrl } from '../configs/http.config'
import { get } from './http.client'
import { highlightNoteRegex, highlightPageRegex, highlightRegex } from '../configs/regex.config'
import type { Highlight } from '~/types/highlight.type'
import { DATA_TYPE, type GetResponse, type HTML } from '../../types/httpClient.type'
import * as fs from 'node:fs/promises'

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

  /* try {
    await fs.writeFile('./temp/highlights.html', html.data)
  } catch (e: any) {
    console.error(e)
  } */

  const highlightsMatch: RegExpMatchArray[] = [...html.data.matchAll(highlightRegex)]
  const hightlightsPageMatch: RegExpMatchArray[] = [...html.data.matchAll(highlightPageRegex)]
  const hightlightsNoteMatch: RegExpMatchArray[] = [...html.data.matchAll(highlightNoteRegex)]

  const highlights: Highlight[] = []

  highlightsMatch.forEach((highlightMatch, index) => {
    const pageMatch: RegExpMatchArray = hightlightsPageMatch[index]
    const noteMatch: RegExpMatchArray = hightlightsNoteMatch[index]

    if (!pageMatch) {
      console.error('[findAllHighlights] pageMatch is undefined')
    }

    const pageString: string = pageMatch ? pageMatch[2] : '0'
    const page: number = parseInt(pageString)
    const note: string = noteMatch && noteMatch.length >= 2 ? noteMatch[1] : ''

    highlights.push({
      text: highlightMatch[1],
      page,
      note,
    })
  })

  return highlights
}
