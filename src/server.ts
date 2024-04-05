import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import router from "./router";
import ErrorHandler from "./middlewares/errorHandler";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/api", router);
app.use(ErrorHandler);
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
