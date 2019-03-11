import React, { Component } from 'react'
import { LeForm } from '@lib/lepage'
import { message } from 'antd'
import {queryBranchProductSpreadDetail, updateSkuPrice } from '@/services/goods'
import {
  baseInfo,
  salseInfo,
  salseEdit,
  logistics,
  wareHouse,
  skuMainImg,
  productInfo,
  productImg,
} from '@/pages/Goods/common/productDetail'

// 确定 err, values
const confirm = (err, values)=> {

  // 请求接口前校验 会员价格
  message.warning('请求接口前校验 会员价格提示！')

  // TODO: 请求通过审核接口
  const { saleUnits } = values
  const skuPriceInfosList = []
  saleUnits.forEach(element => {
    skuPriceInfosList.push({
      grossProfit: element.grossProfit*100,
      marketPrice: Number(element.marketPrice*100),
      memberPrice: Number(element.memberPrice*100),
      nonMemberPrice: Number(element.nonmemberPrice*100),
      skuId: element.skuId
    })
  })

  updateSkuPrice({
    channelProductId: values.saleGoodsId, 
    skuPriceInfos: skuPriceInfosList
  }).then(res => {
    if (!res) return
    window.history.back(-1)  
  })

}

// 取消 err, values
const cancel = ()=> {
  window.history.back(-1)
}

export default class Detail extends Component {

  constructor(props) {
    super(props)
    const { match } = this.props
    const { params } = match
    this.state = {
      productId: params.id,
      leFormConf: {
        settings: {
          globalStatus: 'preview'
        },
        form: {
          layout: {
            label: 'w120',
          },
        },
        items: [
          ...baseInfo,
          ...salseInfo,
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
    const {productId} = this.state
    
    queryBranchProductSpreadDetail({channelProductId: productId}).then(res => {
      if (!res) return
      formCore.setValues(res)
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
