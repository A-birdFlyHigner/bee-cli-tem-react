import React from 'react';
import moment from 'moment';

const formatType = 'YYYY-MM-DD HH:mm:ss'

// communityAddress: ""
// communityName: ""
// consigneeMobile: ""
// consigneeName: ""
// delieryGeneralInfo: null
// deliveryNo: ""
// opertorName: null
// outboundNo: "YCWLD2019030100041"
// outboundTime: 1551419034000
// status: 0
// type: 0
// warehouseCode: ""
// warehouseName: null

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
            <a href={`/supply/delivery/detail?deliveryNo=${value}`}>{value}</a>
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
