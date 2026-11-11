import type Library from 'bookmark-library'

import { write } from '../files/index.ts'

export async function removeBookmark(library: Library, id: string): Promise<boolean> {
    if (!library.getBookmark(id)) {
        return false
    }

    await write(library.getBookmarks().filter((bookmark) => bookmark.id !== id))
    library.remove(id)

    return true
}
