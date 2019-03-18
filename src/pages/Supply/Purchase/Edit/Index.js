import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import {leListQuery} from '@/utils/utils'
import moment from 'moment'
import { operationConfig, modalFilterConfig, modalTableConfig } from './config';
import { Modal, Input, message } from 'antd';
import './Index.less';
import router from 'umi/router';
import {getPurchaseDetail, getPurchaseDetailList, addPurchase, editPurchase, getBasicItemList, getWarehouseEmunList} from '@/services/supply'
import styles from '../../common/style.less';
import ImgPreview from '@/components/ImgPreview'

const formatType = 'YYYY-MM-DD'

class PurchaseEdit extends Component {
  constructor(props) {
    super(props);
    const self = this
    this.showModal.bind(this);
    this.deleteRow.bind(this);
    this.save.bind(this);
    this.listDataSource = {}
    self.inputRef = {}
    self.pageType = props.history.location.pathname.indexOf('add') > -1 ? 'add': 'edit'
    self.purchaseNo = props.location.query.purchaseNo
    let listConfigCombine = {}
    if (self.pageType === 'edit') {
      listConfigCombine = {
        filterConfig: {...operationConfig({purchaseNo: self.purchaseNo})},
        ...leListQuery(getPurchaseDetailList)
      };
      listConfigCombine.filterConfig.items[1] = {
        label: '供应商名称',
        name: 'supplierName',
        component: 'Input',
      }
    } else {
      listConfigCombine = {
        filterConfig: {...operationConfig(),},
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
            return (<span className={styles.fix_img_preview}><ImgPreview url={value} /></span>)
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
                self.inputRef[record.skuCode] = input
                return true
              }}
              defaultValue={value}
            />
          }
        },
        {
          title: '操作',
          width: '80px',
          render(value, values) {
            return (
              <div>
                <a onClick={(e)=>{
                  e.preventDefault()
                  self.deleteRow(values)
                }}
                >
                  删除
                </a>
              </div>
            );
          },
        }
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
    this.listConfig = {...listConfigCombine}
    if (self.pageType === 'edit') {
      this.listConfig = {
        ...listConfigCombine,
      }
    }

    this.state = {
      listConfig: this.listConfig,
      listConfigModal: {},
      modalVisible: false,
    };
  }

  componentDidMount() {
    const self = this
    getWarehouseEmunList().then((res)=>{
      const data = res && res.map(item=>{
        return {value: item.key, label: item.value}
      })
      self.list.filterCore.setProps('warehouseCode', { options: data });
      if (self.pageType === 'edit') {
        getPurchaseDetail(this.purchaseNo).then(resp=>{
          const {warehouseCode, supplierName, supplierCode, expectInboundTime, loseEfficacyTime} = resp
          self.list.filterCore.setValues({
            purchaseNo: this.purchaseNo,
            warehouseCode,
            supplierName,
            supplierCode,
            expectInboundTime: expectInboundTime && moment(expectInboundTime),
            loseEfficacyTime: loseEfficacyTime &&moment(loseEfficacyTime),
          });
        })
      }
    })

  }

  onSelectChange = (selectedRowKeys, LeList) => {
    const data = LeList.getDataSource();
    const newData = data.filter(item => {
      for (let i = 0; i < selectedRowKeys.length; i++) {
        if (item.key === selectedRowKeys[i]) {
          return true;
        }
      }
      return false
    });
    const {pageSize} = this.list.listCore
    const {length} = newData
    this.listDataSource = {
      newData,
      pagination: { pageSize, total: length, currentPage: 1 },
    };
  };

  showModal = (error, values) => {
    if (!values.warehouseCode) {
      message.error('仓库不能为空')
      return
    }
    if (!values.supplierCode) {
      message.error('供应商不能为空')
      return
    }

    const listConfigModalCombine = {
      filterConfig: {...modalFilterConfig({
          supplierCode: values.supplierCode,
          warehouseCode: values.warehouseCode,
        })},
      tableConfig: modalTableConfig,
      ...leListQuery(getBasicItemList)
    };
    listConfigModalCombine.tableConfig.rowSelection.onChange = this.onSelectChange;

    this.setState({
      modalVisible: true,
      listConfigModal: listConfigModalCombine,
    });
  };

  cancel = () => {
    router.push('/supply/purchase/list')
  }

  save = () => {
    const self = this

    if (this.pageType === 'edit') {
      this.listDataSource.newData = this.list.listCore.getDataSource();
      this.listDataSource.pagination = this.list.listCore.getPageData();
    }
    const list = this.listDataSource.newData
    let errFlag = false
    const purchaseOrderDetail = list && list.map((item)=>{
      const {skuCode, skuName, skuImage, itemName, supplierPrice} = item
      if (!this.inputRef[item.skuCode].state.value) {
        message.error('采购数量不能为空')
        errFlag = true
      } else{
        return {
          purchaseNo: this.purchaseNo,
          skuCode,
          skuName,
          skuImage,
          itemName,
          supplierPrice,
          expectSkuCount: this.inputRef[item.skuCode].state.value
        }
      }
    })

    if (errFlag) {
      return
    }

    const temp = this.list.listCore.getFilterData()
    const {expectInboundTime} = temp
    const {loseEfficacyTime} = temp
    const saveData = {
      purchaseNo: temp.purchaseNo,
      supplierCode: temp.supplierCode,
      warehouseCode: temp.warehouseCode,
      expectInboundTime: expectInboundTime && moment(expectInboundTime._d).format(formatType),
      loseEfficacyTime: loseEfficacyTime && moment(loseEfficacyTime._d).format(formatType),
      purchaseOrderDetail,
    }
    if (this.pageType === 'add') {
      addPurchase(saveData).then((res)=>{
        if (res && res === 1) {
          message.success('新增成功')
          self.list.listCore.refresh()
        }
      })
    } else {
      editPurchase(saveData).then((res)=>{
        if (res && res === 1) {
          message.success('编辑成功')
          self.list.listCore.refresh()
        }
      })
    }
  }

  handleOk = () => {
    this.list.listCore.setDataSource(this.listDataSource.newData);
    this.list.listCore.setPageData(this.listDataSource.pagination);
    this.setState({
      modalVisible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  deleteRow = values => {
    const data = [...this.listDataSource.newData]
    const pagination = {...this.listDataSource.pagination}
    pagination.total -= 1
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
    return (
      <div>
        <LeList {...state.listConfig} ref={list => this.list = list} />
        <Modal
          title="添加商品窗口"
          visible={state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="80%"
          destroyOnClose
        >
          <LeList {...state.listConfigModal} ref={modalList => this.modalList = modalList} />
        </Modal>
      </div>
    );
  }
}

export default PurchaseEdit;
