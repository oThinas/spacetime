import { z } from 'zod';

import { FastifyRequest } from 'fastify';

export function pageableFormatter({ query }: FastifyRequest): { page: number, size: number } {
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

  const { page, size } = querySchema.parse(query);
  return { page, size };
}
