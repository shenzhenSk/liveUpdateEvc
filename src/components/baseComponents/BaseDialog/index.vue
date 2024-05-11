<template>
  <div
    class="dialog-wrap"
    id="dialog"
    v-if="showSubMask"
    @click="closeDialog"
    :style="{ 'z-index': zIndex }"
  >
    <Overlay v-if="props.overlay" :show="props.show"></Overlay>
    <div class="dialog-content" :class="className" @click.stop="() => {}">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import Overlay from '@/components/baseComponents/Overlay/index.vue';
interface propType {
  show: boolean;
  overlay?: boolean;
  className?: string;
  zIndex?: number;
}
const props = withDefaults(defineProps<propType>(), {
  show: false,
  overlay: true,
  className: '',
  zIndex: 2000,
});
const showSubMask = computed(() => props.show);
const emit = defineEmits(['update:show', 'beforeClose']);

onBeforeUnmount(() => {
  closeDialog();
});

const closeDialog = () => {
  emit('beforeClose');
  emit('update:show', false);
};
</script>

<style lang="less" scoped>
.dialog-wrap {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1990;
  width: 100vw;
  height: 100vh;

  .dialog-content {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1993;
    width: 646px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 16px;
    transform: translate(-50%, -50%);
  }
}
</style>
