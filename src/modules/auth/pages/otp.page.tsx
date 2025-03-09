import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'react-router';
import { useState } from 'react';
import { OtpInput } from '../components/otp-input';
import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import { useAuthStore } from '../store/otp-auth.store';
import { z } from 'zod';

export const loginSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, 'شماره موبایل الزامی است')
    .regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست'),
  otp: z.string().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const [otp, setOTP] = useState(['', '', '', '']);
  const { sendOtp, verifyOtp, showOtp } = useAuthStore();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    if (!showOtp) {
      await sendOtp(data.phoneNumber);
    } else {
      const otpString = otp.join('');
      await verifyOtp(
        data.phoneNumber,
        otpString,
        searchParams.get('back_ref') || '/',
      );
    }
  };

  return (
    <div
      className='relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12'
      dir='rtl'>
      <div className='relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-11/12 md:w-full max-w-lg rounded-2xl'>
        <div className='mx-auto flex w-full max-w-md flex-col space-y-14'>
          <Header showOtp={showOtp} />

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8'>
            {!showOtp ? (
              <PhoneNumberInput form={form} />
            ) : (
              <OtpInput
                value={otp}
                onChange={setOTP}
              />
            )}

            <Button
              type='submit'
              className='w-full'
              // disabled={
              //   !form.formState.isDirty ||
              //   !form.formState.isValid ||
              //   form.formState.isSubmitting ||
              //   isLoading
              // }
            >
              تایید و ادامه
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Header({ showOtp }: { showOtp: boolean }) {
  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2'>
      <h1 className='font-bold text-2xl'>
        {showOtp ? 'تایید کد' : 'ورود | ثبت نام'}
      </h1>
      <p className='text-sm text-gray-500'>
        {showOtp
          ? 'کد تایید برای شما پیامک شد'
          : 'برای ورود یا ثبت نام شماره همراه خود را وارد کنید .'}
      </p>
    </div>
  );
}

function PhoneNumberInput({
  form,
}: {
  form: ReturnType<typeof useForm<LoginFormValues>>;
}) {
  return (
    <div className='space-y-2'>
      <Input
        {...form.register('phoneNumber')}
        type='tel'
        placeholder='شماره همراه'
        className='text-center h-14 text-lg'
        dir='ltr'
      />
      {form.formState.errors.phoneNumber && (
        <p className='text-sm text-red-500 text-center'>
          {form.formState.errors.phoneNumber.message}
        </p>
      )}
    </div>
  );
}
