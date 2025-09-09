import { Router } from "express";

const userRouter = Router();

userRouter.get("/:id", (req, res) => {
  res.send("hello");
});

export default userRouter;
