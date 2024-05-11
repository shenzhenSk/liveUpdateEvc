import { MockMethod } from 'vite-plugin-mock';
import { readJson } from '../../utils/readJson';
const baseUrl = './mock/api/rbac';

export default [
  // 获取token
  {
    url: '/api/rbac/oauth/token',
    method: 'post',
    response: readJson('./data/token.json', baseUrl),
  },

  // 获取用户信息
  {
    url: '/api/authorization/admin/user',
    method: 'get',
    response: readJson('./data/userInfo.json', baseUrl),
  },

  // 获取BU列表
  {
    url: '/api/authorization/admin/user/tenant_privileges/:app_client_id',
    method: 'get',
    response: readJson('./data/buList.json', baseUrl),
  },

  // 获取权限列表
  {
    url: '/api/authorization/admin/user/menus',
    method: 'get',
    response: readJson('./data/menus.json', baseUrl),
  },
] as MockMethod[];
