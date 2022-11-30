import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('accounts', (table) => {
    table.uuid('id').primary().unique().notNullable();
    table.uuid('userId').notNullable();
    table.integer('balance').notNullable().defaultTo(0);
    table.timestamp('createdAt').notNullable();
    table.timestamp('updatedAt').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('accounts');
}
