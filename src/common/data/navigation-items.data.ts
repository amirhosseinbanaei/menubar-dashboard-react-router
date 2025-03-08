import {
  HomeIcon,
  ShoppingCartIcon,
  HeartIcon,
  // InformationCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const navigationItems = [
  { id: 1, title: 'dashboard', href: '/', icons: HomeIcon },
  { id: 2, title: 'categories', href: '/categories', icons: ShoppingCartIcon },
  { id: 3, title: 'items', href: '/items', icons: HeartIcon },
  { id: 4, title: 'customers', href: '/customers', icons: UserCircleIcon },
  // {
  //    id: 5,
  //    title: 'settings',
  //    href: '/settings',
  //    icons: InformationCircleIcon,
  // },
  { id: 6, title: 'About', href: '/about', icons: UserCircleIcon },
  {
    id: 7,
    title: 'OrderedItem',
    href: '/ordered-items',
    icons: UserCircleIcon,
  },
  {
    id: 8,
    title: 'TableRreserve',
    href: '/reserved-table',
    icons: UserCircleIcon,
  },
];

export { navigationItems };
