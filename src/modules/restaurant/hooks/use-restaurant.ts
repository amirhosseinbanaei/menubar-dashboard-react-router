import { useQuery } from '@tanstack/react-query';
import { getRestaurant } from '../services/restaurant.service';
import { RestaurantResponse } from '../interface/restaurant.interface';

export function useRestaurant({ filter }: { filter: string }) {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['restaurants', filter],
    queryFn: async () => await getRestaurant(filter),
  });

  return {
    data: data as RestaurantResponse,
    isLoading,
    isError,
    isFetching,
  };
}
