import React, { Component } from 'react'
import router from 'umi/router';
import { LeForm } from '@lib/lepage'
import { message } from 'antd'
import {queryBranchProductSpreadDetail,spreadReviewProduct} from '@/services/goods'

import {
  baseInfo,
  salseEdit,
  logistics,
  wareHouse,
  skuMainImg,
  productInfo,
  productImg,
  examined,
} from '@/pages/Goods/common/productDetail'

const compare = (big, small) => {
  return Boolean(parseFloat(big) - parseFloat(small) > 0)
}

// 确定
const confirm = async (err, values)=> {
  const { saleGoodsId, saleUnits } = values
  const type = values.examineData.chooseType
  const skuPriceInfos = []
  let isValid = true
  if ((!values.examineData.rejuctReason) && (type === 2)) {
    message.warning('请输入拒绝原因！')
    return false
  }
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

  const option = {
    channelProductIdList: [
      saleGoodsId
    ],
    skuPriceInfos,
    status: type
  }
  const Br = await spreadReviewProduct(option)
  if(Br) {
    const tip = type === 1? '已通过审核':'已拒绝审核'
    message.success(tip);

    // 通过审核 进入审核通过未排期列表， 拒绝 进入审核推广失败列表
    if (type === 1) {
      router.push({
        pathname: '/goods/examine/branchlist'
      })
    } else {
      router.push({
        pathname: '/goods/examine/branchlist',
        query: {
          tabType: '2'
        }
      })
    }
  }
}

// 取消
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
          salseEdit(),
          ...logistics,
          ...wareHouse,
          ...skuMainImg,
          ...productInfo,
          ...productImg,
          examined()          
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
    queryBranchProductSpreadDetail({channelProductId: productId, productId}).then(res => {
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
