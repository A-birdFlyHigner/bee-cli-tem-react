import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import './index.less';
import { getPurchaseList, getWarehouseEmunList, changePurchaseState, exportSupplyDeliveryOrder } from '@/services/supply';
import { leListQuery } from '@/utils/utils';
import Link from 'umi/link';
import { Modal, message } from 'antd';
import { filterConfig, filterConfigSupply, operationConfig, tableConfig } from './config';

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
          message.success('取消成功')
          leList.refresh()
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
          message.success('提交成功')
          leList.refresh()
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
  ...leListQuery(getPurchaseList),
};
if (ADMIN_TYPE === 'BRANCH') {
  listConfig = {
    filterConfig,
    operationConfig,
    tableConfig,
    ...leListQuery(getPurchaseList),
  };
} else if (ADMIN_TYPE === 'SUPPLIER') {
  listConfig = {
    filterConfig: filterConfigSupply,
    tableConfig,
    ...leListQuery(getPurchaseList),
  };
}

class List extends Component {
  constructor(props) {
    super(props);
    const self = this
    if (ADMIN_TYPE === 'ADMIN') {
      listConfig.tableConfig.columns[13] = {
        title: '操作',
        width: 100,
        align: 'center',
        fixed: 'right',
        render(value, values, index, {leList}) {
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
        render(value, record, index, {leList}) {
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
          </div>)

        }
      };
    } else if (ADMIN_TYPE === 'SUPPLIER') {
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
                  <a href="javascript:;" onClick={()=>{self.download(record)}}>下载</a>;
                  <Link to={`/supply/purchase/detail?purchaseNo=${record.purchaseNo}`}>查看</Link>
                </div>
                : record.status === 1 || record.status === 3
                  ?
                  <div>
                    <a href="javascript:;" onClick={()=>{self.download(record)}}>下载</a>;
                    <Link to={`/supply/purchase/detail?purchaseNo=${record.purchaseNo}`}>查看</Link>;
                    <Link to={`/supply/purchase/detail?purchaseNo=${record.purchaseNo}&differStatus=1`}>异常报告</Link>
                  </div>
                  : null
            }
          </div>)

        }
      };
    }
    this.state = {
      listConfig,
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
  }

  download = (record) => {
    exportSupplyDeliveryOrder(record.purchaseNo)
  }

  render() {
    const { state } = this;
    return <LeList {...state.listConfig} onMount={this.handleLeMount} />;
  }
}

export default List;
