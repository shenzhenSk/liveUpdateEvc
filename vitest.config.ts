import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import viteConfigBase from './vite.config.base';
import type { UserConfig } from 'vite';

const vitestConfig: UserConfig = {
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/*'],
    root: fileURLToPath(new URL('./', import.meta.url)),
    // integrate vant ui framework
    deps: {
      inline: ['vant'],
    },
  },
};

export default mergeConfig(viteConfigBase, vitestConfig);
