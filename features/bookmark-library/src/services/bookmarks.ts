import type { Bookmark, BookmarkChanges, BookmarkInput } from '../library/index.ts'
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

export async function getBookmarks(): Promise<Bookmark[]> {
    const result = await request({ path: '/bookmarks', method: 'GET' })

    if (!Array.isArray(result) || !result.every(isBookmark)) {
        throw new Error('Invalid bookmarks returned by the server')
    }

    return result
}

export async function removeBookmark(id: string): Promise<void> {
    await request({
        path: `/bookmarks/${encodeURIComponent(id)}`,
        method: 'DELETE',
    })
}

export async function setBookmarkFavorite(id: string, isFavorite: boolean): Promise<Bookmark> {
    const result = await request<unknown, BookmarkChanges>({
        path: `/bookmarks/${encodeURIComponent(id)}`,
        method: 'PATCH',
        body: { isFavorite },
    })

    if (!isBookmark(result)) {
        throw new Error('Invalid bookmark returned by the server')
    }

    return result
}
