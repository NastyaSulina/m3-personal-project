import type { Bookmark, BookmarkChanges, Kind } from './types.ts'

export class Library {
    #bookmarks = new Map<string, Bookmark>()

    #counts: Record<Kind, number> = {
        website: 0,
        product: 0,
    }

    add(bookmark: Bookmark): void {
        if (this.#bookmarks.has(bookmark.id)) {
            throw new Error('Bookmark ID already exists')
        }

        const duplicate = [...this.#bookmarks.values()].some((item) => item.url === bookmark.url)

        if (duplicate) {
            throw new Error('Bookmark already exists')
        }

        this.#bookmarks.set(bookmark.id, {
            ...bookmark,
            tags: [...bookmark.tags],
        })

        this.#counts[bookmark.kind]++
    }

    remove(id: string): void {
        const bookmark = this.#bookmarks.get(id)

        if (!bookmark) {
            throw new Error('Bookmark not found')
        }

        this.#bookmarks.delete(id)
        this.#counts[bookmark.kind]--
    }

    edit(id: string, changes: BookmarkChanges): void {
        const bookmark = this.#bookmarks.get(id)

        if (!bookmark) {
            throw new Error('Bookmark not found')
        }

        this.#bookmarks.set(id, { ...bookmark, ...changes })
    }

    getBookmark(id: string): Bookmark | undefined {
        const bookmark = this.#bookmarks.get(id)

        return bookmark ? { ...bookmark, tags: [...bookmark.tags] } : undefined
    }

    getBookmarks(): Bookmark[] {
        return [...this.#bookmarks.values()].map((bookmark) => ({
            ...bookmark,
            tags: [...bookmark.tags],
        }))
    }

    getCounts(): Record<Kind, number> {
        return { ...this.#counts }
    }
}
