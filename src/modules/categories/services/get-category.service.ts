import { queryClient } from '@/App';
import axiosInstance from '@/common/lib/axios';

export const getCategory = async (id: number | string) => {
  try {
    const res = await axiosInstance.get(`/categories/${id}`);
    if (res.status === 200) {
      queryClient.setQueryData(
        [`subcategories-${id}`],
        res.data.data.subcategories,
      );
    }
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
