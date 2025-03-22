import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSubcategory } from '../services/subcategory.service';

export function useCreateSubcategory({ categoryId }: { categoryId: number }) {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: createSubcategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`subcategories:category-${categoryId}`],
      });
    },
  });

  return { isPending, mutateAsync };
}
