import React, { Component } from 'react'
import { LeForm } from '@lib/lepage'
import { message } from 'antd'
import {getAdminProductDetail, spikeProductPriceUpdate} from '@/services/goods'
import Sty from './Index.less'

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

// 确定
const confirm = async (err, values) => {
  const { saleGoodsId, saleUnits } = values
  const skuPriceInfos = []
  let isValid = true
  let option = {}
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

  option = {
    channelProductId: saleGoodsId,
    skuPriceInfos,
  }
  const res = await spikeProductPriceUpdate(option)
  if (!res) return false
  message.success('定价成功')
  if (window.opener && window.opener.initSeckillDetail) {
    window.opener.initSeckillDetail()
    window.close()
  }
  return false
}

// 取消
const cancel = ()=> {
  window.close()
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
            className: Sty.bottonBtn,
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
    getAdminProductDetail({channelProductId: productId, productId}).then(res => {
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
