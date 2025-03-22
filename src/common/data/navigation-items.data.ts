import {
  HomeIcon,
  ShoppingCartIcon,
  // InformationCircleIcon,
  UserCircleIcon,
  TagIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

const navigationItems = [
  { id: 1, translation_key: 'dashboard', href: '/', icons: HomeIcon },
  {
    id: 2,
    translation_key: 'categories',
    href: '/categories',
    icons: ShoppingCartIcon,
  },
  { id: 3, translation_key: 'items', href: '/items', icons: TagIcon },
  {
    id: 4,
    translation_key: 'extra-items',
    href: '/extra-items',
    icons: TagIcon,
  },
  {
    id: 5,
    translation_key: 'customers',
    href: '/customers',
    icons: UserCircleIcon,
  },
  // {
  //    id: 5,
  //    translation_key: 'settings',
  //    href: '/settings',
  //    icons: InformationCircleIcon,
  // },
  {
    id: 6,
    translation_key: 'about',
    href: '/about',
    icons: InformationCircleIcon,
  },
  // {
  //   id: 7,
  //   translation_key: 'OrderedItem',
  //   href: '/ordered-items',
  //   icons: UserCircleIcon,
  // },
  // {
  //   id: 8,
  //   translation_key: 'TableRreserve',
  //   href: '/reserved-table',
  //   icons: UserCircleIcon,
  // },
];

export { navigationItems };
