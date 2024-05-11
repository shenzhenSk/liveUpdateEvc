<template>
  <div class="feature-body" ref="featureEl">
    <ul class="feature-content">
      <li class="feature-item" :style="{ opacity: 0.5 }" @click="notOpenYetToast">
        <div class="icon"><svg-icon name="general/expand" /></div>
        <div class="title">{{ $t('productPage.moreDetails') }}</div>
      </li>
      <li class="feature-item" @click="showChildrenBtn = true">
        <div class="icon"><svg-icon name="general/add" /></div>
        <div class="title">{{ $t('productPage.addToList') }}</div>
        <div class="children-btn-wrap" v-show="showChildrenBtn">
          <div v-if="eventCountPermission" class="btn" @click="planOrDetail()">
            {{ $t('productPage.event') }}
          </div>
          <div class="btn" @click.stop="notOpenYetToast">{{ $t('productPage.gap') }}</div>
        </div>
      </li>
      <li class="feature-item" :style="{ opacity: 0.5 }" @click="notOpenYetToast">
        <div class="icon"><svg-icon name="general/basket" /></div>
        <div class="title">{{ $t('productPage.addToBasket') }}</div>
      </li>
      <li class="feature-item" :style="{ opacity: 0.5 }" @click="notOpenYetToast">
        <div class="icon"><svg-icon name="general/star" /></div>
        <div class="title">{{ $t('common.yetAnotherTask') }}</div>
      </li>
    </ul>
    <EventCountPlan
      v-if="showEventCounts"
      :detailData="detailData"
      @closeDialog="closeDialog"
      @planOrDetail="planOrDetail"
    ></EventCountPlan>
    <Overlay :show="showChildrenBtn" @click="closeDialog" />
  </div>
</template>

<script setup lang="ts">
import fetchApi from '@/service/api';
import EventCountPlan from './EventCountPlan.vue';
import icons from '@/utils/base64Icon';
import { showFailToast } from 'vant';
import NativeAPI from 'superapp-miniapp-invoke-native';
import { GlobalStore } from '@/stores';
import { $t } from '@/locale';
import Overlay from '@/components/baseComponents/Overlay/index.vue';
import Alert from '@/components/baseComponents/BaseAlert';

interface propType {
  detailData: any;
}
const prop = defineProps<propType>();
const store = GlobalStore();

const eventCountPermission = computed(() => {
  const menus: Array<any> = store.userInfo?.menus ?? [];
  const eventCount = menus.filter((item) => item.code === 'osp-superapp-event-count');
  return !!eventCount.length;
});
// show feature children menu
const showChildrenBtn = ref(false);

const notOpenYetToast = () => {
  Alert.close();
  closeDialog();
  showFailToast({
    message: $t('toast.notOpenYet'),
  });
};
const todoList = () => {
  Alert.close();
  store.setMultipleMatches([]);
  showChildrenBtn.value = true;
};
const fabMenu: Array<any> = [
  {
    icon: icons.moreDetail,
    id: '1',
    title: $t('fabButton.moreDetails'),
    fn: notOpenYetToast,
  },
  { icon: icons.addToList, id: '2', title: $t('fabButton.addToList'), fn: todoList },
  {
    icon: icons.addToBasket,
    id: '3',
    title: $t('fabButton.addToBasket'),
    fn: notOpenYetToast,
  },
  {
    icon: icons.others,
    id: '4',
    title: $t('fabButton.yetAnotherTask'),
    fn: notOpenYetToast,
  },
  {
    icon: icons.others,
    id: '5',
    title: $t('fabButton.otherTask'),
    fn: notOpenYetToast,
  },
];
NativeAPI.communicatePlugins.setFabBtn(fabMenu);

onBeforeRouteLeave(() => {
  NativeAPI.communicatePlugins.setFabBtn([]);
});

//plans数据
const eventCounts = ref(0);
const getPlansData = () => {
  const params = {
    notInStatusList: 'COMPLETED',
    status: 'DRAFT',
    context: 'plan',
    sortRule: 'Descending',
    pageSize: 20,
    pageNum: 1,
  };
  fetchApi
    .eventCountPlans(params)
    .then((res: any) => {
      eventCounts.value = res.data.totalRecords || 0;
    })
    .catch((error) => {
      console.log(error);
    });
};
getPlansData();
//showEventCounts
const showEventCounts = ref(false);
const planOrDetail = (gotoPage = false) => {
  if (!gotoPage && eventCounts.value > 0) {
    showEventCounts.value = true;
  } else {
    const params = {
      routeName: 'eventCount-NewList-Search',
      params: {
        itemCode: prop.detailData[0]?.itemBasicInfo?.itemCode,
        barcode: prop.detailData[0]?.itemBasicInfo?.barcode,
      },
    };
    closeDialog();

    NativeAPI.communicatePlugins.openMiniApp({
      miniApp: 'osp-superapp-event-count',
      params: JSON.stringify(params),
    });
    // notOpenYetToast();
  }
};
//close Dialog
const closeDialog = () => {
  showEventCounts.value = false;
  showChildrenBtn.value = false;
};

const route = useRoute();

watch(
  route,
  () => {
    closeDialog();
  },
  { immediate: true, deep: true },
);

defineExpose({
  closeDialog,
});
</script>

<style scoped lang="less">
.feature-body {
  box-sizing: border-box;
  width: 100%;

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 30%);
  }

  .feature-content {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(auto-fill, 46%);
    justify-content: space-between;
    width: 100%;

    .feature-item {
      position: relative;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 110px;
      padding: 10px 0;
      margin-bottom: 30px;
      background: #fff;
      border: 1px solid #1d617a;
      border-radius: 12px;
      opacity: 1;

      .children-btn-wrap {
        position: absolute;
        bottom: 120px;
        left: 50%;
        z-index: 1991;
        transform: translateX(-50%);

        .btn {
          width: 205px;
          height: 60px;
          margin-bottom: 4px;
          font-size: 24px;
          line-height: 60px;
          color: #5f6062;
          text-align: center;
          background: #e8eff1;
          border: 1px solid #1d617a;
          border-radius: 12px;
          opacity: 1;
        }
      }

      .icon {
        display: flex;
        justify-content: center;
        width: 48px;
        height: 48px;
      }

      .title {
        padding-top: 8px;
        font-size: 20px;
        font-weight: 400;
        line-height: 20px;
        color: #5f6062;
        text-align: center;
        letter-spacing: 0;
      }
    }
  }
}
</style>
