import React, { Component } from 'react'
import { LeForm, LeDialog } from '@lib/lepage'
import _ from 'lodash'
import { Button, message } from 'antd'
import spreadConfig from './spread'
import * as Sty from '../Index.less'
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
    if (query.spreadName) {
      this.setState({
        spreadList: [{
          spreadName: query.spreadName,
          cityIds: _.concat(query.cityIds),
          productIds: _.concat(query.productIds)
        }],
        productIds: _.concat(query.productIds)
      })
    } 
    else {
      this.setState({
        productIds: _.concat(query.productIds)
      })
    }
  }
  
  onMountLeForm (key, leForm) {
    this.leForm[key] = leForm
    const { productIds } = this.state
    productIds.forEach(p => {
      this.getSkuListByproductId(key, p)
    })
  }

  getSkuListByproductId (key, id) {
    const { state } = this
    if (state[`dataSource${id}`]) {  
      this.leForm[key].setValue(`dataSource${id}`, JSON.parse(JSON.stringify(state[`dataSource${id}`])))
    } else {
      setTimeout(() => {
        this.setState({
          [`dataSource${id}`]: JSON.parse(JSON.stringify(proList))
        })
        this.leForm[key].setValue(`dataSource${id}`, JSON.parse(JSON.stringify(proList)))
      }, 100)
    }
  }

  deleteSpreatItem = (key) => {
    delete this.leForm[key]
    const { spreadList } = this.state
    this.setState({
      spreadList: spreadList.filter((p) => p.spreadName !== key)
    })
  }

  dialogAddSpread = () => {
    const { spreadList } = this.state
    const tags = ['全部', '华南地区', '华东地区']
    const disabledCitys = _.concat(spreadList.map(item => {
      return item.cityIds
    }))
    const formConf = dialogFormConfig(tags, disabledCitys)
    LeDialog.show({
      title: '可选推广渠道',
      width: '800px',
      content: <LeForm {...formConf} />,
      onOk: (values, suc) => {
        const { checkedKeys, halfCheckedKeys, spreadTree } = values
        const allSel = [
          ...checkedKeys,
          ...halfCheckedKeys
        ]
        let branchList = JSON.parse(JSON.stringify(spreadTree)).filter(p => {
          return allSel.indexOf(p.key) > -1
        })
        branchList = branchList.map(p => {
          return {
            ...p,
            children: p.children.filter(q => {
              return allSel.indexOf(q.key) > -1
            })
          }
        })
        const cityIds = []
        const spreadName = branchList.map(p => {
          const cityName = p.children.map(q => {
            cityIds.push(q.key)
            return q.title
          }).join('、')
          return `${p.title}（${cityName}）`
        }).join('；')
        const {spreadList, productIds} = this.state
        this.setState({
          spreadList: [
            ...spreadList,
            {
              spreadName,
              cityIds,
              productIds
            }
          ]
        })
        suc()
      }
    })
  }

  beforeSubmitInfo = async () => {
    let isError = false

    const keys = Object.keys(this.leForm)

    for (const i of keys) {
      const item = this.leForm[i]
      const errors = await item.validate()
      if (errors) {
        if (isError) {
          const msg = errors[Object.keys(errors)[0]]
          message.warning(msg)
        }
        isError = true
      } 
      else if (!isError) {
        item.value.productIds.forEach(p => {
          const list = item.value[`dataSource${p}`]

          list.forEach((q) => {
            const { costPrice, stockCount } = q
            if (!costPrice || !stockCount) {
              const { value: { spreadName } = {} } = item
              if (isError) {
                message.warning(`请完善${spreadName}下的商品成本价和推广库存`) 
              }
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
    const {productIds} = this.state
    productIds.forEach(pId => {
      const citySpreadDetailList = []
      const keys = Object.keys(this.leForm)

      for (const i of keys) {
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
            const {spreadName} = p
            const firstItem = (
              <p className={Sty.firstp}>
                <span>推广渠道{ind + 1}：</span>
                <Button 
                  type="primary" 
                  size="small" 
                  className={Sty.spreadDelBtn}
                  onClick={() => this.deleteSpreatItem.call(this, spreadName)}
                >
                删 除
                </Button>
              </p>
            )
            return (
              <div key={spreadName} className={Sty.spreadBox}>
                { firstItem }
                <LeForm 
                  {...spreadConfig(p, spreadName, configOption)} 
                  onMount={(leForm) => this.onMountLeForm.call(this, spreadName, leForm)} 
                />
              </div>
            )
          })
        }
        <div className={Sty.btnGroup}>
          <Button onClick={this.dialogAddSpread}>+新增推广渠道</Button>
          <Button type="primary" onClick={this.beforeSubmitInfo}>推广</Button>
          <Button>取消</Button>
        </div>
      </div>
    )
  }
}
