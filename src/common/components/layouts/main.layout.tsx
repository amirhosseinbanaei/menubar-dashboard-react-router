// import { cn } from '@/common/lib/utils';
import { Outlet } from 'react-router';
import Sidebar from '../ui/sidebar';
import { useLanguageStore } from '@/common/stores/language.store';
import Navbar from '../ui/navbar';

function MainLayout() {
  const dir = useLanguageStore((state) => state.direction);
  return (
    <>
      {/* Background Layer */}
      <div className='fixed top-0 h-screen w-screen overflow-hidden z-10'>
        <div className='h-1/2 w-full bg-primary'></div>
      </div>
      {/* Main Layer */}
      <div
        dir={dir}
        className='absolute top-0 z-10 flex h-auto w-full'>
        {/* Sidebar Layer */}
        <div className='fixed top-0 z-10 hidden h-full w-72 justify-center xl:relative xl:flex'>
          <div className='fixed top-0 h-full w-64 py-2'>
            <Sidebar />
          </div>
        </div>

        {/* Content Layer */}
        <div className='h-full w-full px-2 lg:px-4 xl:w-[calc(100%-288px)]'>
          {/* Navbar Layer */}
          <div className='h-auto w-full py-[18px]'>
            <Navbar />
          </div>
          <div className='h-auto w-full'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
// function MainLayout() {
//   const dir = useLanguageStore((state) => state.direction);
//   return (
//     <>
//       <div
//         className={cn('w-full h-auto', {
//           'font-rtl': dir === 'rtl',
//           'font-ltr': dir === 'ltr',
//         })}
//         dir={dir}>
//         <div className='absolute w-full bg-blue-500 min-h-1/2'></div>
//         <Sidebar />
//         <main
//           className={cn(
//             'relative lg:pt-2  h-full max-h-screen transition-all duration-200 ease-in-out rounded-xl px-2 md:px-3 lg:px-5 xl:px-7',
//             {
//               'xl:mr-68': dir === 'rtl',
//               'xl:ml-68': dir === 'ltr',
//             },
//           )}>
//           {/* <Navbar /> */}
//           <div className={`flex flex-wrap`}>
//             <div className='flex-none w-full max-w-full'>
//               <Outlet />
//             </div>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// }

export default MainLayout;
