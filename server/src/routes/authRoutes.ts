import { FastifyInstance } from 'fastify';

import { authController } from '../contollers/authController';

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', authController.register);
}
