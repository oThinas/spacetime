import 'dotenv/config';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';

import { app } from './lib/app';
import { memoriesRoutes, authRoutes } from './routes';


app.register(fastifyCors, { origin: true });
app.register(fastifyJwt, { secret: process.env.JWT_SECRET || '' });

app.register(memoriesRoutes);
app.register(authRoutes);

app.listen({ port: 3333, host: 'localhost' }).then(() => console.log('⌛ Servidor rodando em http://localhost:3333'));
