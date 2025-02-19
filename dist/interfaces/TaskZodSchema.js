"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskZodSchema = void 0;
const zod_1 = require("zod");
const TaskInterface_1 = require("./TaskInterface");
exports.TaskZodSchema = zod_1.z.object({
    title: zod_1.z.string().min(0, "Title should not be empty string"),
    description: zod_1.z.string().min(0, "Description should not be empty string"),
    status: zod_1.z.nativeEnum(TaskInterface_1.StatusEnum).optional(),
});
