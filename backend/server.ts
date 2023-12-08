import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";

const port = process.env.PORT || 8080;
const app: Express = express();

import userRouter from "./routes/userRoutes";

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World");
});

app.listen(port, () => {
  connectDB();
  console.log(`http://localhost:${port}`);
});
