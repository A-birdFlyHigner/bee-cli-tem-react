import React, { Component } from 'react'
import { LeForm } from '@lib/lepage'
import { message } from 'antd'
import { getAdminProductDetail,setProductReviewStatus } from '@/services/goods'

import {
  onChange,
  baseInfo,
  salseEdit,
  logistics,
  wareHouse,
  skuMainImg,
  productInfo,
  productImg,
  examined,
} from '@/pages/Goods/common/productDetail'

// 确定
const confirm = async (err, values)=> {
  // 总部审核详情的接口 2 通过 3 拒绝
  const { saleGoodsId } = values
  const status = values.examineData.chooseType + 1
  const comment = values.examineData.rejuctReason ? values.examineData.rejuctReason : ''
  const channelProductIds = []

  if ((!comment) && (status === 3)) {
    message.warning('请输入拒绝原因！')
    return false
  }
  
  channelProductIds.push(saleGoodsId)

  setProductReviewStatus({ 
    channelProductIds, 
    status,
    comment
  }).then(res => { 
    if (!res) return
    if ( status === 2)  {
      message.warning('审核成功！')    
    } else {
      message.warning('拒绝成功！')      
    }
    window.history.back(-1)
  })
  return false
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
          salseEdit(true),
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
    const { productId } = this.state

    getAdminProductDetail({productId: Number(productId)}).then(res => {
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
