import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import { filterConfig, tableConfig } from './config';
import './index.less';
import mockList from './mock/list';
import mockListModal from './mock/listModal';
import { Modal } from 'antd';
import modalTableConfig from './config/modal.table.config';

const listConfig = {
  filterConfig,
  tableConfig,
  formatBefore(queryParams) {
    return queryParams;
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
  tableConfig: modalTableConfig,
  formatBefore(queryParams) {
    return queryParams;
  },
  query(queryParams, url, method) {
    return new Promise((resolve, reject) => {
      const result = mockListModal(queryParams);
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

class List extends Component {
  constructor(props) {
    super(props);
    const self = this
    this.showDetail.bind(this)
    const listConfigCombine = {...listConfig}
    listConfigCombine.tableConfig.columns[8] = {
      title: '操作',
      render(value, values, index) {
        return (
          <div>
            <a href="javascript:;" onClick={()=>{self.showDetail(values)}} >查看</a>
          </div>
        );
      },
    },

    this.state = {
      listConfig: listConfigCombine,
      listConfigModal,
      modalVisible: false,
    };
  }
  showDetail = (e) => {
    this.setState({
      modalVisible: true,
    });
  };
/*  handleOk = (e) => {
    console.log('this.listDataSource', this.listDataSource);
    this.list.listCore.setDataSource(this.listDataSource.newData);
    this.list.listCore.setPageData(this.listDataSource.pagination);
    this.setState({
      modalVisible: false,
    });
  };*/
  handleCancel = (e) => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    const { state } = this;
    return <div>
      <LeList {...state.listConfig} ref={list => this.list = list}/>
      <Modal
        title="入库单详情"
        visible={state.modalVisible}
        onCancel={this.handleCancel}
        width="80%"
        footer={null}
      >
        <LeList {...state.listConfigModal} ref={list => this.modalList = list}/>
      </Modal>
    </div>
  }
}

export default List;
