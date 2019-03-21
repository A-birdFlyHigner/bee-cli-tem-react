import React from 'react';
import {Tooltip, Icon} from 'antd'
import moment from 'moment'
import {exportPurchaseOrder,} from '@/services/supply'
import Link from 'umi/link';

const formatType = 'YYYY-MM-DD'

const download = values => {
  exportPurchaseOrder(values.purchaseNo).then(res=>{
    console.log('res', res)
  })
};

export default {
  scroll: { x: 2000 },
  columns: [
    {
      title: '序号',
      dataIndex: 'key',
      width: 100,
    },
    {
      title: '采购单号',
      dataIndex: 'purchaseNo',
      align: 'center',
      width: 200,
      render(value) {
        return (
          <div>
            <Link to={`/supply/purchase/detail?purchaseNo=${value}`}>{value}</Link>
          </div>
        );
      },
    },
    {
      title: '采购时间',
      dataIndex: 'createTime',
      width: 200,
      render(value,record) {
        return (
          <span>
            <p>{moment(value).format("YYYY-MM-DD HH:mm:ss")}</p>
            <p>{record.creatorName && `(${record.creatorName})`}</p>
          </span>
        );
      },
    },
    {
      title: '期望入库时间',
      dataIndex: 'expectInboundTime',
      width: 200,
      render(value) {
        return (
          <span>{moment(value).format(formatType)}</span>
        );
      },
    },
    {
      title: (
        <div>
          失效时间 <Tooltip title="失效时间仅供业务方标记使用，不影响采购单的正常流转和操作"><Icon type="question-circle" /></Tooltip>
        </div>
      ),
      dataIndex: 'loseEfficacyTime',
      width: 200,
      render(value) {
        return (
          <span>{value ? moment(value).format(formatType): '/'}</span>
        );
      },
    },
    {
      title: '仓库名称',
      dataIndex: 'warehouseName',
      width: 200,
    },
    {
      title: '供应商名称',
      dataIndex: 'supplierName',
      width: 200,
    },
    {
      title: '采购单来源',
      dataIndex: 'source',
      width: 200,
      render(value) {
        return (
          <span>{value === 0 ? '人工创建': '系统生成'}</span>
        );
      },
    },
    {
      title: '采购单概况',
      dataIndex: 'purchaseGeneralInfo',
      width: 200,
    },
    {
      title: '供应商确认状态',
      dataIndex: 'supplierConfirmStatus',
      align: 'center',
      width: 220,
      render(value, record) {
        return (
          <div>
            <span>
              {
                record.status === 0 || record.status === 4
                    ? '/'
                    : value === 0
                      ? <p>待确认</p>
                      :
                      <div>
                        <p>已确认</p>
                        <p>{moment(record.supplierConfirmTime).format(formatType)}</p>
                      </div>
              }
            </span>
          </div>
        );
      },
    },
    {
      title: '采购单状态',
      dataIndex: 'status',
      width: 200,
      render(value, record) {
        return (
          <div>
            <span>
              {
                value === 0
                  ? <p>待提交</p>
                  : value === 1
                    ? <p>入库完成</p>
                    : value === 2
                      ? <p>未入库</p>
                      : value === 3
                        ? <p>部分入库</p>
                        : value === 4
                          ? <p>已取消</p>
                          : null
              }
            </span>
          </div>
        );
      },
    },
    {
      title: '销售订单',
      dataIndex: 'referSellOrderCount',
      align: 'center',
      width: 200,
      render(value, values) {
        return (
          <div>
            <span>{value ? value : '/'}</span>
            { value ? <a onClick={()=>{download(values)}}>下载</a> : null}
          </div>
        );
      },
    },
    {
      title: '入库单',
      dataIndex: 'inputNo',
      align: 'center',
      width: 200,
      render(value, values) {
        return (
          <div>
            {
              values.status === 1 || values.status === 3
                ? <Link to={`/supply/input/list?purchaseNo=${values.purchaseNo}`}>查看</Link>
                : '/'
            }
          </div>
        );
      },
    },
  ],
};
