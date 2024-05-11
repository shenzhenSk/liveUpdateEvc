export const baseUrl: any = {
  eu: {
    dev: import.meta.env.DEV ? '' : 'https://osp.sit.ms.eu.aswatson.net',
    sit: 'https://osp.sit.ms.eu.aswatson.net',
    uat: 'https://osp.uat.ms.eu.aswatson.net',
    prod: 'https://osp.ms.eu.aswatson.net',
  },
  asia: {
    dev: import.meta.env.DEV ? '' : 'https://sit.api.apac.aswatson.net',
    sit: 'https://sit.api.apac.aswatson.net',
    // uat: 'https://sit.api.apac.aswatson.net',
    uat: 'http://osp-api.ms-uat.aswatson.net',
    prod: 'https://sit.api.apac.aswatson.net',
  },
};
