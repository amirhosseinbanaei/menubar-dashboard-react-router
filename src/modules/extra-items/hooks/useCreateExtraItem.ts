import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createExtraItem } from '../services/extra-item.service';

export function useCreateExtraItem() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: createExtraItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['extra-items'],
      });
    },
  });

  return { isPending, mutateAsync };
}
