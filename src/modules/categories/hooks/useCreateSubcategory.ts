import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSubcategory } from '../services/subcategory.service';

export function useCreateSubcategory() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: createSubcategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['subcategories'],
      });
    },
  });

  return { isPending, mutateAsync };
}
