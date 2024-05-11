<template>
  <div v-if="visible" class="alert-wrap">
    <Overlay v-if="props.overlay" :show="visible" @click="close"></Overlay>
    <div class="alert-content">
      <div class="alert-title" v-if="props.title">{{ props.title }}</div>
      <div class="alert-message" v-if="props.message" v-html="props.message"></div>
      <div class="alert-btn">
        <div class="btn btn-no" @click="close" v-if="false">
          <div class="icon">
            <SvgIcon name="general/close"></SvgIcon>
          </div>
          <div class="txt">{{ $t('btn.no') }}</div>
        </div>
        <div class="btn btn-yes" @click="close">
          <div class="icon">
            <SvgIcon name="general/check-single"></SvgIcon>
          </div>
          <div class="txt">{{ $t('btn.yes') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import NativeAPI from 'superapp-miniapp-invoke-native';
import Overlay from '@/components/baseComponents/Overlay/index.vue';
import { $t } from '@/locale';
const props = defineProps({
  // 实例信号
  show: {
    type: Boolean,
    default: false,
  },
  // 销毁实例
  remove: {
    type: Function,
    default: () => {},
  },
  // 组件默认值
  message: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  delay: {
    type: Number,
    default: 2000,
  },
  overlay: {
    type: Boolean,
    default: true,
  },
});

watch(
  () => props.show,
  (value) => {
    if (value) {
      nextTick(() => {
        if (props.overlay) {
          NativeAPI.communicatePlugins.showSubMask({ subMask: true });
        }
        visible.value = true;
      });
    }
  },
  { immediate: true },
);
const close = () => {
  visible.value = false;
  props.remove();
};
const visible = ref(false);
</script>

<style lang="less" scoped>
.alert-wrap {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1994;
  width: 100vw;
  height: 100vh;

  .alert-content {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1995;
    width: 400px;
    height: auto;
    padding: 30px;
    overflow: hidden;
    background: #f9eae8;
    border: 2px solid #e31836;
    border-radius: 16px;
    box-shadow: 0 3px 6px 1px rgb(0 0 0 / 30%);
    transform: translateX(-50%) translateY(-50%);

    .alert-title {
      padding-bottom: 30px;
      font-family: @font-family-medium;
      font-size: 28px;
      font-weight: 500;
      color: #e31836;
    }

    .alert-message {
      font-size: 24px;
      font-weight: 400;
      color: #5f6062;
    }

    .alert-btn {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding-top: 30px;

      .btn {
        display: flex;
        align-items: center;
        width: 140px;
        height: 60px;
        padding: 16px;
        background: rgb(220 31 29 / 10%);
        border: 1px solid #dc1f1d;
        border-radius: 12px;
        opacity: 1;

        .icon {
          display: flex;
          width: 28px;
          height: 28px;
        }

        .txt {
          padding-left: 20px;
          font-size: 28px;
          color: #5f6062;
        }
      }
    }
  }
}
</style>
