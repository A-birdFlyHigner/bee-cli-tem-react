import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import { Button } from 'antd';
import router from 'umi/router';
import { filterConfig, tableConfig } from './config';
import './index.less';

class GoodsList extends Component {

  static goToPublishPage() {
    router.push('/goods/publish')
  }

  constructor(props) {
    super(props);

    this.state = {
        listConfig: {
            filterConfig,
            tableConfig,
        }
    };
  }

  render () {
    const { state } = this;
    return (
      <div>
        <Button onClick={() => GoodsList.goToPublishPage()}>新增商品</Button>
        <LeList {...state.listConfig} />
      </div>
    );
  }
}

export default GoodsList;
