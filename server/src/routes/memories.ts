import { FastifyInstance } from 'fastify';
import { z } from 'zod';

import { prisma } from '../lib/prisma';
import { errorHandler } from '../errors/errorsHandler';

export async function memoriesRoutes(app: FastifyInstance): Promise<void> {
  app.get('/memories', async (__, reply) => {
    try {
      const memories = await prisma.memory.findMany({ orderBy: { createdAt: 'asc' } });

      const formattedMemories = memories.map((memory) => ({
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.length > 115 ? `${memory.content.slice(0, 115)}...` : memory.content,
      }));

      return reply.send({ data: formattedMemories });
    } catch (error: any) {
      errorHandler(reply, error);
    }
  });

  app.get('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({ id: z.string().uuid() });

    try {
      const { id } = paramsSchema.parse(request.params);
      const memory = await prisma.memory.findUniqueOrThrow({ where: { id } });

      return reply.send({ data: memory });
    } catch (error: any) {
      errorHandler(reply, error);
    }
  });
}
