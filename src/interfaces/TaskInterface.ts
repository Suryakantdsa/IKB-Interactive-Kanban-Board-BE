export enum StatusEnum {
  TODO = "TODO",
  INPROGRESS = "INPROGRESS",
  COMPLETED = "COMPLETED",
}

export interface Task_GET {
  title: string;
  description: string;
  status: StatusEnum;
  createdAt: Date;
  updatedAt: Date;
}
export interface Task_POST {
  title: string;
  description: string;
  status?: StatusEnum;
}
export interface Task_PATCH {
  title?: string;
  description?: string;
  status?: StatusEnum;
}
