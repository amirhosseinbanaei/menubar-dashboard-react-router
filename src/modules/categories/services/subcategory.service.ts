import axiosInstance from '@/common/lib/axios';
import { CreateSubcategory } from '../interfaces/create-subcategory.interface';

export const createSubcategory = async (
  newSubcategoryData: CreateSubcategory,
) => {
  return await axiosInstance.post(`/subcategories`, newSubcategoryData);
};
