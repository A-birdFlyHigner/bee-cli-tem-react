import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import { operationConfig, /*tableConfig*/modalFilterConfig, modalTableConfig } from './config';
import { Modal, Button, Input } from 'antd';
import './index.less';
import router from 'umi/router';
import {getPurchaseDetailList, addPurchase, getBasicItemList, getWarehouseEmunList} from '@/services/supply'
import {leListQuery} from '@/utils/utils'

const listConfig = {
  filterConfig: operationConfig,
  // tableConfig,
  // ...leListQuery(purchaseDetailList)
  // url: 'purchase/listPurchaseOrderDetail',
};

const formatType = 'YYYY-MM-DD'
const type = 'admin'

class PurchaseEdit extends Component {
  constructor(props) {
    super(props);
    console.log('router', router);
    this.showModal.bind(this);
    this.deleteRow.bind(this);
    this.save.bind(this);
    this.listDataSource = {}
    this.inputData = {}
    let self = this
    self.inputRef = {}
    console.log('pathname', props.history.location.pathname.indexOf('detail') > -1)

    const listConfigCombine = { ...listConfig };
    listConfigCombine.tableConfig = {
      columns: [
        {
          title: '序号',
          dataIndex: 'key',
        },
        {
          title: 'SKU编码',
          dataIndex: 'baseSaleGoodsId',
        },
        {
          title: '主图',
          dataIndex: 'mainImages',
          render(value, values, index) {
            return (
              <span>
            <img src={value && value[0]} alt="主图"/>
          </span>
            );
          },
        },
        {
          title: '商品名称',
          dataIndex: 'name',
        },
        {
          title: 'SKU名称(字段待定)',
          dataIndex: 'SKU_Name',
        },
        {
          title: '供应商成本价',
          dataIndex: 'salePrice',
        },
        {
          title: '采购数量',
          dataIndex: 'PurchaseQuantity',
          render: (value, record, index) => {
            return <Input
              ref={input => self.inputRef[record.baseSaleGoodsId] = input}
              onChange={(value)=>{
                console.log('value', value)
              }}
            />
          }
        },
        {
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
    // listConfigCombine.tableConfig.columns[7] =

    this.state = {
      listConfig: listConfigCombine,
      listConfigModal: {},
      modalVisible: false,
    };


  }

  onSelectChange = (selectedRowKeys, LeList) => {
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
  };
  showModal = (error, values, core) => {
    console.log('error, values, core', error, values, core);
    const listConfigModalCombine = {
      filterConfig: {...modalFilterConfig({supplierCode: values.supplierCode})},
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
    console.log('cancel')
    router.push('/supply/purchase/list')
  }
  save = () => {
    // console.log('save', this.listDataSource.newData)
    const list = this.listDataSource.newData
    // console.log('inputRef', this.inputRef)
    // console.log('value', this.inputRef[0].state.value)
    const purchaseOrderDetail = list && list.map((item)=>{
      console.log('item', item)
      return {
        skucode: item.baseSaleGoodsId,
        skuName: '写死',
        skuImage: item.mainImages && item.mainImages[0],
        itemName: item.name,
        supplierPrice: item.salePrice,
        expectSkuCount: this.inputRef[item.baseSaleGoodsId].state.value
      }
    })

    console.log('purchaseOrderDetail', purchaseOrderDetail)
    const expectInboundTime = this.list.listCore.getFilterData().expectInboundTime
    const loseEfficacyTime = this.list.listCore.getFilterData().loseEfficacyTime
    console.log('expectInboundTime', expectInboundTime)
    console.log('loseEfficacyTime', loseEfficacyTime)
    const saveData = {
      supplierCode: this.list.listCore.getFilterData().supplierCode,
      warehouseCode: this.list.listCore.getFilterData().warehouseCode,
      expectInboundTime: expectInboundTime && moment(expectInboundTime).format(formatType),
      loseEfficacyTime: loseEfficacyTime && moment(loseEfficacyTime).format(formatType),
      purchaseOrderDetail,
    }
    console.log('saveData', saveData)
    addPurchase(saveData).then(res=>{
      console.log('res', res)
    })
  }
  handleOk = (e) => {
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
  componentDidMount() {
    const self = this
    getWarehouseEmunList().then((res)=>{
      const data = res && res.map(item=>{
        return {value: item.key, label: item.value}
      })
      self.list.filterCore.setProps('warehouseCode', { options: data });
    })
  }
  render() {
    const { state } = this;
    console.log('state.listConfigModal', state.listConfigModal);
    return (
      <div>
        <LeList {...state.listConfig} ref={list => this.list = list}/>
        <Modal
          title="添加商品窗口"
          visible={state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="80%"
          destroyOnClose
        >
          <LeList {...state.listConfigModal} ref={list => this.modalList = list}/>
        </Modal>
      </div>
    );
  }
}

export default PurchaseEdit;
