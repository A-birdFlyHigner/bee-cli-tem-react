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
  columns: [
    {
      title: '序号',
      dataIndex: 'key',
    },
    {
      title: '采购单号',
      dataIndex: 'purchaseNo',
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
          失效时间<span>666</span>
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
      render(value, item, index) {
        return (
          <div>
            <span>{value}</span>
            <a href="http://www.mogujie.com">下载</a>
          </div>
        );
      },
    },
    {
      title: '入库单',
      dataIndex: 'inputNo',
      render(value, item, index) {
        return (
          <div>
            <a href={`http://www.mogujie.com/${value}`}>查看</a>
          </div>
        );
      },
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

// {
//   title: '采购单状态',
//     dataIndex: 'supplyState',
//   render(value, item, index) {
//   return <a href="http://www.mogujie.com">未入库</a>;
// },
// },
// {
//   title: '操作',
//     render(value, values, index) {
//   return <span onClick={showDetail.bind(null, values)}>查看</span>;
// },
// },
