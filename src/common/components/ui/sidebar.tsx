import { Link } from 'react-router';
import { cn } from '@/common/lib/utils';
import { useTranslation } from 'react-i18next';

// Icons
import { XMarkIcon } from '@heroicons/react/24/outline';

// Stores
import { useLanguageStore } from '@/common/stores/language.store';
import { useThemeStore } from '@/common/stores/theme.store';

import { navigationItems } from '@/common/data/navigation-items.data';

function Sidebar() {
  const dir = useLanguageStore((state) => state.direction);
  const isShow = useThemeStore((state) => state.showSidebar);
  return (
    <>
      <aside
        className={cn(
          'fixed inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 antialiased transition-transform duration-200 border-0 bg-sidebar-background shadow-xl max-w-64 ease-nav-brand z-990 rounded-2xl xl:translate-x-0',
          {
            'left-0 xl:ml-4': dir === 'ltr',
            'right-0 xl:mr-4': dir === 'rtl',
          },
          isShow && {
            'translate-x-4': dir === 'ltr',
            '-translate-x-4': dir === 'rtl',
          },
          !isShow && {
            '-translate-x-80': dir === 'ltr',
            'translate-x-80': dir === 'rtl',
          },
        )}
        aria-expanded='false'>
        <div className='w-full h-auto flex flex-col top-0 absolute z-20'>
          <div className='h-auto'>
            <CloseSidebarIcon
              dir={dir}
              isShow={isShow}
            />
            <LogoContainer />
          </div>
          <hr className='h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent' />
        </div>
        <div className='w-full h-full flex flex-col top-0 pt-20 absolute'>
          <div className='items-center block w-full h-full overflow-y-auto grow basis-full'>
            <ul className='flex flex-col pl-0 mb-0'>
              {/* <li className='mt-0.5 w-full'>
                <LanguageMenu />
              </li> */}
              <SidebarItems dir={dir} />
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}

function LogoContainer() {
  return (
    <span className='block px-8 py-6 m-0 text-sm whitespace-nowrap text-typography-700'>
      <img
        src='/logos/logo.png'
        className='inline w-7 h-8 transition-all duration-200 dark:hidden ease-nav-brand'
        alt='main_logo'
      />
      <span
        className={`mx-4 font-semibold transition-all duration-200 ease-nav-brand`}>
        منو بار
      </span>
    </span>
  );
}

function CloseSidebarIcon({ dir, isShow }: { dir: string; isShow: boolean }) {
  const changeShowHandler = useThemeStore((state) => state.changeSidebarView);
  return (
    <XMarkIcon
      className={`absolute w-6 h-6 top-7 ${
        dir === 'ltr' ? 'right-5' : 'left-5'
      } opacity-50 xl:hidden cursor-pointer fas fa-times text-typography-700`}
      onClick={() => changeShowHandler(!isShow)}
    />
  );
}

function SidebarItems({ dir }: { dir: string }) {
  const { t } = useTranslation();
  return (
    <>
      {navigationItems.map((eachNavItem) => {
        return (
          <li
            key={eachNavItem.id}
            className='mt-0.5 w-full'>
            <Link
              className='py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors hover:bg-primary-300 hover:text-primary-500 rounded-xl'
              to={eachNavItem.href}>
              <div
                className={`${
                  dir === 'ltr' ? 'mr-2' : 'ml-2'
                } flex h-9 w-9 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2`}>
                <eachNavItem.icons className='w-6 h-6 duration-300 pointer-events-none ease' />
              </div>
              <span className='ml-1 tracking-normal duration-300 opacity-100 pointer-events-none ease'>
                {t(`sidebarItems.${eachNavItem.title}`)}
              </span>
            </Link>
          </li>
        );
      })}
    </>
  );
}

export default Sidebar;
