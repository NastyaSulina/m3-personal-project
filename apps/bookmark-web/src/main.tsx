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

async function loadBookmarks() {
    app.render(
        <p className="library-state library-loading" role="status">
            Loading bookmarks…
        </p>,
    )

    try {
        const bookmarks = await getBookmarks()
        app.render(<BookmarkList initialBookmarks={bookmarks} />)
    } catch {
        app.render(
            <div className="library-state library-error">
                <div role="alert">
                    <h1>Could not load bookmarks</h1>
                    <p>Check that the bookmark server is running.</p>
                </div>
                <button
                    className="library-retry"
                    type="button"
                    onClick={() => void loadBookmarks()}
                >
                    Try again
                </button>
            </div>,
        )
    }
}

void loadBookmarks()
