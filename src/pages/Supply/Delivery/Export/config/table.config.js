import React from 'react';

const download = () => {};

export default {
  columns: [
    {
      title: '送货日期',
      dataIndex: 'deliveryDate',
    },
    {
      title: '仓库名称',
      dataIndex: 'warehouseName',
    },
    {
      title: '统计订单范围',
      dataIndex: 'orderRange',
    },
    {
      title: '小区数',
      dataIndex: 'villageCount',
    },
    {
      title: '操作',
      render(value, record, index) {
        return (
          <div>
            <span onClick={download.bind(null, record)}>下载</span>
          </div>
        );
      },
    },
  ],
};
