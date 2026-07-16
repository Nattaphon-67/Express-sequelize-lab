import express from "express";
import { connectDB } from "./db.js";

const app = express();
const PORT = 5000;

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to the Express-Sequelize API" });
  send("Welcome to the Express-Sequelize API");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
