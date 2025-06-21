"use server";

export const getAllTask = async (apiUrl: string) => {
  const res = await fetch(apiUrl, {
    next: {
      tags: ["posts"],
    },
  });

  const data = await res.json();

  return data;
};