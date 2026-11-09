import { randomUUID } from 'node:crypto'
import { rename, rm, writeFile } from 'node:fs/promises'

import type { Bookmark } from 'bookmark-library'

import { bookmarksFile } from './path.ts'

export async function write(bookmarks: Bookmark[]): Promise<void> {
    const temporaryFile = `${bookmarksFile}.${randomUUID()}.tmp`

    try {
        await writeFile(temporaryFile, `${JSON.stringify(bookmarks, null, 4)}\n`, 'utf8')
        await rename(temporaryFile, bookmarksFile)
    } catch (error) {
        await rm(temporaryFile, { force: true }).catch(() => undefined)

        throw new Error('Could not save bookmarks file', { cause: error })
    }
}
