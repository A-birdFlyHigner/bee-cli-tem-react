import React from 'react';
import { LeDialog } from '@lib/lepage';

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
      title: '出库单号',
      dataIndex: 'outputNo',
    },
    {
      title: '上游单号',
      dataIndex: 'upperNo',
    },
    {
      title: '出库时间',
      dataIndex: 'outputTime',
    },
    {
      title: '仓库名称',
      dataIndex: 'warehouseName',
    },
    {
      title: '收货人',
      dataIndex: 'receiver',
    },
    {
      title: '出库单概况',
      dataIndex: 'outputSurvey',
    },
    {
      title: '操作人',
      dataIndex: 'operator',
    },
    {
      title: '操作',
      render(value, values, index) {
        return (
          <div>
            <span onClick={showDetail.bind(null, values)}>查看</span>;
          </div>
        );
      },
    },
  ],
};
