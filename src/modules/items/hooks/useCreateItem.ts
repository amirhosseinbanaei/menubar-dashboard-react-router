import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createItem } from '../services/item.service';

export function useCreateItem() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['items'],
      });
    },
  });

  return { isPending, mutateAsync };
}
