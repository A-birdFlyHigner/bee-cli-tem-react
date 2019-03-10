import request from '@/utils/request';
import { stringify } from 'qs';

const domain = '/adminApi';

// 商品列表
export async function queryCommunityManager(params) {
  return request(`${domain}/product/list`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 商品详情
export async function queryProductDetail(params) {
  return request(`${domain}/revision/product/detail?${stringify(params)}`);
}

// 分公司商品审核详情
export async function queryBranchProductSpreadDetail(params) {
  return request(`${domain}/branch/product/spread/detail?${stringify(params)}`);
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



