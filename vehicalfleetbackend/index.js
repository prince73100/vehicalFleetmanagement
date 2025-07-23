import dotenv from "dotenv";
import express from "express";
import connectDB from "./dbconfig/dbConnect.js";
import { router } from "./route/index.js";
import cors from "cors";
dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


export default app;
