import React from 'react';

const download = () => {};

export default {
  columns: [
    {
      title: '序号',
      dataIndex: 'key',
    },
    {
      title: '配送单号',
      dataIndex: 'deliveryNo',
    },
    {
      title: '送货日期',
      dataIndex: 'deliveryDate',
    },
    {
      title: '仓库',
      dataIndex: 'warehouseName',
    },
    {
      title: '配送单类型',
      dataIndex: 'deliveryType',
    },
    {
      title: '小区名称',
      dataIndex: 'villageName',
    },
    {
      title: '小区名称',
      dataIndex: 'villageManagePhone',
    },
    {
      title: '小区地址',
      dataIndex: 'villageAddress',
    },
    {
      title: '配送单概况',
      dataIndex: 'deliverySurvey',
    },
    {
      title: '入库单',
      dataIndex: 'inputNo',
      render(value, values, index) {
        return (
          <div>
            <a href={`/supply/input/list?inputNo=${value}`}>查看</a>
          </div>
        );
      },
    },
    {
      title: '用户订单',
      dataIndex: 'userOrder',
      render(value, record, index) {
        return (
          <div>
            <span>{value}</span>
            <a href="javascript:;" onClick={download.bind(null, record)} >下载</a>
          </div>
        );
      },
    },
    {
      title: '出库单',
      render(value, record, index) {
        return <div>{
          <a href={`/supply/output/list?outputNo=${value}`}>查看</a>
        }</div>
      },
    },
    {
      title: '操作',
      render(value, record, index) {
        return (
          <div>
            <a href={`/supply/delivery/list?inputNo=${value}`}>查看</a>
          </div>
        )
      },
    },
  ],
};
