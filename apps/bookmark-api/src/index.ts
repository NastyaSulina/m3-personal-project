import cors from '@fastify/cors'
import Fastify from 'fastify'

import bookmarks from './routes/bookmarks/index.ts'

const fastify = Fastify()

fastify.register(cors, { methods: ['GET', 'POST', 'DELETE', 'PATCH'] })
fastify.register(bookmarks, { prefix: '/api' })

await fastify.listen({ port: 3000 })
