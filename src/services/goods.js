import { stringify } from 'qs'
import request from '@/utils/request';

const domain = '/adminApi';

// 获取指定类目的属性
export async function queryCategoryPropertyDetail (params) {
  return request(`${domain}/revision/category/property/detail?${stringify(params)}`);
}

// 创建属性对
export async function saveCategoryPropertyPair (params) {
  return request(`${domain}/revision/category/save/property`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 发布商品
export async function publishGoods (params) {
  return request(`${domain}/revision/product/create`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 供应商商品列表
export async function queryGoodsList (params) {
  return request(`${domain}/revision/product/gys/table/query?${stringify(params)}`);
}

// 供应商可推广渠道列表
export async function queryProductSpreadChannelList(params) {
  return request(`${domain}/product/spread/channel/list?${stringify(params)}`);
}

// 供应商商品待推广列表
export async function queryProductSpreadList(params) {
  return request(`${domain}/product/spread/wait/query?${stringify(params)}`);
}

// 供应商商品推广审核中列表
export async function queryProductSpreadIngList(params) {
  return request(`${domain}/product/spread/ing/query?${stringify(params)}`);
}

// 供应商商品待推广失败列表
export async function queryProductSpreadFailureList(params) {
  return request(`${domain}/product/spread/failure/query?${stringify(params)}`);
}

// 商品详情
export async function queryProductDetail(params) {
  return request(`${domain}/revision/product/detail?${stringify(params)}`);
}

// 分公司商品审核、编辑详情
export async function queryBranchProductSpreadDetail(params) {
  return request(`${domain}/branch/product/spread/detail?${stringify(params)}`);
}

// 修改价格信息
export async function updateSkuPrice(params) {
  return request(`${domain}/branch/product/spread/updateSkuPrice`, {
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
export async function listPreScheduledProduct(params) {
  return request(`${domain}/revision/product/schedule/listPreScheduledProduct?${stringify(params)}`);
}

// 已排期列表
export async function listScheduledProduct(params) {
  return request(`${domain}/revision/product/schedule/listScheduledProduct?${stringify(params)}`);
}

// 未排期列表
export async function listUnScheduledProduct(params) {
  return request(`${domain}/revision/product/schedule/listUnScheduledProduct?${stringify(params)}`);
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



