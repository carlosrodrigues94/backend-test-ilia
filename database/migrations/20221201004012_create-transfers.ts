import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transfers', (table) => {
    table.uuid('id').primary().unique().notNullable();
    table.uuid('originAccountId').notNullable();
    table.uuid('recipientAccountId').notNullable();
    table.integer('amount').notNullable();
    table.timestamp('createdAt').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transfers');
}
