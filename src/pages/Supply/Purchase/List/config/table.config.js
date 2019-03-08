import React from 'react';
import {Tooltip, Icon, Modal} from 'antd'

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
    },
    {
      title: '采购单号',
      dataIndex: 'purchaseNo',
      render(value, values, index) {
        return (
          <div>
            <a href={`/supply/purchase/detail?purchaseNo=${value}`}>{value}</a>
          </div>
        );
      },
    },
    {
      title: '采购时间',
      dataIndex: 'purchaseTime',
    },
    {
      title: '期望入库时间',
      dataIndex: 'inputExpectTime',
    },
    {
      title: (
        <div>
          失效时间 <Tooltip title={`失效时间仅供业务方标记使用，不影响采购单的正常流转和操作`}><Icon type="question-circle" /></Tooltip>
        </div>
      ),
      dataIndex: 'invalidTime',
    },
    {
      title: '仓库名称',
      dataIndex: 'warehouse',
    },
    {
      title: '供应商名称',
      dataIndex: 'supplier',
    },
    {
      title: '采购单来源',
      dataIndex: 'supplySource',
    },
    {
      title: '采购单概况',
      dataIndex: 'supplySurvey',
    },
    {
      title: '供应商确认状态',
      dataIndex: 'confirmState',
    },
    {
      title: '采购单状态',
      dataIndex: 'supplyState',
    },
    {
      title: '销售订单',
      dataIndex: 'sellerOrder',
      render(value, values, index) {
        return (
          <div>
            <span>{value}</span>;
            <a href="javascript:;" onClick={download.bind(null, values)} >下载</a>;
            {/**/}
            {/*<a href="http://www.mogujie.com">下载</a>*/}
          </div>
        );
      },
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
      title: '操作',
      render(value, values, index) {
        return (
          <div>
            <a href={`/supply/purchase/detail?purchaseNo=${values}`}>查看</a>;
            <a href={`/supply/purchase/edit?purchaseNo=${values}`}>编辑</a>;
            <a href="javascript:;" onClick={cancelConfirm.bind(null, values)} >取消</a>;
            <a href="javascript:;" onClick={submitConfirm.bind(null, values)} >提交</a>;
          </div>
        );
      },
    },
  ],
};
