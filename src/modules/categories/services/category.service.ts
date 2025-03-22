import axiosInstance from '@/common/lib/axios';
import { Category } from '../interfaces/category.interface';

export const createCategory = async (newCategoryData: FormData) => {
  return await axiosInstance.post(`/categories`, newCategoryData);
};

export const getCategory = async (id: number | string) => {
  try {
    const res = await axiosInstance.get(`/categories/${id}`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async (details: boolean = false) => {
  try {
    const res = await axiosInstance.get(`/categories?details=${details}`);
    const sortedCategories = res.data.data.sort(
      (a: Category, b: Category) => a.order - b.order,
    );
    return sortedCategories;
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (id: number, updatedCategory: FormData) => {
  return await axiosInstance.patch(`/categories/${id}`, updatedCategory);
};

export const deleteCategory = async (id: number | string) => {
  return await axiosInstance.delete(`/categories/${id}`);
};
