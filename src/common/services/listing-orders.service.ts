import { queryClient } from '@/App';
import axiosInstance from '@/common/lib/axios';
import {
  ListingOrders,
  ListingSubcategoryOrders,
} from '../interfaces/listing-orders.interface';

export const listingOrders = async (
  type: 'categories' | 'items' | 'subcategories',
  data: ListingSubcategoryOrders | ListingOrders,
) => {
  try {
    const res = await axiosInstance.put(`/listing-orders/${type}`, data);
    if (res.status == 200) {
      queryClient.invalidateQueries({
        queryKey: [type],
      });
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};
