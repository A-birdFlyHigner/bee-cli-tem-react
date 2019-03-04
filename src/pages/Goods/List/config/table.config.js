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
        title: '基础信息',
        render (value, values, index) {

        }
    },
    {
        title: '类目',
        dataIndex: 'pathName',
        render (value, values, index) {

        }
    },
    {
        title: '规格',
        dataIndex: 'saleUnits',
        render (value, values, index) {

        }
    },
    {
      title: '操作',
      render(value, values, index) {
        return <span onClick={showDetail.bind(null, values)}>查看</span>;
      },
    },
  ],
};
