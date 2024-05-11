<template>
  <div class="main-body">
    <div class="not-found-body">{{ $t('pageTitle.notFound') }}</div>
  </div>
</template>

<script setup lang="ts">
import NativeAPI from 'superapp-miniapp-invoke-native';
import { $t } from '@/locale';
//setting fabMenu
NativeAPI.communicatePlugins.setFabBtn([]);
//show title
NativeAPI.communicatePlugins.showTitle({ title: $t('pageTitle.notFound') });
</script>

<style scoped lang="less">
.main-body {
  width: 100%;
  height: 100%;
  background: #fff;

  .not-found-body {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
}
</style>
