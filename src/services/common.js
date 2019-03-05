import { stringify } from 'qs';
import request from '@/utils/request';
const domain = 'http://test-life-admin.51bushou.com/api';

export async function queryProvinceList(params) {
  return request(`${domain}/common/provinceList`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function queryCityList(mobile) {
  return request(`/api/common/city?province=${mobile}`);
}

export async function queryDistrictList(mobile) {
  return request(`/api/common/district?city=${mobile}`);
}
