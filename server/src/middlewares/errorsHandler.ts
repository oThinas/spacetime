import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { FastifyReply } from 'fastify';

import { NotFound, IncorrectRequest, BaseError, ImATeaPot } from '../errors';
import { IZodError } from '../interfaces/IZodError';

export async function errorHandler(reply: FastifyReply, error: any): Promise<FastifyReply> {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
    case 'P2025':
      return new NotFound().sendError(reply);
    }
  }

  if (error instanceof NotFound) {
    return new NotFound().sendError(reply);
  }

  if (error instanceof ImATeaPot) {
    return new ImATeaPot().sendError(reply);
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
        path: issue.path ? issue.path[0] : null,
        key: issue.keys ? issue.keys[0] : null,
        expected: issue.expected,
        received: issue.received,
        validation: issue.validation,
      },
    };

    switch (zodError.issue.validation) {
    case 'uuid':
      return new IncorrectRequest(`Param <${zodError.issue.path}> must be a string uuid`).sendError(reply);
    }

    switch (zodError.issue.code) {
    case 'unrecognized_keys':
      return new IncorrectRequest(`Param <${zodError.issue.key}> is not expected`).sendError(reply);

    case 'invalid_type':
      if (zodError.issue.path) {
        return new IncorrectRequest(`Param <${zodError.issue.path}> must be a <${zodError.issue.expected}>`).sendError(reply);
      }

      return new IncorrectRequest('<body> is required').sendError(reply);
    }
  }

  return new BaseError().sendError(reply, error);
}
