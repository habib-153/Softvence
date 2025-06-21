import { TStatus, TCategory } from "./task.constant";


export type TTask = {
  _id?: string;
  title: string;
  description: string;
  status?: TStatus;
  priority: string;
  deadline: Date;
  category: TCategory;
  createdAt?: Date;
  updatedAt?: Date;
};