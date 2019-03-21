import SearchSelect from '@/components/Rules/SearchSelect'
import timeRule from '@/components/Rules/timeSel/index'
import {getSupplierEmunList} from '@/services/supply'

export default (params) => {
  return {
    settings: {
      initValues: {},
      values: params
    },

    form: {
      inline: false,
      layout: {
        label: 'w120',
        columns: 3,
      },
    },

    items: [
      timeRule({
        label: '入库时间',
        name: ['inboundTimeStart', 'inboundTimeEnd'],
        placeholder: ['请选择开始时间', '请选择结束时间'],
      }),
      {
        label: '入库单号',
        name: 'inboundNo',
        component: 'Input',
        props: {
          placeholder: '请输入入库单号',
        },
      },
      {
        label: '采购单号',
        name: 'purchaseNo',
        component: 'Input',
        props: {
          placeholder: '请输入采购单号',
        },
      },
      {
        label: '仓库名称',
        name: 'warehouseCode',
        component: 'Select',
        props: {
          placeholder: '请选择仓库名称',
          options: [],
        },
      },
      SearchSelect({
        label: '供应商名称',
        name: 'supplierCode',
        paramName: 'supplierName',
        placeholder: '请输入供应商名称',
        requestService: getSupplierEmunList
      },),
    ],
    buttons: [
      {
        props: {
          type: 'primary',
          children: '查询',
          onClick(err, values, formCore, listCore) {
          },
        },
        options: {
          type: 'submit',
          validate: true, // default true
        },
      },
      {
        props: {
          children: '重置',
          onClick(err, values, formCore, listCore) {
          },
        },
        options: {
          type: 'reset',
        },
      },
    ],
  };
}
