import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/get-categories.service';

export function useCategories(lang?: string) {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: lang ? [`categories-${lang}`] : ['categories'],
    queryFn: async () => await getCategories(lang),
  });

  return { data, isLoading, isError, isFetching };
}
