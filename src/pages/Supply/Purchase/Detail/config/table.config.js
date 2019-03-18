import React from 'react';
import ImgPreview from '@/components/ImgPreview'

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
        return (<ImgPreview url={value} />)
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
    {
      title: '供应商成本价',
      dataIndex: 'supplierPrice',
      render: (value)=>{
        return value && (value / 100).toFixed(2)
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
  ],
};
