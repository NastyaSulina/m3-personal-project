import { randomUUID } from 'node:crypto'

import type { Bookmark, BookmarkInput } from 'bookmark-library'

import { write } from './files/index.ts'
import { loadLibrary } from './load.ts'

export async function createBookmark(input: BookmarkInput): Promise<Bookmark | undefined> {
    const library = await loadLibrary()

    if (library.getBookmarks().some((bookmark) => bookmark.url === input.url)) {
        return undefined
    }

    const bookmark: Bookmark = {
        ...input,
        tags: [...input.tags],
        id: randomUUID(),
    }

    library.add(bookmark)
    await write(library.getBookmarks())

    return bookmark
}
