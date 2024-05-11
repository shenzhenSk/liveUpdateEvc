import type { UserConfigExport, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import { createHtmlPlugin } from 'vite-plugin-html';
import { mergeConfig } from 'vite';
import viteConfigBase from './vite.config.base';
import { timeFormatSeconds } from './src/utils/timeFormatSeconds';

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  //环境变量
  const env = loadEnv(mode, process.cwd());

  const globalConfig: any = {
    define: {
      globalEnvConfig: {
        buildTime: timeFormatSeconds(new Date(), 'buildDay'),
      },
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
    },
  };

  return {
    ...globalConfig,
    ...mergeConfig(viteConfigBase, {
      plugins: [
        // 引入mock数据插件，参考https://github.com/vbenjs/vite-plugin-mock
        viteMockServe({
          // mock数据文件存放的文件夹，相对于项目根目录
          mockPath: './mock',
          localEnabled: command === 'serve',
        }),
        createHtmlPlugin({
          // minify使用了：vite-plugin-html->html-minifier-terser
          // 参数参考：https://www.npmjs.com/package/html-minifier-terser
          minify: {
            // 保留html里的注释
            removeComments: false,
          },
          inject: {
            data: {
              ...env,
              injectScript: `xxx`,
            },
          },
        }),
      ],
    }),
  };
};
