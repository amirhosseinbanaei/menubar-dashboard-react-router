import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../services/order.service';
import { Order } from '../interface/order.interface';

export function useOrders() {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => await getOrders(),
  });

  return { data: data as Order[], isLoading, isError, isFetching };
}
