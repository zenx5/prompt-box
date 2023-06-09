import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import arLocales from './langs/ar'
import deLocales from './langs/de'
import enLocales from './langs/en'
import esLocales from './langs/es'
import frLocales from './langs/fr'
import itLocales from './langs/it'
import jpLocales from './langs/jp'
import koLocales from './langs/ko'
import ptLocales from './langs/pt'
import ruLocales from './langs/ru'
import zhLocales from './langs/zh'

import { defaultLang } from './config-lang';

const localLang = localStorage.getItem('i18nextLng') 

let lng = localLang ?? defaultLang.value

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
        ar: { translation:arLocales },
        de: { translation:deLocales },
        en: { translation:enLocales },
        es: { translation:esLocales },
        fr: { translation:frLocales },
        it: { translation:itLocales },
        jp: { translation:jpLocales },
        ko: { translation:koLocales },
        pt: { translation:ptLocales },
        ru: { translation:ruLocales },
        zh: { translation:zhLocales },
    },
    lng,
    fallbackLng: lng,
    interpolation: {
      escapeValue: false,
    },
  });


export default i18n