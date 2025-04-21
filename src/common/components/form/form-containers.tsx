import { cn } from '@/common/lib/utils';
import React from 'react';

export default function FormFooter({
  children,
  className,
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'w-full h-auto flex flex-col items-end mt-8 mb-3',
        className,
      )}>
      {children}
    </div>
  );
}
