// vant翻译
import { Locale } from 'vant';
import { defaultLanguageEnum, defaultLanguage, vantLanguageEnum } from './default';
import zhCN from 'vant/lib/locale/lang/zh-CN';
import enUS from 'vant/lib/locale/lang/en-US';
import nlNl from 'vant/lib/locale/lang/nl-NL';

const changeLang = (newLang: any) => {
  switch (newLang) {
    case defaultLanguageEnum.zh_TC:
      Locale.use(vantLanguageEnum.zhTC, zhCN);
      break;
    case defaultLanguageEnum.en_US:
      Locale.use(vantLanguageEnum.enUS, enUS);
      break;
    case defaultLanguageEnum.nl_NL:
      Locale.use(vantLanguageEnum.nlNL, nlNl);
      break;
  }
};

export const vantLocal = (Language: any) => {
  changeLang(Language);
};

const language = defaultLanguage;
vantLocal(language);
