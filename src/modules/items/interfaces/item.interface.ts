import { Translation } from "@/common/interfaces/translation.interface";

export interface Item {
  id: number;
  category_id: number | null;
  subcategory_id: number | null; 
  image: string;
  order: number;
  price: number;
  discount: number;
  is_hidden: boolean;
  is_available: boolean;
  translations: Translation[];
  // tags: TagResponseDto[];
  created_at: Date;
}