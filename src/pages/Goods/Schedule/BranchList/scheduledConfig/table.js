import React from 'react'
import { LeDialog } from '@lib/lepage'
import { ImageTextCard } from '@/components/InfoCard'
import SkuDetail from '../../../common/skuInfo'
import StoreInfo from '../../../common/storeInfo'
import { setGroupValue, goBack } from '../../../common/commonConfig'
import commonMessage from '@/static/commonMessage'
import * as Sty from '../index.less'

const { logisticsMethod, logisticsType } = commonMessage

// 库存信息
const getStoreInfo = (saleUnits) => {
  LeDialog.show({
    title: '库存信息',
    width: '1000px',
    maskClosable: true,
    footer () {
      return null
    },
    content () {
      return (
        <StoreInfo saleUnitsInfo={saleUnits} />
      )
    }
  })
}


// 渠道商品规格详情
const getSkuDetail = (saleUnits) => {
  LeDialog.show({
    title: '渠道商品规格详情',
    width: '800px',
    maskClosable: true,
    footer () {
      return null
    },
    content () {
      return (
        <SkuDetail saleUnitsInfo={saleUnits} />
      )
    }
  })
}

export default {
  rowKey: 'saleGoodsId',
  scroll: { x: 1800 },
  rowSelection: {
    selections: true,
    getCheckboxProps() {
      return {};
    },
  },
  columns: [{
    title: '渠道商品id',
    dataIndex: 'saleGoodsId',
    key: 'saleGoodsId',
    align: 'center',                  
    singleLine: true,
  }, {
    title: '基础信息',
    key: 'baseInfo',
    dataIndex: 'baseInfo',
    render: (val, record) => {
      return (
        <ImageTextCard
          image={record.mainImages[0].url}
          infoList={[
            {
              label: '商品名称',
              value: record.name,
            },
            {
              label: '品牌',
              value: record.brandName?record.brandName:'无',
            },
            {
              label: '商品id',
              value: record.saleGoodsId,
            },
            {
              label: '发货方式',
              value: logisticsMethod[record.logisticsMethod],
            },
            {
              label: '发货时效',
              value: logisticsType[record.logisticsType],
            },
          ]}
        />
      )
    }
  }, {
    title: '类目',
    dataIndex: 'pathName',
    key: 'pathName',
    align: 'center',      
    width: 100,
  }, {
    title: '规格',
    dataIndex: 'specifications',
    key: 'specifications',
    width: 100,           
    align: 'center',                    
    render: (val, record) => {
      return(
        <span>
          {record.saleUnits.length}个<br />
          <a className="linkButton" onClick={()=> getSkuDetail(record.saleUnits)}>查看</a>
        </span>
      )
    }
  }, {
    title: '价格信息',
    dataIndex: 'price',
    key: 'price',
    align: 'center',  
    width: 300,                                 
    render: (values,record) => {
      return (
        <div className={Sty.prices}>
          <span>市场价: {record.marketPriceStr}</span><br />
          <span>成本价: {record.salePrice}</span><br />
          <span>非会员价: {record.nonmemberPriceStr}</span><br />
          <span>会员价: {record.memberPriceStr}</span><br />
          <span>毛利: {record.grossProfitStr}</span><br />
        </div>
      )
    }
  }, {
    title: '商品分组',
    dataIndex: 'groupName',
    key: 'groupName',
    align: 'center',          
    width: 200,              
    singleLine: true,
  }, {
    title: '城市',
    dataIndex: 'cityName',
    key: 'cityName',
    width: 120,               
    align: 'center',                    
    singleLine: true,
  }, {
    title: '库存信息',
    dataIndex: 'storeInfo',
    key: 'storeInfo',
    align: 'center',    
    width: 300,                                   
    render: (value,record) => {
      return (
        <div>
          <span>推广库存：{record.totalStock}</span><br />
          <span>累计售出：{record.saleStock}</span><br />
          <a className="linkButton" onClick={()=> getStoreInfo(record.saleUnits)}>查看</a>
        </div>
      )
    }
  }, {
    title: '地址信息',
    dataIndex: 'addressInfo',
    key: 'addressInfo',
    align: 'center',    
    width: 300,                                   
    render: (value,record) => {
      return (
        <div>
          <span>店铺ID：{record.sellerMainId}</span><br />
          <span>店铺名称：{record.sellerMainName}</span><br />
        </div>
      )
    }
  },  {
    title: '商品出售状态',
    dataIndex: 'cityName',
    key: 'saleingStatus',
    width: 200,    
    align: 'center',                    
    singleLine: true,
  }, {
    title: '出售时间',
    dataIndex: 'phoneNumber',
    key: 'scheduleTime',
    align: 'center',     
    width: 200,                    
    singleLine: false,
  },{
    title: '操作',
    width: 100,
    align: 'center',                
    fixed: 'right',  
    render: (text, record) => {
      return (
        <div className="operateBtn-container-inline list-inline">
          <a onClick={()=> setGroupValue(record.saleGoodsId)}>设置排序值({record.sortNumber})</a>
          <span />
          <a onClick={()=> goBack(record.saleGoodsId)}>回退</a>
        </div>
      )
    }
  }]
}
