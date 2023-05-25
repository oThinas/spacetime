import { FastifyReply } from 'fastify';

export class BaseError extends Error {
  status: number;

  constructor(message = 'Internal server error', status = 500) {
    super(message);
    this.status = status;
  }

  sendError(reply: FastifyReply, error?: any) {
    reply.status(this.status).send({
      error: {
        message: this.message,
        status: this.status,
      },
      details: error,
    });
  }
}
