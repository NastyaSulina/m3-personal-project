import type { Bookmark, BookmarkInput } from '../library/index.ts'
import { isBookmark } from '../library/index.ts'
import { request } from './request.ts'

export async function addBookmark(bookmark: BookmarkInput): Promise<Bookmark> {
    const result = await request<unknown, BookmarkInput>({
        path: '/bookmarks',
        method: 'POST',
        body: bookmark,
    })

    if (!isBookmark(result)) {
        throw new Error('Invalid bookmark returned by the server')
    }

    return result
}
