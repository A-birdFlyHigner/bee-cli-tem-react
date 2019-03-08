import React from 'react';
import { ImageTextCard } from '@/components/InfoCard';
import { LeDialog } from '@lib/lepage'
import SkuDetail from '../../../common/skuDetail';

const editItemStock = record => {};

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
              vals.split(',').map((item, index) => (
                <span key={index}>
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
            <a className="linkButton" onClick={e => showSkuDetail(record.id)}>
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
      title: '库存信息',
      dataIndex: 'status3',
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
      title: '审核时间',
      dataIndex: 'status1',
      width: 200,
      align: 'center',
    },
    {
      title: '原因',
      dataIndex: 'status2',
      width: 200,
      align: 'center',
    },
    {
      title: '操作',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (text, record) => {
        return (
          <div className="operateBtn-container-inline">
            <a onClick={e => editItemStock(record)}>编辑</a>
            <br />
          </div>
        );
      },
    },
  ],
};
