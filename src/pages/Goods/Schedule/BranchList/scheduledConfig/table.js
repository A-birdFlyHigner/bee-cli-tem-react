import React from 'react'
import { LeDialog } from '@lib/lepage'
import { Dialog } from '@lib/nowrapper/lib/antd'
import formConfig from './header.js'
import { ImageTextCard } from '@/components/InfoCard'
import SkuDetail from '../../common/skuDetail'
import StoreInfo from '../../common/storeInfo'
import { dialogFormJoinGroupConfig, dialogFormSetGroupConfig, dialogFormTextConfig } from '../../common/commonConfig.js'
import * as Sty from '../index.less'

// 设置排序值
const setGroupValue = (err, values, formCore, listCore) => {
  LeDialog.show(
    dialogFormSetGroupConfig(),
    {
      title: '设置排序值',
      width: '600px',
      onOk: (values, suc, core) => {
        suc()
      }
    }
  )
}

// 库存信息
const getStoreInfo = (id) => {
  Dialog.show({
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

// 单个回退
const goBack = (record) => {
  LeDialog.show(
    dialogFormTextConfig('回退'), 
    {
      title: '回退',
      width: '400px',
      onOk: (values, suc, core) => {
        suc()
      }
    }
  )
}

// 渠道商品规格详情
const getSkuDetail = (id) => {
  Dialog.show({
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
              label: '品牌',
              value: record.cityName,
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
    title: '商品分组',
    dataIndex: 'provinceName',
    key: 'productGrounp',
    singleLine: true,
  }, {
    title: '城市',
    dataIndex: 'cityName',
    key: 'city',
    singleLine: true,
  }, {
    title: '库存信息',
    dataIndex: 'storeInfo',
    key: 'storeInfo',
    render: (val, record) => {
      return (
        <div>
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
        <div>
          <span>店铺ID：10</span><br></br>        
          <span>店铺名称：长沙一哥店铺</span><br></br>                  
        </div> 
      )
    }
  },  {
    title: '商品出售状态',
    dataIndex: 'cityName',
    key: 'saleingStatus',
    singleLine: true,
  }, {
    title: '出售时间',
    dataIndex: 'phoneNumber',
    key: 'scheduleTime',
    singleLine: true,
  },{
    title: '操作',
    width: 140,
    render: (text, record) => {
      return (
        <div className="operateBtn-container-inline list-inline">
          <a onClick={e => setGroupValue(record)}>设置排序值</a>
          <span></span>
          <a onClick={e => goBack(record.id)}>回退</a>
        </div>
      )
    }
  }]
}