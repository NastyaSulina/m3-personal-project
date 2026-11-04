import { readFile } from 'node:fs/promises'

import type { Bookmark } from 'bookmark-library'
import { isBookmark } from 'bookmark-library'

import { bookmarksFile } from './path.ts'

export async function read(): Promise<Bookmark[]> {
    let text: string

    try {
        text = await readFile(bookmarksFile, 'utf8')
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
            throw new Error('Bookmarks file not found', { cause: error })
        }

        throw new Error('Could not read bookmarks file', { cause: error })
    }

    let data: unknown

    try {
        data = JSON.parse(text)
    } catch {
        throw new Error('Invalid JSON in bookmarks file')
    }

    if (!Array.isArray(data) || !data.every(isBookmark)) {
        throw new Error('Invalid bookmarks data')
    }

    return data
}
