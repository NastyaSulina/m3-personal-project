interface Bookmark {
    title: string
    url: string
    category: string
    tags: string[]
    isFavorite: boolean
    note?: string
}

const bookmarks: Bookmark[] = [
    {
        title: 'JavaScript Visualizer 9000',
        url: 'https://www.jsv9000.app',
        category: 'development',
        tags: ['javascript', 'visualization', 'learning'],
        note: 'Useful for understanding the event loop',
        isFavorite: true,
    },
    {
        title: 'BigFrontend',
        url: 'https://bigfrontend.dev',
        category: 'development',
        tags: ['frontend', 'interview', 'practice'],
        isFavorite: false,
    },
]

console.log(`Saved ${bookmarks.length} bookmarks`)
console.log(`First bookmark: ${bookmarks[0].title}`)
