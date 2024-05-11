<template>
  <div class="item-search">
    <Search
      :code="input"
      @enterCallback="enterCallback"
      :separateTitle="$t('decollateLine.selectAProduct')"
    />
    <div class="list">
      <div class="no-data" v-if="!loading && !listData?.length">
        <div style="text-align: center">
          {{ `${$t('eventCount.list.emptyTopTips')} "${input}".` }}
          <br />
          {{ $t('eventCount.list.emptyBottomTips') }}
        </div>
      </div>
      <van-list
        v-else
        v-model:loading="loading"
        finished-text=" "
        :finished="finished"
        @load="loadMore"
      >
        <template v-for="(item, index) in listData" :key="index">
          <ProductListItem
            :itemInfo="item.itemBasicInfo"
            @click-handle="clickHandle(item)"
          ></ProductListItem>
        </template>
      </van-list>
    </div>
    <Help title="Help Topic Title" ref="helpRef"></Help>
  </div>
</template>

<script setup lang="ts">
import Search from '@/components/Search/index.vue';
import ProductListItem from '@/components/ProductListItem/index.vue';
import fetchApi from '@/service/api';
import NativeAPI from 'superapp-miniapp-invoke-native';
import { GlobalStore } from '@/stores';
import { $t } from '@/locale';
import { mixinsHook } from '@/hooks/nativeHook';
NativeAPI.communicatePlugins.setFabBtn([]);
NativeAPI.communicatePlugins.showTitle({ title: $t('pageTitle.searchResults') });

const route = useRoute();
const router = useRouter();
const store = GlobalStore();
//LinkedProducts dialog
// const showLinkedProductsDialog = ref(false);
//list loading
const loading = ref(false);
//list no more
const finished = ref(false);
//url参数
const { keyword = '' } = route.query;
//输入框变量
const input = ref<any>(keyword);
//列表数据
const listData = ref<Array<any>>([]);
//page参数
const page = {
  pageNum: 1,
  pageSize: 10,
  total: 0,
};
const helpRef = ref<any>(null);
//获取列表数据
async function getData() {
  const params = {
    ...page,
    keyword: input.value,
  };
  loading.value = true;
  try {
    const res: any = await fetchApi.search(params);
    const { records = [], totalRecords = 0, currentPage = 1 } = res.data || {};
    listData.value = [...listData.value, ...records];
    page.total = totalRecords;
    page.pageNum = currentPage;
    loading.value = false;
    finished.value = listData.value.length >= totalRecords;
  } catch (error: any) {
    console.log('error', error);
  } finally {
    loading.value = false;
  }
}
// getData();
//上拉加载
const loadMore = () => {
  page.pageNum += 1;
  getData();
};
//回车回调函数 enter callback
const enterCallback = (keyword: any) => {
  // input.value = barcode;
  // page.pageNum = 1;
  // listData.value = [];
  // getData();
  //更新URL上面的code参数，在详情页返回时才能保证code正确
  //update url params
  router.replace({ name: 'search', query: { keyword, time: new Date().getTime() } });
};
watch(
  route,
  (routeItem) => {
    const { keyword = '' } = routeItem.query;
    input.value = keyword;
    page.pageNum = 1;
    listData.value = [];
    finished.value = false;
    getData();
  },
  { deep: true, immediate: true },
);
//linkedProducts
// const linkedProducts = ref<Array<any>>([]);
//点击事件
const clickHandle = (item: any) => {
  if (item.linkedProducts?.length > 0) {
    // linkedProducts.value = item.linkedProducts;
    // showLinkedProductsDialog.value = true;
    store.setMultipleMatches(item.linkedProducts);
    return;
  }
  router.push({ name: 'product', query: { barcode: item.itemBasicInfo.barcode } });
};

//init laser back btn event
mixinsHook(onMounted, onBeforeMount, router, route, () => {
  helpRef.value?.closeDialog();
});
</script>

<style lang="less" scoped>
.item-search {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-bottom: 28px;

  .list {
    flex: 1;
    height: 100%;
    padding: 0 28px;
    overflow-y: auto;

    .no-data {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 24px;
      color: #5f6062;
    }
  }
}
</style>
