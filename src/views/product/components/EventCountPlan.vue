<template>
  <BaseDialog
    v-model:show="showDialog"
    className="my-dialog"
    :overlay="false"
    @beforeClose="emit('closeDialog')"
    :zIndex="1993"
  >
    <div class="plan-wrap">
      <div class="list">
        <van-list
          :offset="10"
          v-model:loading="loading"
          finished-text=""
          :finished="finished"
          @load="loadMore"
        >
          <template v-for="(item, index) in plansData" :key="index">
            <ListItem v-bind="$attrs" :detailData="prop.detailData" :item="item"></ListItem>
          </template>
        </van-list>
      </div>
      <div class="bottom">
        <div class="add-new-list-body">
          <div class="add-new-list-content">
            <div class="title" @click="planHandle">{{ $t('productPage.addNewList') }}</div>
            <div class="icon" @click="planHandle"><svg-icon name="general/add" /></div>
          </div>
        </div>
      </div>
    </div>
  </BaseDialog>
</template>

<script setup lang="ts">
import ListItem from './ListItem.vue';
import fetchApi from '@/service/api';
interface propType {
  detailData: any;
}
const prop = defineProps<propType>();
const loading = ref(false);
const finished = ref(false);
const params = {
  notInStatusList: 'COMPLETED',
  status: 'DRAFT',
  context: 'plan',
  sortRule: 'Descending',
  pageSize: 20,
  pageNum: 1,
};
//plans数据
const plansData = ref<Array<any>>([]);
const getPlansData = () => {
  loading.value = true;
  fetchApi.eventCountPlans(params).then((res: any) => {
    plansData.value = [...plansData.value, ...(res.data.eventCounts || [])];
    params.pageNum = res.data.currentPage;
    finished.value = plansData.value.length >= res.data.totalRecords;
    loading.value = false;
  });
};
getPlansData();
//load more
const loadMore = () => {
  params.pageNum += 1;
  getPlansData();
};
const emit = defineEmits(['planOrDetail', 'closeDialog']);
const planHandle = () => {
  emit('planOrDetail', true);
};
const showDialog = ref(true);
</script>
<style lang="less">
.my-dialog {
  top: 40px !important;
  transform: translate(-50%, 0) !important;
}
</style>
<style lang="less" scoped>
.plan-wrap {
  display: flex;
  flex-direction: column;
  height: 60vh;
  padding-top: 20px;
  background-color: #fff;

  .list {
    flex: 1;
    padding: 0 40px;
    overflow-y: auto;
  }

  .bottom {
    .add-new-list-body {
      box-sizing: border-box;
      width: 100%;
      height: 80px;
      padding-left: 16px;

      .add-new-list-content {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 100%;

        .title {
          display: flex;
          align-items: center;
          height: 100%;
          padding-right: 16px;
          font-size: 24px;
          font-weight: 400;
          line-height: 24px;
          color: #5f6062;
        }

        .icon {
          display: flex;
          align-items: center;
          width: 36px;
          height: 36px;
        }
      }
    }
  }
}
</style>
