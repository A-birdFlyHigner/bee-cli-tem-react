import React, { Component } from 'react';
import { LeForm, LeList } from '@lib/lepage';
import { filterConfig, operationConfig, tableConfig, formConfig } from './config';
import { Modal } from 'antd';
import './index.less';
import mockList from './mock/list';

const listConfig = {
  // filterConfig,
  // operationConfig,
  tableConfig,
  formatBefore(queryParams) {
    return queryParams.json;
  },
  query(queryParams, url, method) {
    return new Promise((resolve, reject) => {
      const result = mockList(queryParams);
      setTimeout(() => {
        resolve(result);
      }, 300);
    });
  },
  formatAfter(result) {
    return result;
  },
  url: 'http://localhost:8899/getList',
};

const listConfigModal = {
  filterConfig,
  // operationConfig,
  tableConfig,
  formatBefore(queryParams) {
    return queryParams.json;
  },
  query(queryParams, url, method) {
    return new Promise((resolve, reject) => {
      const result = mockList(queryParams);
      setTimeout(() => {
        resolve(result);
      }, 300);
    });
  },
  formatAfter(result) {
    return result;
  },
  url: 'http://localhost:8899/getList',
};

class PurchaseEdit extends Component {
  constructor(props) {
    super(props);
    this.showModal.bind(this);

    const formConfigCombine = { ...formConfig };
    formConfigCombine.buttons = [
      {
        props: {
          children: '添加商品',
          onClick: this.showModal,
        },
        options: {
          type: 'none',
          validate: true,
        },
      },
    ];

    this.state = {
      listConfig,
      listConfigModal,
      formConfig: formConfigCombine,
      modalVisible: false,
    };
  }

  showModal = (error, values, core) => {
    console.log('error, values, core', error, values, core);
    this.setState({
      modalVisible: true,
    });
  };

  render() {
    const { state } = this;
    return (
      <div>
        <LeForm {...state.formConfig} />
        <LeList {...state.listConfig} />
        <Modal
          title="添加商品窗口"
          visible={state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="80%"
        >
          <LeList {...state.listConfigModal} />
        </Modal>
      </div>
    );
  }
}

export default PurchaseEdit;
