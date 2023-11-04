import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", function(table) {
        table.increments('id').primary().unsigned()
        table.string('firstName', 32).notNullable();
        table.string('lastName', 32).notNullable();
        table.string('email', 64).unique().index().notNullable();
        table.string('hash', 255).notNullable();
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}

