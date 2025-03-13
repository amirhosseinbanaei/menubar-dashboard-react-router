import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCategory } from '../services/delete-category.service';

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
    },
  });

  return { isPending, mutateAsync };
}
