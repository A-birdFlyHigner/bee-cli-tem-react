import React from 'react';
import moment from 'moment'
import {exportDelivery} from '@/services/supply'

const formatType = 'YYYY-MM-DD HH:mm:ss'

const download = (record) => {
  exportDelivery(record.deliverCode)
}

export default {
  columns: [
    {
      title: '送货日期',
      dataIndex: 'deliverDate',
    },
    {
      title: '仓库名称',
      dataIndex: 'miniWarehouseName',
    },
    {
      title: '统计订单范围',
      dataIndex: 'orderBeginPayTime',
      render: (value, record, index)=>{
        return <div>
          <p>次日达订单({value && moment(value).format(formatType)}--{record.orderEndPayTime && moment(record.orderEndPayTime).format(formatType)})</p>
          <p>预售订单(送货时间: {record.deliverDate})</p>
        </div>
      }
    },
    {
      title: '小区数',
      dataIndex: 'communityCount',
    },
    {
      title: '操作',
      dataIndex: 'deliverCode',
      render(value, record, index) {
        return (
          <div>
            <a href="javascript:;" onClick={()=>{download(record)}} >下载</a>
          </div>
        );
      },
    },
  ],
};
