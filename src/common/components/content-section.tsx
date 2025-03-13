import { ReactNode } from 'react';
import { cn } from '../lib/utils';
function ContentSection({
  title,
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className='flex flex-wrap mb-5'>
      <div className='flex-none w-full max-w-full'>
        <div className='relative flex flex-col pb-5 break-words bg-white  rounded-2xl'>
          {/* Title Container */}
          {title && (
            <div className='px-3 lg:px-5 my-6'>
              <h6 className='text-lg font-bold'>{title}</h6>
            </div>
          )}

          <div className={cn('px-3 lg:px-5 md:items-start', className)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export { ContentSection };
