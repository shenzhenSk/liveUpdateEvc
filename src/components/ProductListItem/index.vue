<template>
  <div class="product-list-item-body" @click="clickHandle">
    <div class="image">
      <van-image class="image-item" :src="prop.itemInfo.productImg">
        <template v-slot:error>
          <van-icon class="image-icon-error" name="photo" />
        </template>
      </van-image>
    </div>
    <div class="product-content">
      <div class="product-content-title">
        <span class="product-content-value">
          {{ prop.itemInfo.itemBrand ? prop.itemInfo.itemBrand : '' }}
          {{ prop.itemInfo.brandName ? prop.itemInfo.brandName : '' }}
          <br v-if="prop.itemInfo.itemBrand || prop.itemInfo.brandName" />
          {{ prop.itemInfo.itemDesc ?? '' }}
        </span>
      </div>
      <div class="info">
        <div class="number">
          <span v-if="prop.itemInfo.itemCode || prop.itemInfo.barcode">
            {{ prop.itemInfo.itemCode }}
            {{ prop.itemInfo.itemCode && prop.itemInfo.barcode ? ' - ' : '' }}
            {{
              prop.itemInfo.barcode
                ? ('***' + prop.itemInfo.barcode).replace(/.*(.{4}$)/, '***$1')
                : ''
            }}
          </span>
        </div>
        <div class="promo">
          {{ $t('productInfo.promo') }}:
          {{ prop.itemInfo.promo || 'N/A' }}
        </div>
      </div>
      <div class="other-info">
        <div class="right">
          <span v-if="prop.itemInfo.location">
            {{ prop.itemInfo.location }}
          </span>
          <span v-else>N/A</span>
        </div>
        <div class="left">
          <div class="ml">
            <span v-if="prop.itemInfo.content">
              {{ formatPrice(prop.itemInfo.content) }}
            </span>
            <span v-else>N/A</span>
          </div>
          <div class="price">
            <span
              v-if="
                prop.itemInfo.currencySign &&
                (prop.itemInfo.retailPrice || prop.itemInfo.retailPrice === 0)
              "
            >
              {{ prop.itemInfo.currencySign }}
              {{ formatPrice(prop.itemInfo.retailPrice) }}
            </span>
            <span v-else>N/A</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatPrice } from '@/utils/filter';
import { $t } from '@/locale';
interface propType {
  itemInfo: any;
}
const prop = defineProps<propType>();
const emit = defineEmits(['click-handle']);
const clickHandle = () => {
  emit('click-handle');
};
</script>

<style lang="less" scoped>
.product-list-item-body {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 120px;
  padding: 16px;
  margin-bottom: 12px;
  border: 1px solid #5f6062;
  border-radius: 16px;
  opacity: 1;

  .image {
    width: 84px;
    height: 84px;
    margin-top: 3px;
    background-color: #fff;
    border: 1px solid #5f6062;

    .image-item {
      width: 100%;
      height: 100%;
    }
  }

  .product-content {
    box-sizing: border-box;
    width: calc(100% - 84px);
    height: 100%;
    padding-left: 24px;

    .product-content-title {
      min-height: 37px;
      padding-bottom: 8px;
      font-family: @font-family-medium;
      font-size: 26px;
      color: #5f6062;

      // overflow: hidden;
      // text-overflow: ellipsis;
      // white-space: nowrap;

      .product-content-value {
        letter-spacing: 0;
        word-break: break-word;

        // display: inline-block;
        // width: 100%;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
      }

      .product-content-icon {
        display: flex;
        flex: 1;
        justify-content: flex-end;

        // align-items: center;
        .icon {
          display: flex;
          justify-content: center;
          width: 30px;
          height: 30px;
        }
      }
    }

    .product-content-title-delete {
      display: flex;
      justify-content: space-between;

      .product-content-value {
        max-width: 90%;
        letter-spacing: 0;
        word-break: break-word;

        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
      }
    }

    .info,
    .other-info {
      display: flex;
      justify-content: space-between;
      height: 26px;
      font-family: @font-family-medium;
      font-size: 20px;
      color: #5f6062;
    }

    .info {
      .number {
        flex: 1;
        margin-right: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .other-info {
      .right {
        width: 60%;
      }

      .left {
        display: flex;
        flex: 1;
        justify-content: space-between;
      }
    }
  }
}
</style>
