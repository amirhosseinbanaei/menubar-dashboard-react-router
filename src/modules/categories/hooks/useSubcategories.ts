import { useQuery } from '@tanstack/react-query';
import { getSubcategories } from '../services/subcategory.service';

export function useSubcategories(categoryId: number) {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: [`subcategories:category-${categoryId}`],
    queryFn: async () => await getSubcategories(categoryId),
  });

  return { data, isLoading, isError, isFetching };
}