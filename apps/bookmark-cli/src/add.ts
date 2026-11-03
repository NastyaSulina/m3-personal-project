import type Library from 'bookmark-library'
import { isBookmark as isValidBookmark } from 'bookmark-library'

export function add(library: Library, input: unknown): void {
    if (!isValidBookmark(input)) {
        throw new Error('Invalid bookmark input')
    }

    library.add(input)
}
