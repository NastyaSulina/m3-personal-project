import { readFile } from 'node:fs/promises'

import { type Bookmark, isBookmark } from 'bookmark-library'

import { bookmarksFile } from './path.ts'

export async function read(): Promise<Bookmark[]> {
    let text: string

    try {
        text = await readFile(bookmarksFile, 'utf8')
    } catch (error) {
        throw new Error('Could not read bookmarks file', { cause: error })
    }

    let data: unknown

    try {
        data = JSON.parse(text)
    } catch (error) {
        throw new Error('Invalid JSON in bookmarks file', { cause: error })
    }

    if (!Array.isArray(data) || !data.every(isBookmark)) {
        throw new Error('Invalid bookmarks data')
    }

    return data
}
