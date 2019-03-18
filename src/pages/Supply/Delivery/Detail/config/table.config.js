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
      dataIndex: 'skuCode',
    },
    {
      title: '主图',
      dataIndex: 'skuImage',
      render(value) {
        return (<span><img style={{width: '100px'}} src={value} alt="主图" /></span>)
      },
    },
    {
      title: '商品名称',
      dataIndex: 'itemName',
    },
    {
      title: 'SKU名称',
      dataIndex: 'skuName',
    },
    // {
    //   title: '供应商成本价',
    //   dataIndex: 'supplierPrice',
    //   render: (value)=>{
    //     return (value / 100).toFixed(2)
    //   }
    // },
    {
      title: '配送数量',
      dataIndex: 'expectSkuCount',
    },
    {
      title: '出库数量',
      dataIndex: 'outboundSkuCount',
    },
    {
      title: '差异数量',
      dataIndex: 'differCount',
    },
  ],
};