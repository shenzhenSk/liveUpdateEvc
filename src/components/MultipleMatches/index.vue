<template>
  <BaseDialog v-bind:show="showMultipleMatchesDialog" @beforeClose="closeDialog">
    <div class="linked-products">
      <div class="title">{{ $t('tipPopover.multipleMatches') }}</div>
      <div class="text">{{ $t('tipPopover.multipleProduct.returnMatches') }}</div>
      <div class="text">{{ $t('tipPopover.multipleProduct.selectItem') }}</div>
      <div class="list">
        <template v-for="(item, index) in multipleMatches" :key="index">
          <ProductListItem
            :itemInfo="item"
            @click-handle="linkedProductsClickHandle(item)"
          ></ProductListItem>
        </template>
      </div>
    </div>
  </BaseDialog>
</template>

<script setup lang="ts">
import ProductListItem from '@/components/ProductListItem/index.vue';
import { $t } from '@/locale';
import { GlobalStore } from '@/stores';
const route = useRoute();
const router = useRouter();
const store = GlobalStore();

//LinkedProducts dialog
const showMultipleMatchesDialog = ref(false);
const multipleMatches = computed(() => store.multipleMatches);
watch(
  multipleMatches,
  (val) => {
    showMultipleMatchesDialog.value = !!val.length;
  },
  { deep: true, immediate: true },
);

//linkedProducts点击事件
const linkedProductsClickHandle = (item: any) => {
  store.setMultipleMatches([]);
  if (route.name == 'product') {
    router.replace({ name: 'product', query: { barcode: item.barcode || item.itemCode } });
  } else {
    router.push({ name: 'product', query: { barcode: item.barcode || item.itemCode } });
  }
};
const closeDialog = () => {
  store.setMultipleMatches([]);
};
</script>

<style lang="less" scoped>
.linked-products {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-items: center;
  padding: 24px;
  background-color: #eaf7fc;
  border: 2px solid #1cb4ec;
  border-radius: inherit;
  box-shadow: 0 3px 6px 1px rgb(0 0 0 / 30%);

  .title {
    width: 100%;
    padding-bottom: 16px;
    overflow: hidden;
    font-family: @font-family-medium;
    font-size: 24px;
    line-height: 40px;
    color: #5f6062;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .text {
    width: 100%;
    padding-bottom: 16px;
    font-size: 20px;
    font-weight: 400;
    color: #5f6062;
  }

  .list {
    max-height: 70vh;
    overflow-y: auto;
  }
}
</style>
