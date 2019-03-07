import React, { Component } from 'react';
import { LeForm } from '@lib/lepage';
import Category from './components/Category';
import { formConfig } from './config';

class GoodsPublish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowCategory: false,
      formConfig,
    };
  }

  handleCategoryOK(categoryId) {
    this.setState({
      isShowCategory: false,
    });
  }

  handleCategoryCacel() {
    this.setState({
      isShowCategory: false,
    });
  }

  render() {
    const { state } = this;
    const children = state.isShowCategory ? (
      <Category onOk={() => {}} onCacel={() => this.handleCategoryCacel()} />
    ) : (
      <LeForm {...state.formConfig} />
    );

    return <div>{children}</div>;
  }
}

export default GoodsPublish;
