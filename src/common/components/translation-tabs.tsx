import { UseFormReturn } from 'react-hook-form';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/common/components/ui/tabs';
import { FormInput } from '@/common/components/form-fields';
import { z } from 'zod';
import { Language } from '@/modules/languages/interfaces/language.interface';
import { TFunction } from 'i18next';

interface TranslationField {
  name: string;
  label: string;
  placeholder?: string;
}

interface TranslationTabsProps<TFormSchema extends z.ZodType> {
  form: UseFormReturn<z.infer<TFormSchema>>;
  languages: Language[];
  translationsPath: string;
  fields: TranslationField[];
  t: TFunction;
}

export function TranslationTabs<TFormSchema extends z.ZodType>({
  form,
  languages,
  translationsPath,
  fields,
  t,
}: TranslationTabsProps<TFormSchema>) {
  if (!languages?.length) return null;
  const defaultLanguage = languages[0].language_code;

  return (
    <Tabs
      defaultValue={defaultLanguage}
      className='flex flex-col gap-1 rounded-lg p-1 w-full hover:cursor-pointer bg-transparent my-5'
      dir='rtl'>
      <TabsList className='mb-5 w-full flex rounded-sm items-center gap-3'>
        {languages.map((lang) => (
          <TabsTrigger
            className='pl-3 bg-gray-100 border border-primary
           shadow-c-xl rounded-lg hover:cursor-pointer text-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow flex gap-3 items-center'
            key={lang.language_code}
            value={lang.language_code}>
            <div className='size-7 relative rounded-full bg-gray-100'>
              <img
                src={`http://localhost:4000/uploads/flags/${lang.language_code}`}
                className='w-full h-full rounded-full'
                alt=''
              />
            </div>
            {t(`languages.fa.${lang.language_code}`)}
          </TabsTrigger>
        ))}
      </TabsList>

      {languages.map((lang, langIndex) => (
        <TabsContent
          key={lang.language_code}
          value={lang.language_code}>
          <div className='space-y-4'>
            {fields.map((field) => (
              <FormInput<TFormSchema>
                key={`${lang.language_code}-${field.name}`}
                form={form}
                name={`${translationsPath}.${langIndex}.${field.name}`}
                label={`${field.label} ${t(
                  `languages.fa.${lang.language_code}`,
                )}`}
                placeholder={field.placeholder?.replace(
                  '{lang}',
                  lang.language_name,
                )}
              />
            ))}
            <input
              type='hidden'
              {...form.register(`${translationsPath}.${langIndex}.language`)}
              value={lang.language_code}
            />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
