import axiosInstance from '@/common/lib/axios';

export const getRestaurant = async (filter: string) => {
  const restaurant_id = 6;
  try {
    const res = await axiosInstance.get(`/restaurants/${restaurant_id}`, {
      params: {
        filter,
      },
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
