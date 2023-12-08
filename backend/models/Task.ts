import { Schema, model } from "mongoose";

interface ITask {
  title: string;
  description?: string;
}

const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const Task = model<ITask>("Task", taskSchema);

export default Task;
