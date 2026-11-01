import type { Bookmark, Kind } from './types.ts'

export class Library {
    #bookmarks = new Map<string, Bookmark>()

    #counts: Record<Kind, number> = {
        website: 0,
        product: 0,
    }

    add(bookmark: Bookmark): void {
        if (this.#bookmarks.has(bookmark.url)) {
            throw new Error('Bookmark already exists')
        }

        this.#bookmarks.set(bookmark.url, {
            ...bookmark,
            tags: [...bookmark.tags],
        })
        this.#counts[bookmark.kind]++
    }

    remove(url: string): void {
        const bookmark = this.#bookmarks.get(url)

        if (bookmark === undefined) {
            throw new Error('Bookmark not found')
        }

        this.#counts[bookmark.kind]--
        this.#bookmarks.delete(url)
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
