import { categories } from '@/modules/categories/translations/category.translation';
import { fa as nav_items } from './nav-item.translation';
import { languages } from '@/modules/languages/translations/language.translation';
const inputErrors = {
  required: {
    name: 'اسم دسته بندی را وارد کنید',
  },
  min: {
    name: 'اسم دسته بندی حداقل باید دارای 3 کاراکتر باشد',
  },
  max: {
    name: 'اسم دسته بندی حداکثر باید دارای 15 کاراکتر باشد',
  },
};
const fa = {
  register: 'زبان ها',

  inputErrors,
  nav_items,
  categories,
  languages,

  socials: {
    instagram: 'اینستاگرام',
    address: 'نشانی رستوران',
    telephone: 'تلفن',
  },

  input: {
    label: {
      email: 'ایمیل',
      password: 'رمز عبور',
      name: 'نام دسته بندی',
      imageUploader: 'تصویر دسته بندی',
      searchUser: 'جستوجوی مشتری',
      startDate: 'از تاریخ',
      endDate: 'تا تاریخ',
      customerFullName: 'نام کامل مشتری',
      phoneNumber: 'شماره همراه',
      price: 'قیمت آیتم',
      cardDescription: 'توضیحات آیتم',
      discount: 'تخفیف',
      category: 'دسته بندی',
      subCategory: 'زیر دسته',
      excelFile: 'فایل اکسل',
    },
    placeholder: {
      email: 'menu-bar.ir@gmail.com',
      password: '******',
      name: 'نوشیدنی های گرم',
      searchUser: 'شماره همراه مشتری : 09121234567',
      customerFullName: 'علی احمدی',
      phoneNumber: '09121234567',
      price: 'به تومان وارد کنید',
      cardDescription: 'توضیحات آیتم را وارد کنید',
      discount: 'به درصد وارد کنید',
    },
  },
};

export default fa;
