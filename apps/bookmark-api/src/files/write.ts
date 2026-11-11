import { randomUUID } from 'node:crypto'
import { rename, rm, writeFile } from 'node:fs/promises'

import type { Bookmark } from 'bookmark-library'

import { bookmarksFile } from './path.ts'

let writing = false

export async function write(bookmarks: Bookmark[]): Promise<void> {
    if (writing) {
        throw new Error('Another change is being saved. Try again.')
    }

    const temporaryFile = `${bookmarksFile}.${randomUUID()}.tmp`
    writing = true

    try {
        await writeFile(temporaryFile, `${JSON.stringify(bookmarks, null, 4)}\n`, 'utf8')
        await rename(temporaryFile, bookmarksFile)
    } catch (error) {
        await rm(temporaryFile, { force: true }).catch(() => undefined)

        throw new Error('Could not save bookmarks file', { cause: error })
    } finally {
        writing = false
    }
}
