import { FastifyReply } from 'fastify';

export class BaseError extends Error {
  status: number;

  constructor(message = 'Internal server error', status = 500) {
    super(message);
    this.status = status;
  }

  async sendError(reply: FastifyReply, error?: any): Promise<FastifyReply> {
    return reply.status(this.status).send({
      error: {
        message: this.message,
        status: this.status,
      },
      details: error,
    });
  }
}
