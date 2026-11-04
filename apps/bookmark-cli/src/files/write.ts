import { writeFile } from 'node:fs/promises'

import { type Bookmark } from 'bookmark-library'

import { bookmarksFile } from './path.ts'

export async function write(bookmarks: Bookmark[]): Promise<void> {
    try {
        await writeFile(bookmarksFile, `${JSON.stringify(bookmarks, null, 4)}\n`, 'utf8')
    } catch (error) {
        throw new Error('Could not save bookmarks file', { cause: error })
    }
}
