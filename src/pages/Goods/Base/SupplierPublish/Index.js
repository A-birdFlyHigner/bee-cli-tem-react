import React, { Component } from 'react';
import { LeForm } from '@lib/lepage';
import Category from './components/Category'
import { getFormConfig } from './config';
import { queryCategoryPropertyDetail } from '@/services/goods'

class GoodsPublish extends Component {
  constructor(props) {
    super(props);

    this.keepValues = {
      name: '商品长名称',
      desc: '商品短名称'
    }
    this.state = {
      showCancel: false,
      showCategory: true,
      formConfig: {},
    };

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
