import './main.css';

import { i18nInit } from '@keychi/shared/locales';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18nInit({ i18nModule: i18next.use(initReactI18next) });
