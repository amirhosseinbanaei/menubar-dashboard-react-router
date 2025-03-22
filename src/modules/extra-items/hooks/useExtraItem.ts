import { useQuery } from '@tanstack/react-query';
import { getExtraItem } from '../services/extra-item.service';
import { ExtraItem } from '../interfaces/extra-item.interface';

export function useExtraItem(id: number) {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: [`extra-item-${id}`],
    queryFn: async () => await getExtraItem(id),
  });

  return { data: data as ExtraItem, isLoading, isError, isFetching };
}
