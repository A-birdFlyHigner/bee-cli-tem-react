import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import { leListQuery } from '@/utils/utils';
import moment from 'moment';
import { operationConfig, modalFilterConfig, modalTableConfig } from './config';
import { Modal, Input, message } from 'antd';
import './Index.less';
import router from 'umi/router';
import {
  getPurchaseDetail,
  getPurchaseDetailList,
  addPurchase,
  editPurchase,
  getBasicItemList,
  getWarehouseEmunList,
} from '@/services/supply';
import styles from '../../common/style.less';
import ImgPreview from '@/components/ImgPreview';

const formatType = 'YYYY-MM-DD';

class PurchaseEdit extends Component {
  constructor(props) {
    super(props);
    const self = this;
    this.showModal.bind(this);
    this.deleteRow.bind(this);
    this.save.bind(this);
    this.listDataSource = {};
    self.inputRef = {};
    self.listValue = {};
    self.pageType = props.history.location.pathname.indexOf('add') > -1 ? 'add' : 'edit';
    self.purchaseNo = props.location.query.purchaseNo;
    let listConfigCombine = {};
    if (self.pageType === 'edit') {
      listConfigCombine = {
        filterConfig: operationConfig({ purchaseNo: self.purchaseNo }),
        ...leListQuery(getPurchaseDetailList),
      };
      listConfigCombine.filterConfig.items[0].props = {
        disabled: true,
      };
      listConfigCombine.filterConfig.items[1] = {
        label: '供应商名称',
        name: 'supplierName',
        component: 'Input',
        props: {
          disabled: true,
        },
      };
    } else {
      listConfigCombine = {
        filterConfig: operationConfig(),
        // ...leListQuery(purchaseDetailList)
      };
    }
    listConfigCombine.tableConfig = {
      columns: [
        {
          title: '序号',
          dataIndex: 'key',
        },
        {
          title: 'SKU编码',
          dataIndex: 'skuCode',
        },
        {
          title: '主图',
          dataIndex: 'skuImage',
          render(value) {
            return (<span className={styles.fix_img_preview}><ImgPreview url={value} /></span>);
          },
        },
        {
          title: '商品名称',
          dataIndex: 'itemName',
        },
        {
          title: 'SKU名称',
          dataIndex: 'skuName',
        },
        {
          title: '供应商成本价',
          dataIndex: 'supplierPrice',
        },
        {
          title: '采购数量',
          dataIndex: 'expectSkuCount',
          render: (value, record) => {
            return <Input
              ref={input => {
                self.inputRef[record.skuCode] = input;
                self.listValue[record.skuCode] = value;
                return true;
              }}
              defaultValue={value}
            />;
          },
        },
        {
          title: '操作',
          width: '80px',
          render(value, values, index, {leList}) {
            return (
              <div>
                <a onClick={(e) => {
                  e.preventDefault();
                  self.deleteRow(values, leList);
                }}
                >
                  删除
                </a>
              </div>
            );
          },
        },
      ],
    };
    listConfigCombine.filterConfig.buttons = [
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
    this.listConfig = { ...listConfigCombine };
    if (self.pageType === 'edit') {
      this.listConfig = {
        ...listConfigCombine,
      };
    }

    this.state = {
      listConfig: this.listConfig,
      listConfigModal: {},
      modalVisible: false,
    };
  }

  handleLeMount = (leList, { filterLeForm, operationLeForm }) => {
    const self = this
    self.leList = leList
    getWarehouseEmunList().then((res) => {
      const data = res && res.map(item => {
        return { value: item.key, label: item.value };
      });
      filterLeForm.setProps('warehouseCode', { options: data });
      if (self.pageType === 'edit') {
        getPurchaseDetail(this.purchaseNo).then(resp => {
          const { warehouseCode, supplierName, supplierCode, expectInboundTime, loseEfficacyTime } = resp;
          filterLeForm.setValues({
            purchaseNo: this.purchaseNo,
            warehouseCode,
            supplierName,
            supplierCode,
            expectInboundTime: expectInboundTime && moment(expectInboundTime),
            loseEfficacyTime: loseEfficacyTime && moment(loseEfficacyTime),
          });
        });
      }
    })
  }

  onSelectChange = (selectedRowKeys, leList) => {
    const data = leList.getDataSource();
    const addData = data.filter(item => {
      for (let i = 0; i < selectedRowKeys.length; i++) {
        if (item.skuCode === selectedRowKeys[i]) {
          return true;
        }
      }
      return false;
    });

    // console.log('this.listDataSource.newData', this.listDataSource.newData)
    const mixData = [...addData, ...this.listDataSource.newData];
    // console.log('mixData', mixData)
    // 去重
    const tempList = [];
    const newData = mixData.filter((item) => {
      if (tempList.indexOf(item.skuCode) === -1) {
        tempList.push(item.skuCode);
        return true;
      }
      return false;
    });
    const { pageSize } = leList.getPageData()
    const { length } = newData;
    this.listDataSource = {
      newData,
      pagination: { pageSize, total: length, currentPage: 1 },
    };
  };

  showModal = (error, values, leForm, {leList}) => {
    const self = this
    if (this.listDataSource.newData === undefined) {
      this.listDataSource.newData = leList.getDataSource();
      this.listDataSource.pagination = leList.getPageData();
    }
    const selectedList = this.listDataSource.newData && this.listDataSource.newData.map(item => item.skuCode) || [];
    if (!values.warehouseCode) {
      message.error('仓库不能为空');
      return;
    }
    if (!values.supplierCode) {
      message.error('供应商不能为空');
      return;
    }

    console.log('values', values)
    const listConfigModalCombine = {
      params: {
        supplierCode: values.supplierCode,
        warehouseCode: values.warehouseCode,
      },
      filterConfig: {
        ...modalFilterConfig({
          supplierCode: values.supplierCode,
          warehouseCode: values.warehouseCode,
        }),
      },
      tableConfig: modalTableConfig(selectedList),
          ...leListQuery(getBasicItemList, {

      }),
    };
    listConfigModalCombine.tableConfig.rowSelection.onChange = this.onSelectChange;

    this.setState({
      modalVisible: true,
      listConfigModal: listConfigModalCombine,
    });
  };

  cancel = () => {
    router.push('/supply/purchase/list');
  };

  checkData = (value) => {
    if (value) {
      const result = /^[1-9]\d*$/.test(value)
      return result
    } else {
      return false
    }
  }

  save = (error, values, leForm, {leList}) => {
    const self = this
    this.listDataSource.newData = leList.getDataSource();
    this.listDataSource.pagination = leList.getPageData();
    const list = this.listDataSource.newData;
    let errFlag = false;
    const purchaseOrderDetail = list && list.map((item) => {
      const { skuCode, skuName, skuImage, itemCode, itemName, supplierPrice } = item;
      if (!this.checkData(this.inputRef[item.skuCode].state.value)) {
        message.error('采购数量不能为空，且必须是正整数')
        self.inputRef[item.skuCode].input.focus()
        errFlag = true;
      } else {
        return {
          purchaseNo: this.purchaseNo,
          skuCode,
          skuName,
          skuImage,
          itemCode,
          itemName,
          supplierPrice,
          expectSkuCount: this.inputRef[item.skuCode].state.value,
        };
      }
    });

    if (errFlag) {
      return;
    }

    const temp = leList.getFilterData();
    const { expectInboundTime } = temp;
    const { loseEfficacyTime } = temp;
    const saveData = {
      purchaseNo: temp.purchaseNo,
      supplierCode: temp.supplierCode,
      warehouseCode: temp.warehouseCode,
      expectInboundTime: expectInboundTime && moment(expectInboundTime._d).format(formatType),
      loseEfficacyTime: loseEfficacyTime && moment(loseEfficacyTime._d).format(formatType),
      purchaseOrderDetail,
    };
    if (this.pageType === 'add') {
      addPurchase(saveData).then((res) => {
        if (res && res === 1) {
          message.success('新增成功');
          // self.list.listCore.refresh()
        }
      });
    } else {
      editPurchase(saveData).then((res) => {
        if (res && res === 1) {
          message.success('编辑成功');
          // self.list.listCore.refresh()
        }
      });
    }
  };

  handleOk = () => {
    const self = this
    const mixData = this.listDataSource.newData.map((item)=>{
      return {...item, expectSkuCount: self.listValue[item.skuCode] || 0}
    })
    self.leList.setDataSource(mixData);
    self.leList.setPageData(this.listDataSource.pagination);
    self.setState({
      modalVisible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  deleteRow = (values, leList) => {
    const self = this
    const data = [...this.listDataSource.newData];
    const pagination = { ...this.listDataSource.pagination };
    pagination.total -= 1;
    const newData = data.filter((item) => {
      return item.skuCode !== values.skuCode;
    })

    this.listDataSource = {
      newData,
      pagination,
    }

    this.inputRef[values.skuCode] = undefined
    this.listValue[values.skuCode] = undefined

    self.leList.setDataSource(newData);
    self.leList.setPageData(pagination);
  };

  handleM2 = (leList) => {
    console.log('leList2', leList)
    const self = this
    self.leList2 = leList
  }

  render() {
    const { state } = this;

    console.log('state', state)
    return (
      <div>
        <LeList {...state.listConfig} onMount={this.handleLeMount} />
        <Modal
          title="添加商品窗口"
          visible={state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="80%"
          destroyOnClose
        >
          <LeList {...state.listConfigModal} onMount={this.handleM2} />
        </Modal>
      </div>
    );
  }
}

export default PurchaseEdit;
