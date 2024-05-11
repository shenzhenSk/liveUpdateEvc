<template>
  <div class="item">
    <ItemInfo :infoData="detailData"></ItemInfo>
    <Card title="Test test test test" :defaultShow="true">
      <CardContent :data="cardData"></CardContent>
    </Card>
    <Card title="Test test test test" :defaultShow="true">
      <CardContent :data="cardData"></CardContent>
    </Card>
    <Card title="Test test test test">
      <CardContent :data="cardData"></CardContent>
    </Card>
    <Card title="Test test test test">
      <CardContent :data="cardData"></CardContent>
    </Card>
    <Help title="Help Topic Title"></Help>
  </div>
</template>

<script setup lang="ts">
import ItemInfo from './components/ItemInfo.vue';
import fetchApi from '@/service/api';
import { showLoadingToast, closeToast } from 'vant';
import NativeAPI from 'superapp-miniapp-invoke-native';
import Card from './components/Card.vue';
import CardContent from './components/CardContent.vue';
import { $t } from '@/locale';
NativeAPI.communicatePlugins.showTitle({ title: $t('pageTitle.product') });

const route = useRoute();
const { barcode } = route.query;
//详情数据 get detail date
const detailData = ref<Array<any>>([{}]);
const cardData = [
  { name: 'SKU', value: '2659441' },
  { name: 'EAN (primary)', value: '871917944316' },
  { name: 'Brand', value: 'Aquafresh' },
  { name: 'Description', value: 'TP Coolmint' },
];
async function getData(param = {} as any) {
  const params = { keyword: barcode, pageSize: 20, pageNum: 1, ...param };
  showLoadingToast({
    duration: 0,
    forbidClick: true,
    message: $t('common.loading'),
  });
  try {
    const res: any = await fetchApi.search(params);
    detailData.value = res.data.records;
  } catch (error: any) {
    console.log(error);
  } finally {
    closeToast();
  }
}
watch(
  route,
  (routeItem: any) => {
    const { barcode } = routeItem.query;
    const params = { keyword: barcode, pageSize: 20, pageNum: 1 };
    getData(params);
  },
  { immediate: true },
);
</script>

<style lang="less" scoped>
.item {
  position: relative;
  height: 100%;

  .feature {
    padding: 0 60px 20px;
  }
}
</style>
