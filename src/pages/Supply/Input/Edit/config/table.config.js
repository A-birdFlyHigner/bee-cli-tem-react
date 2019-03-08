import React from 'react';

// const deleteRow = values => {
//   console.log('values', this, values);
// };

export default {
  columns: [
    {
      title: '序号',
      dataIndex: 'key',
    },
    {
      title: 'SKU编码',
      dataIndex: 'SKU_No',
    },
    {
      title: '主图',
      dataIndex: 'imgUrl',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
    },
    {
      title: 'SKU名称',
      dataIndex: 'SKU_Name',
    },
    {
      title: '供应商成本价',
      dataIndex: 'costPrice',
    },
    {
      title: '采购数量',
      dataIndex: 'PurchaseQuantity',
    },
  ],
};
