import { useForm } from 'react-hook-form';
import { FormBuilder } from '@/common/components/form-builder';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/common/components/ui/accordion';
import { useState } from 'react';
import { useLanguages } from '@/modules/languages/hooks/useLanguages';
import { useTranslation } from 'react-i18next';
import { TranslationTabs } from '@/common/components/translation-tabs';

interface AboutForm {
  translations: {
    [key: string]: {
      description: string;
    };
  };
}

export function About() {
  const { t } = useTranslation();
  const { data: languages } = useLanguages();
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);
  const form = useForm<AboutForm>({
    defaultValues: {
      translations: {},
    },
  });

  const onSubmit = (data: AboutForm) => {
    console.log(data);
  };

  return (
    <FormBuilder
      form={form}
      onSubmit={onSubmit}>
      <Accordion
        type='single'
        collapsible
        defaultChecked
        defaultValue='item-1'>
        <AccordionItem value='item-1'>
          <AccordionTrigger>درباره ما</AccordionTrigger>
          <AccordionContent>
            <div className='mt-10 mb-5'>
              <TranslationTabs
                t={t}
                form={form}
                languages={languages}
                translationsPath='translations'
                selectedLanguageIndex={selectedLanguageIndex}
                setSelectedLanguageIndex={setSelectedLanguageIndex}
                fields={[
                  {
                    name: 'description',
                    label: 'توضیحات',
                    placeholder: 'نام به {lang}',
                  },
                ]}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </FormBuilder>
  );
}
