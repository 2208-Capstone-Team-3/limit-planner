import { Sequelize } from "sequelize";

const DB_NAME = "limit_planner_db";
const URL = `postgres://localhost/${DB_NAME}`;
const config = {
  logging: false,
};
let db: Sequelize;

process.env.DATABASE_URL
  ? (db = new Sequelize(process.env.DATABASE_URL, {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }))
  : (db = new Sequelize(URL, config));

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err: Error) => {
    console.error("Unable to connect to the database:", err);
  });

export default db;
