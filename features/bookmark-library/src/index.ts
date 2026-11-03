import { isBookmark } from './guards.ts'
import { Library } from './library.ts'
import { show } from './show.ts'
import type { Bookmark } from './types.ts'

const initialData: Bookmark[] = [
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

const library = new Library()

for (const bookmark of initialData) {
    library.add(bookmark)
}

console.log('Initial count:', library.getCounts())

library.remove('https://bigfrontend.dev')
console.log('Count after removal:', library.getCounts())

const input: unknown = {
    kind: 'website',
    title: 'Инструменты иллюстрации',
    url: 'https://courses.prostaya.ru/instrumenty',
    category: 'other',
    tags: ['illustration', 'art', 'course'],
    isFavorite: false,
}

add(input)
console.log('Count after addition:', library.getCounts())

try {
    add({
        kind: 'website',
        title: 'incomplete bookmark',
    })
} catch (error) {
    if (!(error instanceof Error)) {
        throw error
    }

    console.log(error.message)
}

const bookmarks = library.getBookmarks()
console.log('\nBookmark Library:')

for (const bookmark of bookmarks) {
    console.log(`\n${show(bookmark)}`)
}

function add(input: unknown): void {
    if (!isBookmark(input)) {
        throw new Error('Invalid input, cannot add bookmark')
    }

    library.add(input)
}
