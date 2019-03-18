import React from 'react';
import ImgPreview from '@/components/ImgPreview'

export default {
  rowSelection: {
    selectedRowKeys: [],
    onChange: (selectedRowKeys, LeList)=>{},
    selections: true,
    getCheckboxProps(record) {
      return {
        disabled: false,
        name: record.purchasing,
      };
    },
  },
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
      render(value, values, index) {
        return (
          <ImgPreview url={value} />
        );
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
    },
  ],
};
