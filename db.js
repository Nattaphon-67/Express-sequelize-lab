import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("dev_db", "dev_user", "dev_password", {
  host: "127.0.0.1",
  port: 5433,
  dialect: "postgres",
  logging: false,
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
    process.exit(1);
  }
};
export { sequelize, Product, connectDB };
