import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import { filterConfig, tableConfig } from './config';
import './index.less';

class GoodsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        listConfig: {
            filterConfig,
            tableConfig,
        }
    };
  }

  render() {
    const { state } = this;
    return <LeList {...state.listConfig} />;
  }
}

export default GoodsList;
