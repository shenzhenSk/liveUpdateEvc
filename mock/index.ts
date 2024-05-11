import { MockMethod } from 'vite-plugin-mock';
import apis from './api';
import config from './config';

// 基本路径前缀
const basePrefix = config.URL_BASE_PREFIX;

apis.forEach((item) => {
  item.url = basePrefix + item.url;
});

export default [...apis] as MockMethod[];
