import axiosInstance from '@/common/lib/axios';

export const deleteCategory = async (id: number | string) => {
  return await axiosInstance.delete(`/categories/${id}`);
};
