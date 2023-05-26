import { FastifyRequest } from 'fastify';
import { z } from 'zod';

export function idExtractor({ params }: FastifyRequest) {
  const paramsSchema = z.object({ id: z.string().uuid() });
  const { id } = paramsSchema.parse(params);
  return id;
}
