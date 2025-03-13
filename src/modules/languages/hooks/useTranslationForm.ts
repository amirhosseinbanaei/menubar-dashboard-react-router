import { useFieldArray } from 'react-hook-form';

export const useTranslationsForm = <T>(
  //   form: UseFormReturn<T>,
  form: any,
  selectedLanguages: string[],
) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'translations',
  });

  // Sync translations with selected languages
  const syncTranslations = () => {
    // Remove translations for unselected languages
    fields.forEach((field, index) => {
      if (!selectedLanguages.includes(field.languageCode)) {
        remove(index);
      }
    });

    // Add new translations for selected languages
    selectedLanguages.forEach((langCode) => {
      const exists = fields.some((field) => field.languageCode === langCode);
      if (!exists) {
        append({
          languageCode: langCode,
          name: '',
          description: '',
        });
      }
    });
  };

  return {
    translationFields: fields,
    syncTranslations,
  };
};
