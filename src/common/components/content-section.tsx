import { ReactNode } from 'react';
import { Link } from 'react-router';
import { cn } from '../lib/utils';
function ContentSection({
  title,
  children,
  button,
  className,
}: {
  title?: ReactNode;
  children: ReactNode;
  button?: ReactNode;
  className?: string;
}) {
  return (
    <div className='flex flex-wrap mb-5'>
      <div className='flex-none w-full max-w-full'>
        <div className='relative flex flex-col pb-5 break-words bg-white shadow-xl rounded-2xl'>
          {title}
          {button ? (
            <div className={cn('flex flex-col md:items-start', className)}>
              {button}
              {children}
            </div>
          ) : (
            <div className={cn('px-3 lg:px-5 w-full', className)}>
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ContentSectionTitle({ title }: { title: string }) {
  return (
    <div className='px-3 lg:px-5 my-6'>
      <h6 className='dark:text-white font-bold'>{title}</h6>
    </div>
  );
}

function ContentSectionButton({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  return (
    <Link to={href}>
      <div className='w-11/12 md:mr-6 md:w-96 h-auto mx-auto sm:flex-none xl:mb-0'>
        <div className='relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-2xl bg-clip-border'>
          <div className='flex-auto px-4 py-7'>
            <div className='flex h-6 flex-row items-center justify-center'>
              <p className='text-gray-600'>{title}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ContentSection;
export { ContentSectionTitle, ContentSectionButton };
