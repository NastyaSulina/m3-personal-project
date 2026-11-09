import { confirm, input, select } from '@inquirer/prompts'
import { addBookmark, isBookmarkInput } from 'bookmark-library'

interface AddOptions {
    title?: string
    kind?: string
    category?: string
    tags?: string
    note?: string
    favorite?: boolean
    price?: string
    currency?: string
}

async function add(url: string | undefined, options: AddOptions): Promise<void> {
    let { title, kind, category, tags, note, favorite, price, currency } = options

    url ??= await input({ message: 'URL:' })

    kind ??= await select({
        message: 'Bookmark type:',
        choices: [
            { name: 'Website', value: 'website' },
            { name: 'Product', value: 'product' },
        ],
    })

    if (kind !== 'website' && kind !== 'product') {
        throw new Error('Invalid bookmark kind')
    }

    if (kind === 'website' && (price !== undefined || currency !== undefined)) {
        throw new Error('Price and currency are only for products')
    }

    title ??= await input({ message: 'Title:' })

    category ??= await select({
        message: 'Category:',
        choices: ['development', 'shopping', 'reading', 'other'],
    })

    tags ??= await input({ message: 'Tags (comma-separated):' })
    note ??= await input({ message: 'Note (optional):' })
    favorite ??= await confirm({ message: 'Add to favorites?', default: false })

    const bookmark: Record<string, unknown> = {
        kind,
        title: title.trim(),
        url: url.trim(),
        category,
        tags: tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean),
        isFavorite: favorite,
    }

    if (note.trim()) {
        bookmark.note = note.trim()
    }

    if (kind === 'product') {
        price ??= await input({ message: 'Price:' })
        currency ??= await input({ message: 'Currency:', default: 'EUR' })

        bookmark.price = price.trim() ? Number(price) : NaN
        bookmark.currency = currency.trim().toUpperCase()
    }

    if (!isBookmarkInput(bookmark)) {
        throw new Error('Invalid bookmark input')
    }

    const created = await addBookmark(bookmark)
    console.log(`Added: ${created.title}`)
}

export default add
