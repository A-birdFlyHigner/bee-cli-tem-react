import React from 'react';
import { LeDialog } from '@lib/lepage';

const download = () => {};
const showDetail = values => {
  LeDialog.show(
    {
      core: {
        values,
        globalStatus: 'preview',
      },
      form: {
        layout: {
          label: 'w120',
        },
      },
      items: [
        {
          label: '采购时间',
          name: 'purchasing',
        },
        {
          label: '仓库名称',
          name: 'warehouse',
        },
        {
          label: '供应商名称',
          name: 'supplier',
        },
        {
          label: '采购订单状态',
          name: 'status',
        },
        {
          label: '采购订单来源',
          name: 'origin',
          props: {
            onChange() {
              this.setState({
                dataSource: [],
              });
            },
          },
        },
      ],
    },
    {
      title: '查看详情',
    }
  );
};

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
      title: '用户订单',
      dataIndex: 'userOrder',
      render(value, record, index) {
        return (
          <div>
            <span>value</span>
            <span onClick={download.bind(null, record)}>下载</span>
          </div>
        );
      },
    },
    {
      title: '出库单',
      render(value, record, index) {
        return <div>{<span onClick={showDetail.bind(null, record)}>查看</span>}</div>;
      },
    },
    {
      title: '操作',
      render(value, record, index) {
        return (
          <div>
            <span onClick={showDetail.bind(null, record)}>查看</span>
          </div>
        );
      },
    },
  ],
};
