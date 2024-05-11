<template>
  <div class="dialog-overlay" v-if="props.show"></div>
</template>

<script setup lang="ts">
import NativeAPI from 'superapp-miniapp-invoke-native';

type propType = {
  show: boolean;
};
const props = defineProps<propType>();
const emit = defineEmits(['closeCallback']);
watch(
  props,
  () => {
    // 通知原生应用显示遮罩层
    //Notify the native application to display the mask layer
    NativeAPI.communicatePlugins.showSubMask({ subMask: props.show });
    if (!props.show) {
      emit('closeCallback');
    }
  },
  { immediate: true, deep: true },
);
onBeforeUnmount(() => {
  NativeAPI.communicatePlugins.showSubMask({ subMask: false });
});
</script>
<style lang="less" scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0 0 0 / 38%);
}
</style>
