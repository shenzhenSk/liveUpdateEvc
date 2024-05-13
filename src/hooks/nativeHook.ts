import NativeAPI from 'superapp-miniapp-invoke-native';
import config from '@/config/global';
import mockNativeData from '@/config/global/mockNativeData';
import { laserScanCallback } from '@/hooks/laserScan';
import type { Router, RouteLocationNormalizedLoaded } from 'vue-router';
// import euKongInfo from '@/service/kong/eu';

import { GlobalStore } from '@/stores';

/**
 * init rbac info : userInfo, language, store info and kong token
 *
 * @returns all data
 */
export async function initRBACInfo() {
  const store = GlobalStore();

  // set set min app version
  // NativeAPI.communicatePlugins.setMiniAppVersion({
  //   miniAppVersion: config.buildTime,
  // });

  // Get user info and other info
  const nativeAppInfo = mockNativeData;
  console.log('nativeAppInfo', nativeAppInfo);

  if (config.dev) {
    nativeAppInfo.data_info.serverInfo.serverEnv = config.mockServerInfo.env;
    nativeAppInfo.data_info.serverInfo.serverArea = config.mockServerInfo.area;
  }

  // Set language list
  const data_language = nativeAppInfo?.data_language ?? null;
  store.initLanguage(data_language);

  // Get user info
  const data_info = nativeAppInfo?.data_info ?? null;
  store.initUserInfo(data_info);

  // Set store
  const data_store = nativeAppInfo?.data_store ?? null;
  store.initStoreInfo(data_store);
  // const continent = store.userInfo?.serverInfo?.serverArea;
  //Set kong info
  // if (config.dev) {
  //   if (continent === 'asia') {
  //     store.initKongToken();
  //   } else if (continent === 'eu') {
  //     store.setKongInfo({ token: euKongInfo.APIKey.dev });
  //     store.setLoadedKongToken(true);
  //   }
  // } else {
  //   const appName = 'osp-superapp-event-count';
  //   console.log('get kong token...');
  //   try {
  //     const tokenInfos = await NativeAPI.communicatePlugins.getMiniAppKong({
  //       miniAppNames: [appName],
  //     });
  //     console.log('tokenInfos', tokenInfos);
  //     const evcTokenInfo = tokenInfos[appName];
  //     let token = '';
  //     if (continent === 'asia') {
  //       token = evcTokenInfo?.token?.['access_token'];
  //     } else if (continent === 'eu') {
  //       token = evcTokenInfo?.['X-ASW-APIKey'];
  //     }
  //     store.setKongInfo({ token });
  //     store.setLoadedKongToken(true);
  //   } catch (error) {
  //     console.log('get kong token error', error);
  //   }
  // }
  return nativeAppInfo;
}
/**
 * add back btn listener;add laser scan listener
 *
 * @param onMounted Vue onMounted function
 * @param onBeforeMount Vue onBeforeMount function
 * @param router Vue Router instance
 * @param route Vue Route instance
 * @param afterLaserScan after laser scan callback
 */
export function mixinsHook(
  onMounted: (fn: () => void) => void,
  onBeforeMount: (fn: () => void) => void,
  router: Router,
  route: RouteLocationNormalizedLoaded,
  afterLaserScan?: () => void,
) {
  const callBack = (laserScanResult: any) => {
    console.log('laserScanResult', laserScanResult);

    laserScanCallback(laserScanResult, router, route, afterLaserScan);
  };
  //add laser scan listener
  NativeAPI.laserScanPlugins.setLaserScan({
    mounted: onMounted,
    beforeUnmount: onBeforeMount,
    callBack,
  });
  //back btn listener
  NativeAPI.communicatePlugins.setBackBtn({
    mounted: onMounted,
    beforeUnmount: onBeforeUnmount,
    callBack: () => {
      console.log('click native back btn');
      router.back();
    },
  });
}
/**
 * other mini app jump to portal page
 *
 * @param router {Router} Router instance
 */
export function redirectPage(router: Router) {
  NativeAPI.initialContextPlugins.redirectPage({
    callBack: (value: any) => {
      console.log('jump page params', value);
      const { params, routeName } = JSON.parse(value);
      console.log('redirectPage', params, routeName);
      if (routeName) {
        router.push({
          name: routeName,
          query: { barcode: params.barcode, time: new Date().getTime() },
        });
      }
    },
  });
}
