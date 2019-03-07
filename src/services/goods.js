import { stringify } from 'qs';
import request from '@/utils/request';
const domain = '/adminApi';

export async function queryCommunityManager(params) {
  return request(`${domain}/refund/list`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function queryProductDetail(params) {
  return request(`${domain}/community/list`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}