import { useQuery } from '@tanstack/react-query';
import { Item } from '../interfaces/item.interface';
import { getItem } from '../services/item.service';

export function useItem(id: number) {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: [`item-${id}`],
    queryFn: async () => await getItem(id),
  });

  return { data: data as Item, isLoading, isError, isFetching };
}
