import { useQuery } from '@tanstack/react-query';
import { getExtraItems } from '../services/extra-item.service';
import { ExtraItem } from '../interfaces/extra-item.interface';

export function useExtraItems() {
  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ['extra-items'],
    queryFn: async () => await getExtraItems(),
  });

  return { data: data as ExtraItem[], isLoading, isError, isFetching, refetch };
}
