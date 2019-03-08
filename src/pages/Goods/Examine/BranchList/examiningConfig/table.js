import React from 'react'
import { LeDialog, LeForm } from '@lib/lepage'
import { ImageTextCard } from '@/components/InfoCard'
import * as Sty from '../index.less'

import SkuDetail from '../../common/skuDetail'
import StoreInfo from '../../common/storeInfo'
import { dialogFormTextConfig } from '../../common/commonConfig.js'

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
        <SkuDetail productId={id}></SkuDetail>
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
const goExamine = (record) => {
  LeDialog.show(
    {
      title: '审核',
      width: '400px',
      content () {
        return <LeForm {...dialogFormTextConfig('审核')} />
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
    dataIndex: 'cityCode',
    key: 'cityCode',
    singleLine: true,
  }, {
    title: '基础信息',
    dataIndex: 'id',
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
          ]}
        >
        </ImageTextCard>
      )
    }
  }, {
    title: '类目',
    dataIndex: 'categoryPath',
    key: 'categoryPath',
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
          3个<br/>
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
          <span>市场价:80.00~100.00</span><br></br>
          <span>成本价:80.00~100.00</span><br></br>
          <span>非会员价:80.00~101.00</span><br></br>
          <span>非会员价:60.00~102.00</span><br></br>
        </div>
      )
    }
  }, {
    title: '推广城市',
    dataIndex: 'spreadCity',
    key: 'spreadCity',
    singleLine: true,
  }, {
    title: '库存信息',
    dataIndex: 'storeInfo',
    key: 'storeInfo',
    render: (val, record) => {
      return (
        <div className={Sty.store}>
          <span>推广库存：100</span><br></br>
          <span>累计售出：10</span><br></br>
          <a className="linkButton" onClick={e => getStoreInfo(record.id)}>查看</a>
        </div>
      )
    }
  }, {
    title: '店铺名称',
    dataIndex: 'shopName',
    key: 'shopName',
    singleLine: true,
  }, {
    title: '店铺Id',
    dataIndex: 'shopId',
    key: 'shopId',
    singleLine: true,
  }, {
    title: '提审时间',
    dataIndex: 'passTime',
    key: 'passTime',
    singleLine: true,
  }, {
    title: '操作',
    width: 140,
    render: (text, record) => {
      return (
        <div className="operateBtn-container-inline">
          <a onClick={e => goExamine(record)}>审核</a>
        </div>
      )
    }
  }]
}
