export function isValidUrl(value: string): boolean {
    try {
        const url = new URL(value)
        return url.protocol === 'http:' || url.protocol === 'https:'
    } catch {
        return false
    }
}

export function isValidPrice(value: number): boolean {
    return Number.isFinite(value) && value >= 0
}
