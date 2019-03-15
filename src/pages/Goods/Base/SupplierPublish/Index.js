import React, { Component } from 'react';
import { LeForm } from '@lib/lepage';
import moment from 'moment'
import { getFormConfig } from './config';
import { getGoodsDetail, queryCategoryPropertyDetail } from '@/services/goods'
import { getPageQuery } from '@/utils/utils'
import { pick, Cache } from './utils'
import Category from './components/Category/index'
import { SALE_PROPERTY_NAME_ID, GOODS_PROPERTY_NAME_ID, WAREHOUSE_PROPERTY_NAME_ID } from './config/common.config'
import { DEFAULT_FORM_VALUES } from './mock/defaultFormValues'


const saleCache = Cache.create('sale.properties.config')

const mergeInitValuesFormConfig = (formConfig = {}, initValues = {}) => {
  const {
    settings: {
      values = {},
      ...restSettings
    } = {},
    ...restFormConfig
  } = formConfig

  return {
    settings: {
      values: {
        ...values,
        ...initValues
      },
      ...restSettings
    },
    ...restFormConfig,
  }
}

const formatUpdateFormConfig = (resData, categoryProperties, status) => {
  const {
    saleGoodsId,
    categoryId,
    pathName,
    name = '',
    desc = '',
    brandName = '',
    useBarCode: has69 = false,
    saleUnits = [], // sku 规格 和 销售属性
    properties = [] // 商品属性、仓库属性
  } = resData
  const categoryName = pathName.split(',').join('>')
  const proxyBaseInfo = { saleGoodsId, categoryId, categoryName, name, desc, brandName, has69 }
  const proxySaleProperties = {} // 销售属性
  const proxyOtherProperties = {} // 商品属性、仓库属性
  const skus = []

  const { saleProperties = [] } = categoryProperties
  saleUnits.forEach(saleUnit => {
    const { propertyPairList = [] } = saleUnit

    const propertyPairIds = propertyPairList.map(pair => pair.id)

    const propertyValueNames = propertyPairList.length === 0
    ? ['默认']
    : propertyPairList.map(pair => pair.pvName)

    const key = propertyPairIds.length === 0
    ? 'default'
    : propertyPairIds.join('-')

    propertyPairList.forEach(pair => {
      const { id: pairId, propertyNameId } = pair
      const name = `${SALE_PROPERTY_NAME_ID}-${propertyNameId}`
      proxySaleProperties[name] = [...(proxySaleProperties[name] || []), pairId]

      // 更新销售属性自定义选项
      {
        const { propertyPairs } = saleProperties.find(property => property.propertyNameId === propertyNameId) || {}
        const propertyPair = propertyPairs.find(item => item.id === pairId)
        if (propertyPair) {
          propertyPair.disabled = true
        }
        else {
          propertyPairs.push({
            ...pair,
            isCustom: true
          })
        }
      }
    })

    const sku = {
      ...pick(saleUnit, ['status', 'costPrice', 'restriction', 'deliverCode']),
      key,
      propertyValueNames,
      propertyPairIds,
      enableDeliverCode: false
    }
    skus.push(sku)
    saleCache.set(key, sku)
  })

  const { goodsProperties = [], warehouseProperties = [] } = categoryProperties
  const otherProperties = [...goodsProperties, ...warehouseProperties]
  const inputTypes = {}
  otherProperties.forEach(({ propertyNameId, inputType }) => {
    inputTypes[propertyNameId] = inputType
  })

  properties.forEach((propertie) => {
    const { propertyType, propertyNameId, propertyValue = [], propertyPairList = [] } = propertie
    let prefixName = ''
    if (propertyType === 3) { // 商品属性
      prefixName = GOODS_PROPERTY_NAME_ID
    }
    else if (propertyType === 4) { // 销售属性
      prefixName = WAREHOUSE_PROPERTY_NAME_ID
    }

    const name = `${prefixName}-${propertyNameId}`
    const inputType = inputTypes[propertyNameId]

    if ([2, 4].indexOf(inputType) !== -1) {
      // 更新商品、仓库属性自定义选项
      propertyPairList.forEach(pair => {
        const { propertyPairs } = otherProperties.find(property => property.propertyNameId === propertyNameId) || {}
        const propertyPair = propertyPairs.find(item => item.id === pair.propertyPairId)
        if (propertyPair) {
          propertyPair.disabled = true
        }
        else {
          propertyPairs.push({
            id: pair.propertyPairId,
            pvName: pair.pvName,
            isCustom: true
          })
        }
      })
    }

    switch (inputType) {
      case 1: // 单选不自定义
      case 2: // 单选可自定义
      proxyOtherProperties[name] = propertyPairList[0].propertyPairId
      break;

      case 3: // 多选不自定义
      case 4: // 多选可自定义
      proxyOtherProperties[name] = propertyPairList.map(pair => pair.propertyPairId)
      break;

      case 5: // 输入框
        [proxyOtherProperties[name]] = propertyValue
      break;

      case 6: // 日期
        proxyOtherProperties[name] = moment(propertyValue[0])
      break;

      case 7: // 时间
        proxyOtherProperties[name] = moment(propertyValue[0])
      break;

      default:
      break;
    }
  })

  const goodsMainImageList = resData.mainImages.map(img => {
    return {
      ...img,
      uid: img.url
    }
  })

  const goodsDetailImageList = resData.detailImages.map(img => {
    return {
      ...img,
      uid: img.url
    }
  })

  const initValues =  {
    ...proxyBaseInfo,
    has69,
    ...proxySaleProperties,
    skus,
    ...proxyOtherProperties,
    goodsMainImageList,
    goodsDetailImageList
  }

  const formConfig = getFormConfig(categoryProperties, {
    status,
    disabledHas69: status === 'update'
  })

  if (!formConfig) return null

  return mergeInitValuesFormConfig(formConfig, initValues)
}

