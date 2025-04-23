import axiosInstance from '@/common/lib/axios';
import { Admin } from '../interface/admin.interface';
import { queryClient } from '@/App';
import { getRestaurant } from '@/modules/restaurant/services/restaurant.service';

export const AdminLogin = async (email: string, password: string) => {
  try {
    const res = await axiosInstance.post('/auth/admin/login', {
      email,
      password,
    });
    if (res.status === 200) {
      const admin = res.data.data.admin as Admin;
      if (admin) {
        queryClient.fetchQuery({
          queryKey: ['restaurant'],
          queryFn: async () => {
            await getRestaurant(admin.restaurant_id);
            localStorage.setItem('token', res.data.data.access_token);
            
          },
        });
      }
    }
    return res.data.data as { access_token: string; admin: Admin };
  } catch (error) {
    console.log(error);
  }
};
