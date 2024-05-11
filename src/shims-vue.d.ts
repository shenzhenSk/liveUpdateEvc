declare let globalEnvConfig: any;
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module '*.json' {
  const value: any;
  export default value;
}
