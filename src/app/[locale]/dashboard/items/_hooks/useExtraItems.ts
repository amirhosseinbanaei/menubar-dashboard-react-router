import { fetchExtraItemsAPI } from "@/services/extraItem";
import { useQuery } from "@tanstack/react-query";

export const useExtraItems = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["extraItems"],
    queryFn: () => fetchExtraItemsAPI(),
  });

  return { data, isLoading, error };
};
