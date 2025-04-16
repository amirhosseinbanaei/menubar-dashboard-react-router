import axiosInstance from '@/common/lib/axios';

export interface MenuColors {
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
}

export async function getMenuColors() {
  try {
    const res = await axiosInstance.get('/menu/colors');
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateMenuColors(colors: MenuColors): Promise<void> {
  return await axiosInstance.put('/menu/colors', colors);
}
