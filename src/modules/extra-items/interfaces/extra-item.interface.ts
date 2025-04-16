import { Translation } from '@/common/interfaces/translation.interface';
import { Item } from '@/modules/items/interfaces/item.interface';

export interface ExtraItem {
  id: number;
  items: Item[];
  translations: Translation[];
  image: string;
  price: number;
  is_hidden: boolean;
  created_at: Date;
}

export type ExtraItemInItem = Omit<ExtraItem, 'items'>;
