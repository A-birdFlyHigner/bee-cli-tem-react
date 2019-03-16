import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import { filterConfig, filterConfigSupply, operationConfig, tableConfig } from './config';
import './index.less';
import { getPurchaseList, getWarehouseEmunList, changePurchaseState } from '@/services/supply';
import { leListQuery } from '@/utils/utils';
import Link from 'umi/link';
import { Modal } from 'antd';

const { confirm } = Modal;

console.log('ADMIN_TYPE', ADMIN_TYPE);

const cancelConfirm = values => {
  confirm({
    title: '取消采购单',
    content: '是否确定取消该采购单？',
    onOk() {
      console.log('cancelConfirm_OK');
      const params = {
        purchaseNo: values.purchaseNo,
        status: 4,
        operaType: 1,
      };
      changePurchaseState(params).then(res => {
        console.log('res', res);
      });
    },
    onCancel() {
      console.log('cancelConfirm_Cancel');
    },
  });
};

const submitConfirm = values => {
  confirm({
    title: '提交采购单',
    content: '是否确定提交该采购单？',
    onOk() {
      console.log('submitConfirm_OK');
      const params = {
        purchaseNo: values.purchaseNo,
        status: 2,
        operaType: 0,
      };
      changePurchaseState(params).then(res => {
        console.log('res', res);
      });
    },
    onCancel() {
      console.log('submitConfirm_Cancel');
    },
  });
};

let listConfig = {
  filterConfig,
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
    if (ADMIN_TYPE === 'ADMIN') {
      listConfig.tableConfig.columns[13] = {
        title: '操作',
        width: 200,
        align: 'center',
        fixed: 'right',
        render(value, values) {
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
        width: 200,
        align: 'center',
        fixed: 'right',
        render(value, record) {
          return (<div>
            {
              record.status === 0
              ?
                <div>
                  <Link to={`/supply/purchase/detail?purchaseNo=${record.purchaseNo}`}>查看</Link>;
                  <Link to={`/supply/purchase/edit?purchaseNo=${record.purchaseNo}`}>编辑</Link>;
                  <a href="javascript:;" onClick={cancelConfirm.bind(null, record)}>取消</a>;
                  <a href="javascript:;" onClick={submitConfirm.bind(null, record)}>提交</a>
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
    }
    this.state = {
      listConfig,
    };
  }

  componentDidMount() {
    const self = this;
    if (ADMIN_TYPE !== 'SUPPLIER') {
      getWarehouseEmunList().then((res) => {
        const data = res && res.map(item => {
          return { value: item.key, label: item.value };
        });
        self.list.filterCore.setProps('warehouseCode', { options: data });
      });
    }
  }

  render() {
    const { state } = this;
    return <LeList {...state.listConfig} ref={list => this.list = list}/>;
  }
}

export default List;
