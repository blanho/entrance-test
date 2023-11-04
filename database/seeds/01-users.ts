import { Knex } from "knex";
import bcrypt from "bcrypt"

export async function seed(knex: Knex): Promise<void> {
    await knex("users").del();

    const password = '123456789';   
    const hashedPassword = await bcrypt.hash(password, 10);

    await knex('users').insert([
        { id: 1, firstName: 'lan', lastName: 'ho', email: 'lan.ho@gmail.com', hash: hashedPassword },
    ]);
}
