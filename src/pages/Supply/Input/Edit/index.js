import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import { operationConfig, tableConfig, modalFilterConfig, modalTableConfig } from './config';
import { Modal, Button } from 'antd';
import './index.less';
import mockList from './mock/list';
import router from 'umi/router';

const listConfig = {
  operationConfig,
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
  operationConfig: modalFilterConfig,
  tableConfig: modalTableConfig,
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

class PurchaseEdit extends Component {
  constructor(props) {
    super(props);
    console.log('router', router);
    this.showModal.bind(this);
    this.deleteRow.bind(this);
    this.listDataSource = {}
    let self = this
    const listConfigCombine = { ...listConfig };
    listConfigCombine.operationConfig.buttons = [
      {
        props: {
          type: 'primary',
          children: '添加商品',
          onClick: self.showModal,
        },
        options: {
          type: 'none',
        },
      },
      {
        props: {
          children: '取消',
          onClick: self.cancel,
        },
        options: {
          type: 'none',
        },
      },
      {
        props: {
          type: 'primary',
          children: '保存',
          onClick: self.save,
        },
        options: {
          type: 'none',
        },
      },
    ];
    listConfigCombine.tableConfig.columns[7] = {
      title: '操作',
      width: '80px',
      render(value, values, index) {
        return (
          <div>
            <a href="javascript:;" onClick={()=>{self.deleteRow(values)}} >删除</a>
          </div>
        );
      },
    }
    const listConfigModalCombine = { ...listConfigModal };
    listConfigModalCombine.tableConfig.rowSelection.onChange = this.onSelectChange;
    this.state = {
      listConfig: listConfigCombine,
      listConfigModal: listConfigModalCombine,
      modalVisible: false,
    };
  }

  onSelectChange = (selectedRowKeys, LeList) => {
    // console.log('selectedRowKeys, LeList', selectedRowKeys, LeList)
    console.log('selectedRowKeys changed: ', selectedRowKeys, LeList.getDataSource());
    const data = LeList.getDataSource();
    const newData = data.filter(item => {
      for (let i = 0; i < selectedRowKeys.length; i++) {
        if (item.key === selectedRowKeys[i]) {
          return true;
        }
      }
    });
    const pageSize = this.list.listCore.pageSize
    const length = newData.length
    this.listDataSource = {
      newData,
      pagination: { pageSize: pageSize, total: length, currentPage: 1 },
    };
    // this.list.listCore.setDataSource(newData)
    // this.list.listCore.setPageData(newData)
  };
  showModal = (error, values, core) => {
    console.log('error, values, core', error, values, core);
    this.setState({
      modalVisible: true,
    });
  };
  cancel = () => {
    console.log('cancel')
    router.push('/supply/purchase/list')
  }
  save = () => {
    console.log('save', this.listDataSource)
  }
  handleOk = (e) => {
    // console.log('this.list', this.list)
    // console.log('this.modalList', this.modalList)
    // const data = this.modalList.listCore.getDataSource()
    // console.log('data', data)
    console.log('this.listDataSource', this.listDataSource);
    this.list.listCore.setDataSource(this.listDataSource.newData);
    this.list.listCore.setPageData(this.listDataSource.pagination);
    this.setState({
      modalVisible: false,
    });
  };
  handleCancel = (e) => {
    this.setState({
      modalVisible: false,
    });
  };
  deleteRow = values => {
    console.log('values', this, values.key);
    const data = [...this.listDataSource.newData]
    console.log('data', data)
    const pagination = {...this.listDataSource.pagination}
    pagination.total = pagination.total - 1
    const newData = data.filter((item)=>{
      return item.key !== values.key
    })
    this.listDataSource = {
      newData,
      pagination,
    }

    this.list.listCore.setDataSource(newData);
    this.list.listCore.setPageData(pagination);
  };
  render() {
    const { state } = this;
    console.log('state.listConfigModal', state.listConfigModal);
    return (
      <div>
        <LeList {...state.listConfig} ref={list => this.list = list}/>
        {/*<Button onClick={this.cancel}>取消</Button>*/}
        {/*<Button type='primary' onClick={this.submit}>保存</Button>*/}
        <Modal
          title="添加商品窗口"
          visible={state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="80%"
        >
          <LeList {...state.listConfigModal} ref={list => this.modalList = list}/>
        </Modal>
      </div>
    );
  }
}

export default PurchaseEdit;
