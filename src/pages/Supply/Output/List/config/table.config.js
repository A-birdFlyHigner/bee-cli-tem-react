import React from 'react';
import moment from 'moment';
import Link from 'umi/link'

const formatType = 'YYYY-MM-DD HH:mm:ss'

export default {
  columns: [
    {
      title: '序号',
      dataIndex: 'key',
    },
    {
      title: '出库单号',
      dataIndex: 'outboundNo',
    },
    {
      title: '配送单号',
      dataIndex: 'deliveryNo',
      render(value, values, index) {
        return (
          <div>
            <Link to={`/supply/delivery/detail?deliveryNo=${value}`}>{value}</Link>
          </div>
        );
      },
    },
    {
      title: '出库时间',
      dataIndex: 'outboundTime',
      render(value, values, index) {
        return (
          <span>{value ? moment(value).format(formatType) : '无数据'}</span>
        );
      },
    },
    {
      title: '仓库名称',
      dataIndex: 'warehouseName',
    },
    {
      title: '收货人',
      dataIndex: 'consigneeName',
    },
    {
      title: '出库单概况',
      dataIndex: 'delieryGeneralInfo',
    },
    {
      title: '操作人',
      dataIndex: 'opertorName',
    },
  ],
};
