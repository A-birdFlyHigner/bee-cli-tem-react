import React, { Component } from 'react'
import '@lib/lepage/lib/index.css'
import router from 'umi/router'
import { formatSearch } from '@/utils/utils'
import { LeForm, LeDialog } from '@lib/lepage'
import spreadConfig from './spread'
import { Button } from 'antd'
import * as Sty from '../index.less'
import { message } from 'antd'
import dialogFormConfig from '../../common/spreadDialog'

const proList = [{
  productName: '面包',
  sku: '1kg',
  deliverCode: '001',
  costPrice: 200,
  stockCount: 100
}, {
  productName: '火腿',
  sku: '2kg',
  deliverCode: '050301',
  costPrice: 300,
  stockCount: 100
}]

export default class Detail extends Component {

  constructor(props) {
    super(props)
    this.leForm = {}
    this.state = {
      spreadList: []
    }
  }

  componentWillMount () {
    const { query } = this.props
    this.setState({
      spreadList: [{
        spreadName: query.spreadName,
        cityIds: query.cityIds,
        productIds: query.productIds
      }],
      productIds: query.productIds
    })
  }
  
  onMountLeForm (key, leForm) {
    this.leForm[key] = leForm
    this.state.productIds.forEach(p => {
      this.getSkuListByproductId(key, p)
    })
  }

  getSkuListByproductId (key, id) {
    if (this.state[`dataSource${id}`]) {
      this.leForm[key].setValue(`dataSource${id}`, JSON.parse(JSON.stringify(this.state[`dataSource${id}`])))
    } else {
      setTimeout(() => {
        this.setState({
          [`dataSource${id}`]: JSON.parse(JSON.stringify(proList))
        })
        this.leForm[key].setValue(`dataSource${id}`, JSON.parse(JSON.stringify(proList)))
      }, 100)
    }
  }

  deleteSpreatItem (key) {
    delete this.leForm[key]
    this.setState({
      spreadList: this.state.spreadList.filter((p) => p.spreadName !== key)
    })
  }

  dialogAddSpread () {
    const tags = ['全部', '华南地区', '华东地区']
    LeDialog.show(dialogFormConfig(tags), {
      title: '可选推广渠道',
      width: '800px',
      onOk: (values, suc, core) => {
        const { checkedKeys, halfCheckedKeys, spreadTree } = values
        const allSel = [
          ...checkedKeys,
          ...halfCheckedKeys
        ]
        const branchList = JSON.parse(JSON.stringify(spreadTree)).filter(p => {
          return allSel.indexOf(p.key) > -1
        })
        branchList.forEach(p => {
          p.children = p.children.filter(q => {
            return allSel.indexOf(q.key) > -1
          })
        })
        const cityIds = []
        const spreadName = branchList.map(p => {
          const cityName = p.children.map(q => {
            cityIds.push(q.key)
            return q.title
          }).join('、')
          return `${p.title}（${cityName}）`
        }).join('；')
        console.log(spreadName, cityIds)
        this.setState({
          spreadList: [
            ...this.state.spreadList,
            {
              spreadName: spreadName,
              cityIds: cityIds,
              productIds: this.state.productIds
            }
          ]
        })
        suc()
      }
    })
  }

  async beforeSubmitInfo () {
    let isError = false
    for (let i in this.leForm) {
      const item = this.leForm[i]
      const errors = await item.validate()
      if (errors) {
        !isError && message.warning(errors[Object.keys(errors)[0]])
        isError = true
      } else if (!isError) {
        item.value.productIds.forEach(p => {
          item.value[`dataSource${p}`].forEach(q => {
            if (!q.costPrice || !q.stockCount) {
              !isError && message.warning(`请完善${item.value.spreadName}下的商品成本价和推广库存`)
              isError = true
            }
          })
        })
      }
    }
    if (isError) return
    this.handleSubInfo()
  }

  handleSubInfo () {
    const createList = []
    this.state.productIds.forEach(pId => {
      const citySpreadDetailList = []
      for (let i in this.leForm) {
        const item = this.leForm[i].value
        item.cityIds.forEach(cId => {
          citySpreadDetailList.push({
            cityCode: cId,
            dispatchDate: item.dispatchDate,
            logisticsMethod: item.logisticsMethod,
            logisticsType: item.logisticsType,
            spreadSkuList: item[`dataSource${pId}`]
          })
        })
      }
      createList.push({
        productId: pId,
        citySpreadDetailList
      })
    })
    console.log(createList)
  }

  render () {
    const { spreadList } = this.state
    const configOption = {
      self: this,
      deleteFun: this.deleteSpreatItem
    }
    return (
      <div>
        {
          spreadList.map((p, ind) => {
            const spreadName = p.spreadName
            const firstItem = (
              <p className={Sty.firstp}>
                <span>推广渠道{ind + 1}：</span>
                <Button type="primary" size="small" 
                  className={Sty.spreadDelBtn}
                  onClick={e => this.deleteSpreatItem.call(this, spreadName)}>删 除</Button>
              </p>
            )
            return (
              <div key={spreadName} className={Sty.spreadBox}>
                { firstItem }
                <LeForm 
                  {...spreadConfig(p, spreadName, configOption)} 
                  onMount={this.onMountLeForm.bind(this, spreadName)} ></LeForm>
              </div>
            )
          })
        }
        <div className={Sty.btnGroup}>
          <Button onClick={this.dialogAddSpread.bind(this)}>+新增推广渠道</Button>
          <Button type="primary" onClick={this.beforeSubmitInfo.bind(this)}>推广</Button>
          <Button>取消</Button>
        </div>
      </div>
    )
  }
}
