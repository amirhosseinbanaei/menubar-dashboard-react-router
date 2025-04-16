import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import { getItems } from '../services/item.service';
import { Item } from '../interfaces/item.interface';

export function useItems(cateogry_id?: number) {
  let queryOptions: UndefinedInitialDataOptions;

  if (cateogry_id) {
    queryOptions = {
      queryKey: ['items', `cateogry:${cateogry_id}`],
      queryFn: async () => await getItems(`?category_id=${cateogry_id}`),
    };
  } else {
    queryOptions = {
      queryKey: ['items'],
      queryFn: async () => await getItems(),
    };
  }
  const { data, isLoading, isError, isFetching } = useQuery(queryOptions);

  return { data: data as Item[], isLoading, isError, isFetching };
}