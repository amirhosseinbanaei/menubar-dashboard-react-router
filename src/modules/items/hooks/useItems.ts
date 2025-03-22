import { useQuery } from '@tanstack/react-query';
import { getItems } from '../services/item.service';

export function useItems() {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['items'],
    queryFn: async () => await getItems(),
  });

  return { data, isLoading, isError, isFetching };
}
