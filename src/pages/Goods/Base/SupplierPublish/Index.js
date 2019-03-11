import React, { Component } from 'react';
import { LeForm } from '@lib/lepage';
import Category from './components/Category'
import { formConfig as defaultFormConfig } from './config';
// import { queryCategoryPropertyDetail } from '@/services/goods'

class GoodsPublish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCancel: false,
      // showCategory: true,
      // formConfig: {},
      showCategory: false,
      formConfig: defaultFormConfig,
    };

    this.formValues = {}
  }

  // 分类 下一步 操作
  handleCategoryOK (category) {
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
          ...this.formValues,
          category: category.treeLabels.join('>')
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
    const keepNames = ['longName', 'shortName']

    this.formValues = {}
    keepNames.forEach((name) => {
      const value = formData[name]
      if (value === null || value === undefined) {
        return
      }
      this.formValues[name] = value
    })
    this.setState({
      showCancel: true,
      showCategory: true
    })
  }

  handleLeFormMount (leForm) {
    leForm.on('edit-category', this.handleEditCategory.bind(this))
  }

  // async fetchCategory () {
  //   const category = await queryCategoryPropertyDetail({
  //     categoryId: 20005
  //   })
  //   debugger
  //   this.setState({
  //     category
  //   })
  // }

  // handleLeFormChange (changeKeys, values, leForm) {
  //   // TODO:
  // }

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
        // onChange={(...rest) => this.handleLeFormChange(...rest)}
      />;

    return <div>{children}</div>;
  }
}

export default GoodsPublish;
