import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import jobRoute from "./routes/job.route.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/jobs", jobRoute);
app.use("/auth", authRoute);
app.use("/users", userRoute);

app.use(errorMiddleware);

// app.get(*, (req, res) => {
//   res.send("helllo");
// });

connectDB().then(() =>
  app.listen(3000, () => {
    console.log("server is connected");
  })
);
