import { z } from 'zod';

import { FastifyRequest } from 'fastify';

export function pageableFormatter(request: FastifyRequest): { page: number, size: number } {
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

  const { page, size } = querySchema.parse(request.query);
  return { page, size };
}
