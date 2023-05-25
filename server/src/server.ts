import fastify from 'fastify';
import fastifyCors from '@fastify/cors';

const app = fastify();
app.register(fastifyCors, { origin: true });

app.listen({ port: 3333, host: 'localhost' }).then(() => console.log('⌛ Servidor rodando em http://localhost:3333'));
