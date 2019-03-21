import React from 'react';
import moment from 'moment'
import Link from 'umi/link'
import {exportDeliveryOrder} from '@/services/supply'

const formatType = 'YYYY-MM-DD'

const download = values => {
  exportDeliveryOrder(values.deliveryNo)
};

export default {
  scroll: { x: 1800 },
  columns: [
    {
      title: '序号',
      dataIndex: 'key',
      width: 100,
    },
    {
      title: '配送单号',
      dataIndex: 'deliveryNo',
      width: 200,
    },
    {
      title: '送货日期',
      dataIndex: 'expectOutboundTime',
      width: 200,
      render(value) {
        return (
          <span>{value ? moment(value).format(formatType) : '无数据'}</span>
        );
      },
    },
    {
      title: '仓库',
      dataIndex: 'warehouseName',
      width: 200,
    },
    {
      title: '配送单类型',
      dataIndex: 'deliveryType',
      width: 200,
      render(value, values, index) {
        return (
          <span>{value === 3 ? '入库' : '落地配'}</span>
        );
      },
    },
    {
      title: '小区名称',
      dataIndex: 'communityName',
      width: 200,
    },
    {
      title: '小区长',
      dataIndex: 'consigneeName',
      width: 200,
    },
    {
      title: '小区长电话',
      dataIndex: 'consigneeMobile',
      width: 200,
    },
    {
      title: '小区地址',
      dataIndex: 'communityAddress',
      width: 200,
    },
    {
      title: '配送单概况',
      dataIndex: 'delieryGeneralInfo',
      width: 200,
    },
    {
      title: '用户订单',
      dataIndex: 'referSellOrderCount',
      width: 200,
      render(value, values, index) {
        return (
          <div>
            <span>{value}</span>
            {
              value ? <a href="javascript:;" onClick={()=>{download(values)}}>下载</a>: null
            }
          </div>
        );
      },
    },
    {
      title: '出库单',
      width: 200,
      render(value, values, index) {
        return (
          <div>
            {
              values.status === 1 || values.status === 3
                ? <Link to={`/supply/output/list?deliveryNo=${values.deliveryNo}`}>查看</Link>
                : '/'
            }
          </div>
        );
      },
    },
    {
      title: '操作',
      width: 100,
      align: 'center',
      fixed: 'right',
      render(value, values, index) {
        return (
          <div>
            <Link to={`/supply/delivery/detail?deliveryNo=${values.deliveryNo}`}>查看</Link>;
            <Link to={`/supply/delivery/detail?deliveryNo=${values.deliveryNo}&differStatus=1`}>差异报告</Link>
          </div>
        );
      },
    },
  ],
};
