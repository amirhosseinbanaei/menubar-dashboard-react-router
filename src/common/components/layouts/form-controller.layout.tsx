import { cn } from '@/common/lib/utils';
import { ReactNode } from 'react';

interface FormControllerLayoutProps {
  className?: string;
  children: ReactNode;
}
function FormControllerLayout({
  className,
  children,
}: FormControllerLayoutProps) {
  return (
    <div
      className={cn(
        'my-8 grid grid-cols-1 gap-5 gap-y-8 md:grid-cols-2 lg:grid-cols-2',
        className,
      )}>
      {children}
    </div>
  );
}

export default FormControllerLayout;
