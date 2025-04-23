import { memo } from 'react';
import { ColorFormValues } from './color-types';

// Preview component that shows color examples
export const ColorPreview = memo(function ColorPreview({
  background,
  foreground,
  primary,
  primary_foreground,
}: ColorFormValues) {
  return (
    <div className='mb-6 p-5 bg-white rounded-lg'>
      <h3 className='text-base font-medium mb-3'>پیش‌نمایش رنگ‌ها</h3>
      <div className='flex flex-wrap gap-3'>
        <div
          className='p-3 rounded-md flex items-center justify-center w-28 h-12 text-xs font-medium transition-all'
          style={{
            backgroundColor: primary,
            color: primary_foreground,
          }}>
          دکمه اصلی
        </div>

        <div
          className='p-3 rounded-md flex items-center justify-center w-28 h-12 text-xs font-medium transition-all'
          style={{
            backgroundColor: background,
            color: foreground,
          }}>
          پس‌زمینه منو
        </div>
      </div>
    </div>
  );
});
