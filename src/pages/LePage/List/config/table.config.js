import React from 'react';
import { LeForm, LeDialog } from '@lib/lepage';

// const onSelectChange = (selectedRowKeys, leList) => {
//   window.console.log(leList.getSelectedRowKeys())
//   window.console.log('selectedRowKeys changed: ', selectedRowKeys, leList.getDataSource());
// };

const showDetail = values => {
  const formConfig = {
    settings: {
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
  };
  LeDialog.show({
    title: '查看详情',
    content() {
      return <LeForm {...formConfig} />;
    },
  });
};

export default {
  rowKey: 'id',
  // rowSelection: {
  //   selectedRowKeys: [1, 2],
  //   onChange: onSelectChange,
  //   selections: true,
  //   onSelect(...args) {
  //     // console.log(args)
  //   },
  //   getCheckboxProps(record) {
  //     return {
  //       disabled: false,
  //       name: record.purchasing,
  //     };
  //   },
  // },
  onChange (pagination, filters, sorter) {
    debugger
  },
  columns: [
    {
      title: '采购时间',
      dataIndex: 'purchasing',
      sorter: true,
      sortOrder: 'ascend'
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
      title: '采购订单状态',
      dataIndex: 'status',
      render(value, item, index) {
        return <a href="http://www.mogujie.com">未入库</a>;
      },
    },
    {
      title: '操作',
      render(value, values, index) {
        return <span onClick={showDetail.bind(null, values)}>查看</span>;
      },
    },
  ],
};
