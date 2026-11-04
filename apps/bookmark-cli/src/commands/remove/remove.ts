import { select } from '@inquirer/prompts'

import { write } from '../../files/index.ts'
import { loadLibrary } from '../../load.ts'

async function remove(url?: string): Promise<void> {
    const library = await loadLibrary()
    const bookmarks = library.getBookmarks()

    if (bookmarks.length === 0) {
        throw new Error('No bookmarks to remove')
    }

    url ??= await select({
        message: 'Choose a bookmark',
        choices: bookmarks.map((bookmark) => ({
            name: `${bookmark.title}: ${bookmark.url}`,
            value: bookmark.url,
        })),
    })

    library.remove(url)
    await write(library.getBookmarks())

    console.log('Bookmark removed')
}

export default remove
