import type { Bookmark, BookmarkChanges, ErrorResponse } from 'bookmark-library'
import { isBookmarkInput } from 'bookmark-library'
import type { FastifyPluginAsync } from 'fastify'

import {
    createBookmark,
    editableFields,
    editBookmark,
    loadLibrary,
    removeBookmark,
} from '../../store/index.ts'

const bookmarks: FastifyPluginAsync = async (fastify) => {
    const library = await loadLibrary()

    fastify.get<{ Reply: { 200: Bookmark[] } }>('/bookmarks', async (_, reply) => {
        return reply.code(200).send(library.getBookmarks())
    })

    fastify.get<{
        Params: { id: string }
        Reply: {
            200: Bookmark
            404: ErrorResponse
        }
    }>('/bookmarks/:id', async (request, reply) => {
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

        const bookmark = await createBookmark(library, request.body)

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
        const removed = await removeBookmark(library, request.params.id)

        if (!removed) {
            return reply.code(404).send({ error: 'Bookmark not found' })
        }

        return reply.code(200).send({})
    })

    fastify.patch<{
        Params: { id: string }
        Body: BookmarkChanges
        Reply: {
            200: Bookmark
            400: ErrorResponse
            404: ErrorResponse
        }
    }>('/bookmarks/:id', async (request, reply) => {
        const patch = request.body

        if (
            !patch ||
            typeof patch !== 'object' ||
            Object.keys(patch).some((key) => !editableFields.includes(key))
        ) {
            return reply.code(400).send({ error: 'Field is not writable' })
        }

        if ('isFavorite' in patch && typeof patch.isFavorite !== 'boolean') {
            return reply.code(400).send({ error: 'Invalid field value' })
        }

        const bookmark = await editBookmark(library, request.params.id, patch)

        if (!bookmark) {
            return reply.code(404).send({ error: 'Bookmark not found' })
        }

        return reply.code(200).send(bookmark)
    })
}

export default bookmarks
