import React from 'react'
import { LeDialog } from '@lib/lepage'
import moment from 'moment'
import { ImageTextCard } from '@/components/InfoCard'
import router from 'umi/router'
import SkuDetail from '../../../common/skuInfo'
import StoreInfo from '../../../common/storeInfo'
import { goSetTime, goRevoke } from '../../../common/commonConfig'
import commonMessage from '@/static/commonMessage'
import * as Sty from '../index.less'

const { logisticsMethod, logisticsType } = commonMessage

const editItem = (id) => {
  router.push({
    pathname: `/goods/schedule/branchdetail/${id}`,
    query: {
      tabType: '1'
    }
  })
}

// 渠道商品规格详情
const getSkuDetail = (saleUnits) => {
  LeDialog.show({
    title: '渠道商品规格详情',
    width: '1000px',
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
  },  {
    title: '类目',
    dataIndex: 'pathName',
    key: 'pathName',      
    width: 300,
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
    dataIndex: 'specifications',
    key: 'specifications',
    width: 80,                             
    align: 'center',                          
    render: (val, record) => {
      return(
        <span className="list-inline">
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
    width: 280,                                                              
    render: (values,record) => {
      return (
        <div className="list-inline">
          <span>市场价: {record.marketPriceStr}</span><br />
          <span>成本价: {record.salePrice}</span><br />
          <span>非会员价: {record.nonmemberPriceStr}</span><br />
          <span>会员价: {record.memberPriceStr}</span><br />
          <span>毛利: {record.grossProfitStr}</span><br />
        </div>
      )
    }
  }, {
    title: '城市',
    dataIndex: 'cityName',
    key: 'cityName',
    width: 100,    
    align: 'center',                          
    singleLine: true,
  }, {
    title: '库存信息',
    dataIndex: 'storeInfo',
    key: 'storeInfo',
    align: 'center',    
    width: 180,                                                             
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
    title: '地址信息',
    dataIndex: 'addressInfo',
    key: 'addressInfo',
    align: 'center',    
    width: 140,                                                             
    render: (value, record) => {
      return (
        <div className={Sty.store}>
          <span>店铺ID：{record.sellerMainId}</span><br />
          <span>店铺名称：{record.sellerMainName}</span><br />
        </div>
      )
    }
  },  {
    title: '审核通过时间',
    dataIndex: 'examineTime',
    key: 'examineTime',
    width: 200,                                                   
    align: 'center',                          
    render: (value, record) => {
      return (
        <div>
          {moment(record.promotionPassTime).format('YYYY.MM.DD HH:mm:ss')}
        </div>
      )
    }
  }, {
    title: '操作',
    width: 120,
    align: 'center', 
    fixed: 'right',                                   
    render: (text, record, index, {leList} ) => {
      return (
        <div className="operateBtn-container-inline list-inline">
          <a onClick={()=> editItem(record.saleGoodsId)}>编辑</a>
          <span />
          <a onClick={()=> goSetTime(record.saleGoodsId, leList)}>排期</a>
          <span />
          <a className='table-operate' onClick={()=> goRevoke(record.saleGoodsId, leList)}>撤销推广</a>
        </div>
      )
    }
  }]
}
