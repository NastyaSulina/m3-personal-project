import type { Bookmark } from 'bookmark-library'
import { removeBookmark } from 'bookmark-library'
import { useState } from 'react'

import BookmarkCard from '../BookmarkCard/index.ts'

export default function BookmarkList({ initialBookmarks }: { initialBookmarks: Bookmark[] }) {
    const [bookmarks, setBookmarks] = useState(initialBookmarks)
    const [isRemoving, setIsRemoving] = useState(false)

    async function handleRemove(id: string) {
        setIsRemoving(true)

        try {
            await removeBookmark(id)
            setBookmarks((current) => current.filter((bookmark) => bookmark.id !== id))
        } catch (error) {
            console.error('Could not delete bookmark', id, error)
        } finally {
            setIsRemoving(false)
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
                    isRemoving={isRemoving}
                    onRemove={handleRemove}
                />
            ))}
        </ul>
    )
}
