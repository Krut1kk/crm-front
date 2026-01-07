import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { languages } from '../constants/languages.constants.js';
import secureLocalStorage from 'react-secure-storage';
import enTranslations from './locales/en/translations.json';
import ukTranslations from './locales/uk/translations.json';

i18next.use(initReactI18next).init({
  fallbackLng: languages.en,
  lng: secureLocalStorage.getItem('lang') || languages.en,
  resources: {
    [languages.en]: {
      translations: enTranslations
    },
    [languages.uk]: {
      translations: ukTranslations
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

i18next.languages = Object.values(languages);

export default i18next;
