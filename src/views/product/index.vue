<template>
  <div class="item">
    <ItemInfo :infoData="detailData"></ItemInfo>
    <div class="feature">
      <Separate :title="$t('decollateLine.pickATask')"></Separate>
      <Features ref="featureComponent" :detailData="detailData"></Features>
    </div>
    <Help title="Help Topic Title" ref="helpRef"></Help>
  </div>
</template>

<script setup lang="ts">
import ItemInfo from './components/ItemInfo.vue';
import Features from './components/Features.vue';
import fetchApi from '@/service/api';
import { showLoadingToast, closeToast } from 'vant';
import NativeAPI from 'superapp-miniapp-invoke-native';
import { $t } from '@/locale';
import { mixinsHook } from '@/hooks/nativeHook';
NativeAPI.communicatePlugins.showTitle({ title: $t('pageTitle.product') });
const route = useRoute();
const router = useRouter();
const { barcode } = route.query;
const featureComponent = ref<any>(null);
const helpRef = ref<any>(null);

//init laser back btn event
mixinsHook(onMounted, onBeforeMount, router, route, () => {
  helpRef.value?.closeDialog();
  featureComponent.value?.closeDialog();
});

//详情数据 get detail date
const detailData = ref<Array<any>>([{}]);
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .feature {
    padding: 0 60px 20px;
  }
}
</style>
