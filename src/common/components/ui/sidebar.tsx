import { Link, useLocation } from 'react-router';
import { cn } from '@/common/lib/utils';
import { useTranslation } from 'react-i18next';

// Icons
import { XMarkIcon } from '@heroicons/react/24/outline';

// Stores
import { useLanguageStore } from '@/common/stores/language.store';
import { useThemeStore } from '@/common/stores/theme.store';

import { navigationItems } from '@/common/data/navigation-items.data';
import { Button } from './button';
import { ReactNode } from 'react';
import { LogOutIcon } from 'lucide-react';
import { useAuthStore } from '@/modules/auth/store/auth.store';

function Sidebar() {
  const dir = useLanguageStore((state) => state.direction);
  const isShow = useThemeStore((state) => state.showSidebar);
  const { logout } = useAuthStore();
  return (
    <>
      <div
        className={cn(
          'h-full w-64 flex-col items-center rounded-lg bg-white p-4 xl:flex',
          // isShow && {
          //   'translate-x-4': dir === 'ltr',
          //   '-translate-x-4': dir === 'rtl',
          // },
          // !isShow && {
          //   '-translate-x-80': dir === 'ltr',
          //   'translate-x-80': dir === 'rtl',
          // },
        )}>
        <LogoContainer
          CloseButton={
            <CloseSidebarIcon
              dir={dir}
              isShow={isShow}
            />
          }
        />

        <hr className='my-2 h-[1px] w-full bg-gradient-to-r from-transparent via-black/40 to-transparent' />

        {/* Buttons Container Layer */}
        <div className='flex h-[calc(100%-72px)] w-full flex-col gap-2'>
          <SidebarItems />
          {/* Logout Button */}
          <SidebarButton
            title='خروج از حساب کاربری'
            icon={<LogOutIcon className='mb-1 h-5 w-5 text-inherit' />}
            className='text-destructive hover:bg-destructive/5 hover:text-destructive'
            onClick={() => logout()}
          />
        </div>
      </div>
    </>
  );
}

/*
<aside
        className={cn(
          'hidden fixed inset-y-0 flex-wrap items-center justify-between w-full p-0 my-4 antialiased transition-transform duration-200 border-0 bg-sidebar-background shadow-xl max-w-64 ease-nav-brand z-990 rounded-2xl xl:translate-x-0',
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
              <li className='mt-0.5 w-full'>
                <LanguageMenu />
              </li>
              <SidebarItems />
            </ul>
          </div>
        </div>
      </aside>
*/

// Sidebar Sub Components :
function LogoContainer({ CloseButton }: { CloseButton: ReactNode }) {
  return (
    <>
      <div className='h-16 flex w-full gap-x-3 items-center px-3'>
        <img
          src='/logos/logo.png'
          className='inline w-6 h-7 transition-all duration-200 dark:hidden ease-nav-brand'
          alt='main_logo'
        />
        <h1 className={`font-medium text-sm`}>پنل مدیریتی منوبار</h1>
        {CloseButton}
      </div>
    </>
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

function SidebarItems() {
  const { t } = useTranslation();
  const pathname = useLocation().pathname;
  return (
    <>
      {navigationItems.map((navItem, index) => {
        const isItemActive = pathname === navItem.href && true;
        return (
          <Link
            key={`sidebar-item-${index}`}
            to={navItem.href}>
            <SidebarButton
              title={t(`nav_items.${navItem.translation_key}`)}
              icon={<navItem.icons className='mb-1 h-5 w-5 text-inherit' />}
              isItemActive={isItemActive}
            />
          </Link>
        );
      })}
    </>
  );
}

function SidebarButton({
  title,
  icon,
  isItemActive = false,
  className,
  ...props
}: {
  title: string;
  icon: ReactNode;
  isItemActive?: boolean;
} & React.ComponentProps<'button'>) {
  return (
    <Button
      className={cn(
        'flex h-14 w-full items-center justify-start gap-x-2 rounded-sm px-5 text-sm font-medium text-text hover:bg-primary/10 hover:text-primary',
        className,
        { 'bg-primary/10 text-primary': isItemActive === true },
      )}
      {...props}>
      {icon}
      {title}
    </Button>
  );
}

export default Sidebar;
