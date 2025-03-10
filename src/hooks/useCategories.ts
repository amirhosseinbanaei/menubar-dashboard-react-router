import { fetchCategoriesAPI } from "@/services/category";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategoriesAPI(),
  });

  return { data, isLoading, error };
};
