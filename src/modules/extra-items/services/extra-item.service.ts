import axiosInstance from '@/common/lib/axios';

export const createExtraItem = async (newItemData: FormData) => {
  return await axiosInstance.post(`/extra-items`, newItemData);
};

export const getExtraItem = async (id: number | string) => {
  try {
    const res = await axiosInstance.get(`/extra-items/${id}`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getExtraItems = async () => {
  try {
    const res = await axiosInstance.get(`/extra-items`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateExtraItem = async (id: number, updatedItem: FormData) => {
  return await axiosInstance.patch(`/extra-items/${id}`, updatedItem);
};

export const deleteExtraItem = async (id: number | string) => {
  return await axiosInstance.delete(`/extra-items/${id}`);
};
