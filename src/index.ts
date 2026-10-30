interface BookmarkBase {
    title: string
    url: string
    category: string
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

type Bookmark = WebsiteBookmark | ProductBookmark

const bookmarks: Bookmark[] = [
    {
        kind: 'website',
        title: 'JavaScript Visualizer 9000',
        url: 'https://www.jsv9000.app',
        category: 'development',
        tags: ['javascript', 'visualization', 'learning'],
        note: 'Useful for understanding the event loop',
        isFavorite: false,
    },
    {
        kind: 'website',
        title: 'BigFrontend',
        url: 'https://bigfrontend.dev',
        category: 'development',
        tags: ['frontend', 'interview', 'practice'],
        isFavorite: false,
    },
    {
        kind: 'product',
        title: 'Leather cropped jacket',
        url: 'https://shop.mango.com/es/ca/p/dona/jaquetes/cropped/jaqueta-pell-solapes/37064776/30/00',
        category: 'shopping',
        tags: ['jacket', 'mango'],
        isFavorite: true,
        price: 99.99,
        currency: 'EUR',
    },
]

function showBookmark(bookmark: Bookmark): string {
    const details = [
        bookmark.title,
        `Category: ${bookmark.category}`,
        `Tags: ${bookmark.tags.join(', ')}`,
    ]

    if (bookmark.note) {
        details.push(`Note: ${bookmark.note}`)
    }

    if (bookmark.kind === 'website') {
        return details.join('\n')
    }

    if (bookmark.kind === 'product') {
        return [...details, `Price: ${bookmark.price} ${bookmark.currency}`].join('\n')
    }

    throw new Error('Unknown bookmark kind')
}

for (const bookmark of bookmarks) {
    console.log(`\n${showBookmark(bookmark)}`)
}
