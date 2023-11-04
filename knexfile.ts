import type { Knex } from "knex";
import dotenv from "dotenv"
dotenv.config()

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.MYSQL_DEV_HOST,
      user: process.env.MYSQL_DEV_USERNAME,
      password: process.env.MYSQL_DEV_PASSWORD,
      database: process.env.MYSQL_DEV_DATABASE,
      port: Number(process.env.MYSQL_DEV_PORT)
    },
    migrations: {
      directory: ("./database/migrations")
    },
    seeds: {
      directory: "./database/seeds" 
    }
  },

  testing: {
    client: "mysql2",
    connection: {
      host: process.env.MYSQL_TEST_HOST,
      user: process.env.MYSQL_TEST_USERNAME,
      password: process.env.MYSQL_TEST_PASSWORD,
      database: process.env.MYSQL_TEST_DATABASE,
      port: Number(process.env.MYSQL_TEST_PORT)
    },
    migrations: {
      directory: ("./database/migrations")
    },
    seeds: {
      directory: "./database/seeds" 
    }
  },

};
export default config;