import { FastifyInstance } from 'fastify';

import { memoriesController } from '../contollers/memoriesController';

export async function memoriesRoutes(app: FastifyInstance): Promise<void> {
  app.get('/memories', memoriesController.getAll);
  app.get('/memories/:id', memoriesController.getById);
  app.post('/memories', memoriesController.create);
  app.put('/memories/:id', memoriesController.update);
  app.delete('/memories/:id', memoriesController.remove);
}
