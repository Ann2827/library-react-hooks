import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './ru/translation.json';
import en from './en/translation.json';

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  supportedLngs: ['ru', 'en'],
  nonExplicitSupportedLngs: true,
  resources: {
    ru: {
      translation: ru,
    },
    en: {
      translation: en,
    },
  },
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: true,
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
  },
});

export default i18n;
