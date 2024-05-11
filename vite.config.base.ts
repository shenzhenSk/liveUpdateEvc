import { fileURLToPath, URL } from 'node:url';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { visualizer } from 'rollup-plugin-visualizer';
import AutoImport from 'unplugin-auto-import/vite';
import AutoImportComponents from 'unplugin-vue-components/vite';
// import viteCompression from 'vite-plugin-compression';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import pxtorem from 'postcss-pxtorem';
// Vant组件库
import { VantResolver } from 'unplugin-vue-components/resolvers';
import type { UserConfig } from 'vite';
export default {
  plugins: [
    vue(),
    vueJsx(),
    // 分析,参考https://github.com/btd/rollup-plugin-visualizer
    // 执行npm run build时，会自动打开stats.html页面
    visualizer({
      emitFile: false,
      filename: 'stats.html', //分析图生成的文件名
      open: false, //如果存在本地服务端口，将在打包后自动展示
    }),
    // APIs自动导入，参考https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [],
      // 根目录下自动生成自动导入的文件auto-imports.d.ts
      dts: './src/auto-imports/api.d.ts',
      // Generate corresponding .eslintrc-auto-import.json file.
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
    // 按需自动引入组件，参考https://github.com/antfu/unplugin-vue-components
    AutoImportComponents({
      resolvers: [VantResolver()],
      dts: './src/auto-imports/components.d.ts',
    }),
    // 生成gzip文件
    // viteCompression(),

    // svg转成vue组件使用
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon/[dir]/[name]',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // css
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // 导入less的全局变量
        additionalData: `@import "${path.resolve(__dirname, '/src/assets/css/variable.less')}";`,
      },
    },
    postcss: {
      plugins: [
        pxtorem({
          rootValue({ file }: any) {
            return file.indexOf('vant') !== -1 ? 37.5 : 72;
          },
          propList: ['*'],
          selectorBlackList: [],
        }),
      ],
    },
  },
  // 本地服务配置
  // server的参数配置：https://cn.vitejs.dev/config/server-options.html
  server: {
    // IP,default->localhost
    // 设置为0.0.0.0，允许局域网内访问
    host: '0.0.0.0',
    // 端口，default->5173
    // 开发默认使用3100端口，需要使用RBAC环境数据时，才使用3000
    port: 3000,
    // 自动从浏览器打开
    open: true,
    // 端口被占用时，是否直接退出
    strictPort: false,
    proxy: {
      // '/v1': 'http://sdes.dep.dev.sz.aswatson.net',
      '/v1': 'https://osp.sit.ms.eu.aswatson.net',
      // '/osp': 'http://10.32.224.52:30516',
      '/osp': 'https://sit.api.apac.aswatson.net',
      '/asw': 'https://osp.sit.ms.eu.aswatson.net',
    },
  },
  // 打包选项,参考https://vitejs.dev/config/build-options.html
  build: {
    // 打包后的存放路径，默认就是dist
    outDir: 'dist',
    // 打包后表态资源存放路径，默认就是assets
    assetsDir: 'assets',
    // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求,设置为0可禁用
    // 默认4096
    assetsInlineLimit: 4096,
    // 设置为false，禁用css代码拆分，全部融合到一个CSS(特别是小项目)
    // 默认为true
    cssCodeSplit: false,
    // 打包时，复制public中的文件到outDir（即dist目录）
    copyPublicDir: true,

    // 消除打包文件超过500KB的告警，最大允许1M
    chunkSizeWarningLimit: 10000,
    // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
    // terser比esbuild压缩的更小，其次可附带其他参数，如去掉注释
    // 使用terser，需要安装terser依赖
    minify: 'terser',
    // 在打包代码时移除 console.log、debugger 和 注释
    // 参考；https://terser.org/docs/api-reference#minify-options
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true,
        // 只删除console.log，保留其他如console.info
        // pure_funcs: ['console.log'],
      },
      format: {
        comments: false,
      },
    },
    // rollupOptions,参考https://rollupjs.org/configuration-options/
    rollupOptions: {
      // 打包后的文件名
      output: {
        // 处理表态文件，如css，图片,svg
        // [ext]文件后缀，不包含点(.)，[extname]文件名后缀，包含点(.),[hash]文件内容的Hash值,[name]原文件名，不包含后缀
        assetFileNames: 'assets/[ext]/[hash].[ext]',
        // 处理JS
        // [format]格式，[hash]文件内容的Hash值,[name]原文件名，不包含后缀
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        // 手动分包，解决chunk碎片太多的问题，避免太多的js
        // 默认情况下，一个vue页面会产生一个js
        // 如下，非css的node_modules依赖生成一个js,其他的合并生成一个js(对于小项目来说，完全可这样做，甚至直接生成一个js即可)
        manualChunks(id: any, { getModuleInfo: _getModuleInfo }) {
          const cssLangs = `\\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\\?)`;
          const cssLangRE = new RegExp(cssLangs);
          const isCSSRequest = (request: string): boolean => cssLangRE.test(request);
          // 分vendor包
          if (id.includes('node_modules') && !isCSSRequest(id)) {
            return 'vendor';
          }
          return 'manifest';
        },
      },
    },
  },
} as UserConfig;
