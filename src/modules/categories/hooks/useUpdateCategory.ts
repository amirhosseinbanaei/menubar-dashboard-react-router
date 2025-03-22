import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCategory } from '../services/category.service';

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async ({ id, category }: { id: number; category: FormData }) =>
      await updateCategory(id, category),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
      queryClient.invalidateQueries({
        queryKey: [`category-${res.data.data.id}`],
      });
    },
  });

  return { isPending, mutateAsync };
}
