import axiosInstance from '@/common/lib/axios';
import {
  CreateSubcategory,
  UpdateSubcategory,
} from '../interfaces/subcategory.interface';

export const createSubcategory = async (
  newSubcategoryData: CreateSubcategory,
) => {
  return await axiosInstance.post(`/subcategories`, newSubcategoryData);
};

export const getSubcategories = async (categoryId: number) => {
  try {
    const res = await axiosInstance.get(
      `/subcategories?category_id=${categoryId}`,
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSubcategory = async (id: number) => {
  try {
    const res = await axiosInstance.get(`/subcategories/${id}`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateSubcategory = async (
  id: number,
  updatedSubcategoryData: UpdateSubcategory,
) => {
  return await axiosInstance.patch(
    `/subcategories/${id}`,
    updatedSubcategoryData,
  );
};

export const deleteSubcategory = async (id: number) => {
  return await axiosInstance.delete(`/subcategories/${id}`);
};
