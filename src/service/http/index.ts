import { CapacitorHttp } from '@capacitor/core';
import type { HttpOptions, HttpHeaders } from '@capacitor/core';
import { GlobalStore } from '@/stores';
import { baseUrl } from '@/config';
import Alert from '@/components/baseComponents/BaseAlert';
export interface requestType {
  url: string;
  method?: 'get' | 'post' | 'delete' | 'put';
  params?: any;
  data?: any;
  headers?: HttpHeaders;
  awaitToken?: boolean;
}
export interface paramsType {
  [key: string]: any;
}

const getUrl = (url: string, serverInfo: any) => {
  const { serverArea, serverEnv } = serverInfo;
  return (import.meta.env.DEV ? '' : baseUrl[serverArea][serverEnv]) + url;
  // return url;
};
const awaitKongToken = async () => {
  return new Promise((resolve) => {
    const store = GlobalStore();
    const loadedKongToken = computed(() => store.loadedKongToken);
    watch(loadedKongToken, (val) => {
      if (val) {
        resolve(val);
      }
    });
    // 60s timeout
    setTimeout(() => {
      resolve(false);
    }, 60000);
  });
};
export default async (request: requestType): Promise<void> => {
  const { url, method = 'get', params, data, headers = {}, awaitToken = true } = request;
  const store = GlobalStore();
  console.log(awaitToken, 'awaitToken');
  if (awaitToken && !store.loadedKongToken) {
    const tokenStatus = await awaitKongToken();
    if (!tokenStatus) {
      throw new Error('kong token timeout');
    }
  }
  const {
    userInfo: {
      token: { access_token },
      user: { user_name, id },
      serverInfo = {},
    },
  } = store;
  if (params) {
    Object.keys(params).forEach((key: string) => {
      if (typeof params[key] === 'number') {
        params[key] = params[key].toString();
      }
    });
  }
  if (data) {
    Object.keys(data).forEach((key: string) => {
      if (typeof data[key] === 'number') {
        data[key] = data[key].toString();
      }
    });
  }
  console.log('store.kongInfo.token?.access_token', store.kongInfo.token);
  const options: HttpOptions = {
    url: getUrl(url, serverInfo),
    headers: {
      Authorization:
        'Bearer ' + (serverInfo.serverArea == 'eu' ? access_token : store.kongInfo.token),
      Username: user_name,
      Userid: id,
      'Content-Type': 'application/json',
      'X-ASW-APIKey': store.kongInfo.token ?? '',
      'X-Asw-Businessunit': store.buCode,
      ...headers,
    },
  };
  if (method == 'get') {
    options.params = params;
  } else {
    options.data = data;
  }
  let res: any = {};
  try {
    res = await CapacitorHttp[method](options);
    if (res.status === 200) {
      if (res.data?.errorCode != 200 && res.data?.success == false) {
        const alertOption: any = { message: res.data.errorMessage, overlay: false };
        if (res.data.errorTitle) {
          alertOption.title = res.data.errorTitle;
        }
        Alert(alertOption);
      }
      return Promise.resolve(res.data);
    }
    Alert({ message: res.data?.message || res.message, title: res.status });
    return Promise.reject(res);
  } catch (error: any) {
    Alert({ message: error.message });
    return Promise.reject(error);
  }
};
