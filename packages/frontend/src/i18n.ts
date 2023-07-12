import i18n from "i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";

import translationPl from './locales/pl.json';
import translationEn from './locales/en.json';

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    resources: {
        pl: {
          translation: translationPl
        },
        en: {
          translation: translationEn
        }
    },
    fallbackLng: 'en',
    debug:true,
    detection: {
        order: ['queryString','cookie'],
        caches: ['cookie']
    },
    interpolation:{
        escapeValue: false
    }
});

export default i18n;
