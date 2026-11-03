import type Library from 'bookmark-library'
import { isBookmark } from 'bookmark-library'

export function add(library: Library, input: unknown): void {
    if (!isBookmark(input)) {
        throw new Error('Invalid bookmark input')
    }

    library.add(input)
}
