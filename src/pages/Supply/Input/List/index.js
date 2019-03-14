import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import { filterConfig, tableConfig } from './config';
import './index.less';
import {getInputList, getInputDetailList, getSupplierEmunList, getWarehouseEmunList} from '@/services/supply'
import { Modal } from 'antd';
import modalTableConfig from './config/modal.table.config';
import {leListQuery} from '@/utils/utils'

const listConfig = {
  filterConfig,
  tableConfig,
  ...leListQuery(getInputList)
};

const listConfigModal = {
  filterConfig: {settings: {
    values: {inboundNo: undefined}
    }},
  tableConfig: modalTableConfig,
  ...leListQuery(getInputDetailList)
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
  showDetail = (params) => {
    // console.log('params', params)
    // debugger
    // this.modalList.listCore.setValue('inboundNo', params.inboundNo)
    const listConfigModalMix = {...listConfigModal}
    listConfigModalMix.filterConfig.settings.values.inboundNo = params.inboundNo
    this.setState({
      modalVisible: true,
      listConfigModal: listConfigModalMix
    });
  };
  handleCancel = (e) => {
    this.setState({
      modalVisible: false,
    });
  };
  componentDidMount() {
    const self = this
    getWarehouseEmunList().then((res)=>{
      const data = res.map(item=>{
        return {value: item.key, label: item.value}
      })
      self.list.filterCore.setProps('warehouseCode', { options: data });
    })
  }
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
