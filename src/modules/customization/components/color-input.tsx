import { Input } from '@/common/components/ui';
import { memo, useCallback } from 'react';

// Individual color input - pure component with controlled inputs
export const ColorInput = memo(function ColorInput({
  value,
  onChange,
  name,
  label,
  placeholder,
}: {
  value: string;
  onChange: (name: string, value: string) => void;
  name: string;
  label: string;
  placeholder: string;
}) {
  // Memoized handlers to prevent rerenders
  const handleColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(name, e.target.value);
    },
    [name, onChange],
  );

  return (
    <div className='bg-white rounded-lg p-4'>
      <div className='flex items-center gap-2 mb-3'>
        <h3 className='font-medium text-sm'>{label}</h3>
      </div>
      <div className='flex gap-2 items-center'>
        <div className='relative h-12 w-12 flex items-center justify-center'>
          <Input
            type='color'
            value={value}
            onChange={handleColorChange}
            className='absolute inset-0 opacity-0 w-full h-full cursor-pointer'
          />
          <div
            className='w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center'
            style={{ backgroundColor: value }}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke={
                value.startsWith('#f') ||
                value.startsWith('#e') ||
                value.startsWith('#d') ||
                value.startsWith('#c') ||
                value.startsWith('#b') ||
                value.startsWith('#a')
                  ? '#333'
                  : '#fff'
              }
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path d='M18 2l4 4-14 14-8 2 2-8L16 0z'></path>
            </svg>
          </div>
        </div>
        <Input
          type='text'
          value={value}
          onChange={handleColorChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
});
