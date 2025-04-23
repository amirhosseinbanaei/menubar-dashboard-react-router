import axiosInstance from '@/common/lib/axios';
import { ColorFormValues } from '../components';

export const getColorPalettes = async () => {
  try {
    const restaurant_id = 2;
    const res = await axiosInstance.get(`/color-palettes/${restaurant_id}`);
    console.log(res);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const createColorPalette = async (
  data: ColorFormValues & { restaurant_id: number },
) => {
  try {
    const res = await axiosInstance.post(`/color-palettes`, data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
