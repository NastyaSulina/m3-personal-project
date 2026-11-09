import type { Bookmark } from 'bookmark-library'
import type { FastifyPluginAsync } from 'fastify'

import { loadLibrary } from '../../load.ts'

interface ErrorReply {
    error: string
}

const bookmarks: FastifyPluginAsync = (fastify) => {
    fastify.get<{ Reply: { 200: Bookmark[] } }>('/bookmarks', async () => {
        const library = await loadLibrary()

        return library.getBookmarks()
    })

    fastify.get<{
        Params: { id: string }
        Reply: {
            200: Bookmark
            404: ErrorReply
        }
    }>('/bookmarks/:id', async (request, reply) => {
        const library = await loadLibrary()
        const bookmark = library.getBookmark(request.params.id)

        if (!bookmark) {
            return reply.code(404).send({ error: 'Bookmark not found' })
        }

        return reply.code(200).send(bookmark)
    })

    return Promise.resolve()
}

export default bookmarks
