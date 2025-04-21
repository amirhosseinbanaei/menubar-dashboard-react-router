import { useMutation, useQuery } from '@tanstack/react-query';
import { getOrders } from '../services/order.service';
import { Order } from '../interface/order.interface';
import { PaginationMeta } from '@/common/interfaces/pagination.interface';

export function useOrders({
  page,
  limit,
  search,
}: Partial<PaginationMeta> & { search?: string }) {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['orders', page, limit, search],
    queryFn: async () => await getOrders(limit, page, search),
  });

  return {
    data: data as { data: Order[]; meta: PaginationMeta },
    isLoading,
    isError,
    isFetching,
  };
}

export function useUpdateOrder() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async ({ page, limit }: { page: number; limit: number }) =>
      await getOrders(limit, page),
  });

  return { isPending, mutateAsync };
}
