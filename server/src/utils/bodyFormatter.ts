import { FastifyRequest } from 'fastify';
import { ZodObject, z } from 'zod';

export function bodyFormatter({ body }: FastifyRequest, mode: 'create' | 'update') {
  const bodySchema = z.object({
    content: z.string(),
    coverUrl: z.string(),
    isPublic: z.coerce.boolean().default(false),
  }).strict();

  const bodySchemaFormatted = mode === 'update' ? optionalBodyFormatter(bodySchema) : bodySchema;

  const { content, coverUrl, isPublic } = bodySchemaFormatted.parse(body);

  return { content, coverUrl, isPublic };
}

function optionalBodyFormatter(objectSchema: ZodObject<any>) {
  return objectSchema.strict().partial();
}
