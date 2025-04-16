import axiosInstance from '@/common/lib/axios';

export const createTag = async (newTagData: FormData) => {
  return await axiosInstance.post(`/tags`, newTagData);
};

export const getTag = async (id: number | string) => {
  try {
    const res = await axiosInstance.get(`/tags/${id}`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTags = async () => {
  try {
    const res = await axiosInstance.get(`/tags`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateTag = async (id: number, updatedTag: FormData) => {
  return await axiosInstance.patch(`/tags/${id}`, updatedTag);
};

export const deleteTag = async (id: number | string) => {
  return await axiosInstance.delete(`/tags/${id}`);
}; 