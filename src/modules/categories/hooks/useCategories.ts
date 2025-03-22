import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/category.service';
import { Category } from '../interfaces/category.interface';

export function useCategories(details: boolean = false) {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await getCategories(details),
  });

  return { data: data as Category[], isLoading, isError, isFetching };
}
