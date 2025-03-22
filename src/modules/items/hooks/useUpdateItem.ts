import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateItem } from '../services/item.service';

export function useUpdateItem() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async ({ id, item }: { id: number; item: FormData }) =>
      await updateItem(id, item),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ['items'],
      });
      queryClient.invalidateQueries({
        queryKey: [`item-${res.data.data.id}`],
      });
    },
  });

  return { isPending, mutateAsync };
}
