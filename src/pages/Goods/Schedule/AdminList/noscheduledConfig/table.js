import React from 'react'
import { LeDialog, LeForm } from '@lib/lepage'
import SkuDetail from '../../common/skuDetail'
import StoreInfo from '../../common/storeInfo'
import { dialogFormTextConfig } from '../../common/commonConfig'

import { ImageTextCard } from '@/components/InfoCard'
import * as Sty from '../index.less'


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
        <StoreInfo productId={id} />
      )
    }
  })
}

// 单个撤销
const goRevoke = (record) => {
  LeDialog.show(
    {
      title: '撤销推广',
      width: '400px',
      content () {
        return <LeForm {...dialogFormTextConfig('撤销推广')} />
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
        />
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
                  { item }<br />
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
    title: '出售时间',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
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
    title: '地址信息',
    dataIndex: 'addressInfo',
    key: 'addressInfo',
    render: (val, record) => {
      return (
        <div className={Sty.store}>
          <span>分公司：长沙分公司</span><br></br>
          <span>出售城市：长沙</span><br></br>
          <span>店铺ID：10</span><br></br>
          <span>店铺名称：长沙一哥店铺</span><br></br>
        </div>
      )
    }
  },  {
    title: '审核状态',
    dataIndex: 'examineStatus',
    key: 'examineStatus',
    render: (val, record) => {
      return (
        <div className={Sty.store}>
          <span>已拒绝</span><br></br>
          <span>原因：不符合规则</span><br></br>
        </div>
      )
    }
  }, {
    title: '操作',
    width: 140,
    render: (text, record) => {
      return (
        <div className="operateBtn-container-inline">
          <a onClick={e => goRevoke(record)}>撤销推广</a>
        </div>
      )
    }
  }]
}