class GoodsPublish extends Component {
  constructor(props) {
    super(props);

    const { itemId = null, mock = false } = getPageQuery()
    const status = itemId ? 'update' : 'create'

    this.status = status // create、update
    this.keepValues = mock ? DEFAULT_FORM_VALUES : {}
    this.state = {
      itemId,
      isInit: false,
      showCancel: false,
      showCategory: status === 'create',
      formConfig: {},
    }
  }

  componentWillMount () {
    const { mock = false } = getPageQuery()
    const { itemId } = this.state

    // 编辑商品
    if (itemId) {
      this.loadGoodsDetail(itemId)
    }

    // FIXME: 开发专用
    else if (mock){
      this.handleCategoryOK({
        categoryId: 20005,
        treeValues: [20006, 20040, 20041, 20005],
        treeLabels: ["水产肉类/新鲜蔬果/熟食", "新鲜蔬菜/蔬菜制品", "新鲜蔬菜", "叶菜类"]
      })
    }
  }

  async loadGoodsDetail (itemId) {
    const resData = await getGoodsDetail({
      productId: itemId
    })
    if (!resData) return

    const { categoryId } = resData
    const categoryProperties = await queryCategoryPropertyDetail({
      categoryId
    })
    if (!categoryProperties) return

    const { status } = this
    const formConfig = formatUpdateFormConfig(resData, categoryProperties, status)
    if (!formConfig) return

    this.setState({
      isInit: true,
      formConfig
    })
  }

  async loadPublishFormConfig (categoryId, categoryName) {
    const { status } = this
    const categoryProperties = await queryCategoryPropertyDetail({
      categoryId
    })
    if (!categoryProperties) return null

    const formConfig = getFormConfig(categoryProperties, {
      status
    })
    if (!formConfig) return null

    const initValues = {
      ...this.keepValues,
      categoryId,
      categoryName,
    }
    return mergeInitValuesFormConfig(formConfig, initValues)
  }

  // 分类 下一步 操作
  async handleCategoryOK (category = {}) {
    const { categoryId, treeLabels = [] } = category
    const categoryName = treeLabels.join('>')
    const formConfig = await this.loadPublishFormConfig(categoryId, categoryName)

    if (!formConfig) return

    this.setState({
      isInit: false,
    }, () => {
      this.setState({
        isInit: true,
        showCategory: false,
        formConfig
      })
    })
  }

  // 分类 取消 操作
  handleCategoryCancel () {
    this.setState({
      showCategory: false
    })
  }

  // 创建商品，二次编辑分类
  handleEditCategory (formData = {}) {
    // 商品长名称、商品短名称、品牌名称、商品主图、商品详情图
    const keepNames = ['name', 'desc', 'brandName', 'goodsMainImageList', 'goodsDetailImageList']

    this.keepValues = {}
    keepNames.forEach((name) => {
      const value = formData[name]
      if (value === null || value === undefined) {
        return
      }
      this.keepValues[name] = value
    })
    this.setState({
      showCancel: true,
      showCategory: true
    })
  }

  handleLeFormMount (leForm) {
    leForm.on('edit-category', this.handleEditCategory.bind(this))
  }

  render() {
    const { isInit, showCategory, showCancel, formConfig } = this.state;
    const category = showCategory
    ?
      <Category
        showCancel={showCancel}
        onOk={(val) => this.handleCategoryOK(val)}
        onCancel={() => this.handleCategoryCancel()}
      />
    : null

    const form = isInit
    ?
      <div style={{display: showCategory ? 'none' : 'block'}} className='goods-publish'>
        <LeForm
          {...formConfig}
          onMount={(leForm) => this.handleLeFormMount(leForm)}
        />
      </div>
    : null

    return (
      <div>
        {category}{form}
      </div>
    )
  }
}

export default GoodsPublish;
