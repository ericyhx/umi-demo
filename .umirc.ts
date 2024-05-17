import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'Gensong',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
    {
      name: '中控',
      path: '/agv-main-controller',
      component: './agv-main-controller',
    },
  ],
  npmClient: 'pnpm',
  plugins: [
    // 开启插件
    '@umijs/max-plugin-openapi',
  ],
  openAPI: {
    // services 中导入的 request 配置
    requestLibPath: "import { request } from '@umijs/max';",
    // 使用相对路径或在线地址
    schemaPath: "http://localhost:9000/ds/v3/api-docs",
    // schemaPath: "default_OpenAPI.json",
    projectName: "ds"
  },
  proxy: {
    '/rm': {
      target: 'http://localhost:9000/ds',
      changeOrigin: true,
    },
    '/map': {
      target: 'http://localhost:9000/ds',
      changeOrigin: true,
    },
  },
});
