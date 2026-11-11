import type { Bookmark } from 'bookmark-library'
import { removeBookmark, setBookmarkFavorite } from 'bookmark-library'
import { useState } from 'react'

import BookmarkCard from '../BookmarkCard/index.ts'

export default function BookmarkList({ initialBookmarks }: { initialBookmarks: Bookmark[] }) {
    const [bookmarks, setBookmarks] = useState(initialBookmarks)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<{ id: string; message: string } | null>(null)

    async function handleFavorite(id: string, isFavorite: boolean) {
        setIsPending(true)
        setError(null)

        try {
            const updated = await setBookmarkFavorite(id, isFavorite)
            setBookmarks((current) => current.map((item) => (item.id === id ? updated : item)))
        } catch {
            setError({ id, message: 'Could not update this bookmark. Try Favorite again.' })
        } finally {
            setIsPending(false)
        }
    }

    async function handleRemove(id: string) {
        setIsPending(true)
        setError(null)

        try {
            await removeBookmark(id)
            setBookmarks((current) => current.filter((bookmark) => bookmark.id !== id))
        } catch {
            setError({ id, message: 'Could not delete this bookmark. Try Delete again.' })
        } finally {
            setIsPending(false)
        }
    }

    if (bookmarks.length === 0) {
        return <p>No bookmarks yet</p>
    }

    return (
        <ul className="bookmark-list">
            {bookmarks.map((bookmark) => (
                <BookmarkCard
                    key={bookmark.id}
                    bookmark={bookmark}
                    isPending={isPending}
                    error={error?.id === bookmark.id ? error.message : undefined}
                    onFavorite={handleFavorite}
                    onRemove={handleRemove}
                />
            ))}
        </ul>
    )
}
