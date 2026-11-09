import Fastify from 'fastify'

import bookmarks from './routes/bookmarks/index.ts'

const fastify = Fastify()

fastify.register(bookmarks, { prefix: '/api' })

await fastify.listen({ port: 3000 })
