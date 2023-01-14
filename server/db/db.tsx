import { Sequelize } from "sequelize-typescript";

const config = {
  logging: false,
};

const DB_NAME = "limit_planner_db";
const URL = `postgres://localhost/${DB_NAME}`;
const db = new Sequelize(process.env.DATABASE_URL || URL, config);

export default db;
