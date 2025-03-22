import { Translation } from '@/common/interfaces/translation.interface';

export interface Subcategory {
  id: number;
  image: string;
  order: number;
  translations: Translation[];
  created_at: Date;
}

export interface CreateSubcategory {
  restaurant_id: number;
  category_id: number;
  translations: Translation[];
}

export interface UpdateSubcategory {
  translations: Translation[];
}
