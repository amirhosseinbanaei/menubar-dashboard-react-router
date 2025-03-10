import { CategoryInterface } from "./category.interface";

export interface SortTableListInterface {
  sortList: CategoryInterface[];
  shouldSort: boolean;
  sortListType: "category" | "product";
  mutateFn: Function;
}
