import React from 'react';
import { ImageTextCard } from '@/components/InfoCard';
import { LeDialog } from '@lib/lepage'
import router from 'umi/router';
import SkuDetail from '../../../common/skuDetail';

const editItem = () => {};

const handleStatus = (record) => {
  const {saleGoodsId} = record
  router.push({
    pathname: `/goods/spread/setting`,
    query: {
      productIds: saleGoodsId
    }
  })
};

const skuDetail = record => {
  const { saleUnits } = record
  LeDialog.show({
    title: '基础商品规格详情',
    width: '800px',
    maskClosable: true,
    footer() {
      return null;
    },
    content() {
      return <SkuDetail saleUnits={saleUnits} />;
    },
  });
};

export default {
  rowKey: 'saleGoodsId',
  scroll: { x: 1300 },
  rowSelection: {
    selectedRowKeys: [],
    selections: true,
    getCheckboxProps(record) {
      const { canSpreadCityNums, alreadySpreadCityNums } = record
      return {
        disabled: canSpreadCityNums <= alreadySpreadCityNums
      };
    },
  },
  columns: [
    {
      title: '基础信息',
      dataIndex: 'saleGoodsId',
      render: (val, record) => {
        const { mainImages = [] } = record
        return (
          <ImageTextCard
            image={mainImages.length ? mainImages[0].url : ''}
            infoList={[
              {
                label: '商品名称',
                value: record.name,
              },
              {
                label: '品牌',
                value: record.brandName,
              },
              {
                label: '商品Id',
                value: record.saleGoodsId,
              },
            ]}
          />
        );
      },
    },
    {
      title: '类目',
      dataIndex: 'pathName',
      width: 150,
      render: (text) => {
        return (
          <div>
            {text &&
              text.split(',').map((item) => (
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
      dataIndex: 'saleUnits',
      width: 100,
      render: (saleUnits, record) => {
        return (
          <span>
            {saleUnits.length}个
            <br />
            <a className="linkButton" onClick={() => skuDetail(record)}> 查看 </a>
          </span>
        );
      },
    },
    {
      title: '基础价格信息',
      dataIndex: 'salePrice',
      width: 200,
    },
    {
      title: '可推广渠道（城市）',
      dataIndex: 'canSpreadCityNums',
      width: 200,
      align: 'center',
    },
    {
      title: '已推广渠道（城市）',
      dataIndex: 'alreadySpreadCityNums',
      width: 200,
      align: 'center',
    },
    {
      title: '操作',
      width: 140,
      align: 'center',
      fixed: 'right',
      render: (text, record) => {
        const { canSpreadCityNums, alreadySpreadCityNums } = record
        return (
          <div className="operateBtn-container-inline">
            <a onClick={() => editItem(record)}>编辑</a><br />
            {canSpreadCityNums <= alreadySpreadCityNums ? null :
            <a className="table-operate" onClick={() => handleStatus(record)}>
              设置推广
            </a>}
          </div>
        );
      },
    },
  ],
};
