import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

interface User {
  accessToken: string;
  [key: string]: any; // for other user data
}

interface AuthState {
  currentUser: User | false;
  isAuthenticated: boolean | null;
  login: (userData: User) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: false,
      isAuthenticated: null,

      login: (userData) => {
        set({
          currentUser: userData,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          currentUser: false,
          isAuthenticated: false,
        });
        Cookies.remove('accessToken');
        toast.success('از حساب کاربری خود خارج شدید .');
      },

      checkAuth: () => {
        const accessToken = Cookies.get('accessToken');
        set((state) => {
          if (
            accessToken &&
            state.currentUser &&
            accessToken === state.currentUser.accessToken
          ) {
            return { isAuthenticated: true };
          }
          return { isAuthenticated: false };
        });
      },
    }),
    {
      name: 'auth-storage', // unique name for localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ currentUser: state.currentUser }), // only persist currentUser
    },
  ),
);