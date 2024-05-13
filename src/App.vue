<template>
  <div class="app-body">
    <div class="app-content" :key="refreshKey">
      <MultipleMatches></MultipleMatches>
      <RouterView v-if="loadedKongToken" />
    </div>
  </div>
</template>
<script setup lang="ts">
import MultipleMatches from '@/components/MultipleMatches/index.vue';
import { GlobalStore } from '@/stores';
import { initRBACInfo, redirectPage } from '@/hooks/nativeHook';

const store = GlobalStore();
const router = useRouter();
const route = useRoute();
const refreshKey = computed(() => store.refreshKey);
const loadedKongToken = computed(() => store.loadedKongToken);
const hasMounted = ref(false);
onMounted(() => {
  hasMounted.value = true;
});

// init the base data(userInfo,language,bu,store,menu) from native
async function initBaseInfo() {
  await initRBACInfo();
}
initBaseInfo();
//After the initialization is complete, call redirectPage, if you need to jump。
const unWatch = watch(
  route,
  () => {
    // jump to the target page
    redirectPage(router);
    unWatch();
  },
  { deep: true },
);
</script>

<style scoped lang="less">
.app-body {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: 32px;
  background: linear-gradient(180deg, rgb(29 97 122 / 30%) 0%, rgb(29 97 122 / 80%) 100%);

  .app-content {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background: #fff;
    border: 1px solid #5f6062;
    border-radius: 15px;
  }
}
</style>
