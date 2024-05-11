import mockNativeData from './mockNativeData';
const mockServerInfo = {
  env: 'sit',
  area: 'eu',
};
export default {
  buildTime: globalEnvConfig.buildTime,
  dev: import.meta.env.DEV,
  mockServerInfo,
  mockData: mockNativeData,
};
