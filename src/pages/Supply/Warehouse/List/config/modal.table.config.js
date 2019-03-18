import React from 'react';

export default {
  columns: [
    {
      title: '序号',
      dataIndex: 'key',
    },
    {
      title: '仓库',
      dataIndex: 'warehouseName',
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
