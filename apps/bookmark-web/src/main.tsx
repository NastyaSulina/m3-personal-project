import './globals.css'
import './library.css'

import { getBookmarks } from 'bookmark-library'
import { createRoot } from 'react-dom/client'

import BookmarkCard from './BookmarkCard/index.ts'

const root = document.getElementById('root')

if (!root) {
    throw new Error('Root element not found')
}

const app = createRoot(root)

try {
    const bookmarks = await getBookmarks()

    app.render(
        <main className="library">
            {bookmarks.length === 0 ? (
                <p>No bookmarks yet</p>
            ) : (
                <ul className="bookmark-list">
                    {bookmarks.map((bookmark) => (
                        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
                    ))}
                </ul>
            )}
        </main>,
    )
} catch {
    app.render(<p role="alert">Could not load bookmarks.</p>)
}
