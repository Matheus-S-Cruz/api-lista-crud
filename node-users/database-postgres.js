import { randomUUID } from "crypto";
import { sql } from './db.js';

export class DatabasePostgres { 
  async listProdutos() {
    const produtos = await sql`select * from produtos`;
    return produtos;
  }

  async createProduto(produto) {
    const id = randomUUID();
    console.log('id', id);
    const name = produto.name;
    const descricao = produto.descricao;

    await sql`insert into produtos (id, name, descricao)
    values (${id}, ${name}, ${descricao})`
  }

  async updateProduto(id, produto) {
    const name = produto.name;
    const descricao = produto.descricao;

    await sql`update produtos set 
        name = ${name},
        descricao = ${descricao}
        where id = ${id}
    `;
  }

  async deleteProduto(id) {
    await sql`delete from produtos where id = ${id}`
  }
}
