import { PrismaClient } from '@prisma/client';
import fastify from 'fastify';

const app = fastify();
const prisma = new PrismaClient();

app.get('/users', async (__, response) => {
  const users = await prisma.user.findMany();
  return response.send(users);
});

app.listen({ port: 3333, host: 'localhost' }).then(() => console.log('⌛ Servidor rodando em http://localhost:3333'));
