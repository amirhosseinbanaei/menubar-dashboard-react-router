import { Button } from '@/common/components/ui/button';
import { ContentSection } from '@/common/components/content-section';
import { useToast } from '@/common/hooks/use-toast';
import { useState } from 'react';
import { ColorDialog, ColorFormValues } from '../components';

export default function CustomizationDialogDemo() {
  const { toast } = useToast();
  const [colors, setColors] = useState<ColorFormValues>({
    background: '#ffffff',
    foreground: '#000000',
    primary: '#3b82f6',
    primaryForeground: '#ffffff',
  });

  const handleSave = (newColors: ColorFormValues) => {
    setColors(newColors);
    toast({
      title: 'رنگ‌ها ذخیره شدند',
      description: 'تغییرات با موفقیت اعمال شد.',
    });
  };

  return (
    <ContentSection title='نمونه دیالوگ انتخاب رنگ'>
      <div className='max-w-2xl mx-auto'>
        <div
          className='mb-6 p-6 rounded-lg border'
          style={{
            backgroundColor: colors.background,
            color: colors.foreground,
          }}>
          <h2 className='text-xl font-bold mb-4'>
            پیش‌نمایش رنگ‌های انتخاب شده
          </h2>
          <p className='mb-4'>این یک نمونه از رنگ‌های انتخابی شما است.</p>

          <div className='flex gap-3'>
            <Button
              style={{
                backgroundColor: colors.primary,
                color: colors.primaryForeground,
              }}>
              دکمه اصلی
            </Button>

            <Button
              variant='outline'
              style={{
                borderColor: colors.primary,
                color: colors.primary,
              }}>
              دکمه ثانویه
            </Button>
          </div>
        </div>

        <div className='flex justify-center'>
          <ColorDialog
            initialValues={colors}
            onSave={handleSave}
            trigger={<Button>انتخاب رنگ</Button>}
            title='سفارشی‌سازی رنگ‌های منو'
            description='رنگ‌های مورد نظر خود را از میان پالت‌های آماده انتخاب کنید یا به صورت دستی وارد نمایید.'
          />
        </div>
      </div>
    </ContentSection>
  );
}
