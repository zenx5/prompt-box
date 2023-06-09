import { 
    arSA,
    deDE,
    enUS,
    esES,
    frFR,
    itIT,
    jaJP,
    koKR,
    ptBR,
    ruRU,
    zhCN,

} from '@mui/material/locale';

export const allLangs = [
    {
        label: 'Arabic',
        value: 'ar',
        systemValue: arSA,
    },
    {
        label: 'Germa',
        value: 'pt',
        systemValue: ptBR,
    },
    {
        label: 'English',
        value: 'en',
        systemValue: enUS,
    },
    {
        label: 'Spanish',
        value: 'es',
        systemValue: esES,
    },
    {
        label: 'French',
        value: 'fr',
        systemValue: frFR,
    },
    {
        label: 'Italian',
        value: 'it',
        systemValue: itIT,
    },
    {
        label: 'Japanese',
        value: 'jp',
        systemValue: jaJP,
    },
    {
        label: 'Korean',
        value: 'ko',
        systemValue: koKR,
    },
    {
        label: 'Portuguese',
        value: 'pt',
        systemValue: ptBR,
    },
    {
        label: 'Russian',
        value: 'ru',
        systemValue: ruRU,
    },
    {
        label: 'Chinese',
        value: 'zh',
        systemValue: zhCN,
    }
];

export const defaultLang = allLangs[0]; // Portuguese