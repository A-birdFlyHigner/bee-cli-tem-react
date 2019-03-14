import React from 'react';

const select = values => {
  console.log('values', this, values);
};

export default {
  rowSelection: {
    selectedRowKeys: [],
    onChange: (selectedRowKeys, LeList)=>{},
    selections: true,
    onSelect(...args) {
      // console.log(args)
    },
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
      dataIndex: 'baseSaleGoodsId',
    },
    {
      title: '主图',
      dataIndex: 'mainImages',
      render(value, values, index) {
        return (
          <span>
            <img src={value && value[0]} alt="主图"/>
          </span>
        );
      },
    },
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: 'SKU名称(字段待定)',
      dataIndex: 'SKU_Name',
    },
    {
      title: '供应商成本价',
      dataIndex: 'salePrice',
    },
  ],
};
