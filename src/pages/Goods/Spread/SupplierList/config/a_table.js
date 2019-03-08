import React from 'react';
import { LeDialog, LeForm } from '@lib/lepage';
import { ImageTextCard } from '@/components/InfoCard';
import SkuDetail from '../../../common/skuDetail';
import stockConfig from '../../../common/stockDialog';

const editItemStock = record => {
  const list = [
    {
      id: 1,
      sku: '12931',
      skutype: '白色',
      stock: 100,
      stock1: 200,
      stock2: 300,
      editStock: '',
    },
  ];
  LeDialog.show({
    title: `商品名称：${record.provinceName}`,
    width: '900px',
    content: <LeForm {...stockConfig(list)} />,
    onOk(val, suc, core) {
    },
  });
};

const handleCancelSpread = record => {
  LeDialog.show('确认撤销推广该商品？', {
    title: '撤销推广',
    maskClosable: true,
    onOk(val, suc) {
      suc();
    },
  });
};

const showSkuDetail = id => {
  LeDialog.show({
    title: '渠道商品规格详情',
    width: '800px',
    maskClosable: true,
    footer() {
      return null;
    },
    content() {
      return <SkuDetail productId={id} />;
    },
  });
};

export default {
  rowKey: 'id',
  scroll: { x: 1500 },
  rowSelection: {
    selections: true,
    getCheckboxProps(record) {
      return {};
    },
  },
  columns: [
    {
      title: '渠道商品Id',
      dataIndex: 'id',
      width: 140,
      align: 'center',
    },
    {
      title: '基础信息',
      dataIndex: 'id2',
      render: (val, record) => {
        return (
          <ImageTextCard
            image={record.weixinQrcode}
            infoList={[
              {
                label: '商品名称',
                value: record.provinceName,
              },
              {
                label: '商品Id',
                value: record.id,
              },
              {
                label: '发货方式',
                value: record.id,
              },
              {
                label: '发货时效',
                value: record.id,
              },
            ]}
          />
        );
      },
    },
    {
      title: '类目',
      dataIndex: 'categoryPath',
      width: 150,
      render: (value, record) => {
        const vals = '食品1,水果,橘子';
        return (
          <div>
            {vals &&
              vals.split(',').map((item) => (
                <span key={item}>
                  &gt;
                  {item}
                  <br />
                </span>
              ))}
          </div>
        );
      },
    },
    {
      title: '规格',
      dataIndex: 'name',
      width: 100,
      align: 'center',
      render: (val, record) => {
        return (
          <span>
            3个
            <br />
            <a className="linkButton" onClick={() => showSkuDetail(record.id)}>
              查看
            </a>
          </span>
        );
      },
    },
    {
      title: '价格信息',
      dataIndex: 'phoneNumber',
      width: 200,
      align: 'center',
      render: (val, record) => {
        return <span>80.00~100.00</span>;
      },
    },
    {
      title: '推广城市',
      dataIndex: 'managedCommunities',
      width: 200,
      render: (val, record) => {
        return (
          <div>
            <p>长沙分公司</p>
            <p>长沙</p>
          </div>
        );
      },
    },
    {
      title: '提交推广时间',
      dataIndex: 'status',
      width: 200,
      align: 'center',
    },
    {
      title: '库存信息',
      dataIndex: 'status1',
      width: 300,
      render: (val, record) => {
        return (
          <div>
            <p>推广总库存：100</p>
            <p>累计售出：10</p>
          </div>
        );
      },
    },
    {
      title: '操作',
      width: 160,
      align: 'center',
      fixed: 'right',
      render: (text, record) => {
        return (
          <div className="operateBtn-container-inline">
            <a onClick={() => editItemStock(record)}>调整库存</a>
            <br />
            <a onClick={() => handleCancelSpread(record)}>撤销推广</a>
          </div>
        );
      },
    },
  ],
};
