import { useStore } from '../store';

import enTranslations from '../locales/en.json';
import srTranslations from '../locales/sr.json';

const translations = {
  en: enTranslations,
  sr: srTranslations,
};

export const useLanguage = () => {
  const { state } = useStore();

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[state.language];

    for (const k of keys) {
      value = value[k];
      if (value === undefined) {
        console.warn(`Translation missing for key: ${key}`);
        return key;
      }
    }

    return value;
  };

  return { t };
};
