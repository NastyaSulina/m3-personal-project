import type { Bookmark, Category } from './types.ts'
import { isValidPrice, isValidUrl } from './validate.ts'

function isCategory(value: unknown): value is Category {
    return (
        value === 'development' || value === 'shopping' || value === 'reading' || value === 'other'
    )
}

export function isBookmark(value: unknown): value is Bookmark {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false
    }

    if (!('title' in value) || typeof value.title !== 'string' || !value.title.trim()) {
        return false
    }

    if (!('url' in value) || typeof value.url !== 'string' || !isValidUrl(value.url)) {
        return false
    }

    if (!('category' in value) || !isCategory(value.category)) {
        return false
    }

    if (
        !('tags' in value) ||
        !Array.isArray(value.tags) ||
        !value.tags.every((tag: unknown) => typeof tag === 'string')
    ) {
        return false
    }

    if (!('isFavorite' in value) || typeof value.isFavorite !== 'boolean') {
        return false
    }

    if ('note' in value && typeof value.note !== 'string') {
        return false
    }

    if (!('kind' in value)) {
        return false
    }

    if (value.kind === 'website') {
        return true
    }

    if (value.kind === 'product') {
        const validPrice =
            'price' in value && typeof value.price === 'number' && isValidPrice(value.price)

        const validCurrency =
            'currency' in value && typeof value.currency === 'string' && !!value.currency.trim()

        return validPrice && validCurrency
    }

    return false
}
