import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSubcategory } from '../services/subcategory.service';

export function useDeleteSubcategory({ categoryId }: { categoryId: number }) {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: deleteSubcategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`subcategories:category-${categoryId}`],
      });
    },
  });

  return { isPending, mutateAsync };
}
