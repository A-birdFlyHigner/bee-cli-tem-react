import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import { filterConfig, tableConfig } from './config';
import './Index.less';
import {getInputList, getInputDetailList, getWarehouseEmunList} from '@/services/supply'
import { Modal } from 'antd';
import modalTableConfig from './config/modal.table.config';
import {leListQuery} from '@/utils/utils'

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
    const listConfig = {
      filterConfig: filterConfig({purchaseNo: props.location.query.purchaseNo}),
      tableConfig,
      ...leListQuery(getInputList)
    }
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
    }
    this.state = {
      listConfig: listConfigCombine,
      listConfigModal,
      modalVisible: false,
    };
  }

  handleLeMount = (leList, {filterLeForm}) => {
    if (ADMIN_TYPE !== 'SUPPLIER') {
      getWarehouseEmunList().then((res) => {
        const data = res && res.map(item => {
          return { value: item.key, label: item.value };
        });
        filterLeForm.setProps('warehouseCode', { options: data });
      });
    }
  }

  showDetail = (params) => {
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

  render() {
    const { state } = this;
    return <div>
      <LeList {...state.listConfig} onMount={this.handleLeMount} />
      <Modal
        title="入库单详情"
        visible={state.modalVisible}
        onCancel={this.handleCancel}
        width="80%"
        footer={null}
        destroyOnClose
      >
        <LeList {...state.listConfigModal} />
      </Modal>
    </div>
  }
}

export default List;
