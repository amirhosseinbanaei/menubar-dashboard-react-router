import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategory } from '../services/category.service';

export function useCreateCategory() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
    },
  });

  return { isPending, mutateAsync };
}
