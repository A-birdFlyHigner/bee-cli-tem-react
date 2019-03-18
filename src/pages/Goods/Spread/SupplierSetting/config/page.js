import React, { Component } from 'react'
import { LeForm, LeDialog } from '@lib/lepage'
import _ from 'lodash'
import router from 'umi/router';
import { Button, message } from 'antd'
import spreadConfig from './spread'
import * as Sty from '../Index.less'
import dialogFormConfig from '../../common/spreadDialog'
import {
  queryProductSpreadChannelList, 
  queryProductSpreadProductBaseDetail, 
  queryProductSpreadProductChannelDetail, 
  productSpreadCreate, 
  productSpreadUpdate
} from '@/services/goods'

export default class Detail extends Component {

  constructor(props) {
    super(props)
    this.leForm = {}
    this.state = {
      spreadList: [],
      newBtnLoading: false,
      addBtnLoading: false,
    }
  }

  componentWillMount () {
    const { query } = this.props
    if (query.status === 'edit') {
      this.setState({
        edit: true
      })
    }
    if (query.spreadName) {
      this.setState({
        spreadList: [{
          spreadName: query.spreadName,
          cityIds: _.concat(query.cityIds),
          productIds: _.concat(query.productIds)
        }],
        productIds: _.concat(query.productIds),
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

  getSkuListByproductId = async (key, id) => {
    const { state } = this
    if (state[`dataSource${id}`]) {
      this.leForm[key].setValue(`dataSource${id}`, JSON.parse(JSON.stringify(state[`dataSource${id}`])))
    } else {
      const { edit = false } = state
      let dataList
      if (edit) {
        dataList = await queryProductSpreadProductChannelDetail({productId: id})
        if (!dataList) return
        const { logisticsMethod, logisticsType, dispatchDate} = dataList
        this.leForm[key].setValues({
          logisticsMethod,
          logisticsType,
          dispatchDate
        })
      } else {
        dataList = await queryProductSpreadProductBaseDetail({productId: id})
        if (!dataList) return
      }
      const {skuDetailList = [], productName} = dataList
      dataList = skuDetailList.map(sku => {
        return {
          ...sku,
          stockCount: sku.spreadStock,
          productName
        }
      })
      this.setState({
        [`dataSource${id}`]: JSON.parse(JSON.stringify(dataList))
      })
      this.leForm[key].setValue(`dataSource${id}`, JSON.parse(JSON.stringify(dataList)))
    }
  }

  deleteSpreatItem = (key) => {
    delete this.leForm[key]
    const { spreadList } = this.state
    this.setState({
      spreadList: spreadList.filter((p) => p.spreadName !== key)
    })
  }

  dialogAddSpread = async () => {
    const { spreadList } = this.state
    const disabledCitys = []
    spreadList.map(item => {
      disabledCitys.push(...item.cityIds)
      return item
    })
    this.setState({
      newBtnLoading: true
    })
    const channelList = await queryProductSpreadChannelList()
    this.setState({
      newBtnLoading: false
    })
    if (!channelList) message.warning('获取推广渠道出现异常')
    const formConf = dialogFormConfig(channelList, disabledCitys)
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
        branchList = branchList.filter(item => {
          return item.children.length
        })
        if (!branchList) return message.warning('请选择有效推广渠道')
        const cityIds = []
        const spreadName = branchList.map(p => {
          const cityName = p.children.map(q => {
            cityIds.push(q.key)
            return q.title
          }).join('、')
          return `${p.title}（${cityName}）`
        }).join('；')
        if (!cityIds.length) return message.warning('请选择有效推广渠道')
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
        return false
      }
    })
  }

  beforeSubmitInfo = async () => {
    this.setState({ addBtnLoading: true })
    let isError = false
    const keys = Object.keys(this.leForm)
    for (const i of keys) {
      const item = this.leForm[i]
      const errors = await item.validate()
      if (errors && !isError) {
        const msg = errors[Object.keys(errors)[0]]
        message.warning(msg)
        isError = true
      }
      else if (!isError) {
        item.value.productIds.forEach(p => {
          const list = item.value[`dataSource${p}`]
          list.forEach((q) => {
            const { costPrice, stockCount } = q
            if (!costPrice || !stockCount) {
              const { value: { spreadName } = {} } = item
              if (!isError) {
                message.warning(`请完善${spreadName}下的商品成本价和推广库存`) 
                isError = true
              }
            }
          })
        })
      }
    }
    if (isError) {
      this.setState({ addBtnLoading: false })
      return
    }
    this.handleSubInfo()
  }

  handleSubInfo = async () => {
    let createList = []
    const {productIds, edit = false} = this.state
    productIds.forEach(pId => {
      const citySpreadDetailList = []
      const keys = Object.keys(this.leForm)

      for (const i of keys) {
        const item = this.leForm[i].value
        if (item.productIds.indexOf(pId) > -1) {
          item.cityIds.forEach(cId => {
            citySpreadDetailList.push({
              cityCode: cId,
              dispatchDate: item.dispatchDate,
              logisticsMethod: item.logisticsMethod,
              logisticsType: item.logisticsType,
              spreadSkuList: item[`dataSource${pId}`].map(sku => {
                return {
                  ...sku,
                  costPrice: sku.costPrice * 100
                }
              })
            })
          })
        }
      }
      createList.push({
        productId: pId,
        citySpreadDetailList
      })
    })
    createList = createList.filter(item => {
      return item.citySpreadDetailList.length
    })
    if (!createList.length) {
      this.setState({ addBtnLoading: false })
      message.warning('请添加推广信息')
      return false
    }
    if (edit) {
      const res = await productSpreadUpdate(createList[0])
      if (!res) {
        this.setState({ addBtnLoading: false })
        return false
      }
    } else {
      const res = await productSpreadCreate(createList)
      if (!res) {
        this.setState({ addBtnLoading: false })
        return false
      }
    }
    message.success('已提交，请等待审核')
    router.push({
      pathname: '/goods/spread/list',
      query: {
        status: '2'
      }
    })
    return false
  }

  cancelClick = () => {
    router.go(-1)
  }

  render () {
    const { spreadList, newBtnLoading, addBtnLoading, edit = false } = this.state
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
                {
                  edit
                  ? null : 
                  <Button 
                    type="primary" 
                    size="small" 
                    className={Sty.spreadDelBtn}
                    onClick={() => this.deleteSpreatItem.call(this, spreadName)}
                  >
                    删 除
                  </Button>
                }
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
          {
            edit 
            ? null 
            : <Button loading={newBtnLoading} onClick={this.dialogAddSpread}>+新增推广渠道</Button>
          }
          <Button loading={addBtnLoading} type="primary" onClick={this.beforeSubmitInfo}>推广</Button>
          <Button onClick={this.cancelClick}>取消</Button>
        </div>
      </div>
    )
  }
}
