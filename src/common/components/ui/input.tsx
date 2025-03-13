import * as React from 'react';

import { cn } from '@/common/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'text-typography-700 placeholder:text-typography-500 mt-2 block w-full rounded-sm border border-gray-200 bg-white px-5 py-3 text-sm placeholder:text-sm focus:outline-primary focus:ring-0',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
