export type Kind = 'website' | 'product'
export type Category = 'development' | 'shopping' | 'reading' | 'other'

interface BookmarkBase {
    id: string
    title: string
    url: string
    category: Category
    tags: string[]
    isFavorite: boolean
    note?: string
    imageUrl?: string
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

export type BookmarkInput = Omit<WebsiteBookmark, 'id'> | Omit<ProductBookmark, 'id'>
