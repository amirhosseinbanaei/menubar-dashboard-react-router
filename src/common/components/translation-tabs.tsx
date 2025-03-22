import { Path, UseFormReturn } from 'react-hook-form';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/common/components/ui/tabs';
import { FormInput, FormTextarea } from '@/common/components/form-fields';
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
  selectedLanguageIndex: number;
  setSelectedLanguageIndex: (index: number) => void;
}

export function TranslationTabs<TFormSchema extends z.ZodType>({
  form,
  languages,
  translationsPath,
  fields,
  t,
  selectedLanguageIndex,
  setSelectedLanguageIndex,
}: TranslationTabsProps<TFormSchema>) {
  if (!languages?.length) return null;
  const defaultLanguage = languages[0].language_code;

  return (
    <Tabs
      defaultValue={defaultLanguage}
      value={languages[selectedLanguageIndex].language_code}
      onValueChange={(value) =>
        setSelectedLanguageIndex(
          languages.findIndex((lang) => lang.language_code === value),
        )
      }
      className='flex flex-col gap-8 rounded-lg w-full hover:cursor-pointer bg-transparent'
      dir='rtl'>
      <TabsList className='w-full flex rounded-sm items-center gap-3'>
        {languages.map((lang) => (
          <TabsTrigger
            key={`translation-tab-trigger-${lang.language_code}`}
            className='px-3 py-2 bg-gray-100 
           shadow-c-xl rounded-sm hover:cursor-pointer text-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow flex gap-3 items-center'
            value={lang.language_code}>
            <div className='w-8 h-6 relative rounded-sm bg-gray-100'>
              <img
                src={`http://localhost:4000/uploads/flags/${lang.language_code}`}
                className='w-full h-full rounded'
                alt=''
              />
            </div>
            {t(`languages.fa.${lang.language_code}`)}
          </TabsTrigger>
        ))}
      </TabsList>

      {languages.map((lang, langIndex) => (
        <TabsContent
          key={`translation-tab-content-${lang.language_code}`}
          value={lang.language_code}>
          <span className='flex flex-col gap-8'>
            {fields.map((field) => {
              if (field.name === 'name') {
                return (
                  <FormInput<TFormSchema>
                    key={`translation-input-${lang.language_code}-${field.name}`}
                    form={form}
                    name={
                      `${translationsPath}.${langIndex}.${field.name}` as Path<
                        z.infer<TFormSchema>
                      >
                    }
                    label={`${field.label} ${t(
                      `languages.fa.${lang.language_code}`,
                    )}`}
                    placeholder={field.placeholder?.replace(
                      '{lang}',
                      lang.language_name,
                    )}
                  />
                );
              }
              if (field.name === 'description') {
                return (
                  <FormTextarea<TFormSchema>
                    key={`${lang.language_code}-${field.name}`}
                    form={form}
                    name={
                      `${translationsPath}.${langIndex}.${field.name}` as Path<
                        z.infer<TFormSchema>
                      >
                    }
                    label={`${field.label} ${t(
                      `languages.fa.${lang.language_code}`,
                    )}`}
                    placeholder={field.placeholder?.replace(
                      '{lang}',
                      lang.language_name,
                    )}
                  />
                );
              }
              // if (field.name === 'subcategories.translations') {
              //   return (
              //     <FormInput<TFormSchema>
              //       key={`translation-input-${lang.language_code}-${field.name}`}
              //       form={form}
              //       name={
              //         `${translationsPath}.${langIndex}.${field.name}` as Path<
              //           z.infer<TFormSchema>
              //         >
              //       }
              //       label={`${field.label} ${t(
              //         `languages.fa.${lang.language_code}`,
              //       )}`}
              //       placeholder={field.placeholder?.replace(
              //         '{lang}',
              //         lang.language_name,
              //       )}
                  
              //     />
              //     // <div className='w-full flex gap-5 items-end'>
              //     //   <div className='w-full'>
              //     //   </div>
              //     // </div>
              //   );
              // }
            })}
            <input
              type='hidden'
              {...form.register(
                `${translationsPath}.${langIndex}.language` as Path<
                  z.infer<TFormSchema>
                >,
              )}
              value={lang.language_code}
            />
          </span>
        </TabsContent>
      ))}
    </Tabs>
  );
}
