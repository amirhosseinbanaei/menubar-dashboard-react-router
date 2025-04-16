import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/common/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card';
import { Input } from '@/common/components/ui/input';
import { Label } from '@/common/components/ui/label';
import { useToast } from '@/common/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { updateMenuColors } from '../services/customization.service';

const colorSchema = z.object({
  background: z.string().min(1, 'رنگ پس‌زمینه الزامی است'),
  foreground: z.string().min(1, 'رنگ پیش‌زمینه الزامی است'),
  primary: z.string().min(1, 'رنگ اصلی الزامی است'),
  primaryForeground: z.string().min(1, 'رنگ پیش‌زمینه اصلی الزامی است'),
});

type ColorFormValues = z.infer<typeof colorSchema>;

export function ColorCustomization() {
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

  const { mutate: updateColors, isPending } = useMutation({
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>شخصی‌سازی رنگ‌های منو</CardTitle>
      </CardHeader>
      <CardContent>
        
      </CardContent>
    </Card>
  );
}
