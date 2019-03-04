import React, { Component } from 'react';
import { LeForm } from '@lib/lepage';
import { formConfig } from './config';
import { sleep } from '../../common/utils';
import './index.less';

class PreviewDynamicDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formConfig,
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  onMountLeForm(leForm) {
    this.leForm = leForm;
  }

  fetchData = async () => {
    await sleep(2000);

    // 设置异步请求的数据
    this.leForm.setValues({
      name: '书航',
      phone: '13858868899',
      type: '身份证',
      typeNumber: '330327199008669966',
      city: '杭州',
    });
  };

  render() {
    const { state } = this;
    return <LeForm {...state.formConfig} onMount={(leForm) => this.onMountLeForm(leForm)} />;
  }
}

export default PreviewDynamicDemo;
