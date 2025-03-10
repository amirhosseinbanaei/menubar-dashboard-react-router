import { useQuery } from "@tanstack/react-query";
import { getSingleCategoryAction } from "@/server-actions/category/category-action";

export function useSingleCategory(categoryId: string) {
  const { data: category, isLoading: isLoadingCategory } = useQuery({
    queryKey: ["categories", categoryId],
    queryFn: async () => await getSingleCategoryAction(categoryId),
  });

  return { category, isLoadingCategory };
}
