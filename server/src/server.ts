import fastify from 'fastify';
import fastifyCors from '@fastify/cors';

import { memoriesRoutes } from './routes/memoriesRoutes';

const app = fastify();
app.register(fastifyCors, { origin: true });

app.register(memoriesRoutes);

app.listen({ port: 3333, host: 'localhost' }).then(() => console.log('⌛ Servidor rodando em http://localhost:3333'));
