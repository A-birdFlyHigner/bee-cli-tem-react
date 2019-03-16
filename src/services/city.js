import request from '@/utils/request';
import { stringify } from 'qs'

const domain = '/api';

export async function queryCityManager(params) {
  return request(`${domain}/city/manager/query`, {
    method: 'POST',
    body: params,
  });
}