import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export const reciveAuthCode = async (phoneNumber) => {
  const isRecivedCode = axios
    .post('http://localhost:4000/auth/request-otp', {
      phone_number: phoneNumber,
    })
    .then((res) => {
      console.log(res);
      res.status === 200 && alert(`کد ورود شما : ${res.data.data.otp}`);
      return true;
    })
    .catch((error) => {
      console.log(error);
    });
  return isRecivedCode;
};

export const verifyAuthCode = (phoneNumber, verifyCode) => {
  const isCorrectCode = axios
    .post('http://localhost:4000/auth/verify-otp', {
      phone_number: phoneNumber,
      otp: verifyCode,
    })
    .then((res) => {
      res.status === 200 && toast.success(`وارد حساب شدید`);
      res.status === 201 && toast.success(`حساب ساخته شد`);
      return res.data;
    })
    .catch((error) => {
      toast.error(error.response.data);
      return false;
    });
  return isCorrectCode;
};

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  isLoading: boolean;
  showOtp: boolean;
}

interface AuthActions {
  sendOtp: (phoneNumber: string) => Promise<void>;
  verifyOtp: (
    phoneNumber: string,
    otp: string,
    redirectUrl?: string,
  ) => Promise<void>;
  logout: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
  // Initial state
  isAuthenticated: false,
  user: null,
  isLoading: false,
  showOtp: false,

  // Actions
  sendOtp: async (phoneNumber) => {
    try {
      set({ isLoading: true });
      toast.loading('درحال ارسال پیامک ...');

      const isCodeSent = await reciveAuthCode(phoneNumber);
      if (isCodeSent) {
        set({ showOtp: true });
        toast.dismiss();
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.response?.data?.message || 'خطا در ارسال کد');
    } finally {
      set({ isLoading: false });
    }
  },

  verifyOtp: async (phoneNumber, otp, redirectUrl) => {
    try {
      set({ isLoading: true });
      toast.loading('کمی منتظر بمانید ...');

      const userData = await verifyAuthCode(phoneNumber, otp);
      if (userData) {
        set({
          user: userData,
          isAuthenticated: true,
          showOtp: false,
        });
        toast.dismiss();
        toast.success('ورود با موفقیت انجام شد');

        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.response?.data || 'کد وارد شده صحیح نمی‌باشد');
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
      showOtp: false,
    });
    toast.success('از حساب کاربری خود خارج شدید');
  },
}));
