import { IZodError } from './../interfaces/IZodError';
import { FastifyReply } from 'fastify';
import { NotFound } from './notFound';
import { BaseError } from './baseError';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { IncorrectRequest } from './incorrectRequest';


export function errorHandler(reply: FastifyReply, error: any): void {
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === 'P2025') {
      new NotFound().sendError(reply);
    }
  }

  /**
   * Zod Error
   */
  if ('issues' in error) {
    const issue = (error as IZodError).issues[0];

    const zodError = {
      issue: {
        validation: issue.validation,
        code: issue.code,
        message: issue.message,
        path: issue.path[0],
      },
    };

    if (zodError.issue.validation === 'uuid') {
      new IncorrectRequest(`Param <${zodError.issue.path}> must be a string uuid`).sendError(reply);
    }
  }

  return new BaseError().sendError(reply, error);
}
