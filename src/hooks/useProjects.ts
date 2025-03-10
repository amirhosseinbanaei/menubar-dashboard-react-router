import { fetchProjectAPI } from "@/services/project";
import { useQuery } from "@tanstack/react-query";

export const usePorjects = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchProjectAPI(),
  });

  return { data, isLoading, error };
};
