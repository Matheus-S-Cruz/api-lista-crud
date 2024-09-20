import { fastify } from 'fastify';
import cors from '@fastify/cors';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();
const databasePostgres = new DatabasePostgres;

// CORS
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})

// ENDPOINTS (CRUD):

// CREATE
server.post('/produtos', async (request, reply) => {
    const body = request.body;
    await databasePostgres.createProduto(body);
    return reply.status(201).send();
})

// READ
server.get('/produtos', async () => {
    const produtos = await databasePostgres.listProdutos();
    return produtos;
});

// UPDATE
server.put('/produtos/:id', async (request, reply) => {
    const produtoID = request.params.id;
    const body = request.body;
    await databasePostgres.updateProduto(produtoID, body);

    return reply.status(204).send();
})

// DELETE
server.delete('/produtos/:id', async (request, reply) => {
    const produtoID = request.params.id;
    await databasePostgres.deleteProduto(produtoID);

    return reply.status(204).send();
})

server.listen({
    port: 3333
});
