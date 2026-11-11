import type Library from 'bookmark-library'
import type { Bookmark, BookmarkChanges } from 'bookmark-library'

import { write } from '../files/index.ts'

export const editableFields: readonly string[] = ['isFavorite']

export async function editBookmark(
    library: Library,
    id: string,
    changes: BookmarkChanges,
): Promise<Bookmark | undefined> {
    const bookmark = library.getBookmark(id)

    if (!bookmark || bookmark.isFavorite === changes.isFavorite) {
        return bookmark
    }

    const updated = { ...bookmark, ...changes }

    await write(library.getBookmarks().map((item) => (item.id === id ? updated : item)))
    library.edit(id, changes)

    return updated
}
