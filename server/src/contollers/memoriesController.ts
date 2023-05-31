import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../lib/prisma';

import { errorHandler, replyHandler } from '../middlewares';
import { bodyFormatter, idExtractor, pageableFormatter } from '../utils';

async function getAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { page, size } = pageableFormatter(request);
    const memories = await prisma.memory.findMany({
      where: { userId: request.user.sub },
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
  try {
    const id = idExtractor(request);
    const memory = await prisma.memory.findUniqueOrThrow({ where: { id } });

    if (!memory.isPublic && memory.userId !== request.user.sub) {
      return reply.status(403).send({ message: 'Forbidden' });
    }

    return reply.send({ data: memory });
  } catch (error: any) {
    errorHandler(reply, error);
  }
}

async function create(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { content, coverUrl, isPublic } = bodyFormatter(request, 'create');
    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: request.user.sub,
      },
    });

    return reply.status(201).send({ data: memory });
  } catch (error) {
    errorHandler(reply, error);
  }
}

async function update(request: FastifyRequest, reply: FastifyReply) {
  try {
    const id = idExtractor(request);
    const { content, coverUrl, isPublic } = bodyFormatter(request, 'update');

    const oldMemory = await prisma.memory.findUniqueOrThrow({ where: { id } });

    const newMemory = await prisma.memory.update({
      where: { id },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    });

    replyHandler(reply, {
      oldData: oldMemory,
      newData: newMemory,
    });
  } catch (error) {
    errorHandler(reply, error);
  }
}

async function remove(request: FastifyRequest, reply: FastifyReply) {
  try {
    const id = idExtractor(request);

    let memory = await prisma.memory.findUniqueOrThrow({ where: { id } });
    if (memory.userId !== request.user.sub) {
      return reply.status(403).send({ message: 'Forbidden' });
    }

    memory = await prisma.memory.delete({ where: { id } });

    return reply.send({ data: memory });
  } catch (error) {
    errorHandler(reply, error);
  }
}

async function preHandler(request: FastifyRequest) {
  await request.jwtVerify();
}

export const memoriesController = { getAll, getById, create, update, remove, preHandler };
