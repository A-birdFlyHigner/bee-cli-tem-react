import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
// import './index.less';
import moment from 'moment';
import {
  getPurchaseList,
  getWarehouseEmunList,
  changePurchaseState,
  exportSupplyDeliveryOrder,
  getInputDetailList,
} from '@/services/supply';
import { leListQuery } from '@/utils/utils';
import Link from 'umi/link';
import { Modal, message } from 'antd';
import { filterConfig, filterConfigSupply, operationConfig, tableConfig } from './config';
import modalTableConfig from '../../Input/List/config/modal.table.config';

const { confirm } = Modal;

const cancelConfirm = (values, leList) => {
  confirm({
    title: '取消采购单',
    content: '是否确定取消该采购单？',
    onOk() {
      const params = {
        purchaseNo: values.purchaseNo,
        status: 4,
        operaType: 1,
      };
      changePurchaseState(params).then(res => {
        if (res === 1) {
          message.success('取消成功');
          leList.refresh();
        }
      });
    },
    onCancel() {
    },
  });
};

const submitConfirm = (values, leList) => {
  confirm({
    title: '提交采购单',
    content: '是否确定提交该采购单？',
    onOk() {
      const params = {
        purchaseNo: values.purchaseNo,
        status: 2,
        operaType: 0,
      };
      changePurchaseState(params).then(res => {
        if (res === 1) {
          message.success('提交成功');
          leList.refresh();
        }
      });
    },
    onCancel() {
    },
  });
};

let listConfig = {
  filterConfig,
  // operationConfig,
  tableConfig,
  ...leListQuery(getPurchaseList, {
    beforeFun: (params) => {
      let { purchaseTimeStart, purchaseTimeEnd } = params;
      purchaseTimeStart = purchaseTimeStart && moment(purchaseTimeStart).valueOf();
      purchaseTimeEnd = purchaseTimeEnd && moment(purchaseTimeEnd).valueOf();
      return { ...params, purchaseTimeStart, purchaseTimeEnd };
    },
  }),
};

const listConfigModal = {
  filterConfig: {settings: {
      values: {purchaseNo: undefined}
    }},
  tableConfig: modalTableConfig,
  ...leListQuery(getInputDetailList)
};

if (ADMIN_TYPE === 'BRANCH') {
  listConfig = {
    filterConfig,
    operationConfig,
    tableConfig,
    ...leListQuery(getPurchaseList, {
      beforeFun: (params) => {
        let { purchaseTimeStart, purchaseTimeEnd } = params;
        purchaseTimeStart = purchaseTimeStart && moment(purchaseTimeStart).valueOf();
        purchaseTimeEnd = purchaseTimeEnd && moment(purchaseTimeEnd).valueOf();
        return { ...params, purchaseTimeStart, purchaseTimeEnd };
      },
    }),
  };
} else if (ADMIN_TYPE === 'SUPPLIER') {
  listConfig = {
    filterConfig: filterConfigSupply,
    tableConfig,
    ...leListQuery(getPurchaseList, {
      beforeFun: (params) => {
        let { purchaseTimeStart, purchaseTimeEnd } = params;
        purchaseTimeStart = purchaseTimeStart && moment(purchaseTimeStart).valueOf();
        purchaseTimeEnd = purchaseTimeEnd && moment(purchaseTimeEnd).valueOf();
        return { ...params, purchaseTimeStart, purchaseTimeEnd };
      },
    }),
  };
}

