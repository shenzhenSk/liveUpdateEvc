<template>
  <div class="event-list-item">
    <div class="event-list-left">
      <div class="event-list-left-title">
        {{ prop.item?.description ?? 'N/A' }}
      </div>
      <div class="bottom">
        <div class="item">
          {{ prop.item?.itemQuantity ?? 'N/A' }}
          {{ $t('eventCount.list.items') }}
        </div>
        <div class="local">
          {{ searchLocalHandle(prop.item?.source) ?? 'N/A' }}
        </div>
        <div class="status">
          <div
            class="point"
            :style="`background:${
              prop.item?.status && searchEventItemStatusHandle(prop.item.status).color
            }`"
          ></div>
          <div>
            {{ prop.item?.status ? searchEventItemStatusHandle(prop.item.status).value : 'N/A' }}
          </div>
        </div>
      </div>
    </div>
    <div class="event-list-right">
      <!-- 跳转 -->
      <div class="arrow" @click="addPlan">
        <svg-icon style="transform: rotate(-90deg)" name="general/arrow" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import fetchApi from '@/service/api';
// import Alert from '@/components/baseComponents/BaseAlert';
import { showLoadingToast, closeToast } from 'vant';
import { $t } from '@/locale';
interface propType {
  item: any;
  detailData: any;
}
const prop = defineProps<propType>();
const emit = defineEmits(['closeDialog']);

const eventItemStatus: any = {
  // 已批准的
  COUNTING: {
    value: $t('eventCount.state.counting'),
    color: 'linear-gradient(162deg, #F0C472 0%, #E38518 100%);',
  },
  // 未批准的
  DRAFT: {
    value: $t('eventCount.state.draft'),
    color: 'linear-gradient(162deg, #F07285 0%, #E31836 100%);',
  },
  // 已完成
  INUSE: {
    value: $t('eventCount.state.inUse'),
    color: 'linear-gradient(162deg, #EDED72 0%, #E3C418 100%);',
  },
  // 新的
  READY: {
    value: $t('eventCount.state.ready'),
    color: 'linear-gradient(162deg, #7BED72 0%, #37E318 100%);',
  },
  REVIEWING: {
    value: $t('eventCount.state.reviewing'),
    color: 'linear-gradient(162deg, #7BED72 0%, #37E318 100%);',
  },
  COMPLETED: {
    value: $t('eventCount.state.completed'),
    color: 'linear-gradient(162deg, #7BED72 0%, #37E318 100%);',
  },
};
const searchEventItemStatusHandle = (value: string): any => {
  let target = '';
  Object.keys(eventItemStatus).forEach((item) => {
    if (value == item) {
      target = eventItemStatus[item];
    }
  });
  return target;
};
enum EventCountListAreaEum {
  LOCAL = 'Local',
  CENTRAL = 'Central',
}
const searchLocalHandle = (value: string): any => {
  switch (value) {
    case EventCountListAreaEum.LOCAL:
      return $t('eventCount.list.local');
    case EventCountListAreaEum.CENTRAL:
      return $t('eventCount.list.central');
    default:
      return '';
  }
};
async function addPlan() {
  const itemCode = prop.detailData?.[0]?.itemBasicInfo?.itemCode;
  const data = {
    codeType: '',
    transNum: new Date().getTime(),
    identifier: new Date().getTime(),
    keyword: itemCode,
    countId: prop.item?.countId,
    context: 'plan',
  };
  showLoadingToast({
    duration: 0,
    forbidClick: true,
    message: $t('common.loading'),
  });
  try {
    await fetchApi.eventCountAddPlans(data);
    // if (res.success) {
    emit('closeDialog');
    // } else {
    //   Alert({ message: res.errorMessage, overlay: false });
    // }
  } catch (error: any) {
    console.log(error);
  } finally {
    closeToast();
    emit('closeDialog');
  }
}
</script>

<style scoped lang="less">
.event-count-top {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 32px 60px;

  .title {
    width: 100%;
    height: 40px;
    padding-bottom: 32px;
    font-family: @font-family-medium;
    font-size: 40px;
    color: #5f6062;
  }

  .event-list {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 0;
    }

    &::-webkit-scrollbar-track {
      border-radius: 0;
    }
  }
}

.event-list-item {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 84px;
  padding: 13px 8px 13px 16px;
  margin-bottom: 12px;
  border: 1px solid #5f6062;
  border-radius: 16px;
  opacity: 1;

  .event-list-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .event-list-left-title {
      font-family: @font-family-medium;
      font-size: 20px;
      color: #5f6062;
      word-break: break-all;
    }

    .bottom {
      display: flex;
      height: 16px;
      font-family: @font-family-light;
      font-size: 16px;
      font-weight: 300;

      .item,
      .local {
        width: 150px;
        padding-right: 20px;
      }

      .status {
        display: flex;
        align-items: center;
        justify-content: center;

        .point {
          width: 8px;
          height: 8px;
          margin-right: 10px;
          border-radius: 50%;
        }
      }
    }
  }

  .event-list-right {
    display: flex;
    align-items: center;

    .arrow {
      display: flex;

      // margin-left: 4px;
      justify-content: center;
      width: 50px;
      height: 100%;
    }
  }
}

.tip-popover-content-self {
  font-family: @font-family-medium;
  font-size: 20px;
  color: #5f6062;
}
</style>
