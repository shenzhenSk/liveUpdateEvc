<template>
  <div class="search-wrap">
    <div class="title">{{ $t('searchOrScan.title') }}</div>
    <div class="form">
      <div class="left-icon"><svg-icon name="general/magnifyingGlass" /></div>
      <div class="input">
        <van-field
          ref="editTitleEl"
          :placeholder="$t('searchOrScan.placeholder')"
          v-model="input"
          @keyup.enter="enterCallback"
          class="field"
        />
      </div>
      <div class="right-icon" @click="clickHandle">
        <svg-icon color="#5F6062" name="general/scan" />
      </div>
    </div>
    <Separate :title="prop.separateTitle || $t('decollateLine.orPickATask')"></Separate>
  </div>
</template>

<script setup lang="ts">
import NativeAPI from 'superapp-miniapp-invoke-native';
import { $t } from '@/locale';
import { laserScanCallback, type PluginResultData } from '@/hooks/laserScan';
//入参code:搜索框值；separateTitle:分割线标题
//Input parameter code: search box value; separateTitle: separator title
interface propType {
  code?: string;
  separateTitle?: string | null;
}
const prop = defineProps<propType>();
//触发回车事件回调
//Trigger enter event callback
const emit = defineEmits(['enterCallback']);

const input = ref<string>('');
watch(
  prop,
  (propItem: propType) => {
    input.value = propItem.code || '';
  },
  { deep: true, immediate: true },
);
const enterCallback = () => {
  emit('enterCallback', input.value);
};
const router = useRouter();
const route = useRoute();
//调用原生扫码
//Call native scan code
async function clickHandle() {
  const scanResult: any = await NativeAPI.cameraScanPlugins.pickCameraScan();
  laserScanCallback(scanResult as PluginResultData, router, route);
}
</script>

<style lang="less" scoped>
.search-wrap {
  box-sizing: border-box;
  width: 100%;
  padding: 32px 85px 5px;

  .form {
    box-sizing: border-box;
    display: flex;
    flex: 1;
    justify-content: space-between;
    height: 60px;

    .left-icon {
      display: flex;
      justify-content: center;
      width: 56px;
      height: 100%;
    }

    .right-icon {
      display: flex;
      justify-content: center;
      width: 70px;
      height: 100%;
    }

    .input {
      flex: 1;
      margin: 4px 20px 4px 10px;
      border-bottom: 1px solid rgb(95 96 98 / 100%);

      .field {
        width: 100%;
        height: 100%;
        padding: 0;
        background: rgb(29 97 122 / 10%);

        :deep(.van-field__body) {
          width: 100%;
          height: 100%;

          .van-field__control {
            width: 100%;
            height: 100%;
            padding-left: 16px;
            font-size: 24px;
          }
        }
      }
    }
  }

  .title {
    box-sizing: border-box;
    padding-bottom: 22px;
    font-family: 'Roboto Medium';
    font-size: 38px;
    color: #5f6062;
    letter-spacing: 0;
  }
}
</style>
