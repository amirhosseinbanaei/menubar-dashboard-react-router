import { cn } from '@/common/lib/utils';
import { useLanguageStore } from '@/common/stores/language.store';

import { Outlet } from 'react-router';
import Sidebar from '../ui/sidebar';

function MainLayout() {
  const dir = useLanguageStore((state) => state.direction);
  return (
    <>
      <div
        className={cn('w-full h-auto', {
          'font-rtl': dir === 'rtl',
          'font-ltr': dir === 'ltr',
        })}
        dir={dir}>
        <div className='absolute w-full bg-blue-500 min-h-1/2'></div>
        <Sidebar />
        <main
          className={cn(
            'relative lg:pt-2  h-full max-h-screen transition-all duration-200 ease-in-out rounded-xl px-2 md:px-3 lg:px-5 xl:px-7',
            {
              'xl:mr-68': dir === 'rtl',
              'xl:ml-68': dir === 'ltr',
            },
          )}>
          {/* <Navbar /> */}
          <div className={`flex flex-wrap`}>
            <div className='flex-none w-full max-w-full'>
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default MainLayout;
