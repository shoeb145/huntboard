import { Router } from "express";

const jobRouter = Router();

jobRouter.get("/", (req, res) => {
  res.send("all jobs");
});

jobRouter.get("/:id", (req, res) => {
  res.send("specific job");
});

jobRouter.post("/", (req, res) => {
  res.send("create job");
});
jobRouter.put("/", (req, res) => {
  res.send("update");
});
jobRouter.delete("/:id", (req, res) => {
  res.send("delete");
});

export default jobRouter;
