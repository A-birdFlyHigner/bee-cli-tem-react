import request from '@/utils/request';
import { stringify } from 'qs';

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

export async function queryCategoryList(params) {
  return request(`${domain}/revision/category/children?${stringify(params)}`);
}

export async function commomUploadPicture(data) {
  return request(`${domain}/common/uploadPicture`, {
    method: 'POST',
    body: data
  });
}