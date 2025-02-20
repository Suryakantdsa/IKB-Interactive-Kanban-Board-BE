"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskModel_1 = __importDefault(require("./models/taskModel"));
const TaskInterface_1 = require("./interfaces/TaskInterface");
const TaskZodSchema_1 = require("./interfaces/TaskZodSchema");
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./db/database");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
(0, database_1.connectDB)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 8080;
app.post("/create-task", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = TaskZodSchema_1.TaskZodSchema.parse(req.body);
        const newTask = yield taskModel_1.default.create(validatedData);
        res.status(201).json({ msg: "Task created successfully", task: newTask });
    }
    catch (error) {
        res.status(400).json({ msg: error.errors || "Invalid request data" });
    }
}));
app.get("/task-details/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield taskModel_1.default.findById(req.params.id);
        if (!task) {
            res.status(404).json({ msg: "Task not found" });
            return;
        }
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
}));
app.get("/get-tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //
    try {
        const data = {
            toDo: [],
            inProgress: [],
            completed: [],
        };
        const allTask = (yield taskModel_1.default.find());
        if (allTask && allTask.length > 0) {
            res.status(201).json(allTask);
            return;
        }
        res.status(201).json(allTask);
        return;
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
}));
app.patch("/update-task/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = TaskZodSchema_1.TaskZodSchema.partial().parse(req.body);
        const updatedTask = yield taskModel_1.default.findByIdAndUpdate(req.params.id, validatedData, { new: true });
        if (!updatedTask) {
            res.status(404).json({ msg: "Task not found" });
            return;
        }
        res
            .status(200)
            .json({ msg: "Task updated successfully", task: updatedTask });
    }
    catch (error) {
        res.status(400).json({ msg: error.errors || "Invalid request data" });
    }
}));
app.delete("/delete-task/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTask = yield taskModel_1.default.findByIdAndUpdate(req.params.id, {
            status: TaskInterface_1.StatusEnum.DELETED,
        }, { new: true });
        if (!deletedTask) {
            res.status(404).json({ msg: "Task not found" });
            return;
        }
        console.log();
        res
            .status(200)
            .json({ msg: "Task deleted successfully", task: deletedTask });
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
