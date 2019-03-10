import { stringify } from 'qs'
import request from '@/utils/request';

const domain = '/adminApi';

// 获取指定类目的属性
export async function queryCategoryPropertyDetail (params) {
  return request(`http://192.168.0.220:10002/api/revision/category/property/detail?${stringify(params)}`);
}

export async function savePropertyValue (params) {
  return request(`http://test-life-seller.51bushou.com/api/sku/propertyValue/save`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function queryCommunityManager(params) {
  return request(`${domain}/communityManager/list`, {
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

// 商品排期
export async function addOrUpdate(params) {
  return request(`${domain}/revision/product/schedule/addOrUpdate`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 商品回退
export async function backOff(params) {
  return request(`${domain}/revision/product/schedule/backOff`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 预排期列表
export async function listPreScheduledProduct() {
  return request(`${domain}/revision/product/schedule/listPreScheduledProduct`);
}

// 已排期列表
export async function listScheduledProduct() {
  return request(`${domain}/revision/product/schedule/listScheduledProduct`);
}

// 未排期列表
export async function listUnScheduledProduct() {
  return request(`${domain}/revision/product/schedule/listUnScheduledProduct`);
}

// 预排期列表
export async function updateSortNumber(params) {
  return request(`${domain}${domain}/revision/product/schedule/updateSortNumber`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

