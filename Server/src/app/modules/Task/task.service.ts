/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TTask } from './task.interface';
import { Task } from './task.model';
import { QueryBuilder } from '../../builder/QueryBuilder';

const createTaskIntoDB = async (payload: TTask) => {
  try {
    // Check if the task deadline has expired
    const currentTime = new Date();
    const taskDeadline = new Date(payload.deadline);

    if (currentTime > taskDeadline) {
     throw new AppError(httpStatus.BAD_REQUEST, 'Task deadline has already expired');
    }

    const result = await Task.create(payload);
    return result;
  } catch (error: any) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create task')
  }
};

const getAllTasksFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = ['title'];

  const products = new QueryBuilder(Task.find(), query)
    .search(searchableFields)
    .filter();

  const result = await products.modelQuery;

  return result;
};

const getSingleTaskFromDB = async (id: string) => {
  const result = await Task.findById(id);
  return result;
};

const updateTaskIntoDB = async (id: string, payload: TTask) => {
  const result = await Task.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true }
  );
  return result;
};

const deleteTaskFromDB = async (id: string) => {
  const result = await Task.findByIdAndDelete(id);
  return result;
};

export const TaskServices = {
  createTaskIntoDB,
  getAllTasksFromDB,
  getSingleTaskFromDB,
  updateTaskIntoDB,
  deleteTaskFromDB
};
