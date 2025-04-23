import { useQuery } from '@tanstack/react-query';
import { getColorPalettes } from '../services/color-palettes.service';
import { ColorPaletteResponse } from '../interface/color-palette.interface';

export function useColorPalettes() {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['color-palettes'],
    queryFn: async () => await getColorPalettes(),
  });

  return {
    data: data as {
      default_palettes: ColorPaletteResponse[];
      custom_palettes: ColorPaletteResponse[];
    },
    isLoading,
    isError,
    isFetching,
  };
}
