import {Router} from "express";
import Task from "../../../models/task.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const tasks = await Task.find({deleted: false});
  res.json(tasks);
});

router.get("/detail/:idTask", async (req, res) => {
  try {
    const task = await Task.findOne({_id: req.params.idTask, deleted: false});
    res.json(task);
  } catch {
    res.status(404).send("Not Found");
  }
});

export default router;