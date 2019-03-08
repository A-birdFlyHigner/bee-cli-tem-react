import React, { Component } from 'react'
import { LeForm } from '@lib/lepage'
import baseInfo from './config/baseInfo'
import salseEdit from './config/salseEdit'
import wareHouse from './config/wareHouse'
import skuMainImg from './config/skuImg'
import productInfo from './config/productInfo'
import elseInfo from './config/elseInfo'
import productImg from './config/productImg'
import examined from './config/examined'

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
          ...wareHouse,
          ...skuMainImg,
          ...productInfo,
          ...elseInfo,
          ...productImg,
          ...examined,
        ]
      }
    }
  }

  onMountLeForm = (formCore) => {
    this.formCore = formCore

    // TODO: 接口数据 

    formCore.setValues({
      name: '西伯利亚红苹果',
      smallName: '苹果',
      pinpai: '西伯利亚',
      salseData: [{
        status: 1,
        sku: 1,
        skuCode: 31212,
        price: 124,
        stock: 100
      }, {
        status: 4,
        sku: 3,
        skuCode: 31212,
        price: 124,
        stock: 100
      }],
      maozhong: 12,
      zhiliang: 20
    })
  }

  render () {
    const { productId, leFormConf } = this.state

    console.log('==========productId',productId)

    return (
      <div>
        <LeForm {...leFormConf} onMount={this.onMountLeForm} />
      </div>
    )
  }
}
