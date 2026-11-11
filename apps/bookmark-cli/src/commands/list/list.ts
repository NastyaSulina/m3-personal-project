import { getBookmarks } from 'bookmark-library'

import { show } from './show.ts'

async function list(): Promise<void> {
    const bookmarks = await getBookmarks()

    if (bookmarks.length === 0) {
        console.log('No bookmarks yet')
        return
    }

    for (const bookmark of bookmarks) {
        console.log(`${show(bookmark)}\n`)
    }
}

export default list
