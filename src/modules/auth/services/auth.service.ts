import axiosInstance from '@/common/lib/axios';
export const AdminLogin = async (email: string, password: string) => {
  try {
    return axiosInstance.post('/auth/admin/login', {
      email,
      password,
    });
  } catch (error) {
    console.log(error);
  }
};

export const AdminLogOut = async () => {
  try {
    return axiosInstance.post('/auth/admin/logout');
  } catch (error) {
    console.log(error);
  }
};
