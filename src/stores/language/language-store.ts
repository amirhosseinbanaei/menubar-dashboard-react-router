"use client";
import { create } from "zustand";
import { fallbackLng } from "@/app/i18n/settings";
import { dir } from "i18next";

export interface LanguageTypes {
  language: string;
  setTFunction: any;
  dir: string;
  tFunction: Function;
  setDir: (language: string) => void;
  setLanguage: (language: string) => void;
}

const useLanguageStore = create<LanguageTypes>((set) => {
  return {
    language: fallbackLng,
    setLanguage: (language) => set(() => ({ language })),

    dir: dir(fallbackLng),
    setDir: (language) => set(() => ({ language: dir(language) })),

    tFunction: () => null,
    setTFunction: (t: Function) => set(() => ({ tFunction: t })),
  };
});
export default useLanguageStore;
