import { model, Schema } from 'mongoose';
import { TTask } from './task.interface';

const taskSchema = new Schema<TTask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String },
    deadline: { type: Date, required: true },
    priority: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Task = model<TTask>('Task', taskSchema);
