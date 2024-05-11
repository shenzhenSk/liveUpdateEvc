import { defineStore, createPinia } from 'pinia';
// import { communicatePlugin } from '@/plugins/communicate';
import { changeLanguageHandle } from '@/locale';
import { formatMenu } from '@/utils/tools';
import fetchApi from '@/service/api';
import kongParams from '@/service/kong/asia';
interface userInfoType {
  token: { access_token: string };
  user: any;
  menus: Array<any>;
  serverInfo: {
    serverArea: string;
    serverEnv: string;
  };
  bu: Array<any>;
  refreshKey?: number;
}
// 页面是否在加载中
export const GlobalStore = defineStore({
  id: 'GlobalStore',
  state: () =>
    ({
      // 设备返回的信息
      userInfo: {
        token: { access_token: '' },
        user: {},
        menus: [],
        serverInfo: {
          serverArea: '',
          serverEnv: '',
        },
        bu: [],
      } as userInfoType,
      kongInfo: {} as any,
      buCode: 'WTCHK',
      storeId: '3462',
      language: 'nl_NL',
      multipleMatches: [] as Array<any>,
      refreshKey: new Date().getTime(),
      loadedKongToken: false,
    } as any),
  actions: {
    setKongInfo(kongInfo: any) {
      this.kongInfo = kongInfo;
    },
    setLoadedKongToken(loadedKongToken: boolean) {
      this.loadedKongToken = loadedKongToken;
    },
    setMultipleMatches(multipleMatches: Array<any>) {
      this.multipleMatches = multipleMatches;
    },
    setBuCode(buCode: string) {
      this.buCode = buCode;
    },
    setLanguage(lang: string) {
      this.language = lang;
    },
    setStoreId(storeId: string) {
      this.storeId = storeId;
    },
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo;
    },
    async initUserInfo(userInfo: any) {
      //menu data
      if (userInfo?.menus?.length) {
        userInfo.menus = formatMenu(userInfo.menus);
      }
      this.setUserInfo(userInfo);
      // default bu
      // const buCode = userInfo?.bu?.default_tenant_code;
      // if (buCode) {
      //   this.setBuCode(buCode);
      // }
    },
    async initStoreInfo(storeItem: any) {
      this.setStoreId(storeItem.code);
      console.log('storeItem', storeItem);

      if (storeItem.buCode) {
        this.setBuCode(storeItem.buCode);
      } else {
        const buCode = this.userInfo?.bu?.default_tenant_code;
        console.log(this.userInfo);

        this.setBuCode(buCode);
      }
    },
    async initLanguage(lang: any) {
      if (lang) {
        //change page language
        this.setLanguage(lang.id);
        changeLanguageHandle(lang.id as string);
        this.refreshKey = new Date().getTime();
      }
    },
    async initKongToken() {
      this.setLoadedKongToken(false);
      const data = kongParams[this.userInfo.serverInfo.serverEnv || 'sit'];

      const res: any = await fetchApi.getKongToken(data);
      if (res?.access_token) {
        this.setKongInfo({ token: res.access_token });
        this.setLoadedKongToken(true);
      }
    },
  },
});
const pinia = createPinia();
export default pinia;
