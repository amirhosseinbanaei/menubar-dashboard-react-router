import axios from 'axios';
import { t } from 'i18next';
import toast from 'react-hot-toast';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
});

axiosInstance.interceptors.request.use((config) => {
  console.log(config.data);
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    const method = response.config.method?.toUpperCase();
    const status = response.status;
    const endpoint = response.config.url?.split('/')[1];

    switch (status) {
      case 200:
        if (method !== 'GET')
          toast.success(t(`${endpoint}.toasts.fa.${method}.200`));
        break;
      case 201:
        toast.success(t(`${endpoint}.toasts.fa.${method}.201`));
        break;
    }
    return response;
  },
  (error) => {
    const status = error.status;
    const resData = error.response.data;
    const endpoint = error.config.url?.split('/')[1];
    console.log(error);
    switch (status) {
      case 400:
        toast.error(t(`${endpoint}.toasts.fa.400`));
        break;
      case 404:
        toast.error(t(`${endpoint}.toasts.fa.404`));
        break;
      case 409:
        if (resData.existing_names.length === 1)
          return toast.error(
            t(`${endpoint}.toasts.fa.409.single`, {
              name: resData.existing_names.join(''),
            }),
          );
        t(`${endpoint}.toasts.fa.409.multiple`, {
          names: resData.existing_names.join(''),
        });
        break;
    }
    //  console.log('یه خطا تو بک اند داریم :', err);
    console.log(error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
