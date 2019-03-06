import React from 'react';
import {
  LeDialog,
  LeList
} from '@lib/lepage';
import router from 'umi/router'

// 查看基础商品规格详情
const showSpecDetailDialog = dataSource => {

  // TODO: 基础商品列表的查看规格，没有按照后端的数据字段展示
  const tableConfig = {
    rowKey: 'skuId',
    columns: [{
        title: 'skuId',
        dataIndex: 'skuId'
      },
      {
        title: 'sku编码(发货编码)',
        dataIndex: 'skuCode'
      },
      {
        title: 'sku规格',
        dataIndex: 'name',
        render(value) {
          // TODO: 规格展示可售/停售状态
          return value
        }
      },
      {
        title: '成本价',
        dataIndex: 'price'
      }
    ],
  }
  const listConfig = {
    tableConfig,
    dataSource
  }

  // FIXME: footer、okText、cancelText 的配置统一收敛到 LePage 中
  LeDialog.show({
    title: '基础商品规格详情',
    width: 600,
    footer() {
      return null
    },
    maskClosable: true,
    content() {
      return <LeList {
        ...listConfig
      }
      />
    }
  });
};

export default {
  rowKey: 'saleGoodsId',
  columns: [{
      title: '基础信息',
      dataIndex: 'saleGoodsId',
      render(value, values) {
        const {
          mainImages: [mainImage] = [],
          name,
          brandName
        } = values

        // 商品第一张主图
        const imgRender = mainImage
        ?
          <span>
            <img src={mainImage.url} alt='' style={{width: '64px', height: '64px'}} /><br />
          </span>
        : null

        // 品牌，有品牌的时候展示
        const brandRender = brandName
        ?
          <span>
            {`品牌：${brandName}`} <br />
          </span>
        : null

        return (
          <span>
            {imgRender} {/* 商品第一张主图 */ }
            商品名称：{name} <br /> { /* 商品长名称 */ }
            {brandRender} {/* 品牌 */ }
            商品Id：{value} {/* 商品id */ }
          </span>
        )
      }
    },
    {
      title: '类目',
      dataIndex: 'pathName',
      render(value) {
        // TODO: 要跟进后端的类目数据来展示，可能前端需要做处理
        return value
      }
    },
    {
      title: '规格',
      dataIndex: 'saleUnits',
      render(value) {
        if (!value || value.length === 0) {
          return '/'
        }

        return (
          <span>
            {value.length}个 <br />
            <a onClick={() => {showSpecDetailDialog(value)}}>查看</a>
          </span>
        )
      }
    },
    {
      title: '基础价格信息',
      render() {
        // 每个sku价格相同，显示一个成本价
        // 每个sku成本价不相同，显示成XX~XX

        // TODO: 缺少单个价格展示、价格区间展示的逻辑
        return '成本价：100~200'
      }
    },
    {
      title: '操作',
      render() {
        return <a onClick={() => {router.push('/goods/publish')}}>编辑</a>
      },
    },
  ],
};
