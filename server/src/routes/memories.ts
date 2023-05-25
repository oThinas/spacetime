import { FastifyInstance } from 'fastify';
import { z } from 'zod';

import { prisma } from '../lib/prisma';
import { errorHandler } from '../errors/errorsHandler';

export async function memoriesRoutes(app: FastifyInstance): Promise<void> {
  app.get('/memories', async (__, reply) => {
    const querySchema = z.object({
      page: z.coerce
        .number()
        .int()
        .positive()
        .default(1),
      size: z.coerce
        .number()
        .int()
        .positive()
        .default(10),
    });

    try {
      const { page, size } = querySchema.parse(reply.request.query);

      const memories = await prisma.memory.findMany({
        where: { isPublic: true },
        orderBy: { createdAt: 'asc' },
        skip: (page - 1) * size,
        take: size,
      });

      const memoriesCount = await prisma.memory.count();

      const formattedMemories = memories.map((memory) => ({
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.length > 115 ? `${memory.content.slice(0, 115)}...` : memory.content,
      }));

      return reply.send({
        totalRecords: memoriesCount,
        page,
        size,
        data: formattedMemories,
      });
    } catch (error: any) {
      console.log(error);
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
