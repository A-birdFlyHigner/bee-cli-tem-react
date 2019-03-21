import { purchaseState, purchaseSource, supplierState } from '@/pages/Supply/common/constants';
import SearchSelect from '@/components/Rules/SearchSelect'
import {getSupplierEmunList} from '@/services/supply'

export default {
  settings: {
    initValues: {
      status: 99,
      source: 99,
      supplierConfirmStatus: 99,
    },
  },

  form: {
    inline: false,
    layout: {
      label: 'w120',
      columns: 3,
    },
  },

  items: [
    {
      label: '采购开始时间',
      name: 'purchaseTimeStart',
      component: 'DatePicker',
      props: {
        placeholder: '请选择采购开始时间',
      },
    },
    {
      label: '采购结束时间',
      name: 'purchaseTimeEnd',
      component: 'DatePicker',
      props: {
        placeholder: '请选择采购结束时间',
      },
    },
    SearchSelect({
      label: '供应商名称',
      name: 'supplierCode',
      paramName: 'supplierName',
      placeholder: '请输入供应商名称',
      requestService: getSupplierEmunList
    },),
    {
      label: '仓库名称',
      name: 'warehouseCode',
      component: 'Select',
      props: {
        placeholder: '请选择采购订单状态',
        options: [],
      },
    },
    {
      label: '采购订单状态',
      name: 'status',
      component: 'Select',
      props: {
        placeholder: '请选择采购订单状态',
        options: purchaseState,
      },
    },
    {
      label: '采购订单来源',
      name: 'source',
      component: 'Select',
      props: {
        placeholder: '请选择采购订单来源',
        options: purchaseSource,
      },
    },
    {
      label: '供应商确认状态',
      name: 'supplierConfirmStatus',
      component: 'Select',
      props: {
        placeholder: '请选择供应商确认状态',
        options: supplierState,
      },
    },
  ],

  buttons: [
    {
      props: {
        type: 'primary',
        children: '查询',
      },
      options: {
        type: 'submit',
        validate: true, // default true
      },
    },
    {
      props: {
        children: '重置',
      },
      options: {
        type: 'reset',
      },
    },
  ],
};
