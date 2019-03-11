import React from 'react'
import { LeDialog, LeForm } from '@lib/lepage'
import moment from 'moment'
import { ImageTextCard } from '@/components/InfoCard'
import router from 'umi/router'
import SkuDetail from '../../../common/skuInfo'
import StoreInfo from '../../../common/storeInfo'
import { dialogFormSetTimeConfig } from '../../../common/commonConfig'
import commonMessage from '@/static/commonMessage'
import * as Sty from '../index.less'
import { addOrUpdate } from '@/services/goods'

const { logisticsMethod, logisticsType } = commonMessage

const editItem = (id) => {
  router.push({
    pathname: `/goods/schedule/branchdetail/${id}`,
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

// 排期
const goSetTime = (saleGoodsId) => {

  LeDialog.show(
    {
      title: '设置活动时间',
      width: '600px',
      content () {
        return <LeForm {...dialogFormSetTimeConfig()} />
      },
      onOk: (values, suc) => {
        const { startTime, endTime } = values.scheduleTime
        const productIdList = []
        productIdList.push(saleGoodsId)
        addOrUpdate({ startTime, endTime, productIdList }).then(res => {
          if (!res) return
          // 管理弹窗
          suc()
        })
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
        render: () => {
          return (
            <div>确定撤销推广？</div>
          )
        },
      },
    ],
  }
}

// 撤销
const goRevoke = () => {
  LeDialog.show(
    {
      title: '撤销推广',
      width: '400px',
      content () {
        return <LeForm {...dialogFormRevokeConfig()} />
      },
      onOk: (values, suc) => {
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
    dataIndex: 'categoryName',
    key: 'categoryName',
    align: 'center',        
    width: 100,                                               
    mutipleLine: true,
    render: () => {
      const vals = '食品,水果,橘子'
      return (
        <div className="list-inline">
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
    width: 80,                             
    align: 'center',                          
    render: (val, record) => {
      return(
        <span className="list-inline">
          {record.properties.propertyValue}个<br />
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
    render: (text, record) => {
      return (
        <div className="operateBtn-container-inline list-inline">
          <a onClick={()=> editItem(record.saleGoodsId)}>编辑</a>
          <span />
          <a onClick={()=> goSetTime(record.saleGoodsId)}>排期</a>
          <span />
          <a className='table-operate' onClick={()=> goRevoke(record)}>撤销推广</a>
        </div>
      )
    }
  }]
}
