import pinia, { GlobalStore } from '@/stores';
import Alert from '@/components/baseComponents/BaseAlert';
import fetchApi from '@/service/api';
import { showLoadingToast, closeToast } from 'vant';
import { $t } from '@/locale';
import type { Router, RouteLocationNormalizedLoaded } from 'vue-router';
export interface PluginResultData {
  id: string;
  count?: number;
}
// GlobalStore
const store = GlobalStore(pinia);
//searchProduct
export async function searchProduct(keyword: string, callback: (products?: any) => void) {
  try {
    showLoadingToast({
      duration: 0,
      forbidClick: true,
      message: $t('common.loading'),
    });
    const params = { pageSize: 10, pageNum: 1, keyword };
    const res: any = await fetchApi.search(params);
    closeToast();
    Alert.close();
    const { records = [] } = res.data || {};
    if (records.length) {
      callback(records);
    } else {
      store.setMultipleMatches([]);
      Alert({
        title: $t('tip.UnKnowBarcode'),
        message: $t('tip.UnKnowContent'),
      });
    }
  } catch (error) {
    closeToast();
  }
}
export async function laserScanCallback(
  value: PluginResultData,
  router: Router,
  route: RouteLocationNormalizedLoaded,
  afterLaserScan?: () => void,
) {
  store.setMultipleMatches([]);
  if (value?.id) {
    const keyword = value.id;
    searchProduct(keyword, function (products: any) {
      //1.如果有多个商品，跳转到搜索页面
      //1.If there are multiple products, jump to the search page
      console.log('products.length', products);
      console.log(products);
      console.log(products.length);

      if (products.length > 1) {
        if (route.name == 'search') {
          //params key is keyword
          router.replace({ name: 'search', query: { keyword, time: new Date().getTime() } });
        } else {
          router.push({ name: 'search', query: { keyword, time: new Date().getTime() } });
        }
      } else {
        const productItem: any = products[0];
        console.log('productItem.linkedProducts?.length', productItem?.linkedProducts?.length);
        console.log(productItem);
        //2.如果只有一个商品,linkedProducts大于1，弹框选择
        //2.If there is only one product, linkedProducts is greater than 1, pop-up box selection
        if (productItem?.linkedProducts?.length > 1) {
          store.setMultipleMatches(productItem.linkedProducts);
        } else {
          //3.如果只有一个商品，跳转到商品详情页面
          //3.If there is only one product, jump to the product details page
          if (route.name == 'product') {
            //params key is barcode
            router.replace({
              name: 'product',
              query: { barcode: keyword, time: new Date().getTime() },
            });
          } else {
            router.push({
              name: 'product',
              query: { barcode: keyword, time: new Date().getTime() },
            });
          }
        }
      }
    });
    afterLaserScan?.();
  }
}
