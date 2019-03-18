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
      title: '入库单号',
      dataIndex: 'inboundNo',
    },
    {
      title: '采购单号',
      dataIndex: 'purchaseNo',
      render(value, values, index) {
        return (
          <div>
            <Link to={`/supply/purchase/detail?purchaseNo=${value}`}>{value}</Link>
          </div>
        );
      },
    },
    {
      title: '入库时间',
      dataIndex: 'inboundTime',
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
      title: '供应商名称',
      dataIndex: 'supplierName',
    },
    {
      title: '入库单概况',
      dataIndex: 'purchaseGeneralInfo',
    },
    {
      title: '操作人',
      dataIndex: 'operaName',
    },
  ],
};
