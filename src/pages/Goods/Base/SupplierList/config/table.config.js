import React from 'react';
import { LeDialog, LeList } from '@lib/lepage';
import ImgPreview from '@/components/ImgPreview'
import router from 'umi/router'

// 查看基础商品规格详情
const showSpecDetailDialog = dataSource => {

  const tableConfig = {
    rowKey: 'skuId',
    columns: [{
        title: 'skuId',
        dataIndex: 'skuId'
      },
      {
        title: 'sku编码(发货编码)',
        dataIndex: 'deliverCode',
        render (value) {
          return value || '/'
        }
      },
      {
        title: 'sku规格',
        dataIndex: 'propertyPairList',
        render(value = [], { status } = {}) {
          const statusRender = status === 0
          ? <span style={{color: 'red'}}>(停售)</span>
          : null
          const skuText = value.length === 0
          ? '默认'
          : value.map(item => item.pvName).join('-')

          return (
            <span>
              {statusRender}
              {skuText}
            </span>
          )
        }
      },
      {
        title: '成本价',
        dataIndex: 'costPrice'
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
      return <LeList {...listConfig} />
    }
  });
};

export default {
  rowKey: 'saleGoodsId',
  columns: [
    {
      title: '商品Id',
      dataIndex: 'saleGoodsId',
    },
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '商品主图',
      dataIndex: 'mainImages',
      render(value = []) {
        if (!value || value.length === 0) {
          return null
        }
        const imgs = value.map(item => item.url)
        return <ImgPreview url={imgs} />
      }
    },
    {
      title: '类目',
      dataIndex: 'pathName',
      render(value) {
        const symbol = '>';
        return value.split(',').map((item, index) => {
          const key = `${item}-${index}`
          return (
            <span key={key}>
              {symbol} {item} <br />
            </span>
          )
        })
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
            <a onClick={() => showSpecDetailDialog(value)}>查看</a>
          </span>
        )
      }
    },
    {
      title: '基础价格信息',
      dataIndex: 'salePrice',
      render(value) {
        return `成本价：${value}`
      }
    },
    {
      title: '品牌名',
      dataIndex: 'brandName',
    },
    ADMIN_TYPE === 'SUPPLIER'
    ?
      {
        title: '操作',
        render(value, item) {
          const { saleGoodsId: id } = item
          return <a onClick={() => {router.push(`/goods/update?itemId=${id}`)}}>编辑</a>
        },
      }
    : null
  ].filter(item => item !== null)
};
