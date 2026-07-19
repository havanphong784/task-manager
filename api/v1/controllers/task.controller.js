import Task from "../models/task.model.js";

// [GET] /api/v1/tasks
export const index = async (req, res) => {
  const find = {deleted: false};
  if (req.query.status) {
    find.status = req.query.status;
  }

  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }

  const tasks = await Task.find(find).sort(sort);
  res.json(tasks);
};

// [GET] /api/v1/tasks/detail/:idTask
export const detail = async (req, res) => {
  try {
    const task = await Task.findOne({_id: req.params.idTask, deleted: false});
    res.json(task);
  } catch {
    res.status(404).send("Not Found");
  }
};