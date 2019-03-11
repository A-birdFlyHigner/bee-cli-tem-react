import { purchaseState, purchaseSource, supplierState } from '../../../common/constants';

// const admin = 0
// const seller = 1
// const fromType = admin

export default {
  settings: {
    initValues: {
      status: 99,
      origin: 99,
      supplierConfirmStatus: 99,
      // fromType
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
      label: '采购时间',
      name: 'createTime',
      component: 'DatePicker',
      props: {
        placeholder: '请选择采购时间',
      },
    },
    {
      label: '仓库名称',
      name: 'warehouseCode',
      component: 'Input',
      props: {
        placeholder: '请输入仓库名称',
      },
    },
    {
      label: '供应商名称',
      name: 'supplierCode',
      component: 'Input',
      props: {
        placeholder: '请输入供应商名称',
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
        onClick(err, values, formCore, listCore) {},
      },
      options: {
        type: 'submit',
        validate: true, // default true
      },
    },
    {
      props: {
        children: '重置',
        onClick(err, values, formCore, listCore) {},
      },
      options: {
        type: 'reset',
      },
    },
    // {
    //   props: {
    //     type: 'danger',
    //     children: '导出',
    //     onClick(err, values, formCore, listCore) {},
    //   },
    //   options: {
    //     type: 'none',
    //     validate: true,
    //   },
    // },
  ],
};
