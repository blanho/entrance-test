import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("tokens").del();

   
    await knex("tokens").insert([
        { userId: 1, refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTY5OTA0MjkyNH0.zY9F9YBAX7ee2TzhxOpdD6nLl0JOb8tUeGZzW8rTN8U', expiresIn: '2023-12-03T20:22:04.227Z' },
    ]);
}
