<template>
  <div class="home">
    <Search @enterCallback="enterCallback" />
    <div class="menus">
      <ul class="menu-list">
        <template v-for="(item, index) in menus" :key="item.name">
          <li class="menu-item" :data-ref="'menu' + index" @click="clickHandle(item)">
            <div ref="featureItemEl" />
            <div class="menu-item-touch" />
            <div class="icon">
              <SvgIcon :name="'general/' + item.code.replace(/\//g, '-')"></SvgIcon>
            </div>
            <div class="title">{{ item.name }}</div>
          </li>
        </template>
        <li class="menu-item empty"></li>
        <li class="menu-item empty"></li>
        <li class="menu-item empty"></li>
        <li class="menu-item empty"></li>
        <li class="menu-item empty"></li>
        <li class="menu-item empty"></li>
        <li class="menu-item empty"></li>
        <li class="menu-item empty"></li>
      </ul>
    </div>
    <Help title="Help Topic Title" ref="helpRef"></Help>
  </div>
</template>

<script setup lang="ts">
import Search from '@/components/Search/index.vue';
import Alert from '@/components/baseComponents/BaseAlert';
import NativeAPI from 'superapp-miniapp-invoke-native';
import { GlobalStore } from '@/stores';
import { mixinsHook } from '@/hooks/nativeHook';

const route = useRoute();
const router = useRouter();
const { id } = route.params;
console.log('route.params', id);

const helpRef = ref<any>(null);

const store = GlobalStore();
// get current menu by parent id
const menus = computed(() => {
  if (store.userInfo?.menus?.length) {
    return store.userInfo.menus.filter((item: any) => {
      if (item.id == id) {
        NativeAPI.communicatePlugins.showTitle({ title: item.name + ' Menu' });
      }
      return item.parent_id == id;
    });
  }
  return [];
});
console.log(menus);

NativeAPI.communicatePlugins.setFabBtn([]);

//input enter handle
const enterCallback = (value: any) => {
  router.push({ name: 'search', query: { keyword: value } });
};

const clickHandle = (item: any) => {
  if (item.hasChildren) {
    router.push({ name: 'menu', params: { id: item.id } });
  } else {
    if (item.code.indexOf('@') > -1) {
      const [code, path] = item.code.split('@');
      const params = { name: code, value: path };
      NativeAPI.communicatePlugins.openMiniApp({ miniApp: code, params: JSON.stringify(params) });
    } else {
      NativeAPI.communicatePlugins.openMiniApp({ miniApp: item.code });
    }
  }
};
//init laser back btn event
mixinsHook(onMounted, onBeforeMount, router, route, () => {
  helpRef.value?.closeDialog();
  Alert.close();
});
</script>

<style lang="less" scoped>
.home {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .menus {
    box-sizing: border-box;
    flex: 1;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    .menu-list {
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
      padding: 0 25px 25px;
      overflow-x: hidden;
      overflow-y: hidden;

      .menu-item {
        position: relative;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 245px;
        height: 100px;
        padding: 0 0 10px;
        margin: 0 25px 40px;
        background: #fff;
        border: 1px solid #1d617a;
        border-radius: 12px;
        opacity: 1;

        &.empty {
          height: 0;
          opacity: 0;
        }

        .menu-item-touch {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .icon {
          display: flex;
          justify-content: center;
          width: 48px;
          height: 48px;

          img {
            width: 64px;
            height: 64px;
          }
        }

        .title {
          padding-top: 8px;
          font-size: 20px;
          font-weight: 400;
          line-height: 20px;
          color: #5f6062;
          text-align: center;
          letter-spacing: 0;
        }
      }
    }
  }
}
</style>
