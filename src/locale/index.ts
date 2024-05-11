import { createI18n } from 'vue-i18n';
import { defaultLanguageEnum, defaultLanguage } from './default';
import { vantLocal } from '@/locale/vantLocale';

import zh_TC from './lang/zh_TC';
import en_US from './lang/en_US';
import nl_NL from './lang/nl_NL';
import '@/locale/vantLocale';

export interface messagesType {
  [key: string]: any;
}

export const messages: messagesType = {
  // 中文语言包
  [defaultLanguageEnum.zh_TC]: {
    ...zh_TC,
  },
  // 英文语言包
  [defaultLanguageEnum.en_US]: {
    ...en_US,
  },
  // 荷兰语言包
  [defaultLanguageEnum.nl_NL]: {
    ...nl_NL,
  },
};

const i18n = createI18n({
  globalInjection: true,
  locale: defaultLanguage,
  messages,
  legacy: false,
});

// 改变语言
export const changeLanguageHandle = (language: string) => {
  const { locale } = i18n.global;
  console.log('language', language);

  locale.value = language;
  vantLocal(language);
};
export const $t = (key: any) => (i18n.global as any).t(key);
export default i18n;
