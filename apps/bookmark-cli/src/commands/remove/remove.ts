import { select } from '@inquirer/prompts'
import { getBookmarks, removeBookmark } from 'bookmark-library'

async function remove(url?: string): Promise<void> {
    const bookmarks = await getBookmarks()

    if (bookmarks.length === 0) {
        throw new Error('No bookmarks to remove')
    }

    let id: string

    if (url !== undefined) {
        const bookmark = bookmarks.find((bookmark) => bookmark.url === url)

        if (!bookmark) {
            throw new Error('Bookmark not found')
        }

        id = bookmark.id
    } else {
        id = await select({
            message: 'Choose a bookmark',
            choices: bookmarks.map((bookmark) => ({
                name: `${bookmark.title}: ${bookmark.url}`,
                value: bookmark.id,
            })),
        })
    }

    await removeBookmark(id)

    console.log('Bookmark removed')
}

export default remove
