import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createColorPalette } from '../services/color-palettes.service';
import { ColorFormValues } from '../components';

export function useUpdateColorPalette() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: ColorFormValues & { restaurant_id: number }) =>
      await createColorPalette(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['color-palettes'],
      });
    },
  });

  return { isPending, mutateAsync };
}
