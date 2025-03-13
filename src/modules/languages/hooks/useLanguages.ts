import { getLanguages } from '@/common/services/get-languages.service';
import { useQuery } from '@tanstack/react-query';

export function useLanguages() {
  const { data, isLoading, isError, isFetching } = useQuery({
   queryKey: ['languages'],
   queryFn: async () => await getLanguages()
  });

  return { data, isLoading, isError, isFetching };
}
