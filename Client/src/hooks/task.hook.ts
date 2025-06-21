import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createTask,
  deleteTask,
  getAllTask,
  updateTask,
} from "../services/TaskServices";
import { TTask } from "../types";

export const useCreateTask = () => {
  return useMutation<any, Error, TTask>({
    mutationKey: ["CREATE_TASK"],
    mutationFn: async (payload) => await createTask(payload),
    onSuccess: () => {
      toast.success("Post created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateTask = () => {
  return useMutation<any, Error, { id: string; data: TTask }>({
    mutationKey: ["UPDATE_TASK"],
    mutationFn: async ({ id, data }) => await updateTask(id, data),
    onSuccess: () => {
      toast.success("Task updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllTasks = (apiUrl: string) => {
  return useQuery({
    queryKey: [apiUrl],
    queryFn: async () => await getAllTask(apiUrl),
  });
};

export const useGetSingleTask = (id: string) => {
  return useQuery({
    queryKey: ["SINGLE_TASK", id],
    queryFn: async () => await getAllTask(`/tasks/${id}`),
    enabled: !!id,
  });
};

export const useDeleteTask = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_TASK"],
    mutationFn: async (id) => await deleteTask(id),
    onSuccess: () => {
      toast.success("Task deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
