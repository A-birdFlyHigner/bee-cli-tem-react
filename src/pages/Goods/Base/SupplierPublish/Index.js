import React, { Component } from 'react';
import { LeForm } from '@lib/lepage';
import Category from './components/Category'
import moment from 'moment'
import Mock from 'mockjs'
import { getFormConfig } from './config';
import { queryCategoryPropertyDetail } from '@/services/goods'

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

class GoodsPublish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCancel: false,
      showCategory: true,
      formConfig: {},
    }

    // FIXME: 测试用的默认值
    this.keepValues = DEFAULT_FORM_VALUES;

    // FIXME: 测试用的直接进入表单页面
    this.handleCategoryOK({
      categoryId: 20005,
      treeValues: [20006, 20040, 20041, 20005],
      treeLabels: ["水产肉类/新鲜蔬果/熟食", "新鲜蔬菜/蔬菜制品", "新鲜蔬菜", "叶菜类"]
    })
  }

  // 分类 下一步 操作
  async handleCategoryOK (category = {}) {
    // TODO: 更换类目选择的值
    const { categoryId, treeLabels = [] } = category
    const categoryProperties = await queryCategoryPropertyDetail({
      categoryId
    })
    if (!categoryProperties) return

    const defaultFormConfig = getFormConfig(categoryProperties)

    const {
      settings: {
        values = {},
        ...restSettings
      } = {}
    } = defaultFormConfig

    const formConfig = {
      ...defaultFormConfig,
      settings: {
        values: {
          ...values,
          ...this.keepValues,
          categoryName: treeLabels.join('>'),
          categoryId
        },
        ...restSettings
      }
    }

    this.setState({
      showCategory: false,
      formConfig
    })
  }

  // 分类 取消 操作
  handleCategoryCancel () {
    // TODO: 取消操作，没有保留项数据没有被还原
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
    const { state } = this;
    const children = state.showCategory
    ?
      <Category
        showCancel={state.showCancel}
        onOk={(val) => this.handleCategoryOK(val)}
        onCancel={() => this.handleCategoryCancel()}
      />
    :
      <LeForm
        {...state.formConfig}
        onMount={(leForm) => this.handleLeFormMount(leForm)}
      />;

    return (
      <div>
        {children}
      </div>
    )
  }
}

export default GoodsPublish;
