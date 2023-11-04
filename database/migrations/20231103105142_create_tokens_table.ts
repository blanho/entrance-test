import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tokens', function(table) {
        table.increments('id').primary().unsigned()
        table.integer('userId').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.string('refreshToken', 250).notNullable();
        table.string('expiresIn', 64).notNullable();
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('tokens');
}

