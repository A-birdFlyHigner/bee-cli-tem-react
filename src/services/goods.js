import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryCommunityManager(mobile) {
  return request(`/api/goods/spread/list?mobile=${mobile}`);
}
