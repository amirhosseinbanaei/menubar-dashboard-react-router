import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTag } from '../services/tag.service';

export function useDeleteTag() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tags'],
      });
    },
  });

  return { isPending, mutateAsync };
} 