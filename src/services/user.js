// import { stringify } from 'qs'
import request from '@/utils/request';

const domain = '/api';

export async function query() {
  return '1';
}

export async function queryCurrent() {
  return '3';
}

// 获取管理后台菜单
export async function getUserInfoNew (params) {
  return request(`${domain}/user/userNew`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}