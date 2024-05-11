<template>
  <div class="separate">
    <div class="line"></div>
    <div class="content">{{ props.title }}</div>
    <div class="line"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
});
</script>

<style scoped lang="less">
.separate {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 30px 0;

  .line {
    flex: 1;
    border-bottom: 1px solid #5f6062;
    transform: translateY(-50%);
  }

  .content {
    padding: 0 30px;
    font-size: 24px;
    color: rgb(95 96 98 / 100%);
    white-space: nowrap;
  }
}
</style>
