import express from "express";
import { connectDB } from "./db.js";

const app = express();
const PORT = 5000;

app.use(express.json());

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
