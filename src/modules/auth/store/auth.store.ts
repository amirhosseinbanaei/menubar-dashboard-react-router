import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'react-hot-toast';
import { Admin } from '../interface/admin.interface';
import { AdminLogin, AdminLogOut } from '../services/auth.service';
import { queryClient } from '@/App';
import { getRestaurant } from '@/modules/restaurant/services/restaurant.service';

interface AuthState {
  admin: Admin | null;
  isLoading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      admin: null,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const res = await AdminLogin(email, password);
          if (res?.status === 200) {
            const admin = res.data.data as Admin;
            if (admin) {
              queryClient.fetchQuery({
                queryKey: ['restaurant'],
                queryFn: async () => {
                  await getRestaurant(admin.restaurant_id);
                },
              });
            }
            set({
              admin,
            });
            toast.success('با موفقیت به حساب کاربری خود وارد شدید .');
            window.location.href = '/';
          }
        } catch {
          toast.error('خطا در ورود');
          set({ admin: null });
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          const res = await AdminLogOut();
          if (res?.status === 200) {
            set({ admin: null });
            toast.success('از حساب کاربری خود خارج شدید .');
            window.location.href = '/login';
          }
        } catch {
          toast.error('خطا در خروج');
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage', // unique name for localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ admin: state.admin }), // only persist admin
    },
  ),
);
