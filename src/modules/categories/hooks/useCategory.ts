import { useQuery } from '@tanstack/react-query';
import { getCategory } from '../services/get-category.service';
import { Category } from '../interfaces/category.interface';
export function useCategory(id: number) {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: [`category-${id}`],
    queryFn: async () => await getCategory(id),
  });

  return { data: data as Category, isLoading, isError, isFetching };
}
