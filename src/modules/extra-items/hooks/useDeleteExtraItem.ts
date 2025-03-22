import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteExtraItem } from '../services/extra-item.service';

export function useDeleteExtraItem() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteExtraItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['extra-items'], // Adjusted query key for extra-items
      });
    },
  });

  return { isPending, mutateAsync };
}
