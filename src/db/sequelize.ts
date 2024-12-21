import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "dev"}` });
// Create a new Sequelize instance for MySQL connection
const dbName = process.env.DB_NAME || "dummyDatabase";
const dbUser = process.env.DB_USER || "postgres";
const dbPassword = process.env.DB_PASSWORD || "8246";

console.log(dbName, dbUser, dbPassword);

const sequelizeConfig = new Sequelize(dbName, dbUser, dbPassword, {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  logging: true,
  pool: {
    max: 5,
    idle: 100,
  },
});

// Test the connection
const sequelizeConnect = async () => {
  try {
    await sequelizeConfig.authenticate();
    console.log("Connection has been established successfully.");
    // await sequelizeConfig.sync({ alter: true });
    // console.log("Tables synced successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelizeConfig, sequelizeConnect };
