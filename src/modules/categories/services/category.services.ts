import axiosInstance from '@/common/lib/axios';

export const updateCategory = async (id: number, updatedCategory: FormData) => {
  return await axiosInstance.patch(`/categories/${id}`, updatedCategory);
};
