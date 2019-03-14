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
      dataIndex: 'skucode',
    },
    {
      title: '主图',
      dataIndex: 'skuImage',
    },
    {
      title: '商品名称',
      dataIndex: 'itemName',
    },
    {
      title: 'SKU名称',
      dataIndex: 'skuName',
    },
    {
      title: '供应商成本价',
      dataIndex: 'supplierPrice',
      render: (value, record)=>{
        return (value / 100).toFixed(2)
      }
    },
    {
      title: '采购数量',
      dataIndex: 'expectSkuCount',
    },
    {
      title: '入库数量',
      dataIndex: 'inboundSkuCount',
    },
    {
      title: '差异数量',
      dataIndex: 'differCount',
    },
    // {
    //   title: '操作',
    //   width: '80px',
    //   render(value, values, index) {
    //     return (
    //       <div>
    //         <a href="javascript:;" onClick={() => {deleteRow(values)}} >删除</a>
    //       </div>
    //     );
    //   },
    // },
  ],
};
