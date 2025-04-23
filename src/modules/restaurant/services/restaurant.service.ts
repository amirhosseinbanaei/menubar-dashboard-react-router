import axiosInstance from '@/common/lib/axios';

export const getRestaurant = async (restaurant_id: number = 6,filter?: string) => {
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
