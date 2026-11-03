export type Kind = 'website' | 'product'

export type Category = 'development' | 'shopping' | 'reading' | 'other'

interface BookmarkBase {
    title: string
    url: string
    category: Category
    tags: string[]
    isFavorite: boolean
    note?: string
}

interface WebsiteBookmark extends BookmarkBase {
    kind: 'website'
}

interface ProductBookmark extends BookmarkBase {
    kind: 'product'
    price: number
    currency: string
}

export type Bookmark = WebsiteBookmark | ProductBookmark
