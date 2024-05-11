<template>
  <svg aria-hidden="true" width="100%" height="100%" margin="0">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
// 注册svg-logo
import 'virtual:svg-icons-register';
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#000',
  },
});
const symbolId = computed(() => `#${props.prefix}/${props.name}`);
// 使用
// <SvgIcon name="view"></SvgIcon> ，会找到assets/icons/view.svg
// assets路径通过vite.config.ts设置
// svg转成vue组件使用，如下
// createSvgIconsPlugin({
//   iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
//   symbolId: 'icon-[dir]-[name]',
// }),
</script>
