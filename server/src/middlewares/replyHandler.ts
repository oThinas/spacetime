import { FastifyReply } from 'fastify';

import { IDataReply } from '../interfaces/IDataReply';
import { ImATeaPot, NotFound } from '../errors';
import { compareObjects } from '../utils/compareObjects';
import { errorHandler } from './errorsHandler';

export async function replyHandler(reply: FastifyReply, dataReply: IDataReply) {
  try {
    const { data, oldData, newData } = dataReply;

    if (!(data && data.length) && !(oldData && newData)) {
      throw new NotFound();
    }

    if (newData && oldData && compareObjects(newData, oldData)) {
      throw new ImATeaPot();
    }

    return reply.send(dataReply);
  } catch (error) {
    errorHandler(reply, error);
  }
}
