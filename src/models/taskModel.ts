import mongoose, { Document, Model, Schema } from "mongoose";
import { StatusEnum } from "../interfaces/TaskInterface";

interface ITasks extends Document {
  title: String;
  description: String;
  status: StatusEnum;
}

const taskSchema: Schema<ITasks> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(StatusEnum),
      default: StatusEnum.TODO,
    },
  },
  { timestamps: true }
);

const Task: Model<ITasks> = mongoose.model("task", taskSchema);

export default Task;
