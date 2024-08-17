import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./db/connectDb.js";
import serverless from "serverless-http";
import { errorMiddleWare } from "./middlewares/errorMiddleWare.js";
import { userRouter } from "./router/userRouter.js";
import { postRouter } from "./router/postRouter.js";

dotenv.config({
  path: "./.env",
});

const app = express();

if (process.env.ENV == "dev") {
  connectDb().then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`http://localhost:${process.env.PORT}`);
    });
  });
} else {
  connectDb();
}

export const handler = serverless(app);

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.get("/", (req, res) => {
  res.json({ status: "active" });
});

app.use("/user", userRouter);
app.use("/post", postRouter);

app.use(errorMiddleWare);
