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
      title: '图片',
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
      title: '入库数量',
      dataIndex: 'skuCount',
    },
  ],
};
