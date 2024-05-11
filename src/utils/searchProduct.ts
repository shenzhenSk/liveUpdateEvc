import Alert from '@/components/baseComponents/BaseAlert';
import fetchApi from '@/service/api';
import { showLoadingToast, closeToast } from 'vant';
import { $t } from '@/locale';

export default async function (keyword: string, store: any, callback: (products?: any) => void) {
  try {
    showLoadingToast({
      duration: 0,
      forbidClick: true,
      message: $t('common.loading'),
    });
    const params = { pageSize: 10, pageNum: 1, keyword };
    const res: any = await fetchApi.search(params);
    closeToast();
    const { records = [] } = res.data || {};
    if (records.length) {
      const productItem: any = records[0];
      console.log('productItem.linkedProducts?.length', productItem.linkedProducts?.length);
      console.log(productItem);
      if (productItem.linkedProducts?.length > 1) {
        store.setMultipleMatches(productItem.linkedProducts);
      } else {
        callback(records);
      }
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
