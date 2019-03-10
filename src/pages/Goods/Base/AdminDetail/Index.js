import React, { Component } from 'react'
import { LeForm } from '@lib/lepage'
import baseInfo from './config/baseInfo'
import salseInfo from './config/salseInfo'
import salseEdit from './config/salseEdit'
import wareHouse from './config/wareHouse'
import skuMainImg from './config/skuImg'
import productInfo from './config/productInfo'
import elseInfo from './config/elseInfo'
import productImg from './config/productImg'
import {queryBranchProductSpreadDetail} from '@/services/goods'

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
          ...wareHouse,
          ...skuMainImg,
          ...productInfo,
          ...elseInfo,
          ...productImg,
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
