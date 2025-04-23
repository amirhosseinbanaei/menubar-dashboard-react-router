import { memo, useCallback } from 'react';
import { ColorFormValues } from './color-types';
import { ColorPaletteResponse } from '../interface/color-palette.interface';

interface ColorPaletteProps {
  title: string;
  colors: ColorFormValues;
  onSelect: (colors: ColorFormValues) => void;
}

// Single palette component - memoized with callback optimization
export const ColorPalette = memo(
  ({ title, colors, onSelect }: ColorPaletteProps) => {
    const handleClick = useCallback(() => {
      onSelect(colors);
    }, [colors, onSelect]);

    return (
      <div className='border rounded-lg p-4'>
        <h3 className='font-medium text-sm mb-2'>{title}</h3>
        <div className='flex justify-center gap-2 mb-3'>
          <div
            className='w-6 h-6 rounded-md border'
            style={{ backgroundColor: colors.background }}
            title='پس‌زمینه'
          />
          <div
            className='w-6 h-6 rounded-md border'
            style={{ backgroundColor: colors.foreground }}
            title='پیش‌زمینه'
          />
          <div
            className='w-6 h-6 rounded-md border'
            style={{ backgroundColor: colors.primary }}
            title='اصلی'
          />
          <div
            className='w-6 h-6 rounded-md border'
            style={{ backgroundColor: colors.primary_foreground }}
            title='پیش‌زمینه اصلی'
          />
        </div>
        <button
          onClick={handleClick}
          className='w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md text-xs font-medium transition-all'>
          انتخاب این پالت
        </button>
      </div>
    );
  },
);

// Palettes grid component
export const ColorPalettes = memo(
  ({
    onSelect,
    colors,
  }: {
    onSelect: (colors: ColorFormValues) => void;
    colors: ColorPaletteResponse[];
  }) => {
    return (
      <div className='mb-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {colors.map((palette, index) => (
            <ColorPalette
              key={index}
              title={palette.name}
              colors={palette}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    );
  },
);
