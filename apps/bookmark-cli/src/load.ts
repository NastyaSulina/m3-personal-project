import Library from 'bookmark-library'

import { read as readBookmarks } from './files/index.ts'

export async function loadLibrary(): Promise<Library> {
    const library = new Library()

    for (const bookmark of await readBookmarks()) {
        library.add(bookmark)
    }

    return library
}
