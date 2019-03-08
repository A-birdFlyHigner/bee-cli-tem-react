import React from 'react'
import { LeDialog, LeForm } from '@lib/lepage'
import { Dialog } from '@lib/nowrapper/lib/antd'
import Reg from '@/utils/reg'
import { ImageTextCard } from '@/components/InfoCard'
import SkuDetail from '../../common/skuDetail'
import StoreInfo from '../../common/storeInfo'
import { dialogFormSetTimeConfig, dialogFormSetGroupConfig, dialogFormTextConfig } from '../../common/commonConfig.js'

// import { history } from '@/index.js'
import router from 'umi/router'
import * as Sty from '../index.less'


// 设置排序值
const setGroupValue = (err, values, formCore, listCore) => {
  LeDialog.show(
    {
      title: '设置排序值',
      width: '600px',
      content () {
        return <LeForm {...dialogFormSetGroupConfig()} />
      },
      onOk: (values, suc, core) => {
        suc()
      }
    }
  )
}

// 单个回退
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

// 编辑
const editItem = (id) => {
  router.push({
    pathname: '/goods/base/detail/:id',
    state: id
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
    {
      title: '设置活动时间',
      width: '600px',
      content () {
        return <LeForm {...dialogFormSetTimeConfig()} />
      },
      onOk: (values, suc, core) => {
        suc()
      }
    }
  )
}

// 单个撤销推广
const revocate = (id) => {
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
  scroll: { x: 1300 },
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
    align: 'center',                          
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
    align: 'center',                          
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
    align: 'center',                          
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
    align: 'center',                          
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
    dataIndex: ' provinceName',
    key: 'productGrounp',
    align: 'center',                          
    singleLine: true,
  }, {
    title: '城市',
    dataIndex: 'cityName',
    key: 'city',
    align: 'center',                          
    singleLine: true,
  }, {
    title: '库存信息',
    dataIndex: 'storeInfo',
    key: 'storeInfo',
    align: 'center',                          
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
    align: 'center',                          
    render: (val, record) => {
      return (
        <div className={Sty.store}>
          <span>店铺ID：10</span><br></br>        
          <span>店铺名称：长沙一哥店铺</span><br></br>                  
        </div> 
      )
    }
  },  {
    title: '总部审核状态',
    dataIndex: 'examineStatus',
    key: 'examineStatus',
    align: 'center',                      
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
    align: 'center',                  
    fixed: 'right',      
    render: (text, record) => {
      return (
        <div className="operateBtn-container-inline list-inline">
          {
            record.status !== 1?<div>
              <a onClick={e => setGroupValue()}>设置排序值</a>
              <span></span>
              <a onClick={e => goBack(record.id)}>回退</a>
            </div>:<div>
              <a onClick={e => editItem(record.id)}>编辑</a>
              <span></span>
              <a onClick={e => goSetTime(record.id)}>排期</a>
              <span></span>          
              <a className='table-operate' onClick={e => revocate(record.id)}>撤销推广</a>
            </div>
          }
        </div>
      )
    }
  }]
}