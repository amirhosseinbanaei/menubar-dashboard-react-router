import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTag } from '../services/tag.service';

interface UpdateTagParams {
  id: number;
  data: FormData;
}

export function useUpdateTag() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: ({ id, data }: UpdateTagParams) => updateTag(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ['tags'],
      });
      queryClient.invalidateQueries({
        queryKey: ['tags', id],
      });
    },
  });

  return { isPending, mutateAsync };
} 