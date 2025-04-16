import { useQuery } from '@tanstack/react-query';
import { getTag } from '../services/tag.service';
import { Tag } from '../interfaces/tag.interface';

export function useTag(id: string | number) {
  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ['tags', id],
    queryFn: async () => await getTag(id),
  });

  return { data: data as Tag, isLoading, isError, isFetching, refetch };
} 