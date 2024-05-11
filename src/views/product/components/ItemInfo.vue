<template>
  <div class="product-info-body">
    <div class="title">
      <div class="brand">{{ infoData?.itemBasicInfo?.itemBrand ?? '' }}</div>
      <div class="desc">{{ infoData?.itemBasicInfo?.itemDesc ?? 'N/A' }}</div>
    </div>
    <div class="image">
      <van-image class="image-item" :src="infoData?.itemBasicInfo?.productImg">
        <template v-slot:error>
          <van-icon class="image-icon-error" name="photo" />
        </template>
      </van-image>
    </div>
    <div class="price">
      <span
        v-if="
          infoData?.itemBasicInfo?.retailPrice ||
          infoData?.itemBasicInfo?.retailPrice === 0 ||
          infoData?.itemBasicInfo?.retailPrice === '0'
        "
      >
        {{ infoData?.itemBasicInfo?.currencySign }}
        {{ formatPrice(infoData?.itemBasicInfo?.retailPrice) }}
      </span>
      <span v-else> N/A </span>
    </div>
    <div class="info">
      <div class="row">
        <div
          class="left"
          v-if="infoData?.itemBasicInfo?.itemCode && infoData?.itemBasicInfo?.barcode"
        >
          {{ infoData?.itemBasicInfo?.itemCode ? infoData?.itemBasicInfo?.itemCode + '-' : '' }}
          {{
            infoData?.itemBasicInfo?.barcode
              ? ('***' + infoData?.itemBasicInfo?.barcode).replace(/.*(.{4}$)/, '***$1')
              : ''
          }}
        </div>
        <div v-else class="left">N/A</div>
        <div class="right">
          {{ $t('productInfo.promo') }}:{{ infoData?.itemBasicInfo?.promo ?? 'N/A' }}
        </div>
      </div>
      <div class="row">
        <div class="left">{{ infoData?.itemBasicInfo?.location || 'N/A' }}</div>
        <div class="right">
          {{ $t('productInfo.stock') }}
          {{ infoData.itemStockInfo?.stockOnHand ?? 'N/A' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatPrice } from '@/utils/filter';
interface propType {
  infoData: Array<any>;
}
const prop = defineProps<propType>();
const infoData = computed(() => prop.infoData?.[0] ?? {});
</script>

<style scoped lang="less">
.product-info-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  font-family: @font-family-medium;

  .title {
    display: inline-block;
    width: 96%;
    min-height: 53px;
    font-size: 40px;
    color: #5f6062;
    text-align: center;
    word-wrap: break-word;

    .desc {
      font-size: 35px;
    }
  }

  .image {
    width: 180px;
    height: 180px;
    margin: 10px;
    background-color: #fff;
    border: 1px solid #5f6062;
    border-radius: 0;
    opacity: 1;

    .image-item {
      width: 100%;
      height: 100%;
    }
  }

  .price {
    font-size: 32px;
    font-weight: bold;
    color: #5f6062;
  }

  .info {
    width: 100%;
    padding: 36px 86px 0;
    font-size: 28px;
    color: #5f6062;

    .row {
      display: flex;
      line-height: 40px;

      .left {
        flex: 1;
        padding-right: 10px;
        overflow: hidden;
      }

      .right {
        text-align: right;
      }
    }
  }
}

.image-icon-error {
  font-size: var(--van-image-loading-icon-size);
  color: var(--van-image-loading-icon-color);
}
</style>
