import knexConfig from "../knexfile";
import Knex from "knex";

const enviroment = process.env.NODE_ENV || "development";
const db = Knex(knexConfig[enviroment])

export default db;