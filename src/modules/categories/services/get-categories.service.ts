import axiosInstance from '@/common/lib/axios';
import { Category } from '../interfaces/category.interface';
// import { localStorageAction } from '@/common/utils/localstorage.util';

export const getCategories = async (lang?: string) => {
  try {
    const res = await axiosInstance.get(`/categories`);
    const categories = res.data.data as Category[];
    // const language = localStorageAction.get('language', 'fa');
    // return categories.map((category) => ({
    //   ...category,
    //   name:
    //     category.translations[
    //       category.translations.findIndex((t) => t.language === language)
    //     ]?.name || '',
    //   language
    // }));
    return categories;
  } catch (error) {
    console.log(error);
  }
};
