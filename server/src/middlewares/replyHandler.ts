import { FastifyReply } from 'fastify';

import { IDataReply } from '../interfaces/IDataReply';
import { NotFound } from '../errors';

export async function replyHandler(reply: FastifyReply, dataReply: IDataReply) {
  const { data } = dataReply;
  if (!data.length || !data) {
    return new NotFound().sendError(reply);
  }

  return reply.send(dataReply);
}
