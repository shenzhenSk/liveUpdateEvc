<template>
  <div v-if="visible" class="toast-wrap">
    <Overlay v-if="props.overlay" :show="visible"></Overlay>
    <div class="toast-content">
      <div class="toast-title" v-if="props.title">{{ props.title }}</div>
      <div class="toast-message" v-if="props.message">{{ props.message }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Overlay from '@/components/baseComponents/Overlay/index.vue';
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
        visible.value = true;
        start();
      });
    }
  },
  { immediate: true },
);

const visible = ref(false);
const timer = ref<any>(0);
const start = () => {
  timer.value = setTimeout(() => {
    visible.value = false;
    clearTimer();
    props.remove();
  }, props.delay);
};

const clearTimer = () => {
  timer.value = 0;
};

onUnmounted(() => {
  clearTimer();
});
</script>
<style lang="less" scoped>
.toast-wrap {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1990;
  width: 100vw;
  height: 100vh;

  .toast-content {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1992;
    width: 400px;
    height: auto;
    padding: 40px;
    overflow: hidden;
    background: #f9eae8;
    border: 2px solid #e31836;
    border-radius: 16px;
    box-shadow: 0 3px 6px 1px rgb(0 0 0 / 30%);
    transform: translateX(-50%) translateY(-50%);

    .toast-title {
      padding-bottom: 40px;
      font-family: @font-family-medium;
      font-size: 28px;
      font-weight: 500;
      color: #5f6062;
      text-align: center;
    }

    .toast-message {
      font-size: 24px;
      font-weight: 400;
      color: #5f6062;
    }
  }
}
</style>
