import i18next, { i18n, InitOptions } from 'i18next';
import { DEFAULT } from '../constants/default';
import { Language } from '../types/entity.type';
import en from './en';
import vi from './vi';

type I18nInitOptions = {
  defaultLang?: Language;
  i18nModule?: i18n;
  initOptions?: InitOptions;
};

const resources = { en: { ns1: en }, vi: { ns1: vi } };
const defaultNS = 'ns1';

export const i18nInit = (options?: I18nInitOptions) => {
  const { defaultLang = DEFAULT.USER_LANGUAGE, i18nModule = i18next, initOptions } = options || {};

  return i18nModule.init({
    lng: defaultLang,
    fallbackLng: DEFAULT.USER_LANGUAGE,
    defaultNS,
    debug: false,
    interpolation: { escapeValue: true, prefix: '{{', suffix: '}}' },
    ...initOptions,
    resources
  });
};

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof resources.en;
  }
}
