import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("users").del();

    await knex('users').insert([
        { id: 1, firstName: 'lan', lastName: 'ho', email: 'lan.ho@gmail.com', hash: '123456789' },
    ]);
}
