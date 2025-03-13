import axiosInstance from '@/common/lib/axios';
import { LanguagesResponse } from '../interfaces/response-language.interface';

export const getLanguages = async () => {
  try {
    const res = await axiosInstance.get('/languages');
    const languages = res.data.data as LanguagesResponse[];
    const codes = languages.map((lang) => lang.language_code);
    return { details: languages, codes };
  } catch (error) {
    console.log(error);
  }
};
