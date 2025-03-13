import { Translation } from '@/common/interfaces/translation.interface';
import { Subcategory } from './create-subcategory.interface';

export interface Category {
  id: number;
  image: string;
  order: number;
  translations: Translation[];
  subcategories: Subcategory[];
  created_at: Date;
}
