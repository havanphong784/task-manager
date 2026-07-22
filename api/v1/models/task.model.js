import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
  title: String,
  status: String,
  content: String,
  createdBy: String,
  listUser: Array,
  taskParentId: String,
  timeStart: Date,
  timeEnd: Date,
  deleted: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema, "tasks");
export default Task;