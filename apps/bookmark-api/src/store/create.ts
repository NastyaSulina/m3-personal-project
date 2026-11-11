import { randomUUID } from 'node:crypto'

import type Library from 'bookmark-library'
import type { Bookmark, BookmarkInput } from 'bookmark-library'

import { write } from '../files/index.ts'

export async function createBookmark(
    library: Library,
    input: BookmarkInput,
): Promise<Bookmark | undefined> {
    const bookmarks = library.getBookmarks()

    if (bookmarks.some((bookmark) => bookmark.url === input.url)) {
        return undefined
    }

    const bookmark: Bookmark = {
        ...input,
        tags: [...input.tags],
        id: randomUUID(),
    }

    if (library.getBookmark(bookmark.id)) {
        throw new Error('Bookmark ID already exists')
    }

    await write([...bookmarks, bookmark])
    library.add(bookmark)

    return bookmark
}
