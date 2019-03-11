import { stringify } from 'qs'
import request from '@/utils/request';

const domain = '/adminApi';

// 获取采购单列表
export async function purchaseList (params) {
  return request(`${domain}/purchase/listPurchaseOrder`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 获取采购单详情列表
export async function purchaseDetailList (params) {
  return request(`${domain}/purchase/listPurchaseOrderDetail`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 导出入库单
export async function exportInputList (params) {
  return request(`${domain}/purchase/exportPurchaseOrderInvolveExcel/${params}`);
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
  return request(`${domain}/revision/product/detail?${stringify(params)}`);
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



