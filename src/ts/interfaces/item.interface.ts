export interface ItemInterface {
  _id?: string;
  quantity?: number;
  name: {
    fa: string;
    en: string;
    ar: string;
  };
  itemDescription: {
    fa: string;
    en: string;
    ar: string;
  };
  image: string;
  category: string;
  subCategory: string;
  order: number;
  price: number | null;
  discount: number;
  unit: string;
  tags: string[] | null[];
  extraItems: string[] | null[];
  isAvailable: boolean;
  isHidden: boolean;
}
