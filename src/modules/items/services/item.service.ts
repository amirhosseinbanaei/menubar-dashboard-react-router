import axiosInstance from '@/common/lib/axios';
import { Item } from '../interfaces/item.interface';

export const createItem = async (newItemData: FormData) => {
  return await axiosInstance.post(`/items`, newItemData);
};

export const getItem = async (id: number | string) => {
  try {
    const res = await axiosInstance.get(`/items/${id}`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getItems = async (filter?: string) => {
  try {
    const res = await axiosInstance.get(`/items${filter}`);
    const sortedItems = res.data.data.sort(
      (a: Item, b: Item) => a.order - b.order,
    );
    return sortedItems;
  } catch (error) {
    console.log(error);
  }
};

export const updateItem = async (id: number, updatedItem: FormData) => {
  return await axiosInstance.patch(`/items/${id}`, updatedItem);
};

export const deleteItem = async (id: number | string) => {
  return await axiosInstance.delete(`/items/${id}`);
};
