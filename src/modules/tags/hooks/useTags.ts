import { useQuery } from '@tanstack/react-query';
import { getTags } from '../services/tag.service';
import { Tag } from '../interfaces/tag.interface';

export function useTags() {
  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => await getTags(),
  });

  return { data: data as Tag[], isLoading, isError, isFetching, refetch };
} 