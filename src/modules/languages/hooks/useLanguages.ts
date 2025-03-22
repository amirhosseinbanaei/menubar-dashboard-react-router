import { getLanguages } from '@/common/services/get-languages.service';
import { useQuery } from '@tanstack/react-query';
import { Language } from '../interfaces/language.interface';

export function useLanguages() {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['languages'],
    queryFn: async () => await getLanguages(),
  });

  return { data: data as Language[], isLoading, isError, isFetching };
}
