import { useQuery } from "@tanstack/react-query";

import { getAllTask } from "../services/PostServices";

export const useGetAllPosts = (apiUrl: string) => {
  return useQuery({
    queryKey: [apiUrl],
    queryFn: async () => await getAllTask(apiUrl),
  });
};


