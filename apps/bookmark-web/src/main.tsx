import './globals.css'
import './library.css'

import { getBookmarks } from 'bookmark-library'
import { createRoot } from 'react-dom/client'

import BookmarkList from './BookmarkList/index.ts'

const root = document.getElementById('root')

if (!root) {
    throw new Error('Root element not found')
}

const app = createRoot(root)

try {
    const bookmarks = await getBookmarks()

    app.render(
        <main className="library">
            <BookmarkList initialBookmarks={bookmarks} />
        </main>,
    )
} catch (error) {
    console.error('Could not load bookmarks', error)
}
