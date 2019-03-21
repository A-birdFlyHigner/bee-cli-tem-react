import request from '@/utils/request';
import { stringify } from 'qs';

const domain = '/api';

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

// 获取分公司城市
export async function queryBranchCityList(params) {
  return request(`${domain}/common/governing/cities`, {
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

export async function branchComUpdatePassword(data) {
  debugger
  return request(`${domain}/partner/updateBranchCompanyProxyAccountPassword`, {
    method: 'POST',
    body: {
      ...data
    }
  });
}

export async function shopUpdateAccountPassword(data) {
  return request(`${domain}/shop/updateAccountPassword`, {
    method: 'POST',
    body: {
      ...data
    }
  });
}