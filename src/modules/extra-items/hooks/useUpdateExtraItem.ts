import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateExtraItem } from '../services/extra-item.service';

export function useUpdateExtraItem() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async ({
      id,
      extraItem,
    }: {
      id: number;
      extraItem: FormData;
    }) => await updateExtraItem(id, extraItem),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ['extra-items'],
      });
      queryClient.invalidateQueries({
        queryKey: [`extra-item-${res.data.data.id}`],
      });
    },
  });

  return { isPending, mutateAsync };
}
