import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { FastifyReply } from 'fastify';

import { NotFound, IncorrectRequest, BaseError } from '../errors';
import { IZodError } from '../interfaces/IZodError';

export async function errorHandler(reply: FastifyReply, error: any): Promise<FastifyReply> {
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === 'P2025') {
      return new NotFound().sendError(reply);
    }
  }

  /**
   * Zod Error
   */
  if ('issues' in error) {
    const issue = (error as IZodError).issues[0];

    const zodError = {
      issue: {
        code: issue.code,
        message: issue.message,
        path: issue.path[0],
        expected: issue.expected,
        received: issue.received,
        validation: issue.validation,
      },
    };

    if (zodError.issue.validation === 'uuid') {
      return new IncorrectRequest(`Param <${zodError.issue.path}> must be a string uuid`).sendError(reply);
    }

    if (zodError.issue.code === 'invalid_type') {
      return new IncorrectRequest(`Param <${zodError.issue.path}> must be a <${zodError.issue.expected}>`).sendError(reply);
    }
  }

  return new BaseError().sendError(reply, error);
}
