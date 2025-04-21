import axiosInstance from '@/common/lib/axios';

export const getOrders = async (
  limit: number = 10,
  page: number = 1,
  search?: string,
) => {
  const restaurant_id = 1;
  try {
    const res = await axiosInstance.get(
      // `/restaurants/orders/${restaurant_id}?limit=${limit}&page=${page}`,
      `/restaurants/orders/${restaurant_id}`,
      {
        params: {
          limit,
          page,
          search,
        },
      },
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
