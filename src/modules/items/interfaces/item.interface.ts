import { Translation } from "@/common/interfaces/translation.interface";
import { ExtraItem } from "@/modules/extra-items/interfaces/extra-item.interface";
import { Tag } from "@/modules/tags/interfaces/tag.interface";

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
  tags: Tag[];
  extra_items: ExtraItem[]
  created_at: Date;
}