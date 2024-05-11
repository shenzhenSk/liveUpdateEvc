<template>
  <div class="card-content">
    <table>
      <tr v-for="item in props.data" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.value }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
interface propsType {
  data: Array<{ name: string; value: any }>;
}
const props = defineProps<propsType>();
</script>

<style lang="less" scoped>
.card-content {
  font-family: Roboto-Light, Roboto;
  font-size: 16px;
  font-weight: 300;
  color: #5f6062;

  table {
    width: 100%;

    td {
      width: 50%;
    }
  }
}
</style>
