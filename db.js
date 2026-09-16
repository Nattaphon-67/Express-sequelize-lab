import { Sequelize, DataTypes } from "sequelize";

const dbName = globalThis.process?.env?.PGDATABASE || "dev_db";
const dbUser = globalThis.process?.env?.PGUSER || "dev_user";
const dbPassword = globalThis.process?.env?.PGPASSWORD || "dev_password";
const dbHost = globalThis.process?.env?.PGHOST || "127.0.0.1";
const dbPort = Number(globalThis.process?.env?.PGPORT) || 5433;
const sslEnabled = globalThis.process?.env?.PGSSL === "true";

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: "postgres",
  logging: false,
  ...(sslEnabled
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {}),
});

//define database schema
const Product = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    globalThis.process?.exit?.(1);
  }
};

export { sequelize, Product, connectDB };
