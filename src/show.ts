import type { Bookmark } from './types.ts'

export function show(bookmark: Bookmark): string {
    const details = [
        bookmark.title,
        `Category: ${bookmark.category}`,
        `Tags: ${bookmark.tags.join(', ')}`,
    ]

    if (bookmark.note) {
        details.push(`Note: ${bookmark.note}`)
    }

    if (bookmark.kind === 'website') {
        return details.join('\n')
    }

    if (bookmark.kind === 'product') {
        return [...details, `Price: ${bookmark.price} ${bookmark.currency}`].join('\n')
    }

    throw new Error('Unknown bookmark kind')
}
