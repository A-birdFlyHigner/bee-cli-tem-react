import React, { PureComponent } from 'react';
import { LeForm } from '@lib/lepage';
import { formConfig } from './config';
import './index.less';

class PreviewDemo extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formConfig,
    };
  }

  render() {
    const { state } = this;
    return <LeForm {...state.formConfig} />;
  }
}

export default PreviewDemo;
