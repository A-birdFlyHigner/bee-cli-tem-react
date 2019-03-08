import React from 'react'
import { LeDialog, LeForm } from '@lib/lepage'
import { ImageTextCard } from '@/components/InfoCard'
import * as Sty from '../index.less'
import SkuDetail from '../../common/skuDetail'
import StoreInfo from '../../common/storeInfo'
import { dialogFormTextConfig } from '../../common/commonConfig'

// 渠道商品规格详情
const getSkuDetail = (id) => {
  LeDialog.show({
    title: '渠道商品规格详情',
    width: '800px',
    maskClosable: true,
    footer () {
      return null
    },
    content () {
      return (
        <SkuDetail productId={id} />
      )
    }
  })
}

// 库存信息
const getStoreInfo = (id) => {
  LeDialog.show({
    title: '库存信息',
    width: '1000px',
    maskClosable: true,
    footer () {
      return null
    },
    content () {
      return (
        <StoreInfo productId={id}></StoreInfo>
      )
    }
  })
}

// 强制回退
const goBack = (record) => {
  LeDialog.show(
    {
      title: '回退',
      width: '400px',
      content () {
        return <LeForm {...dialogFormTextConfig('回退')} />
      },
      onOk: (values, suc, core) => {
        suc()
      }
    }
  )
}

export default {
  rowKey: 'id',
  scroll: { x: 1500 },
  rowSelection: {
    selections: true,
    getCheckboxProps(record) {
      return {};
    },
  },
  columns: [{
    title: '渠道商品id',
    dataIndex: 'channelProductId',
    key: 'channelProductId',
    singleLine: true,
  }, {
    title: '基础信息',
    dataIndex: 'id',
    render: (val, record) => {
      return (
        <ImageTextCard
          image={record.mainImages.url}
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
              label: '商品id',
              value: record.id,
            },
            {
              label: '发货方式',
              value: record.logisticsMethod,
            },
            {
              label: '发货时效',
              value: record.logisticsType,
            },
          ]}
        >
        </ImageTextCard>
      )
    }
  }, {
    title: '类目',
    dataIndex: 'categoryName',
    key: 'categoryName',
    mutipleLine: true,
    render: (value, record) => {
      const vals = '食品,水果,橘子'
      return (
        <div>
          {
            vals && vals.split(',').map(
              (item, index) => (
                <span key={index}>
                  &gt;
                  { item }<br></br>
                </span>
              )
            )
          }
        </div>
      )
    },
  }, {
    title: '规格',
    dataIndex: 'name',
    key: 'name',
    render: (val, record) => {
      return(
        <span>
          {record.properties.propertyValue}个<br/>
          <a className="linkButton" onClick={e => getSkuDetail(record.id)}>查看</a>
        </span>
      )
    }
  }, {
    title: '价格信息',
    dataIndex: 'price',
    key: 'price',
    render: (val, record) => {
      return (
        <div className={Sty.prices}>
          <span>市场价:{record.saleUnits.marketPrice}</span><br></br>
          <span>成本价:{record.saleUnits.costPrice}</span><br></br>
          <span>非会员价:{record.saleUnits.nonmemberPrice}</span><br></br>
          <span>会员价:{record.saleUnits.memberPrice}</span><br></br>
          <span>毛利:{record.saleUnits.grossProfit}</span><br></br>
        </div>
      )
    }
  }, {
    title: '出售时间',
    dataIndex: 'applyPromotionTime',
    key: 'applyPromotionTime',
    singleLine: true,
  }, {
    title: '库存信息',
    dataIndex: 'storeInfo',
    key: 'storeInfo',
    render: (val, record) => {
      return (
        <div className={Sty.store}>
          <span>推广库存：{record.saleUnits.spreadStock}</span><br></br>
          <span>累计售出：{record.saleStock}</span><br></br>
          <a className="linkButton" onClick={e => getStoreInfo(record.id)}>查看</a>
        </div>
      )
    }
  }, {
    title: '地址信息',
    dataIndex: 'addressInfo',
    key: 'addressInfo',
    render: (val, record) => {
      return (
        <div className={Sty.store}>
          <span>分公司：{record.companyName}</span><br></br>
          <span>出售城市：{record.cityName}</span><br></br>
          <span>店铺ID：{record.sellerMainId}</span><br></br>
          <span>店铺名称：{record.sellerMainName}</span><br></br>
        </div>
      )
    }
  }, {
    title: '操作',
    width: 140,
    render: (text, record) => {
      return (
        <div className="operateBtn-container-inline">
          <a onClick={e => goBack(record)}>回退</a>
        </div>
      )
    }
  }]
}