class List extends Component {
  constructor(props) {
    super(props);
    const self = this;
    if (ADMIN_TYPE === 'ADMIN') {
      listConfig.tableConfig.columns[13] = {
        title: '操作',
        width: 100,
        align: 'center',
        fixed: 'right',
        render(value, values, index, { leList }) {
          return (
            <div>
              {
                values.status === 1
                  ?
                  <span>
                      <Link to={`/supply/purchase/detail?purchaseNo=${values.purchaseNo}`}>查看</Link>;
                      <Link to={`/supply/purchase/detail?purchaseNo=${values.purchaseNo}&differStatus=1`}>差异报告</Link>
                    </span>
                  : <Link to={`/supply/purchase/detail?purchaseNo=${values.purchaseNo}`}>查看</Link>
              }
            </div>
          );
        },
      };
    } else if (ADMIN_TYPE === 'BRANCH') {
      listConfig.tableConfig.columns[13] = {
        title: '操作',
        width: 120,
        align: 'center',
        fixed: 'right',
        render(value, record, index, { leList }) {
          return (<div>
            {
              record.status === 0
                ?
                <div>
                  <Link to={`/supply/purchase/detail?purchaseNo=${record.purchaseNo}`}>查看</Link>;
                  <Link to={`/supply/purchase/edit?purchaseNo=${record.purchaseNo}`}>编辑</Link>;
                  <a href="javascript:;" onClick={cancelConfirm.bind(null, record, leList)}>取消</a>;
                  <a href="javascript:;" onClick={submitConfirm.bind(null, record, leList)}>提交</a>
                </div>
                : record.status === 2 || record.status === 4
                ?
                <div>
                  <Link to={`/supply/purchase/detail?purchaseNo=${record.purchaseNo}`}>查看</Link>
                </div>
                : record.status === 1 || record.status === 3
                  ?
                  <div>
                    <Link to={`/supply/purchase/detail?purchaseNo=${record.purchaseNo}`}>查看</Link>;
                    <Link to={`/supply/purchase/detail?purchaseNo=${record.purchaseNo}&differStatus=1`}>异常报告</Link>
                  </div>
                  : null
            }
          </div>);

        },
      };
    } else if (ADMIN_TYPE === 'SUPPLIER') {
      listConfig.tableConfig.columns[12] = {
        title: '入库单',
        dataIndex: 'inputNo',
        align: 'center',
        width: 200,
        render(value, values) {
          return (
            <div>
              {
                values.status === 1 || values.status === 3
                  ? <a href="javascript:;" onClick={() => {self.showDetail(values)}}>查看</a>
                  : '/'
              }
            </div>
          );
        },
      }

      listConfig.tableConfig.columns[13] = {
        title: '操作',
        width: 120,
        align: 'center',
        fixed: 'right',
        render(value, record) {
          return (<div>
            {
              record.status === 0 || record.status === 2 || record.status === 4
                ?
                <div>
                  <a href="javascript:;" onClick={() => {
                    self.download(record);
                  }}>下载</a>;
                  <Link to={`/supply/purchase/detail?purchaseNo=${record.purchaseNo}`}>查看</Link>
                </div>
                : record.status === 1 || record.status === 3
                ?
                <div>
                  <a href="javascript:;" onClick={() => {
                    self.download(record);
                  }}>下载</a>;
                  <Link to={`/supply/purchase/detail?purchaseNo=${record.purchaseNo}`}>查看</Link>;
                  <Link to={`/supply/purchase/detail?purchaseNo=${record.purchaseNo}&differStatus=1`}>异常报告</Link>
                </div>
                : null
            }
          </div>);
        },
      };
    }
    this.state = {
      listConfig,
      listConfigModal,
      modalVisible: false,
    };
  }

  handleLeMount = (leList, { filterLeForm }) => {
    if (ADMIN_TYPE !== 'SUPPLIER') {
      getWarehouseEmunList().then((res) => {
        const data = res && res.map(item => {
          return { value: item.key, label: item.value };
        });
        filterLeForm.setProps('warehouseCode', { options: data });
      });
    }
  };

  download = (record) => {
    exportSupplyDeliveryOrder(record.purchaseNo);
  };

  showDetail = (params) => {
    const listConfigModalMix = {...listConfigModal}
    listConfigModalMix.filterConfig.settings.values.purchaseNo = params.purchaseNo
    this.setState({
      modalVisible: true,
      listConfigModal: listConfigModalMix
    });
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    const { state } = this;
    return (
      <div>
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
    )
  }
}

export default List;
