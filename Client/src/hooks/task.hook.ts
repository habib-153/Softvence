import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createTask,
  deleteTask,
  getAllTask,
  updateTask,
} from "../services/TaskServices";
import { TTask } from "../types";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, TTask>({
    mutationKey: ["CREATE_TASK"],
    mutationFn: async (payload) => await createTask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0]?.toString().includes("/tasks") ?? false,
      });
      toast.success("Task created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { id: string; data: TTask }>({
    mutationKey: ["UPDATE_TASK"],
    mutationFn: async ({ id, data }) => await updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0]?.toString().includes("/tasks") ?? false,
      });
      // toast.success("Task updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_TASK"],
    mutationFn: async (id) => await deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0]?.toString().includes("/tasks") ?? false,
      });
      toast.success("Task deleted successfully");
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
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useGetSingleTask = (id: string) => {
  return useQuery({
    queryKey: ["SINGLE_TASK", id],
    queryFn: async () => await getAllTask(`/tasks/${id}`),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};