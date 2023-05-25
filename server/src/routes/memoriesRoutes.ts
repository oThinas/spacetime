import { FastifyInstance } from 'fastify';

import { memoriesController } from '../contollers/memoriesController';

export async function memoriesRoutes(app: FastifyInstance): Promise<void> {
  app.get('/memories', memoriesController.getAll);
  app.get('/memories/:id', memoriesController.getById);
}
