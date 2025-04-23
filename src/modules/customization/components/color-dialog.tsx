import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/common/components/ui/dialog';
import { useState, useCallback } from 'react';
import { ColorForm } from './color-form';
import { ColorFormValues } from './color-types';
import { useColorPalettes } from '../hooks/use-color-palettes';
import { ColorPalette } from './color-palette';
import { ScrollArea } from '@/common/components/ui/scroll-area';
import { useUpdateColorPalette } from '../hooks/use-update-color-palette';
import toast from 'react-hot-toast';
import { UseFormReturn } from 'react-hook-form';

interface ColorDialogProps {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
}

export const ColorDialog = ({
  trigger,
  title = 'تنظیمات رنگ',
  description = 'رنگ‌های منو را سفارشی‌سازی کنید',
}: ColorDialogProps) => {
  const [open, setOpen] = useState(false);
  const defaultPalettes = useColorPalettes().data?.default_palettes;
  const { mutateAsync: createColorPalette } = useUpdateColorPalette();

  const defaultColorValues = {
    name: '',
    background: '#ffffff',
    foreground: '#000000',
    primary: '#000000',
    primary_foreground: '#ffffff',
  };
  const [colorValues, setColorValues] =
    useState<ColorFormValues>(defaultColorValues);

  // Handle palette selection
  const handleColorPaletteChange = useCallback((colors: ColorFormValues) => {
    setColorValues(colors);
  }, []);

  // Handle individual color changes
  const handleColorChange = useCallback((name: string, value: string) => {
    setColorValues((prev) => {
      return { ...prev, [name]: value };
    });
  }, []);

  // Handle form submission
  const handleSubmit = async (
    data: ColorFormValues,
    form: UseFormReturn<ColorFormValues>,
  ) => {
    const res = await createColorPalette({ ...data, restaurant_id: 2 });
    //  console.log(res);
    if (res.status === 201) {
      toast.success('رنگ‌ها با موفقیت ثبت شدند');
      form.reset(defaultColorValues);
      //   setOpen(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className='sm:max-w-[700px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className='py-4'>
          <ScrollArea className='h-[100px] md:h-[300px]'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 h-full'>
              {defaultPalettes?.map((colorPalate) => {
                return (
                  <ColorPalette
                    key={colorPalate.id}
                    title={colorPalate.name}
                    colors={colorPalate}
                    onSelect={handleColorPaletteChange}
                  />
                );
              })}
            </div>
          </ScrollArea>

          <ColorForm
            initialValues={colorValues}
            onColorChange={handleColorChange}
            onSubmit={handleSubmit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
