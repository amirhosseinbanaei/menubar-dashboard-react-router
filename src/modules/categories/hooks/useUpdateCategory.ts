import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCategory } from '../services/category.services';

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async ({ id, category }: { id: number; category: FormData }) =>
      await updateCategory(id, category),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
    },
  });

  return { isPending, mutateAsync };
}
