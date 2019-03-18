import React from 'react';
import moment from 'moment';

const formatType = 'YYYY-MM-DD HH:mm:ss'

export default {
  columns: [
    {
      title: '序号',
      dataIndex: 'key',
    },
    {
      title: '商品ID',
      dataIndex: 'itemCode',
    },
    {
      title: '商品名称/规格',
      dataIndex: 'itemName',
      render(value, values, index) {
        return (
          <span>{value},{values.skuCountUnit}</span>
        );
      },
    },
    {
      title: 'SKU编码',
      dataIndex: 'skuCode',
    },
    {
      title: '供应商名称',
      dataIndex: 'supplierName',
    },
    {
      title: '总库存',
      dataIndex: 'totalCount',
    },
    {
      title: '良品可用库存',
      dataIndex: 'checkCount',
    },
    {
      title: '良品锁定库存',
      dataIndex: 'lockCheckCount',
    },
    {
      title: '不良品可用库存',
      dataIndex: 'inferiorCount',
    },
    {
      title: '不良品锁定库存',
      dataIndex: 'lockInferiorCount',
    },
  ],
};
