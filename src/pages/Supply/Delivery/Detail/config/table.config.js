import React from 'react';
import { LeDialog } from '@lib/lepage';

const onSelectChange = (selectedRowKeys, listCore) => {
  window.console.log('selectedRowKeys changed: ', selectedRowKeys, listCore.getDataSource());
};

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
  rowSelection: {
    selectedRowKeys: [1, 2],
    onChange: onSelectChange,
    selections: true,
    onSelect(...args) {
      // console.log(args)
    },
    getCheckboxProps(record) {
      return {
        disabled: false,
        name: record.purchasing,
      };
    },
  },
  columns: [
    {
      title: '序号',
      dataIndex: 'index',
    },
    {
      title: 'SKU编码',
      dataIndex: 'SKU_No',
    },
    {
      title: '主图',
      dataIndex: 'imgUrl',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
    },
    {
      title: 'SKU名称',
      dataIndex: 'SKU_Name',
    },
    {
      title: '供应商成本价',
      dataIndex: 'costPrice',
    },
    {
      title: '采购数量',
      dataIndex: 'PurchaseQuantity',
    },
    {
      title: '操作',
      render(value, values, index) {
        return (
          <div>
            <span onClick={showDetail.bind(null, values)}>查看</span>;
            <span onClick={showDetail.bind(null, values)}>编辑</span>;
            <span onClick={showDetail.bind(null, values)}>取消</span>;
            <span onClick={showDetail.bind(null, values)}>提交</span>;
          </div>
        );
      },
    },
  ],
};
