import './BookmarkCard.css'

import type { Bookmark } from 'bookmark-library'
import cn from 'clsx'

export default function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
    return (
        <li className="bookmark-card">
            <header className="bookmark-card-header">
                <h2>{bookmark.title}</h2>
                <ul className="bookmark-card-tags">
                    {bookmark.tags.map((tag) => (
                        <li key={tag}>#{tag}</li>
                    ))}
                </ul>
            </header>

            {bookmark.note && <p className="bookmark-card-note">{bookmark.note}</p>}

            <div className="bookmark-card-actions">
                <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                    Open
                </a>
                <button type="button" className={cn({ favorite: bookmark.isFavorite })}>
                    Favorite
                </button>
                <button type="button">Delete</button>
            </div>
        </li>
    )
}
