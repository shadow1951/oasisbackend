import express from "express";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import indexRouter from "./routes/index.mjs";
import reservationRouter from "./routes/reservation.mjs";
import reservationHolderRouter from "./routes/reservationHolder.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

if (process.env.NODE_ENV !== "production") {
  const envPath = path.join(__dirname, ".env");
  dotenv.config({ path: envPath });
  mongoose.connect(process.env.DATABASE_URL);
  console.log("Succesfully connected to the database");
}
const corsoption = {
  origin: `${process.env.fDomain}`,
  methods: "GET,HEAD,PUT,POST,DELETE",
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsoption));
app.use("/", indexRouter);
app.use("/", reservationHolderRouter);

app.listen(
  process.env.PORT,
  console.log(`listening on port ${process.env.PORT}`)
);
