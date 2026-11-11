import type { Bookmark, ErrorResponse } from 'bookmark-library'
import { isBookmarkInput } from 'bookmark-library'
import type { FastifyPluginAsync } from 'fastify'

import { createBookmark, loadLibrary, removeBookmark } from '../../store/index.ts'

const bookmarks: FastifyPluginAsync = (fastify) => {
    fastify.get<{ Reply: { 200: Bookmark[] } }>('/bookmarks', async () => {
        const library = await loadLibrary()

        return library.getBookmarks()
    })

    fastify.get<{
        Params: { id: string }
        Reply: {
            200: Bookmark
            404: ErrorResponse
        }
    }>('/bookmarks/:id', async (request, reply) => {
        const library = await loadLibrary()
        const bookmark = library.getBookmark(request.params.id)

        if (!bookmark) {
            return reply.code(404).send({ error: 'Bookmark not found' })
        }

        return reply.code(200).send(bookmark)
    })

    fastify.post<{
        Body: unknown
        Reply: {
            201: Bookmark
            400: ErrorResponse
            409: ErrorResponse
        }
    }>('/bookmarks', async (request, reply) => {
        if (!isBookmarkInput(request.body)) {
            return reply.code(400).send({ error: 'Invalid bookmark input' })
        }

        const bookmark = await createBookmark(request.body)

        if (!bookmark) {
            return reply.code(409).send({ error: 'Bookmark already exists' })
        }

        return reply.code(201).send(bookmark)
    })

    fastify.delete<{
        Params: { id: string }
        Reply: {
            200: Record<string, never>
            404: ErrorResponse
        }
    }>('/bookmarks/:id', async (request, reply) => {
        const removed = await removeBookmark(request.params.id)

        if (!removed) {
            return reply.code(404).send({ error: 'Bookmark not found' })
        }

        return reply.code(200).send({})
    })

    return Promise.resolve()
}

export default bookmarks
