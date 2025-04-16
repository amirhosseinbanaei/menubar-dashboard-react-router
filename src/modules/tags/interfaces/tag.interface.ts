import { Translation } from '@/common/interfaces/translation.interface';
import { Item } from '@/modules/items/interfaces/item.interface';

export interface Tag {
  id: number;
  items: Item[];
  translations: Translation[];
  image: string;
  created_at: Date;
  is_hidden: boolean;
} 

export type TagInItem = Omit<Tag, 'items'>