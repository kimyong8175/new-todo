import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;
const app: Express = express();

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
