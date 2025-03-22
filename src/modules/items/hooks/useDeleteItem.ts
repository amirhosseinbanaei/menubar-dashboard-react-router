import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteItem } from '../services/item.service';

export function useDeleteItem() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['items'],
      });
    },
  });

  return { isPending, mutateAsync };
}
