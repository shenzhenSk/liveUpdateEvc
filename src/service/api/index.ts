import { GlobalStore } from '@/stores';
import eu from './eu';
import asia from './asia';
import type { paramsType } from '@/service/http';
const api: any = {
  eu,
  asia,
};
const apiNames = { ...eu, ...asia };
type fetchHandleType = keyof typeof apiNames;

const fetchApis = { ...apiNames };
type fetchApiType = typeof apiNames;
const handle = {
  get: (target: fetchApiType, prop: fetchHandleType) => {
    const store = GlobalStore();
    const {
      userInfo: {
        serverInfo: { serverArea },
      },
      buCode,
      storeId,
      language,
    } = store;
    return (params: paramsType): Promise<any> => {
      return api[serverArea][prop]({ buCode, storeId, language, ...params });
    };
  },
};
const fetchApi = new Proxy(fetchApis, handle);
export default fetchApi;
