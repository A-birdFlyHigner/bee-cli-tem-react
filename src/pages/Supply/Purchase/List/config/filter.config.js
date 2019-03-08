import { purchaseState, purchaseSource, supplierState } from '../../../common/constants';

export default {
  settings: {
    initValues: {
      status: 0,
      origin: 0,
      confirm: 0,
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
      name: 'purchasing',
      component: 'DatePicker',
      props: {
        placeholder: '请选择采购时间',
      },
    },
    {
      label: '仓库名称',
      name: 'warehouse',
      component: 'Input',
      props: {
        placeholder: '请输入仓库名称',
      },
    },
    {
      label: '供应商名称',
      name: 'supplier',
      component: 'Input',
      props: {
        placeholder: '请输入供应商名称',
      },
    },
    {
      label: '采购订单状态',
      name: 'status',
      component: 'Select',
      value: 0,
      props: {
        placeholder: '请选择采购订单状态',
        options: purchaseState,
      },
    },
    {
      label: '采购订单来源',
      name: 'origin',
      component: 'Select',
      props: {
        placeholder: '请选择采购订单来源',
        options: purchaseSource,
      },
    },
    {
      label: '供应商确认状态',
      name: 'confirm',
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
