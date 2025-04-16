import { ContentSection } from '@/common/components/content-section';
import { Path, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/common/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { updateMenuColors } from '../services/customization.service';
import { FormBuilder } from '@/common/components/form-builder';
import { FormInput } from '@/common/components/form-fields';
import FormControllerLayout from '@/common/components/layouts/form-controller.layout';
import { memo } from 'react';
interface ColorPaletteProps {
  title: string;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    primaryForeground: string;
  };
  onSelect: (colors: {
    background: string;
    foreground: string;
    primary: string;
    primaryForeground: string;
  }) => void;
}

const ColorPalette = memo(({ title, colors, onSelect }: ColorPaletteProps) => {
  return (
    <div className='border rounded-lg p-4'>
      <h3 className='font-medium text-sm mb-2'>{title}</h3>
      <div className='flex justify-center gap-2 mb-3'>
        <div
          className='w-6 h-6 rounded-md border'
          style={{ backgroundColor: colors.background }}
          title='پس‌زمینه'
        />
        <div
          className='w-6 h-6 rounded-md border'
          style={{ backgroundColor: colors.foreground }}
          title='پیش‌زمینه'
        />
        <div
          className='w-6 h-6 rounded-md border'
          style={{ backgroundColor: colors.primary }}
          title='اصلی'
        />
        <div
          className='w-6 h-6 rounded-md border'
          style={{ backgroundColor: colors.primaryForeground }}
          title='پیش‌زمینه اصلی'
        />
      </div>
      <button
        onClick={() => onSelect(colors)}
        className='w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md text-xs font-medium transition-all'>
        انتخاب این پالت
      </button>
    </div>
  );
});

const ColorPalettes = memo(
  ({ onSelect }: { onSelect: (colors: ColorFormValues) => void }) => {
    const predefinedPalettes = [
      {
        title: 'کلاسیک',
        colors: {
          background: '#ffffff',
          foreground: '#000000',
          primary: '#000000',
          primaryForeground: '#ffffff',
        },
      },
      {
        title: 'مدرن',
        colors: {
          background: '#f8f9fa',
          foreground: '#212529',
          primary: '#0d6efd',
          primaryForeground: '#ffffff',
        },
      },
      {
        title: 'تیره',
        colors: {
          background: '#212529',
          foreground: '#f8f9fa',
          primary: '#0dcaf0',
          primaryForeground: '#000000',
        },
      },
      {
        title: 'گرم',
        colors: {
          background: '#fff8f0',
          foreground: '#4a3f35',
          primary: '#ff7700',
          primaryForeground: '#ffffff',
        },
      },
    ];

    return (
      <div className='mb-8'>
        <h2 className='text-lg font-medium mb-4'>پالت‌های آماده</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {predefinedPalettes.map((palette, index) => (
            <ColorPalette
              key={index}
              title={palette.title}
              colors={palette.colors}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    );
  },
);

const colorSchema = z.object({
  background: z.string().min(1, 'رنگ پس‌زمینه الزامی است'),
  foreground: z.string().min(1, 'رنگ پیش‌زمینه الزامی است'),
  primary: z.string().min(1, 'رنگ اصلی الزامی است'),
  primaryForeground: z.string().min(1, 'رنگ پیش‌زمینه اصلی الزامی است'),
});

type ColorFormValues = z.infer<typeof colorSchema>;

export default function CustomizationPage() {
  const { toast } = useToast();
  const form = useForm<ColorFormValues>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      background: '#ffffff',
      foreground: '#000000',
      primary: '#000000',
      primaryForeground: '#ffffff',
    },
  });

  const { mutate: updateColors } = useMutation({
    mutationFn: updateMenuColors,
    onSuccess: () => {
      toast({
        title: 'موفقیت',
        description: 'رنگ‌های منو با موفقیت به‌روزرسانی شدند',
      });
    },
    onError: () => {
      toast({
        title: 'خطا',
        description: 'خطایی در به‌روزرسانی رنگ‌ها رخ داد',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: ColorFormValues) => {
    updateColors(data);
  };

  const background = form.watch('background');
  const foreground = form.watch('foreground');
  const primary = form.watch('primary');
  const primaryForeground = form.watch('primaryForeground');

  return (
    <ContentSection title='شخصی سازی منو'>
      <ColorPalettes />
      <ColorPreview
        background={background}
        foreground={foreground}
        primary={primary}
        primaryForeground={primaryForeground}
      />

      <FormBuilder
        type='edit'
        buttonTitle='ذخیره تغییرات'
        schema={colorSchema}
        form={form}
        onSubmit={onSubmit}>
        <FormControllerLayout>
          <ColorField
            form={form}
            name='background'
            label='رنگ پس‌زمینه'
            placeholder='#ffffff'
            color={background}
          />
          <ColorField
            form={form}
            name='foreground'
            label='رنگ پیش‌زمینه'
            placeholder='#000000'
            color={foreground}
          />
        </FormControllerLayout>

        <FormControllerLayout>
          <ColorField
            form={form}
            name='primary'
            label='رنگ اصلی'
            placeholder='#000000'
            color={primary}
          />
          <ColorField
            form={form}
            name='primaryForeground'
            label='رنگ پیش‌زمینه اصلی'
            placeholder='#ffffff'
            color={primaryForeground}
          />
        </FormControllerLayout>
      </FormBuilder>
    </ContentSection>
  );
}

interface ColorPreviewProps {
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
}

const ColorPreview = memo(function ColorPreview({
  background,
  foreground,
  primary,
  primaryForeground,
}: ColorPreviewProps) {
  return (
    <div className='mb-6 p-5 bg-white rounded-lg'>
      <h3 className='text-base font-medium mb-3'>پیش‌نمایش رنگ‌ها</h3>
      <div className='flex flex-wrap gap-3'>
        <div
          className='p-3 rounded-md flex items-center justify-center w-28 h-12 text-xs font-medium transition-all'
          style={{
            backgroundColor: primary,
            color: primaryForeground,
          }}>
          دکمه اصلی
        </div>

        <div
          className='p-3 rounded-md flex items-center justify-center w-28 h-12 text-xs font-medium transition-all'
          style={{
            backgroundColor: background,
            color: foreground,
          }}>
          پس‌زمینه منو
        </div>
      </div>
    </div>
  );
});

interface ColorFieldProps<TFormSchema extends z.ZodType> {
  form: ReturnType<typeof useForm<z.infer<TFormSchema>>>;
  name: string;
  label: string;
  placeholder: string;
  color: string;
}

function ColorField<TFormSchema extends z.ZodType>({
  form,
  name,
  label,
  placeholder,
  color,
}: ColorFieldProps<TFormSchema>) {
  return (
    <div className='bg-white rounded-lg p-4'>
      <div className='flex items-center gap-2 mb-3'>
        <div
          className='w-6 h-6 rounded-full border'
          style={{ backgroundColor: color }}
        />
        <h3 className='font-medium text-sm'>{label}</h3>
      </div>
      <div className='flex gap-2'>
        <FormInput
          form={form}
          name={name as Path<z.infer<TFormSchema>>}
          type='color'
        />
        <FormInput
          form={form}
          name={name as Path<z.infer<TFormSchema>>}
          type='text'
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
