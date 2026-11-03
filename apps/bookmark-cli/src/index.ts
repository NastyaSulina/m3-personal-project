import Library from 'bookmark-library'

import { add } from './commands/index.ts'
import { read } from './files/index.ts'
import { show } from './show.ts'

try {
    const initialData = await read()
    const library = new Library()

    for (const bookmark of initialData) {
        library.add(bookmark)
    }

    console.log('Initial count:', library.getCounts())

    const input: unknown = {
        kind: 'website',
        title: 'Инструменты иллюстрации',
        url: 'https://courses.prostaya.ru/instrumenty',
        category: 'other',
        tags: ['illustration', 'art', 'course'],
        isFavorite: false,
    }

    add(library, input)

    console.log('Count after addition:', library.getCounts())
    console.log('\nBookmark Library:')

    const bookmarks = library.getBookmarks()
    for (const bookmark of bookmarks) {
        console.log(`\n${show(bookmark)}`)
    }
} catch (error) {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
}
