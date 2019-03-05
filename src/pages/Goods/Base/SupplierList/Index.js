import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import { Button } from 'antd';
import router from 'umi/router';
import { filterConfig, tableConfig } from './config';
import mockList from './mock/list'
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
            formatBefore(queryParams) {
              return queryParams.json
            },
            query(queryParams, url, method) {
              return new Promise((resolve, reject) => {
                const result = mockList(queryParams)
                setTimeout(() => {
                  resolve(result)
                }, 300)
              })
            },
            formatAfter(result) {
              return result
            },
            url: '/revision/product/gys/table/query'
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
