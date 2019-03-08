import { stringify } from 'qs';
import request from '@/utils/request';
const domain = '/adminApi';

export async function queryProvinceList(params) {
  return request(`${domain}/common/provinceList`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function queryCityList(params) {
  return request(`${domain}/common/cityList`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function queryDistrictList(params) {
  return request(`${domain}/common/districtList`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}