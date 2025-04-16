import axiosInstance from '@/common/lib/axios';

export const getOrders = async (limit: number = 10, page: number = 1) => {
  const restaurant_id = 1;
  try {
    const res = await axiosInstance.get(
      `/restaurants/orders/${restaurant_id}?limit=${limit}&page=${page}`,
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
