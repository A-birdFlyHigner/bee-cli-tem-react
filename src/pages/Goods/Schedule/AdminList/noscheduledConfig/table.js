import React from 'react'
import router from 'umi/router'
import { ImageTextCard } from '@/components/InfoCard'
import { LeDialog } from '@lib/lepage'
import SkuDetail from '../../../common/skuInfo'
import StoreInfo from '../../../common/storeInfo'
import { goadminRevoke } from '../../../common/commonConfig'
import commonMessage from '@/static/commonMessage'
import * as Sty from '../index.less'

const { logisticsMethod, logisticsType } = commonMessage

// 进入商品详情
const goBaseDetail = (id) => {
  router.push({
    pathname: `/goods/schedule/adminProductdetail/${id}`,
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
  columns: [
    {
      title: '渠道商品id',
      dataIndex: 'saleGoodsId',
      key: 'saleGoodsId',
      singleLine: true,
      width: 300,                     
    }, {
      title: '基础信息',
      key: 'baseInfo',
      width: 300,        
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
            ]}
          />
        )
      }
    }, {
      title: '类目',
      dataIndex: 'pathName',
      key: 'pathName',      
      width: 300,
      mutipleLine: true,
      render: (vals) => {
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
      dataIndex: 'specifications',
      key: 'specifications',
      width: 100,                               
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
      title: '库存信息',
      dataIndex: 'storeInfo',
      key: 'storeInfo',    
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
      width: 500,                                   
      render: (value,record) => {
        return (
          <div>
            <span>分公司：{record.companyName}</span><br />
            <span>出售城市：{record.cityName}</span><br />              
            <span>店铺ID：{record.sellerMainId}</span><br />
            <span>店铺名称：{record.sellerMainName}</span><br />
          </div>
        )
      }
    }, {
    title: '操作',
    width: 100,
    align: 'center',
    fixed: 'right',  
    render: (text, record) => {
      return (
        <div className="operateBtn-container-inline">
          <a onClick={()=> goadminRevoke(record.saleGoodsId)}>撤销推广</a>
          <span />
          <a onClick={()=> goBaseDetail(record.saleGoodsId)}>查看</a>
        </div>
      )
    }
  }]
}
