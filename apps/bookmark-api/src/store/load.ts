import Library from 'bookmark-library'

import { read } from '../files/index.ts'

export async function loadLibrary(): Promise<Library> {
    const library = new Library()

    for (const bookmark of await read()) {
        library.add(bookmark)
    }

    return library
}
