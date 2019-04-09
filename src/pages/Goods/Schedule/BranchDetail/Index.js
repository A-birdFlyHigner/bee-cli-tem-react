import React, { Component } from 'react'
import router from 'umi/router'
import { LeForm } from '@lib/lepage'
import { message } from 'antd'
import {queryBranchProductSpreadDetail, updateSkuPrice } from '@/services/goods'
import {
  onChange,  
  baseInfo,
  salseEdit,
  logistics,
  wareHouse,
  skuMainImg,
  productInfo,
  productImg,
} from '@/pages/Goods/common/productDetail'

const compare = (big, small) => {
  return Boolean(parseFloat(big) - parseFloat(small) > 0)
}

// 确定 err, values
const confirm = (err, values)=> {
  const skuPriceInfos = []
  const { saleUnits, tabType } = values  
  let isValid = true

  // 请求接口前校验 会员价格
  saleUnits.forEach(item => {
    const { grossProfit, marketPrice, memberPrice, nonmemberPrice, skuId, memeberCommission, noMemeberCommission } = item
    skuPriceInfos.push({
      grossProfit: grossProfit * 100,
      marketPrice: marketPrice * 100,
      memberPrice: memberPrice * 100,
      nonMemberPrice: nonmemberPrice * 100,
      skuId
    })
    if( !compare(marketPrice, nonmemberPrice) || !compare(nonmemberPrice, memberPrice) || !compare(memberPrice, 0) ){
      message.warning('市场价>非会员价>会员价>0')
      isValid = false
    }
    if( !compare(memeberCommission, 0) ){
      message.warning('会员价佣金必须大于零')
      isValid = false
    }
    if( !compare(noMemeberCommission, 0) ){
      message.warning('非会员价佣金必须大于零')
      isValid = false
    }
  });
  if( !isValid ) return false

  const skuPriceInfosList = []
  saleUnits.forEach(element => {
    skuPriceInfosList.push({ 
      grossProfit: Number(element.grossProfit).mul(100),
      marketPrice: Number(element.marketPrice).mul(100),
      memberPrice: Number(element.memberPrice).mul(100),
      nonMemberPrice: Number(element.nonmemberPrice).mul(100),
      skuId: element.skuId
    })
  })

  updateSkuPrice({
    channelProductId: values.saleGoodsId, 
    skuPriceInfos: skuPriceInfosList
  }).then(res => {
    if (!res) return
    // 区分是预排期编辑还是未排期编辑
    if (tabType === '2') {
      router.push({
        pathname: '/goods/schedule/branchlist',
        query: {
          tabType: '2'
        }
      })
    } 
    if (tabType === '1') {
      router.push({
        pathname: '/goods/schedule/branchlist',
        query: {
          tabType: '1'
        }
      })
    }
    message.success('编辑成功!');      
    
  })
  return false
}

// 取消 err, values
const cancel = ()=> {
  window.history.back(-1)
}

export default class Detail extends Component {

  constructor(props) {
    super(props)
    this.store = props
    const { tabType } = this.store.location.query?this.store.location.query:''

    const { match } = this.props
    const { params } = match
    this.state = {
      tabType,
      productId: params.id,
      leFormConf: {
        settings: {
          globalStatus: 'preview',
          onChange          
        },
        form: {
          layout: {
            label: 'w120',
          },
        },
        items: [
          ...baseInfo,
          salseEdit(),
          ...logistics,
          ...wareHouse,
          ...skuMainImg,
          ...productInfo,
          ...productImg,
        ],
        buttons: [
          {
            inline: true,
            props: {
              type: 'primary',
              children: '确定',
              onClick: confirm
            }
          },
          {
            inline: true,
            props: {
              type: '',
              children: '取消',
              onClick: cancel
            }
          },
        ]
      }
    }
  }

  onMountLeForm = (formCore) => {

    this.formCore = formCore
    const { productId, tabType } = this.state
    queryBranchProductSpreadDetail({channelProductId: productId}).then(res => {
      if (!res) return
      formCore.setValues({
        ...res,
        tabType
      })
    })
  }

  render () {
    const { leFormConf } = this.state

    return (
      <div>
        <LeForm {...leFormConf} onMount={this.onMountLeForm} />
      </div>
    )
  }
}
