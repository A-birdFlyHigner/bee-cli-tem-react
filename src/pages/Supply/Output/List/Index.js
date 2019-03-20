import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import { filterConfig, tableConfig } from './config';
import './Index.less';
import {getOutputList, getOutputDetailList, getWarehouseEmunList} from '@/services/supply'
import { Modal } from 'antd';
import modalTableConfig from './config/modal.table.config';
import {leListQuery} from '@/utils/utils'

const listConfigModal = {
  filterConfig: {settings: {
    values: {outboundNo: undefined}
    }},
  tableConfig: modalTableConfig,
  ...leListQuery(getOutputDetailList)
};

class List extends Component {
  constructor(props) {
    super(props);
    const self = this
    this.showDetail.bind(this)
    this.queryParams = props.location.query

    const listConfigCombine = {
      filterConfig: filterConfig(this.queryParams),
      tableConfig,
      ...leListQuery(getOutputList)
    }
    listConfigCombine.tableConfig.columns[8] = {
      title: '操作',
      render(value, values) {
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

  showDetail = (params) => {
    const listConfigModalMix = {...listConfigModal}
    listConfigModalMix.filterConfig.settings.values.outboundNo = params.outboundNo
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

  handleLeMount = (leList, { filterLeForm }) => {
    if (ADMIN_TYPE !== 'SUPPLIER') {
      getWarehouseEmunList().then((res) => {
        const data = res && res.map(item => {
          return { value: item.key, label: item.value };
        });
        filterLeForm.setProps('warehouseCode', { options: data });
      });
    }
  }

  render() {
    const { state } = this;
    return <div>
      <LeList {...state.listConfig} onMount={this.handleLeMount} />
      <Modal
        title="出库单详情"
        visible={state.modalVisible}
        onCancel={this.handleCancel}
        width="80%"
        footer={null}
      >
        <LeList {...state.listConfigModal} />
      </Modal>
    </div>
  }
}

export default List;
