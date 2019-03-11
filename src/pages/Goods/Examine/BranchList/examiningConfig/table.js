import React from 'react'
import router from 'umi/router'
import { LeDialog } from '@lib/lepage'
import { ImageTextCard } from '@/components/InfoCard'
import * as Sty from '../index.less'
import SkuDetail from '../../../common/skuInfo'
import StoreInfo from '../../../common/storeInfo'

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

// 审核
const goExamine = (id) => {
  router.push({
    pathname: `/goods/examine/branchdetail/${id}`,
  })
}

export default {
  rowKey: 'id',
  scroll: { x: 1600 },
  rowSelection: {
    selections: true,
    getCheckboxProps() {
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
    align: 'center',     
    width: 100,                                                       
    mutipleLine: true,
    render: () => {
      const vals = '食品,水果,橘子'
      return (
        <div>
          {
            vals && vals.split(',').map(
              (item) => (
                <span key={item}>
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
    width: 100,                                                       
    align: 'center',     
    render: (val, record) => {
      return(
        <span>
          3个<br />
          <a className="linkButton" onClick={()=> getSkuDetail(record.id)}>查看</a>
        </span>
      )
    }
  }, {
    title: '价格信息',
    dataIndex: 'price',
    key: 'price',
    width: 280,                                                       
    align: 'center',     
    render: () => {
      return (
        <div className={Sty.prices}>
          <span>市场价:80.00~100.00</span><br />
          <span>成本价:80.00~100.00</span><br />
          <span>非会员价:80.00~101.00</span><br />
          <span>非会员价:60.00~102.00</span><br />
        </div>
      )
    }
  }, {
    title: '推广城市',
    dataIndex: 'spreadCity',
    key: 'spreadCity',
    align: 'center',     
    width: 100,                                                           
    singleLine: true,
  }, {
    title: '库存信息',
    dataIndex: 'storeInfo',
    key: 'storeInfo',
    align: 'center',     
    width: 280,                                                               
    render: (val, record) => {
      return (
        <div className={Sty.store}>
          <span>推广库存：100</span><br />
          <span>累计售出：10</span><br />
          <a className="linkButton" onClick={()=> getStoreInfo(record.id)}>查看</a>
        </div>
      )
    }
  }, {
    title: '店铺名称',
    dataIndex: 'shopName',
    key: 'shopName',
    align: 'center',   
    width: 100,                                                                     
    singleLine: true,
  }, {
    title: '店铺Id',
    dataIndex: 'shopId',
    key: 'shopId',
    align: 'center',  
    width: 100,                                                                            
    singleLine: true,
  }, {
    title: '提审时间',
    dataIndex: 'passTime',
    width: 100,                                                                                
    key: 'passTime',
    align: 'center',     
    singleLine: true,
  }, {
    title: '操作',
    width: 100,
    align: 'center', 
    fixed: 'right',
    render: (text, record) => {
      return (
        <div className="operateBtn-container-inline">
          <a onClick={()=> goExamine(record.id)}>审核</a>
        </div>
      )
    }
  }]
}
