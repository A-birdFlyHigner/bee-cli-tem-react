import React from 'react'
import { LeDialog, LeForm } from '@lib/lepage'
import { ImageTextCard } from '@/components/InfoCard'
import * as Sty from '../index.less'

import SkuDetail from '../../common/skuDetail'
import StoreInfo from '../../common/storeInfo'

const dialogFormConfig =  () => {

  return {
    form: {
      layout: { // 表单布局 左侧和右侧比例
        label: 0,
        control: 24
      }
    },
    items: [
      {
        label: '',
        name: 'text',
        render: () => {
          return(
            <div>
              <div className={Sty.dialogMb}>确定对商品进行以下审核？</div>
            </div>
          )
        },
      },
      {
        label: '',
        name: 'chooseType',
        component: 'RadioGroup',
        follow: true,
        props:{
          options:[
            {
              label:'通过',
              value:0,
            },
            {
              label:'拒绝',
              value:1,
            }
          ]
        }
      },
      {
        label:'',
        name: 'reason',
        component: 'Input',
        className: Sty.rejectReason,
        props:{
          placeholder: '请输入拒绝原因，不超过20字',
          maxLength: 20,
        },
        // when true false 控制隐藏显示此组件
        when: (val) => {
          return val.chooseType === 1
        }
      }
    ],
  }
}

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
const goExamine = () => {
  LeDialog.show(
    {
      title: '审核',
      width: '600px',
      content () {
        return <LeForm {...dialogFormConfig()} />
      },
      onOk: (values, suc ) => {
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
    dataIndex: 'channelProductId',
    key: 'channelProductId',
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
              value: record.name,
            },
            {
              label: '品牌',
              value: record.brandName,
            },
            {
              label: '商品id',
              value: record.id,
            },
            {
              label: '发货方式',
              value: record.logisticsMethod,
            },
            {
              label: '发货时效',
              value: record.logisticsType,
            },
          ]}
        />
      )
    }
  }, {
    title: '类目',
    dataIndex: 'categoryName',
    key: 'categoryName',
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
    render: (val, record) => {
      return(
        <span>
          {record.properties.propertyValue}个<br />
          <a className="linkButton" onClick={()=> getSkuDetail(record.id)}>查看</a>
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
          <span>市场价:{record.saleUnits.marketPrice}</span><br />
          <span>成本价:{record.saleUnits.costPrice}</span><br />
          <span>非会员价:{record.saleUnits.nonmemberPrice}</span><br />
          <span>会员价:{record.saleUnits.memberPrice}</span><br />
          <span>毛利:{record.saleUnits.grossProfit}</span><br />
        </div>
      )
    }
  }, {
    title: '出售时间',
    dataIndex: 'applyPromotionTime',
    key: 'applyPromotionTime',
    singleLine: true,
  }, {
    title: '库存信息',
    dataIndex: 'storeInfo',
    key: 'storeInfo',
    render: (val, record) => {
      return (
        <div className={Sty.store}>
          <span>推广库存：{record.saleUnits.spreadStock}</span><br />
          <span>累计售出：{record.saleStock}</span><br />
          <a className="linkButton" onClick={()=> getStoreInfo(record.id)}>查看</a>
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
          <span>分公司：{record.companyName}</span><br />
          <span>出售城市：{record.cityName}</span><br />
          <span>店铺ID：{record.sellerMainId}</span><br />
          <span>店铺名称：{record.sellerMainName}</span><br />
        </div>
      )
    }
  },  {
    title: '审核状态',
    dataIndex: 'reviewStatus',
    key: 'reviewStatus',
    render: (val, record) => {
      return (
        <div className={Sty.store}>
          <span>{record.reviewStatus}</span><br />
          {
            record.reviewStatus === 2?<span>原因：{record.reviewReason}</span>:''
          }
        </div>
      )
    }
  }, {
    title: '操作',
    width: 140,
    render: (text, record) => {
      return (
        <div className="operateBtn-container-inline">
          <a onClick={()=> goExamine(record)}>审核</a>
        </div>
      )
    }
  }]
}
