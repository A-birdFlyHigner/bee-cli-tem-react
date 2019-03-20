import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import { filterConfig, tableConfig } from './config';
import './Index.less';
import {getStockList, getStockDetailList, getWarehouseEmunList} from '@/services/supply'
import { Modal } from 'antd';
import modalTableConfig from './config/modal.table.config';
import {leListQuery} from '@/utils/utils'

const listConfig = {
  filterConfig,
  tableConfig,
  ...leListQuery(getStockList)
};

if (ADMIN_TYPE === 'SUPPLIER') {
  listConfig.filterConfig.items = [
    {
      label: '商品ID',
      name: 'itemCode',
      component: 'Input',
      props: {
        placeholder: '请输入商品ID',
      },
    },
    {
      label: 'SKU编码',
      name: 'skuCode',
      component: 'Input',
      props: {
        placeholder: '请输入SKU编码',
      },
    },
  ]
}

const listConfigModal = {
  filterConfig: {settings: {
    values: {
      warehouseCode: undefined,
      skuCode: undefined,
    }
  }},
  tableConfig: modalTableConfig,
  ...leListQuery(getStockDetailList)
};

class List extends Component {
  constructor(props) {
    super(props);
    const self = this
    this.showDetail.bind(this)
    const listConfigCombine = {...listConfig}
    listConfigCombine.tableConfig.columns[10] = {
      title: '操作',
      render(value, values) {
        return (
          <div>
            <a href="javascript:;" onClick={()=>{self.showDetail(values)}} >仓库详情</a>
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
    listConfigModalMix.filterConfig.settings.values.warehouseCode = params.warehouseCode
    listConfigModalMix.filterConfig.settings.values.skuCode = params.skuCode
    this.setState({
      modalVisible: true,
      listConfigModal: listConfigModalMix
    });
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

  handleCancel = (e) => {
    this.setState({
      modalVisible: false,
    });
  }

  render() {
    const { state } = this;
    return (
      <div>
        <LeList {...state.listConfig} onMount={this.handleLeMount} />
        <Modal
          title="商品在仓库存"
          visible={state.modalVisible}
          onCancel={this.handleCancel}
          width="80%"
          footer={null}
          destroyOnClose
        >
          <LeList {...state.listConfigModal} />
        </Modal>
      </div>)
  }
}

export default List;
