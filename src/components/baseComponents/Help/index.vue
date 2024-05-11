<template>
  <div class="help-icon" @click="showDialog = !showDialog">
    <SvgIcon name="general/help"></SvgIcon>
  </div>
  <BaseDialog v-model:show="showDialog">
    <div class="help-wrap">
      <div class="close-btn" @click="showDialog = !showDialog">
        <SvgIcon name="general/close"></SvgIcon>
      </div>
      <div class="dialog-top">
        <div class="title">{{ prop.title }}</div>
      </div>
      <div class="dialog-content">
        <slot></slot>
      </div>
    </div>
  </BaseDialog>
</template>

<script setup lang="ts">
interface propType {
  title?: string;
}
const prop = defineProps<propType>();
const showDialog = ref<boolean>(false);
const route = useRoute();
watch(
  route,
  () => {
    showDialog.value = false;
  },
  { immediate: true, deep: true },
);
const closeDialog = () => {
  showDialog.value = false;
};
defineExpose({
  closeDialog,
});
</script>
<style lang="less" scoped>
.help-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  width: 32px;
  height: 32px;
}

.help-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 64px);
  padding: 24px;
  text-align: justify;

  .dialog-top {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 12px;

    .title {
      display: flex;
      align-items: center;
      height: 40px;
      padding-left: 15px;
      font-family: @font-family-medium;
      font-size: 38px;
      line-height: 40px;
      color: #5f6062;
    }
  }

  .close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 1;
    display: flex;
    align-items: center;
    width: 24px;
    height: 24px;
  }

  .dialog-content {
    flex: 1;
    min-height: 100px;
    padding-top: 10px;
    overflow-y: auto;
    font-size: 24px;
    color: #5f6062;
  }
}
</style>
