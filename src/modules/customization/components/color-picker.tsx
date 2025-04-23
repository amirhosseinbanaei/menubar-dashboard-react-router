import { useState, useCallback } from 'react';
import { ColorPalettes } from './color-palette';
import { ColorFormValues } from './color-types';

interface ColorPickerProps {
  initialValues: ColorFormValues;
  onChange: (values: ColorFormValues) => void;
}

export const ColorPicker = ({ initialValues, onChange }: ColorPickerProps) => {
  const [colorValues, setColorValues] =
    useState<ColorFormValues>(initialValues);

  // Handle palette selection
  const handlePaletteSelect = useCallback(
    (colors: ColorFormValues) => {
      setColorValues(colors);
      onChange(colors);
    },
    [onChange],
  );

  return (
    <div>
      <ColorPalettes onSelect={handlePaletteSelect} />
    </div>
  );
};
