import { z } from "zod";
import { StatusEnum } from "./TaskInterface";

export const TaskZodSchema = z.object({
  title: z.string().min(0, "Title should not be empty string"),
  description: z.string().min(0, "Description should not be empty string"),
  status: z.nativeEnum(StatusEnum).optional(),
});
