import axiosInstance from '@/common/lib/axios';

export const createCategory = async (newCategoryData: FormData) => {
  return await axiosInstance.post(`/categories`, newCategoryData);
};
