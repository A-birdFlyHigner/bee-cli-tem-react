import React from 'react';
import { ImageTextCard } from '@/components/InfoCard';
import { LeDialog } from '@lib/lepage'
import SkuDetail from '../../../common/skuDetail';

const editItem = record => {
  console.log(record);
};

const handleStatus = (record) => {
  console.log(record)
  // history.push({
  //   pathname: '/productSpread/detail',
  // })
};

const skuDetail = id => {
  LeDialog.show({
    title: '基础商品规格详情',
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
  scroll: { x: 1300 },
  rowSelection: {
    selectedRowKeys: [],
    selections: true,
    getCheckboxProps() {
      return {};
    },
  },
  columns: [
    {
      title: '基础信息',
      dataIndex: 'id',
      render: (val, record) => {
        return (
          <ImageTextCard
            image={record.mainImage}
            infoList={[
              {
                label: '商品名称',
                value: record.provinceName,
              },
              {
                label: '品牌',
                value: record.cityName,
              },
              {
                label: '商品Id',
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
            <a className="linkButton" onClick={() => skuDetail(record.id)}>
              查看
            </a>
          </span>
        );
      },
    },
    {
      title: '基础价格信息',
      dataIndex: 'phoneNumber',
      width: 200,
      align: 'center',
      render: (val, record) => {
        return <span>80.00~100.00</span>;
      },
    },
    {
      title: '可推广渠道（城市）',
      dataIndex: 'managedCommunities',
      width: 200,
      align: 'center',
    },
    {
      title: '已推广渠道（城市）',
      dataIndex: 'status',
      width: 200,
      align: 'center',
    },
    {
      title: '操作',
      width: 140,
      align: 'center',
      fixed: 'right',
      render: (text, record) => {
        return (
          <div className="operateBtn-container-inline">
            <a onClick={() => editItem(record)}>编辑</a>
            <span />
            <a className="table-operate" onClick={() => handleStatus(record)}>
              设置推广
            </a>
          </div>
        );
      },
    },
  ],
};
