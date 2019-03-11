import React, { Component } from 'react'
import router from 'umi/router';
import { LeForm } from '@lib/lepage'
import { message } from 'antd'
import {queryBranchProductSpreadDetail} from '@/services/goods'

import {
  baseInfo,
  salseInfo,
  salseEdit,
  logistics,
  wareHouse,
  skuMainImg,
  productInfo,
  productImg,
  examined,
} from '@/pages/Goods/common/productDetail'

// 确定
const confirm = (err, values)=> {
  const type = values.examineData.chooseType
  if ((!values.examineData.rejuctReason) && (type === 2)) {
    message.warning('请输入拒绝原因！')
    return false
  }

  // TODO: 请求通过审核接口

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
