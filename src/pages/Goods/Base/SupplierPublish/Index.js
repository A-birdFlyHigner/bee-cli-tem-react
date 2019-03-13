import React, { Component } from 'react';
import { LeForm } from '@lib/lepage';
import moment from 'moment'
import { getFormConfig } from './config';
import { getGoodsDetail, queryCategoryPropertyDetail } from '@/services/goods'
import { getPageQuery } from '@/utils/utils'
import Category from './components/Category/index'
import { SALE_PROPERTY_NAME_ID, GOODS_PROPERTY_NAME_ID, WAREHOUSE_PROPERTY_NAME_ID } from './config/common.config'
// import Sty from './Index.less'

const DEFAULT_FORM_VALUES = {
  name: `书航商品 ${moment().format('YYYY-MM-DD HH:mm:ss')}`,
  desc: '小区乐专卖',
  brandName: '毛线衣',
  goodsMainImageList: [
    {
      height: 640,
      order: 1,
      type: 1,
      uid: "https://img.gegejia.com/40a2b699b96242a082dd6b17c7943560.jpg",
      url: "https://img.gegejia.com/40a2b699b96242a082dd6b17c7943560.jpg",
      width: 640,
    }
  ],
  goodsDetailImageList: [
    {
      height: 640,
      order: 1,
      type: 1,
      uid: "https://img.gegejia.com/40a2b699b96242a082dd6b17c7943560.jpg",
      url: "https://img.gegejia.com/40a2b699b96242a082dd6b17c7943560.jpg",
      width: 640,
    }
  ]
}

const pick = (object, paths = []) => {
  const result = {}
  paths.forEach(path => {
    result[path] = object[path]
  })
  return result
}

const omit = (object, paths = []) => {
  const result = {}
  for (const key in object) {
    if (paths.indexOf(key) === -1) {
      result[key] = object[key]
    }
  }
  return result
}

class GoodsPublish extends Component {
  constructor(props) {
    super(props);

    const { itemId = null } = getPageQuery()

    this.state = {
      itemId,
      isInit: false,
      showCancel: false,
      showCategory: !itemId,
      formConfig: {},
    }

    // FIXME: 测试用的默认值
    this.keepValues = {} // DEFAULT_FORM_VALUES;
  }

  componentWillMount () {
    const { itemId } = this.state
    // 编辑商品
    if (itemId) {
      this.loadGoodsDetail(itemId)
    }
    else {
      // // FIXME: 测试用的直接进入表单页面
      // this.handleCategoryOK({
      //   categoryId: 20005,
      //   treeValues: [20006, 20040, 20041, 20005],
      //   treeLabels: ["水产肉类/新鲜蔬果/熟食", "新鲜蔬菜/蔬菜制品", "新鲜蔬菜", "叶菜类"]
      // })
    }
  }

  async loadGoodsDetail (itemId) {
    const resData = await getGoodsDetail({
      productId: itemId
    })

    if (!resData) return

    const { categoryId, pathName } = resData
    const categoryName = pathName.split(',').join('>')
    const { formConfig, categoryProperties} = await this.loadPublishFormConfig(categoryId, categoryName)

    if (!formConfig) return

    const initValues = this.formatEditInitValues(resData)
    formConfig.settings.values = {
      ...formConfig.settings.values,
      ...initValues
    }

    this.setState({
      isInit: true,
      formConfig
    })
  }

  formatEditInitValues (resData) {
    const baseInfo = pick(resData, ['name', 'desc', 'brandName'])
    const has69 = resData.useBarCode || false

    // 销售属性
    const saleProperties = {}
    resData.saleUnits.forEach(saleUnit => {
      saleUnit.propertyPairList.forEach(pair => {
        const key = `${SALE_PROPERTY_NAME_ID}-${pair.propertyNameId}`
        saleProperties[key] = [...(saleProperties[key] || []), pair.id]
      })
    })

    // 商品属性、仓库属性
    const properties = {}
    resData.properties.forEach((propertie) => {
      const { propertyType, propertyNameId, propertyValue } = propertie
      let prefix = ''
      if (propertyType === 3) {
        prefix = GOODS_PROPERTY_NAME_ID
      }
      else if (propertyType === 4) {
        prefix = WAREHOUSE_PROPERTY_NAME_ID
      }

      // properties[`${prefix}-${propertyNameId}`] = propertyValue
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

    return {
      ...baseInfo,
      has69,
      ...saleProperties,
      ...properties,
      goodsMainImageList,
      goodsDetailImageList
    }
  }

  formatPublishData (formConfig, categoryId, categoryName) {
    const {
      settings: {
        values = {},
        ...restSettings
      } = {}
    } = formConfig

    return {
      ...formConfig,
      settings: {
        values: {
          ...values,
          ...this.keepValues,
          categoryId,
          categoryName,
        },
        ...restSettings
      }
    }
  }

  async loadPublishFormConfig (categoryId, categoryName) {
    const categoryProperties = await queryCategoryPropertyDetail({
      categoryId
    })
    if (!categoryProperties) return null

    const formConfig = getFormConfig(categoryProperties)

    return {
      categoryProperties,
      formConfig: this.formatPublishData(formConfig, categoryId, categoryName)
    }
  }

  // 分类 下一步 操作
  async handleCategoryOK (category = {}) {
    const { categoryId, treeLabels = [] } = category
    const categoryName = treeLabels.join('>')
    const { formConfig } = await this.loadPublishFormConfig(categoryId, categoryName)

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
      <div style={{display: showCategory ? 'none' : 'block'}}>
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
