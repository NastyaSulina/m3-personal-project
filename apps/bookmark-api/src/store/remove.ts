import { write } from '../files/index.ts'
import { loadLibrary } from './load.ts'

export async function removeBookmark(id: string): Promise<boolean> {
    const library = await loadLibrary()

    if (!library.getBookmark(id)) {
        return false
    }

    library.remove(id)
    await write(library.getBookmarks())

    return true
}
