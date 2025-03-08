// import { DevTool } from '@hookform/devtools';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { loginValidationSchema } from '../validators/LoginSchema';
// // import Cookies from 'js-cookie';
// import { toast } from 'react-hot-toast';
// import { useContext, useEffect, useMemo } from 'react';
// import { AuthContext } from '../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import FormButton from '../components/Form/FormButton';
// import InputContainer from '../components/Input/InputContainer';
// import { LanguageContext } from '../contexts/LanguageContext';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// import { Button } from '@/components/ui/button';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';

// import { Input } from '@/components/ui/input';
import { FormBuilder } from '@/common/components/form-builder';
import { FormInput } from '@/common/components/form-fields';
import { useLanguageStore } from '@/common/stores/language.store';

// import { loginAdmin } from '../services/Axios/Requests/Admin';
export default function Login() {
  const dir = useLanguageStore((state) => state.direction);

  //   const { login, currentUser } = useContext(AuthContext);
  //   const { language } = useContext(LanguageContext);
  //   const navigate = useNavigate('');
  //   useEffect(() => {
  //     currentUser && navigate('/');
  //   }, []);

  //   const methods = useForm({
  //     resolver: yupResolver(loginValidationSchema),
  //   });

  //   const onSubmitForm = async (e) => {
  //     e.preventDefault();
  //     const data = methods.getValues();
  //     try {
  //       toast.loading('درحال ورود به حساب کاربری ...');
  //       const req = await loginAdmin(data);
  //       if (req.status === 200) {
  //         toast.dismiss();
  //         login(req.data);
  //         toast.success('با موفقیت به حساب کاربری خود وارد شدید .');
  //         navigate('/');
  //       }
  //     } catch (error) {
  //       toast.dismiss();
  //       toast.error(error.response.data.message);
  //     }
  //   };
  return (
    <>
      <div
        className='h-screen bg-white flex flex-col justify-center items-center'
        dir={dir}>
        <div className='bg-white w-96 shadow-xl rounded p-5'>
          <h1 className='text-center font-medium tracking-normal my-5'>
            به پنل ادمین منوبار خوش آمدید
          </h1>
          <LoginForm />
        </div>
      </div>
    </>
  );
}

function LoginForm() {
  const loginFormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    // userType: z.string().min(1, 'User type is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
  });

  type LoginFormValues = z.infer<typeof loginFormSchema>;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
  };

  return (
    <>
      <FormBuilder
        form={form}
        onSubmit={onSubmit}
        buttonTitle='وارد شوید'
        schema={loginFormSchema}>
        <FormInput
          form={form}
          name='email'
          label='ایمیل'
          placeholder='email..'
          type='email'
        />

        {/* <FormSelect
          form={form}
          name='userType'
          label='نوع کاربر'
          placeholder='انتخاب کنید...'
          options={[
            { value: 'admin', label: 'مدیر' },
            { value: 'user', label: 'کاربر' },
          ]}
        /> */}

        <FormInput
          form={form}
          name='password'
          label='رمز عبور'
          type='password'
        />
      </FormBuilder>
    </>
  );
}
