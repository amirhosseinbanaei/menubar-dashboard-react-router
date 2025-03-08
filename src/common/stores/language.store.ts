import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '@/common/lib/i18.lib';

type Language = 'fa' | 'en';

interface LanguageState {
  current: Language;
  direction: 'rtl' | 'ltr';
}

interface LanguageActions {
  setLanguage: (lang: Language) => void;
}

type LanguageStore = LanguageState & LanguageActions;

const getDirection = (lang: Language): 'rtl' | 'ltr' => {
  return lang === 'fa' ? 'rtl' : 'ltr';
};

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      // Initial state
      current: 'fa',
      direction: 'rtl',

      // Actions
      setLanguage: (lang) => {
        i18n.changeLanguage(lang);
        set({
          current: lang,
          direction: getDirection(lang),
        });
      },
    }),
    {
      name: 'language-storage',
      onRehydrateStorage: () => (state) => {
        // Ensure i18n is synced with persisted state
        if (state) {
          i18n.changeLanguage(state.current);
        }
      },
    },
  ),
);
