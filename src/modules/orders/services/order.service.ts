import axiosInstance from '@/common/lib/axios';

export const getOrders = async () => {
  const restaurant_id = 1;
  try {
    const res = await axiosInstance.get(`/restaurants/orders/${restaurant_id}`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
