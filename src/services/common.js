import request from '@/utils/request';
import { stringify } from 'qs';

const domain = '/api';

// 省
export async function queryProvinceList(params) {
  return request(`${domain}/common/provinceList`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 市
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

// 区
export async function queryDistrictList(params) {
  return request(`${domain}/common/districtList`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 类目
export async function queryCategoryList(params) {
  return request(`${domain}/revision/category/children?${stringify(params)}`);
}

// 图片上传
export async function commomUploadPicture(data) {
  return request(`${domain}/common/uploadPicture`, {
    method: 'POST',
    body: data
  });
}

// 分公司更新密码
export async function branchComUpdatePassword(data) {
  return request(`${domain}/partner/updateBranchCompanyProxyAccountPassword`, {
    method: 'POST',
    body: {
      ...data
    }
  });
}

// 店铺更新密码
export async function shopUpdateAccountPassword(data) {
  return request(`${domain}/shop/updateAccountPassword`, {
    method: 'POST',
    body: {
      ...data
    }
  });
}

// 获取所有分公司
export async function getCompanyBranch(params) {
  return request(`${domain}/common/company/branch`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}