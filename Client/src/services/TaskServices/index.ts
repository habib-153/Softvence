"use server";

import { revalidateTag } from "next/cache";

import axiosInstance from "@/src/libs/AxiosInstance";
import { TTask } from "@/src/types";

export const createTask = async(data : TTask) => {
  try {
    const response = await axiosInstance.post("/tasks", data);

    revalidateTag("tasks");

    return response.data;
  } catch (error: any) {
    //console.log(error.response ? error.response.data : error.message);
  }
}

export const getAllTask = async (apiUrl: string) => {
  const res = await fetch(apiUrl, {
    next: {
      tags: ["tasks"],
    },
  });

  const data = await res.json();

  return data;
};

export const getSingleTask = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/tasks/${id}`);

    return response.data;
  } catch (error: any) {
    //console.log(error.response ? error.response.data : error.message);
  }
};

export const updateTask = async (id: string, data: TTask) => {
  try {
    const response = await axiosInstance.patch(`/tasks/${id}`, data);

    revalidateTag("tasks");

    return response.data;
  } catch (error: any) {
    //console.log(error.response ? error.response.data : error.message);
  }
};

export const deleteTask = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/tasks/${id}`);

    revalidateTag("tasks");

    return response.data;
  } catch (error: any) {
    //console.log(error.response ? error.response.data : error.message);
  }
}