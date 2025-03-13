import { Translation } from '@/common/interfaces/translation.interface';

export interface Subcategory {
  id: number;
  translations: Translation[];
}

export interface CreateSubcategory {
  restaurant_id: number;
  category_id: number;
  translations: Translation[];
}
