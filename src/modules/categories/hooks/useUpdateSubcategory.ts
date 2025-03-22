import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSubcategory } from '../services/subcategory.service';
import { UpdateSubcategory } from '../interfaces/subcategory.interface';
import { useLocation } from 'react-router';
export function useUpdateSubcategory() {
  const queryClient = useQueryClient();
  const pathname = useLocation().pathname;
  const categoryId = pathname.split('/')[pathname.split('/').length - 1];

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async ({
      id,
      subcategory,
    }: {
      id: number;
      subcategory: UpdateSubcategory;
    }) => await updateSubcategory(id, subcategory),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`subcategories:category-${categoryId}`],
      });
    },
  });

  return { isPending, mutateAsync };
}
