import React, { Component } from 'react'
import Sty from './Index.less'
import { LeForm } from '@lib/lepage'

import baseInfo from './config/baseInfo'
import salseInfo from './config/salseInfo'
import salseEdit from './config/salseEdit'
import wareHouse from './config/wareHouse'
import skuMainImg from './config/skuImg'
import productInfo from './config/productInfo'
import elseInfo from './config/elseInfo'
import productImg from './config/productImg'

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
          ...wareHouse,
          ...skuMainImg,
          ...productInfo,
          ...elseInfo,
          ...productImg,
        ]
      }
    }
  }

  onMountLeForm(formCore) {
    this.formCore = formCore
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
      }],
      maozhong: 12,
      zhiliang: 20
    })
  }

  render () {
    const { productId, leFormConf } = this.state
    return (
      <div>
        <LeForm { ...leFormConf } onMount={this.onMountLeForm.bind(this)} />
      </div>
    )
  }
}
