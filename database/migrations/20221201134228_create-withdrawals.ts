import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('withdrawals', (table) => {
    table.uuid('id').primary().unique().notNullable();
    table.uuid('accountId').notNullable();
    table.integer('amount').notNullable();
    table.timestamp('createdAt').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('withdrawals');
}
