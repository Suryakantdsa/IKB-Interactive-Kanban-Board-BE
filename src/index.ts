import express from "express";
import Task from "./models/taskModel";
import { StatusEnum, Task_GET } from "./interfaces/TaskInterface";
import { TaskZodSchema } from "./interfaces/TaskZodSchema";
import dotenv from "dotenv";
import { connectDB } from "./db/database";
import cors from "cors";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8080;

app.post("/create-task", async (req, res) => {
  try {
    const validatedData = TaskZodSchema.parse(req.body);
    const newTask = await Task.create(validatedData);
    res.status(201).json({ msg: "Task created successfully", task: newTask });
  } catch (error: any) {
    res.status(400).json({ msg: error.errors || "Invalid request data" });
  }
});
app.get("/task-details/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ msg: "Task not found" });
      return;
    }
    res.status(200).json(task);
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
});
app.get("/get-tasks", async (req, res) => {
  //
  try {
    const data: {
      toDo: Task_GET[];
      inProgress: Task_GET[];
      completed: Task_GET[];
    } = {
      toDo: [],
      inProgress: [],
      completed: [],
    };
    const allTask = (await Task.find()) as Task_GET[];
    if (allTask && allTask.length > 0) {
      res.status(201).json(allTask);
      return;
    }
    res.status(201).json(allTask);
    return;
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
});
app.patch("/update-task/:id", async (req, res) => {
  try {
    const validatedData = TaskZodSchema.partial().parse(req.body);
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true }
    );

    if (!updatedTask) {
      res.status(404).json({ msg: "Task not found" });
      return;
    }
    res
      .status(200)
      .json({ msg: "Task updated successfully", task: updatedTask });
  } catch (error: any) {
    res.status(400).json({ msg: error.errors || "Invalid request data" });
  }
});
app.delete("/delete-task/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        status: StatusEnum.DELETED,
      },
      { new: true }
    );
    if (!deletedTask) {
      res.status(404).json({ msg: "Task not found" });
      return;
    }
    console.log();
    res
      .status(200)
      .json({ msg: "Task deleted successfully", task: deletedTask });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
