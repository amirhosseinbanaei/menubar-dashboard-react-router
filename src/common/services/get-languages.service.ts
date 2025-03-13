import axiosInstance from '@/common/lib/axios';

interface LanguagesResponse {
  language_name: string;
  language_code: string;
}

export const getLanguages = async () => {
  return axiosInstance
    .get('/languages')
    .then((res) => {
      const { data } = res;
      return data.data as LanguagesResponse[];
    })
    .catch((error) => console.log(error));
};
