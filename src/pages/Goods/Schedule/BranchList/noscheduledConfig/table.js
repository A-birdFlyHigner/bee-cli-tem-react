import React from 'react'
import { LeDialog, LeForm } from '@lib/lepage'
import { Dialog } from '@lib/nowrapper/lib/antd'
import { ImageTextCard } from '@/components/InfoCard'
import router from 'umi/router'
import SkuDetail from '../../common/skuDetail'
import StoreInfo from '../../common/storeInfo'
import { dialogFormSetTimeConfig } from '../../common/commonConfig.js'

import * as Sty from '../index.less'


const editItem = (record) => {
  router.push({
    pathname: '/goods/base/detail/:id',
  })
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

// 排期
const goSetTime = (id) => {

  LeDialog.show(
    dialogFormSetTimeConfig(), 
    {
      title: '设置活动时间',
      width: '600px',
      onOk: (values, suc, core) => {
        suc()
      }
    }
  )

}

const dialogFormRevokeConfig = () => {
  return {
    form: {
      layout: { // 表单布局 左侧和右侧比例
        label: 6,
        control: 14
      }
    },
    items: [
      {
        label: '',
        name: 'text',
        render: (values, core) => {
          return (
            <div>确定撤销推广？</div>
          )
        },
      },
    ],
  }
} 

// 撤销
const goRevoke = (record) => {
  LeDialog.show(
    {
      title: '撤销推广',
      width: '400px',
      content () {
        return <LeForm {...dialogFormRevokeConfig()} />
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
        <div className="list-inline">
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
        <span className="list-inline">
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
        <div className="list-inline">
          <span>市场价:80.00~100.00</span><br></br>
          <span>成本价:80.00~100.00</span><br></br>
          <span>非会员价:80.00~101.00</span><br></br>        
          <span>非会员价:60.00~102.00</span><br></br>   
        </div>
      )
    }
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
          <span>店铺ID：10</span><br></br>        
          <span>店铺名称：长沙一哥店铺</span><br></br>                  
        </div> 
      )
    }
  },  {
    title: '审核通过时间',
    dataIndex: 'examineTime',
    key: 'examineTime',
    render: (val, record) => {
      return (
        <div>
          2018.01.01 16:00             
        </div>
      )
    }
  }, {
    title: '操作',
    width: 140,
    render: (text, record) => {
      return (
        <div className="operateBtn-container-inline list-inline">
          <a onClick={e => editItem(record)}>编辑</a>
          <span></span>
          <a onClick={e => goSetTime(record.id)}>排期</a>
          <span></span>          
          <a className='table-operate' onClick={e => goRevoke(record)}>撤销推广</a>
        </div>
      )
    }
  }]
}