import './main.css';

import { DEFAULT } from '@keychi/shared/constants';
import { i18nInit } from '@keychi/shared/locales';
import { Language } from '@keychi/shared/types';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LS_KEY } from './constants/key';

const defaultLang = localStorage.getItem(LS_KEY.LANGUAGE) as Language;

i18nInit({
  i18nModule: i18next.use(initReactI18next),
  defaultLang: Object.values(Language).includes(defaultLang) ? defaultLang : DEFAULT.USER_LANGUAGE
});
