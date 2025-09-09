import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", (req, res) => {
  res.send("signup");
});
authRouter.post("/sign-in", (req, res) => {
  res.send("signin");
});
authRouter.post("/sign-out", (req, res) => {
  res.send("signout");
});

export default authRouter;
