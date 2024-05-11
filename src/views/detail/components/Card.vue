<template>
  <div class="card-wrap">
    <div class="card-title">
      <div class="title">{{ props.title }}</div>
      <div class="icon" :class="{ open: show }" @click="show = !show">
        <SvgIcon name="general/arrow"></SvgIcon>
      </div>
    </div>
    <div class="card-content" v-show="show">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface propType {
  title: string;
  defaultShow?: boolean;
}
const props = defineProps<propType>();

const show = computed(() => props.defaultShow || false);
</script>

<style lang="less" scoped>
.card-wrap {
  width: 600px;
  margin: 0 auto;
  margin-bottom: 16px;
  border: 1px solid #5f6062;
  border-radius: 16px 16px 0 0;

  .card-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px;
    background: rgb(28 180 236 / 10%);

    .title {
      flex: 1;
      overflow: hidden;
      font-family: @font-family-medium;
      font-size: 24px;
      font-weight: 500;
      color: #5f6062;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 35px;
      transition: 0.3s;

      &.open {
        transform: rotateZ(180deg);
      }
    }
  }

  .card-content {
    box-sizing: border-box;
    padding: 10px;
    border-top: 1px solid #5f6062;
  }
}
</style>
