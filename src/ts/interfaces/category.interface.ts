export interface CategoryInterface {
  _id?: string;
  name: {
    fa: string;
    en: string;
    ar: string;
  };
  image: string;
  subCategory:
    | {
        id: string;
        name: {
          fa: string;
          en: string;
          ar: string;
        };
      }[]
    | any[];
  order: number;
}
