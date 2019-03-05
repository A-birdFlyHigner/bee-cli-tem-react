import { stringify } from 'qs';
import request from '@/utils/request';

const domain = '/adminApi';

export async function queryCommunityManager(params) {
  return request(`${domain}/community/list`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}