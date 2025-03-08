import * as React from 'react';

import { cn } from '@/common/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'block text-sm w-full px-5 py-3 mt-2 text-typography-700 placeholder:text-typography-500 placeholder:text-sm focus:ring-0 bg-white border border-gray-200 rounded-xl focus:outline-primary-500',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
