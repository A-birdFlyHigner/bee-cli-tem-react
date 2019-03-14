import React from 'react';
import {Tooltip, Icon, Modal} from 'antd'
import moment from 'moment'

const formatType = 'YYYY-MM-DD HH:mm:ss'

const {confirm} = Modal

const download = values => {
  console.log('download', values)
};

const cancelConfirm = values => {
  confirm({
    title: '取消采购单',
    content: '是否确定取消该采购单？',
    onOk() {
      console.log('cancelConfirm_OK');
    },
    onCancel() {
      console.log('cancelConfirm_Cancel');
    },
  })
};
const submitConfirm = values => {
  confirm({
    title: '提交采购单',
    content: '是否确定提交该采购单？',
    onOk() {
      console.log('submitConfirm_OK');
    },
    onCancel() {
      console.log('submitConfirm_Cancel');
    },
  })
};

export default {
  columns: [
    {
      title: '序号',
      dataIndex: 'key',
      width: '40px',
    },

    // areaCode: "333100"
    // communityAddress: "杭州市西湖区"
    // communityName: "财富中心小区"
    // consigneeMobile: "176818283894"
    // consigneeName: "小区长名称"
    // createTime: 1551322177000
    // delieryGeneralInfo: "共20种规格,1件商品"
    // deliveryNo: "2019022838977170200"
    // deliveryType: 0
    // expectOutboundTime: 1551283200000
    // referSellOrderCount: 0
    // sellType: 1
    // source: 1
    // status: 0
    // type: 0
    // updateTime: 1551322179000
    // warehouseCode: "1"
    // warehouseName: null
    {
      title: '配送单号',
      dataIndex: 'deliveryNo',
      width: '40px',
    },
    {
      title: '送货日期',
      dataIndex: 'expectOutboundTime',
      width: '40px',
      render(value, values, index) {
        return (
          <span>{value ? moment(value).format(formatType) : '无数据'}</span>
        );
      },
    },
    {
      title: '仓库',
      dataIndex: 'warehouseName',
      width: '40px',
    },
    {
      title: '配送单类型',
      dataIndex: 'deliveryType',
      render(value, values, index) {
        return (
          <span>{value === 0 ? '入库' : '落地配'}</span>
        );
      },
    },
    {
      title: '小区名称',
      dataIndex: 'communityName',
    },
    {
      title: '小区长',
      dataIndex: 'consigneeName',
    },
    {
      title: '小区长电话',
      dataIndex: 'consigneeMobile',
    },
    {
      title: '小区地址',
      dataIndex: 'communityAddress',
    },
    {
      title: '配送单概况',
      dataIndex: 'delieryGeneralInfo',
    },
    {
      title: '用户订单',
      dataIndex: 'referSellOrderCount',
      render(value, values, index) {
        return (
          <div>
            <span>{value}</span>;
            <a href="javascript:;" onClick={download.bind(null, values)} >下载</a>;
          </div>
        );
      },
    },
    {
      title: '出库单',
      render(value, values, index) {
        console.log('values', values)
        return (
          <div>
            <a href={`/supply/output/list?deliveryNo=${values.deliveryNo}`}>查看</a>
          </div>
        );
      },
    },
    {
      title: '操作',
      render(value, values, index) {
        return (
          <div>
            <a href={`/supply/delivery/detail?deliveryNo=${values.deliveryNo}`}>查看</a>;
          </div>
        );
      },
    },
  ],
};
