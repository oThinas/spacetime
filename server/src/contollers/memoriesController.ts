import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

import { errorHandler, replyHandler } from '../middlewares';
import { pageableFormatter } from '../utils/pageableFormatter';

async function getAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { page, size } = pageableFormatter(request);
    const memories = await prisma.memory.findMany({
      orderBy: { createdAt: 'asc' },
      skip: size * (page - 1),
      take: size,
    });

    const memoriesCount = await prisma.memory.count();

    const formattedMemories = memories.map((memory) => ({
      id: memory.id,
      coverUrl: memory.coverUrl,
      excerpt: memory.content.length > 115 ? `${memory.content.slice(0, 115)}...` : memory.content,
    }));

    replyHandler(reply, {
      pageable: {
        page,
        size,
        totalRecords: memoriesCount,
        totalPages: Math.ceil(memoriesCount / size),
      },
      data: formattedMemories,
    });
  } catch (error: any) {
    errorHandler(reply, error);
  }
}

async function getById(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({ id: z.string().uuid() });

  try {
    const { id } = paramsSchema.parse(request.params);
    const memory = await prisma.memory.findUniqueOrThrow({ where: { id } });

    return reply.send({ data: memory });
  } catch (error: any) {
    errorHandler(reply, error);
  }
}

export const memoriesController = { getAll, getById };
