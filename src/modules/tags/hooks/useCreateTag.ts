import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTag } from '../services/tag.service';

export function useCreateTag() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tags'],
      });
    },
  });

  return { isPending, mutateAsync };
} 