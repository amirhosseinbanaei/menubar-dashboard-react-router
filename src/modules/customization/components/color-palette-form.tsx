import { FormBuilder } from '@/common/components/form-builder';
import React from 'react';

export default function ColorPaletteForm() {
  return (
    <FormBuilder
      type='edit'
      buttonTitle='ذخیره تغییرات'
      schema={colorSchema}
      form={formRef.current}
      onSubmit={onSubmit}>
      <FormControllerLayout>
        <ColorInput
          name='background'
          label='رنگ پس‌زمینه'
          placeholder='#ffffff'
          value={colorValues.background}
          onChange={handleColorChange}
        />
        <ColorInput
          name='foreground'
          label='رنگ پیش‌زمینه'
          placeholder='#000000'
          value={colorValues.foreground}
          onChange={handleColorChange}
        />
      </FormControllerLayout>

      <FormControllerLayout>
        <ColorInput
          name='primary'
          label='رنگ اصلی'
          placeholder='#000000'
          value={colorValues.primary}
          onChange={handleColorChange}
        />
        <ColorInput
          name='primaryForeground'
          label='رنگ پیش‌زمینه اصلی'
          placeholder='#ffffff'
          value={colorValues.primaryForeground}
          onChange={handleColorChange}
        />
      </FormControllerLayout>
    </FormBuilder>
  );
}
