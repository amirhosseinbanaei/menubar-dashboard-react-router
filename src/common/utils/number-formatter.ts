import { useLanguageStore } from '@/common/stores/language.store';

interface NumberFormatterOptions {
  explicitLocale?: 'fa' | 'en';
}

export function numberFormatter(
  number: number,
  options?: NumberFormatterOptions,
) {
  const locale = options?.explicitLocale || useLanguageStore.getState().current;

  const intlFormatLocales = locale === 'fa' ? 'fa-IR' : 'en-US';

  const formattedNumber = Intl.NumberFormat(intlFormatLocales, {
    notation: 'standard',
    maximumFractionDigits: 3,
  }).format(number);

  return formattedNumber;
}
