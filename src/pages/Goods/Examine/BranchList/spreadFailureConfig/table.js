import React from 'react'
import moment from 'moment'
import { LeDialog } from '@lib/lepage'
import { ImageTextCard } from '@/components/InfoCard'
import * as Sty from '../index.less'
import commonMessage from '@/static/commonMessage'
import SkuDetail from '../../../common/skuInfo'
import StoreInfo from '../../../common/storeInfo'

const { logisticsMethod, logisticsType } = commonMessage

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

export default {
  rowKey: 'saleGoodsId',
  scroll: { x: 1700 },
  columns: [{
    title: '渠道商品id',
    dataIndex: 'saleGoodsId',
    key: 'saleGoodsId',
    align: 'center',     
    singleLine: true,
  }, {
    title: '基础信息',
    dataIndex: 'id',
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
              value: record.brandName,
            },
            {
              label: '商品id',
              value: record.baseSaleGoodsId,
            },
            {
              label: '发货方式',
              value: logisticsMethod[record.logisticsMethod],
            },
            {
              label: '发货时效',
              value: logisticsType[record.logisticsType],
            },
            {
              label: '发货时间',
              value: record.logisticsType === 2 ? `${record.dispatchDate}天` : '',
            },
          ]}
        />
      )
    }
  }, {
    title: '类目',
    dataIndex: 'pathName',
    key: 'pathName',
    align: 'left',     
    width: 200,                                                                                
    mutipleLine: true,
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
    },
  }, {
    title: '规格',
    dataIndex: 'saleUnits',
    key: 'saleUnits',
    width: 100,                                                                                
    align: 'left',     
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
    width: 280,                                                                            
    align: 'left',     
    render: (val, record) => {
      return (
        <div className={Sty.prices}>
          <span>市场价:{record.marketPriceStr}</span><br />
          <span>成本价:{record.salePrice}</span><br />
          <span>非会员价:{record.nonmemberPriceStr}</span><br />
          <span>会员价:{record.memberPriceStr}</span><br />
          <span>毛利:{record.grossProfitStr}</span><br />
        </div>
      )
    }
  }, {
    title: '推广城市',
    dataIndex: 'cityName',
    key: 'cityName',
    align: 'left',  
    width: 140,                                                                                   
    singleLine: true,
  }, {
    title: '库存信息',
    dataIndex: 'storeInfo',
    key: 'storeInfo',
    width: 240,                                                                                       
    align: 'left',     
    render: (values, record) => {
      return (
        <div className={Sty.store}>
          <span>推广库存：{record.totalStock}</span><br />
          <span>累计售出：{record.saleStock}</span><br />
          <a className="linkButton" onClick={()=> getStoreInfo(record.saleUnits)}>查看</a>
        </div>
      )
    }
  }, {
    title: '店铺名称',
    dataIndex: 'sellerMainName',
    key: 'sellerMainName',
    align: 'left',     
    width: 120,                                                                                           
    singleLine: true,
  }, {
    title: '店铺Id',
    dataIndex: 'sellerMainId',
    key: 'sellerMainId',
    width: 100,                                                                                               
    align: 'left',     
    singleLine: true,
  }, {
    title: '提审时间',
    dataIndex: 'applyPromotionTime',
    width: 100,                                                                                               
    key: 'applyPromotionTime',
    align: 'left',     
    render: (val) =>{
      return (
        <div> 
          {moment(val).format('YYYY.MM.DD HH:mm:ss')}
        </div>
      )
    }
  }, {
    title: '未通过时间',
    dataIndex: 'reviewTime',
    key: 'reviewTime',
    width: 200,
    align: 'left',     
    render: (val) =>{
      return (
        <div> 
          {moment(val).format('YYYY.MM.DD HH:mm:ss')}
        </div>
      )
    }
  }, {
    title: '原因',
    dataIndex: 'promotionFailureReason',
    width: 150,                                                                                           
    key: 'promotionFailureReason',
    align: 'left',     
    singleLine: true,
  },]


}
