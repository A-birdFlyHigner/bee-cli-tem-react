import request from '@/utils/request';

const domain = '/adminApi';

// 获取采购单列表
export async function getPurchaseList (params) {
  return request(`${domain}/purchase/listPurchaseOrder`, {
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

// 模糊查询供应商列表
export async function getSupplierEmunList (params) {
  return request(`${domain}/supplyChainCommon/likeSearch/supplierName`, {
    method: 'POST',
    body: params,
  });
}

// 模糊查询仓库列表
export async function getWarehouseEmunList () {
  return request(`${domain}/supplyChainCommon/queryAllWarehouse`, {
    method: 'POST',
  });
}

// 模糊查询小区列表
export async function getVillageEmunList (params) {
  return request(`${domain}/supplyChainCommon/likeSearch/communityName`, {
    method: 'POST',
    body: params,
  });
}

// 模糊查询商品枚举列表
export async function getGoodsEmunList (params) {
  return request(`${domain}/supplyChainCommon/likeSearch/itemName`, {
    method: 'POST',
    body: params,
  });
}

// 获取采购单基础信息
export async function getPurchaseDetail (purchaseNo) {
  return request(`${domain}/purchase/getPurchaseOrder`, {
    method: 'POST',
    body: {
      purchaseNo,
    },
  });
}

// 获取采购单详情列表
export async function getPurchaseDetailList (params) {
  return request(`${domain}/purchase/listPurchaseOrderDetail`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 获取入库单列表
export async function getInputList (params) {
  return request(`${domain}/inbound/listInboundOrder`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 获取入库单详情列表
export async function getInputDetailList (params) {
  return request(`${domain}/inbound/listInboundOrderDetail`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 获取出库单列表
export async function getOutputList (params) {
  return request(`${domain}/outbound/listOutboundOrder`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 获取出库单详情列表
export async function getOutputDetailList (params) {
  return request(`${domain}/outbound/listOutboundOrderDetail`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 获取配送单列表
export async function getDeliveryList (params) {
  return request(`${domain}/delivery/listDeliveryOrder`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 获取配送单详情基本信息
export async function getDeliveryDetail (deliveryNo) {
  return request(`${domain}/delivery/getDeliveryOrder`, {
    method: 'POST',
    body: {
      deliveryNo,
    },
  });
}

// 获取配送单详情列表
export async function getDeliveryDetailList (params) {
  return request(`${domain}/delivery/listDeliveryOrderDetail`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 获取库存列表
export async function getStockList (params) {
  return request(`${domain}/stock/listOmsStock`, {
    method: 'POST',
    body: params,
  });
}

// 获取库存详情列表
export async function getStockDetailList (params) {
  return request(`${domain}/stock/listOmsStockDetail`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 获取送货单导出列表
export async function getExportDeliveryList (params) {
  return request(`${domain}/miniDeliverNote/listForWarehouse`, {
    method: 'POST',
    body: params,
  });
}

// 配送单导出
export async function exportDelivery (deliverCode) {
  return request(`${domain}/miniDeliverNote/exportForWarehouse`, {
    method: 'POST',
    body: {
      deliverCode,
    },
  });
}

// 获取基础商品列表
export async function getBasicItemList (params) {
  return request(`${domain}/supplyChainCommon/listBaseSku`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 新增采购单
export async function addPurchase (params) {
  return request(`${domain}/purchase/savePurchaseOrder`, {
    method: 'POST',
    body: {param: JSON.stringify(params)},
  });
}

// 编辑采购单
export async function editPurchase (params) {
  return request(`${domain}/purchase/updatePurchaseOrder`, {
    method: 'POST',
    body: {param: JSON.stringify(params)},
  });
}

// 下载关联的销售订单
export async function exportPurchaseOrder (purchaseNo) {
  window.open(`${domain}/purchase/exportPurchaseOrderInvolveExcel/${purchaseNo}`, "_blank");
  // return request(`${domain}/purchase/exportPurchaseOrderInvolveExcel/${purchaseNo}`, {
  //   method: 'GET',
  // });
}
