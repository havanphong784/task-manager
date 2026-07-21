import Task from "../models/task.model.js";
import paginationHelper from "../../../helpers/pagination.helper.js";
import searchHelper from "../../../helpers/search.helper.js";

// [GET] /api/v1/tasks
export const index = async (req, res) => {
  const find = {deleted: false};
  if (req.query.status) {
    find.status = req.query.status;
  }

  const pagination = {
    page: 1,
    limit: 9
  }

  const search = searchHelper(req.query);
  if (req.query.keyword) {
    find.title = search.regex;
  }

  const count = await Task.countDocuments(find);
  const paginationObject = paginationHelper(pagination, req.query, count);

  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }

  const tasks = await Task.find(find)
    .sort(sort)
    .skip(paginationObject.skip)
    .limit(paginationObject.limit);
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

// [PATCH] /api/v1/tasks/change-status/:idTask
export const changeStatus = async (req, res) => {
  try {
    const id = req.params.idTask;
    const status = req.body.status;
    await Task.updateOne({_id: id}, {status: status});
    res.json({code: 200, message: "Cập nhật trạng thái thành công"});
  } catch {
    res.json({code: 400, message: "Lỗi"});
  }
}

// [PATCH] /api/v1/tasks/change-multi
export const changeMulti = async (req, res) => {
  try {
    const {ids, key, value} = req.body;
    switch (key) {
      case "status":
        await Task.updateMany({_id: {$in: ids}}, {status: value});
        res.json({code: 200, message: "Cập nhật trạng thái thành công"});
        break
    }
  } catch (e) {
    res.json({
      code: 400,
      message: "Không tồn tại"
    })
  }
}

// [POST] /api/v1/tasks/create
export const create = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.json({
      code: 200,
      message: "Tạo thành công!",
    });
  } catch (e) {
    res.json({code: 400, message: "Lỗi!"});
  }
}


